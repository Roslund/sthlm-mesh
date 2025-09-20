document.addEventListener('DOMContentLoaded', async () => {
  try {
    await fetchNodes();
  } catch (e) {
    console.error('Failed to load nodes', e);
    return;
  }

  const elements = {
    longName: document.getElementById('node-long-name'),
    nodeId: document.getElementById('node-id'),
    nodeIdHex: document.getElementById('node-id-hex'),
    shortName: document.getElementById('node-short-name'),
    role: document.getElementById('node-role'),
    hardware: document.getElementById('node-hardware'),
    firmware: document.getElementById('node-fw'),
    maxHops: document.getElementById('node-max-hops'),
    backbone: document.getElementById('node-backbone'),
    okMqtt: document.getElementById('node-ok-mqtt'),
    battery: document.getElementById('node-battery'),
    voltage: document.getElementById('node-voltage'),
    cu: document.getElementById('node-cu'),
    air: document.getElementById('node-air'),
    uptime: document.getElementById('node-uptime'),
    temp: document.getElementById('node-temp'),
    humidity: document.getElementById('node-humidity'),
    pressure: document.getElementById('node-pressure'),
    iaq: document.getElementById('node-iaq'),
    deviceMetricsUpdated: document.getElementById('node-device-metrics-updated'),
    environmentMetricsUpdated: document.getElementById('node-environment-metrics-updated'),
    position: document.getElementById('node-position'),
    altitude: document.getElementById('node-altitude'),
    precision: document.getElementById('node-precision'),
    updated: document.getElementById('node-updated'),
    neighbours: document.getElementById('node-neighbours'),
    neighboursUpdated: document.getElementById('neighbours-updated'),
    nodeSearch: document.getElementById('nodeSearch'),
    suggestions: document.getElementById('suggestions'),
    clearBtn: document.getElementById('clearFilterBtn'),
    searchContainer: document.getElementById('searchContainer'),
    nodeContent: document.getElementById('nodeContent'),
  };

  function setText(el, value) {
    if (!el) return;
    el.textContent = value ?? '–';
  }

  function formatBool(b) {
    if (b === null || b === undefined) return '–';
    return b ? 'Ja' : 'Nej';
  }

  function formatNumber(num, fractionDigits = 2) {
    if (num === null || num === undefined || isNaN(num)) return '–';
    return Number(num).toFixed(fractionDigits);
  }

  function formatUptime(seconds) {
    const s = Number(seconds);
    if (!isFinite(s) || s <= 0) return '–';
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  }

  function formatDate(iso) {
    if (!iso) return '–';
    try {
      return new Date(iso).toLocaleString('sv-SE', { hour12: false });
    } catch {
      return '–';
    }
  }

  function degreesFromInt(value) {
    if (value === null || value === undefined) return null;
    return Number(value) / 1e7;
  }

  function renderNeighbours(node) {
    if (!elements.neighbours) return;
    const neighbours = Array.isArray(node?.neighbours) ? node.neighbours : [];
    if (neighbours.length === 0) {
      elements.neighbours.innerHTML = '<span class="text-muted">–</span>';
      setText(elements.neighboursUpdated, formatDate(node?.neighbours_updated_at));
      return;
    }

    const items = neighbours
      .slice()
      .sort((a, b) => (b.snr ?? -999) - (a.snr ?? -999))
      .map(n => {
        const neighbourNode = nodes.find(x => String(x.node_id) === String(n.node_id));
        const label = neighbourNode?.long_name || `#${n.node_id}`;
        const snr = n.snr === null || n.snr === undefined ? '–' : n.snr;
        return `<span class="badge rounded-pill text-bg-secondary me-1 mb-1" data-node-id="${n.node_id}">${label} <span class="ms-1">(${snr} dB)</span></span>`;
      })
      .join(' ');

    elements.neighbours.innerHTML = items;
    setText(elements.neighboursUpdated, formatDate(node?.neighbours_updated_at));
  }

  function renderNodeDetails(node) {
    setText(elements.longName, node?.long_name);
    setText(elements.nodeId, node?.node_id);
    setText(elements.nodeIdHex, node?.node_id_hex ?? '–');
    setText(elements.shortName, node?.short_name);
    setText(elements.role, node?.role_name ?? node?.role);
    setText(elements.hardware, node?.hardware_model_name ?? node?.hardware_model);
    setText(elements.firmware, node?.firmware_version);
    setText(elements.maxHops, node?.max_hops);
    setText(elements.backbone, formatBool(node?.is_backbone));
    setText(elements.okMqtt, formatBool(node?.ok_to_mqtt));
    setText(elements.battery, node?.battery_level != null ? `${Math.round(Number(node.battery_level))}%` : '–');
    setText(elements.voltage, node?.voltage != null ? `${formatNumber(node.voltage, 3)} V` : '–');
    setText(elements.cu, node?.channel_utilization != null ? `${formatNumber(node.channel_utilization, 2)}%` : '–');
    setText(elements.air, node?.air_util_tx != null ? `${formatNumber(node.air_util_tx, 2)}%` : '–');
    setText(elements.uptime, formatUptime(node?.uptime_seconds));
    setText(elements.temp, node?.temperature != null ? `${formatNumber(node.temperature, 1)} °C` : '–');
    setText(elements.humidity, node?.relative_humidity != null ? `${formatNumber(node.relative_humidity, 1)} %` : '–');
    setText(elements.pressure, node?.barometric_pressure != null ? `${formatNumber(node.barometric_pressure, 1)} hPa` : '–');
    setText(elements.iaq, node?.iaq != null ? `${formatNumber(node.iaq, 0)}` : '–');
    setText(elements.deviceMetricsUpdated, formatDate(node?.device_metrics_updated_at));
    setText(elements.environmentMetricsUpdated, formatDate(node?.environment_metrics_updated_at));

    const lat = degreesFromInt(node?.latitude);
    const lon = degreesFromInt(node?.longitude);
    const alt = node?.altitude;
    const positionText = lat != null && lon != null
      ? `${lat.toFixed(5)}, ${lon.toFixed(5)}`
      : '–';
    setText(elements.position, positionText);
    setText(elements.altitude, alt != null ? `${alt} m` : '–');

    // Map position_precision using helper ranges from status page
    function precisionToMeters(precision) {
      switch(Number(precision)){
        case 2: return 5976446; case 3: return 2988223; case 4: return 1494111; case 5: return 747055; case 6: return 373527; case 7: return 186763; case 8: return 93381; case 9: return 46690; case 10: return 23345; case 11: return 11672; case 12: return 5836; case 13: return 2918; case 14: return 1459; case 15: return 729; case 16: return 364; case 17: return 182; case 18: return 91; case 19: return 45; case 20: return 22; case 21: return 11; case 22: return 5; case 23: return 2; case 24: return 1; case 32: return 0; default: return null;
      }
    }
    const ppm = precisionToMeters(node?.position_precision);
    const precisionText = ppm == null ? '–' : (ppm > 1000 ? `±${Math.ceil(ppm/1000)}km` : `±${ppm}m`);
    setText(elements.precision, precisionText);

    setText(elements.updated, formatDate(node?.updated_at));

    renderNeighbours(node);
  }

  function updateQueryParam(nodeIdOrNull) {
    const url = new URL(window.location.href);
    if (nodeIdOrNull) {
      url.searchParams.set('node_id', String(nodeIdOrNull));
    } else {
      url.searchParams.delete('node_id');
    }
    window.history.replaceState({}, '', url);
  }

  async function applyNodeSelection(nodeId) {
    const node = nodes.find(n => String(n.node_id) === String(nodeId));
    renderNodeDetails(node || null);
    updateQueryParam(node ? node.node_id : null);
    if (elements.nodeSearch && node?.long_name) {
      elements.nodeSearch.value = node.long_name;
    }
    // Update the chart
    try { portnumDistributionChart(node ? node.node_id : null); } catch (e) { console.warn('Chart not ready', e); }
    // Show search always; hide the rest of the content if no node
    if (elements.nodeContent) {
      elements.nodeContent.style.display = node ? '' : 'none';
    }
    // Load metric charts when a node is selected
    if (node) {
      try {
        const [deviceData, envData] = await Promise.all([
          fetchDeviceMetricsData(node.node_id),
          fetchEnvironmentMetricsData(node.node_id),
        ]);
        await renderDeviceMetricsChart(node.node_id, deviceData);
        await renderEnvironmentMetricsChart(node.node_id, envData);
      } catch (e) { console.warn('Metric charts failed', e); }
    } else {
      destroyChartById('deviceMetricsChart');
      destroyChartById('environmentMetricsChart');
    }
  }

  // Intercept suggestion clicks (capture) to also update node details and URL
  if (elements.suggestions) {
    elements.suggestions.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList && target.classList.contains('dropdown-item')) {
        e.preventDefault();
        e.stopPropagation();
        const text = target.textContent;
        const node = nodes.find(n => n.long_name === text);
        if (node) {
          if (elements.nodeSearch) elements.nodeSearch.value = node.long_name;
          elements.suggestions.style.display = 'none';
          applyNodeSelection(node.node_id);
        }
      }
    }, true);
  }

  // Clear button should also clear node details and URL param
  if (elements.clearBtn) {
    elements.clearBtn.addEventListener('click', () => {
      renderNodeDetails(null);
      updateQueryParam(null);
      if (elements.nodeContent) elements.nodeContent.style.display = 'none';
      if (elements.suggestions) elements.suggestions.style.display = 'none';
      try { portnumDistributionChart(null); } catch (e) { /* noop */ }
      destroyChartById('deviceMetricsChart');
      destroyChartById('environmentMetricsChart');
    });
  }

  // Neighbour badge click selects that neighbour
  if (elements.neighbours) {
    elements.neighbours.addEventListener('click', (e) => {
      const target = e.target.closest('[data-node-id]');
      if (!target) return;
      const nid = target.getAttribute('data-node-id');
      applyNodeSelection(nid);
    });
  }

  // Initial load: check URL
  const params = new URLSearchParams(window.location.search);
  const nodeIdParam = params.get('node_id');
  if (nodeIdParam) {
    applyNodeSelection(nodeIdParam);
  } else {
    renderNodeDetails(null);
    if (elements.nodeContent) elements.nodeContent.style.display = 'none';
    destroyChartById('deviceMetricsChart');
    destroyChartById('environmentMetricsChart');
  }
});

