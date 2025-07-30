async function flashFirmware(board, version, fullEraseInstall) {
  const { ESPLoader, Transport } = import('https://unpkg.com/esptool-js/bundle.js')
  const logBox = document.getElementById('espLog');


  // Helper functions
  function log(...m) {
    logBox.textContent+=m.join(' ')+'\n';logBox.scrollTop=logBox.scrollHeight;
  }

  async function fetchBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1]; // Strip "data:application/octet-stream;base64,"
        resolve(base64);
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob); // Encodes to base64
    });
  }

  try {
    log(`\n=== ${board.name} · ${version} (${fullEraseInstall ? 'full' : 'update'}) ===`);

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
      const app = await fetchB64(`/firmware/${currentBoardKey}/${version}/firmware.bin`);

      fileArray = [
        { address: 0x10000, data: app }
      ];
    } else {
      // FULL ERASE – factory + ota + littlefs (shared)
      let otaOffset=0x260000, spiffsOffset=0x300000;
      if (board.flashSize==='8MB'){ otaOffset=0x340000; spiffsOffset=0x670000; }
      if (board.flashSize==='16MB'){otaOffset=0x650000; spiffsOffset=0xC90000; }

      const factory = await fetchB64(`/firmware/${currentBoardKey}/${version}/firmware.factory.bin`);
      const ota     = await fetchB64(`/firmware/bleota.bin`);
      const lfs     = await fetchB64(`/firmware/littlefs.bin`);

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
      eraseAll: false,
      compress: true,
      flashMode: 'keep',
      flashFreq: 'keep',
    };

    await loader.writeFlash(flashOptions);

  } catch(e){ console.error(e); log('❌ Error:', e); }
}