let boards = [];
let selectedBoard = {};
let selectedVersion = '';

fetch('/firmware/firmware.json')
  .then(r => r.json())
  .then(data => {
    boards = data;
    showFirmwareAccordion(boards);
  });

async function showFirmwareAccordion(boards) {
  const accordion = document.getElementById('firmwareAccordion');

  boards.forEach((board, idx) => {
    const items = board.versions.map(version => {
      if (board.architecture === 'nrf52') {
        return renderNRF52Item(board.hwModelSlug, version);
      }
      if (board.architecture === 'esp32') {
        return renderESP32Item(board.hwModelSlug, version);
      }
    }).join('');

    const extra = (board.architecture === 'nrf52') ? renderNRF52EraseItem() : '';

    accordion.insertAdjacentHTML('beforeend', renderAccordionItem(board, items + extra, idx === 0));
  });
}

// ── Template renderers ──
function renderNRF52Item(hwModelSlug, version) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${hwModelSlug}-${version}</span>
      <span>
        <a class="btn btn-sm btn-outline-secondary me-2"
           href="/firmware/${hwModelSlug}/${version}/${hwModelSlug}-${version}-ota.zip">Download OTA</a>
        <a class="btn btn-sm btn-outline-primary"
           href="/firmware/${hwModelSlug}/${version}/${hwModelSlug}-${version}.uf2">Download UF2</a>
      </span>
    </li>`;
}

function renderESP32Item(hwModelSlug, version) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${version}</span>
      <span>
        <button class="btn btn-sm btn-outline-primary open-modal-btn"
                data-board="${hwModelSlug}" data-version="${version}">Flash
        </button>
      </span>
    </li>`;
}

function renderNRF52EraseItem() {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>nrf_erase2.uf2</span>
      <a class="btn btn-sm btn-outline-danger"
         href="/firmware/nrf_erase2.uf2">Download UF2</a>
    </li>`;
}

function renderAccordionItem(board, bodyHtml, isOpen) {
  return `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button ${isOpen ? '' : 'collapsed'}" type="button"
                data-bs-toggle="collapse" data-bs-target="#body-${board.hwModelSlug}"
                aria-expanded="${isOpen}" aria-controls="body-${board.hwModelSlug}">
          <strong>${board.displayName}</strong>
        </button>
      </h2>
      <div id="body-${board.hwModelSlug}" class="accordion-collapse collapse ${isOpen ? 'show' : ''}">
        <div class="accordion-body">
          <ul class="list-group list-group-flush">
            ${bodyHtml}
          </ul>
        </div>
      </div>
    </div>`;
}


// ── Modal logic ──
document.addEventListener('click', ev => {
  if (!ev.target.matches('.open-modal-btn')) return;
  

  const modalEl = document.getElementById('flashModal');
  const flashModal = new bootstrap.Modal(modalEl);
  const titleEl = document.getElementById('flashModalLabel');
  const eraseChk = document.getElementById('eraseSwitch');
  const logBox = document.getElementById('espLog');

  let currentBoardSlug = ev.target.dataset.board;
  selectedVersion = ev.target.dataset.version;
  selectedBoard = boards.find(b => b.hwModelSlug === currentBoardSlug);

  titleEl.textContent = `Flash – ${selectedBoard.displayName} ${selectedVersion}`;
  eraseChk.checked = false;
  logBox.textContent = '';

  flashModal.show();
});

// ── Start Flash Button ──
const startBtn = document.getElementById('startFlashBtn');
startBtn.addEventListener('click', async () => {
  const fullEraseInstall = document.getElementById('eraseSwitch').checked;

  startBtn.disabled = true;
  await flashFirmware(selectedBoard, selectedVersion, fullEraseInstall);
  startBtn.disabled = false;
});
