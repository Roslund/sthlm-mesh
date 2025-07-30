
import('https://unpkg.com/esptool-js/bundle.js').then(({ ESPLoader, Transport }) => {

  // ── shared elements & modal instance ──
  const modalEl   = document.getElementById('flashModal');
  const flashModal= new bootstrap.Modal(modalEl);
  const logBox    = document.getElementById('espLog');
  const titleEl   = document.getElementById('flashModalLabel');
  const eraseChk  = document.getElementById('eraseSwitch');
  const startBtn  = document.getElementById('startFlashBtn');

  // state carried into modal
  let currentBoardKey = '', currentVersion = '';

  // ── load ESP32 board map once ──
  const BOARD_MAP = {};
  fetch('/firmware/firmware.json').then(r => r.json()).then(j => {
    Object.entries(j).forEach(([k, b]) => {
      if (b.type === 'esp32') BOARD_MAP[k] = b;
    });
  });

  // ── helper funcs (same as before, minus offsets array) ──
  const log = (...m)=>{logBox.textContent+=m.join(' ')+'\n';logBox.scrollTop=logBox.scrollHeight;};
  const fetchB64 = async (url) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  };

  let loader;

  // ── open modal when list button clicked ──
  document.addEventListener('click', ev => {
    if (!ev.target.matches('.open-modal-btn')) return;
    currentBoardKey = ev.target.dataset.board;
    currentVersion  = ev.target.dataset.version;
    const b = BOARD_MAP[currentBoardKey];
    titleEl.textContent = `Flash – ${b.name} ${currentVersion}`;
    eraseChk.checked = false;
    logBox.textContent = '';
    flashModal.show();
  });

  // ── start flashing when modal button clicked ──
  startBtn.addEventListener('click', async () => {
    const b   = BOARD_MAP[currentBoardKey];
    const ver = currentVersion;
    const full = eraseChk.checked;

    try {
      startBtn.disabled = true;
      log(`\n=== ${b.name} · ${ver} (${full ? 'full' : 'update'}) ===`);

      let port = await navigator.serial.requestPort({});
      let transport = new Transport(port, true);
      loader = new ESPLoader({ transport: transport, baudrate: 460800,
                               terminal:{ writeLine:log, write:log, clean(){} }});
      await loader.main();  log('Connected.');

      let fileArray, eraseAll = false;

      if (!full) {
        // UPDATE – write app only
        const app = await fetchB64(`/firmware/${currentBoardKey}/${ver}/firmware.bin`);

        fileArray = [
          { address: 0x10000, data: app }
        ];
      } else {
        // FULL ERASE – factory + ota + littlefs (shared)
        let otaOffset=0x260000, spiffsOffset=0x300000;
        if (b.flashSize==='8MB'){ otaOffset=0x340000; spiffsOffset=0x670000; }
        if (b.flashSize==='16MB'){otaOffset=0x650000; spiffsOffset=0xC90000; }

        const factory = await fetchB64(`/firmware/${currentBoardKey}/${ver}/firmware.factory.bin`);
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
          fileArray: [{ data: await fetchB64(`/firmware/${currentBoardKey}/${ver}/firmware.bin`), address: 0x10000 }],
          flashSize: 'keep',
          eraseAll: false,
          compress: true,
          flashMode: 'keep',
          flashFreq: 'keep',
          //reportProgress:(i,d,t)=>log(`chunk ${i}: ${(100*d/t).toFixed(1)} %`)
        };

        await loader.writeFlash(flashOptions);
    } catch(e){ console.error(e); log('❌ Error:', e); }
    finally { startBtn.disabled = false; }
  });
});
