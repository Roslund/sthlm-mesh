async function showFirmwareUI() {
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

showFirmwareUI();