function destroyChartById(canvasId) {
  try {
    const existing = window.Chart?.getChart(canvasId);
    if (existing) existing.destroy();
  } catch (_) {}
}

function firstArrayIn(obj, keys = []) {
  if (Array.isArray(obj)) return obj;
  if (obj && typeof obj === 'object') {
    for (const key of keys) {
      const candidate = obj[key];
      if (Array.isArray(candidate)) return candidate;
    }
  }
  return [];
}

async function fetchDeviceMetricsData(nodeId) {
  const url = `https://map.sthlm-mesh.se/api/v1/nodes/${nodeId}/device-metrics`;
  let arr = [];
  try {
    const res = await fetch(url);
    const data = await res.json();
    arr = firstArrayIn(data, ['device_metrics']);
  } catch (e) {
    console.warn('Failed to fetch device metrics', e);
  }
  return arr.slice().reverse();
}

async function renderDeviceMetricsChart(nodeId, arr) {
  const canvas = document.getElementById('deviceMetricsChart');
  if (!canvas) return;
  destroyChartById('deviceMetricsChart');
  const ctx = canvas.getContext('2d');
  ctx.font = '16px Arial';
  ctx.fillStyle = 'gray';
  ctx.textAlign = 'center';
  ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

  if (!arr || arr.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'gray';
    ctx.fillText('No data', canvas.width / 2, canvas.height / 2);
    return;
  }

  const labels = arr.map(d => d.created_at);
  const battery = arr.map(d => d.battery_level);
  const cu = arr.map(d => d.channel_utilization);
  const air = arr.map(d => d.air_util_tx);

  new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Battery Level', borderColor: '#3b82f6', backgroundColor: '#3b82f6', pointStyle: false, fill: false, data: battery },
        { label: 'Channel Util', borderColor: '#22c55e', backgroundColor: '#22c55e', showLine: false, fill: false, data: cu },
        { label: 'Air Util TX', borderColor: '#f97316', backgroundColor: '#f97316', showLine: false, fill: false, data: air },
      ],
    },
    options: {
      responsive: true,
      borderWidth: 2,
      elements: { point: { radius: 2 } },
      scales: {
        x: { position: 'top', type: 'time', time: { unit: 'day', displayFormats: { day: 'MMM dd' } } },
        y: { min: 0, max: 101, ticks: { callback: (v) => `${v}%` } },
      },
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false, callbacks: { label: (item) => `${item.dataset.label}: ${item.formattedValue}%` } },
      },
    },
  });
}

