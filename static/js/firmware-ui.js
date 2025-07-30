async function showFirmwareAccordion() {
  const boards = await fetch('/firmware/firmware.json').then(r => r.json());
  const accordion = document.getElementById('firmwareAccordion');


  Object.entries(boards).forEach(([key, board], idx) => {
    const items = board.versions.map(version => {
      if (board.type === 'nrf52') {
        return `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${key}-${version}</span>
            <span>
              <a class="btn btn-sm btn-outline-secondary me-2"
                 href="/firmware/${key}/${version}/${key}-${version}-ota.zip">Download OTA</a>
              <a class="btn btn-sm btn-outline-primary"
                 href="/firmware/${key}/${version}/${key}-${version}.uf2">Download UF2</a>
            </span>
          </li>`;
      }
      if (board.type === 'esp32') {
        return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${version}</span>
          <span>
          <button class="btn btn-sm btn-outline-primary open-modal-btn"
                  data-board="${key}" data-version="${version}">Flash
          </button>
          </span>
        </li>`;
      }
    }).join('');

    // extra erase row for nrf
    const extra = (board.type === 'nrf52') ? `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>nrf_erase2.uf2</span>
        <a class="btn btn-sm btn-outline-danger"
           href="/firmware/nrf_erase2.uf2">Download UF2</a>
      </li>` : '';

    // ---- accordion item ----
    accordion.insertAdjacentHTML('beforeend', `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button ${idx ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#body-${key}" aria-expanded="${!idx}" aria-controls="body-${key}">
            <strong>${board.name}<strong>
          </button>
        </h2>
        <div id="body-${key}" class="accordion-collapse collapse ${!idx ? 'show' : ''}">
            <div class="accordion-body">
                <ul class="list-group list-group-flush">
                ${items}${extra}
                </ul>
            </div>
          </div>
        </div>
      </div>
    `);
  });
}

// ── load ESP32 board map once ──
const boards = {};
fetch('/firmware/firmware.json').then(r => r.json()).then(j => {
  Object.entries(j).forEach(([k, b]) => {
    if (b.type === 'esp32') boards[k] = b;
  });
});

// state carried into modal
let currentBoardKey = '';
let currentVersion = '';

// ── open modal when list button clicked ──
document.addEventListener('click', ev => {
  if (!ev.target.matches('.open-modal-btn')) return;
  const modalEl   = document.getElementById('flashModal');
  const flashModal= new bootstrap.Modal(modalEl);
  const titleEl   = document.getElementById('flashModalLabel');
  const eraseChk  = document.getElementById('eraseSwitch');
  const logBox = document.getElementById('espLog');



  currentBoardKey = ev.target.dataset.board;
  currentVersion  = ev.target.dataset.version;
  const board = boards[currentBoardKey];
  titleEl.textContent = `Flash – ${board.name} ${currentVersion}`;
  eraseChk.checked = false;
  logBox.textContent = '';
  flashModal.show();
});


const startBtn  = document.getElementById('startFlashBtn');

startBtn.addEventListener('click', async () => {
  const eraseChk  = document.getElementById('eraseSwitch');
  const board   = boards[currentBoardKey];
  const version = currentVersion;
  const fullEraseInstall = eraseChk.checked;

  startBtn.disabled = true;
  await flashFirmware(board, version, fullEraseInstall);
  startBtn.disabled = false;
});


showFirmwareAccordion();
