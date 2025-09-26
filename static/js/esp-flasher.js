async function flashFirmware(board, version, fullEraseInstall) {
  const { ESPLoader, Transport } = await import('https://unpkg.com/esptool-js/bundle.js')
  const logBox = document.getElementById('espLog');


  // Helper functions
  function log(...m) {
    logBox.textContent+=m.join(' ')+'\n';logBox.scrollTop=logBox.scrollHeight;
  }

function convertToBinaryString(bytes) {
	let binaryString = "";
	for (let i = 0; i < bytes.length; i++) {
		binaryString += String.fromCharCode(bytes[i]);
	}
	return binaryString;
}

async function fetchBinaryContent(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  return convertToBinaryString(new Uint8Array(buffer));
}


  try {
    log(`\n=== ${board.displayName} · ${version} (${fullEraseInstall ? 'full' : 'update'}) ===`);

    let port = await navigator.serial.requestPort({});
    let transport = new Transport(port, true);
    let loader = new ESPLoader({ 
      transport: transport, 
      baudrate: 460800,
      terminal:{ writeLine:log, write:log, clean(){} }
    });

    await loader.main();
    log('Connected.');

    let fileArray, eraseAll = false;

    if (!fullEraseInstall) {
      // UPDATE – write app only
      const app = await fetchBinaryContent(`/firmware/${board.hwModelSlug}/${version}/firmware-${board.hwModelSlug}-${version}-update.bin`);

      fileArray = [
        { address: 0x10000, data: app }
      ];
    } else {
      // FULL ERASE, and firmware + littlefs flash
      // ota is share, need to af logic if supporting other devices...
      let otaOffset=0x260000, spiffsOffset=0x300000;
      if (board.partitionScheme==='8MB'){ otaOffset=0x340000; spiffsOffset=0x670000; }
      if (board.partitionScheme==='16MB'){otaOffset=0x650000; spiffsOffset=0xC90000; }

      const factory = await fetchBinaryContent(`/firmware/${board.hwModelSlug}/${version}/firmware-${board.hwModelSlug}-${version}.bin`);
      const ota     = await fetchBinaryContent(`/firmware/bleota-s3.bin`);
      const lfs     = await fetchBinaryContent(`/firmware/${board.hwModelSlug}/${version}/littlefs-${board.hwModelSlug}-${version}.bin`);

      fileArray = [
        { address: 0x0000,      data: factory },
        { address: otaOffset,   data: ota     },   
        { address: spiffsOffset,data: lfs     }
      ];
      eraseAll = true;
    }

    const flashOptions = {
      fileArray: fileArray,
      flashSize: 'keep',
      eraseAll: eraseAll,
      compress: true,
      flashMode: 'keep',
      flashFreq: 'keep',
    };

    await loader.writeFlash(flashOptions);

  } catch(e){ console.error(e); log('❌ Error:', e); }
}