async function fetchEnvironmentMetricsData(nodeId) {
  const url = `https://map.sthlm-mesh.se/api/v1/nodes/${nodeId}/environment-metrics`;
  let arr = [];
  try {
    const res = await fetch(url);
    const data = await res.json();
    arr = firstArrayIn(data, ['environment_metrics']);
  } catch (e) {
    console.warn('Failed to fetch environment metrics', e);
  }
  return arr.slice().reverse();
}

async function renderEnvironmentMetricsChart(nodeId, arr) {
  const canvas = document.getElementById('environmentMetricsChart');
  if (!canvas) return;
  destroyChartById('environmentMetricsChart');
  const ctx = canvas.getContext('2d');
  ctx.font = '16px Arial';
  ctx.fillStyle = 'gray';
  ctx.textAlign = 'center';
  ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

  if (!arr || arr.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'gray';
    ctx.fillText('No data', canvas.width / 2, canvas.height / 2);
    return;
  }

  const labels = arr.map(d => d.created_at);
  const temperature = arr.map(d => d.temperature);
  const humidity = arr.map(d => d.relative_humidity);
  const pressure = arr.map(d => d.barometric_pressure);
  const iaq = arr.map(d => d.iaq);

  new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Temperature', suffix: '°C', borderColor: '#3b82f6', backgroundColor: '#3b82f6', pointStyle: false, fill: false, data: temperature, yAxisID: 'y' },
        { label: 'Humidity', suffix: '%', borderColor: '#22c55e', backgroundColor: '#22c55e', pointStyle: false, fill: false, data: humidity, yAxisID: 'y' },
        { label: 'Pressure', suffix: 'hPa', borderColor: '#f97316', backgroundColor: '#f97316', pointStyle: false, fill: false, data: pressure, yAxisID: 'y1' },
        { label: 'IAQ', suffix: 'IAQ', borderColor: '#f472b6', backgroundColor: '#f472b6', pointStyle: false, fill: false, data: iaq, yAxisID: 'yIAQ' },
      ],
    },
    options: {
      responsive: true,
      borderWidth: 2,
      spanGaps: 1000 * 60 * 60 * 24,
      elements: { point: { radius: 2 } },
      scales: {
        x: { position: 'top', type: 'time', time: { unit: 'day', displayFormats: { day: 'MMM dd' } } },
        y: { min: -20, max: 100 },
        y1: { min: 800, max: 1100, ticks: { stepSize: 10, callback: (v) => `${v} hPa` }, position: 'right', grid: { drawOnChartArea: false } },
        yIAQ: { type: 'linear', display: false },
      },
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false, callbacks: { label: (item) => `${item.dataset.label}: ${item.formattedValue}${item.dataset.suffix}` } },
      },
    },
  });
}
