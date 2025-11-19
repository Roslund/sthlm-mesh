// Solar nodes battery line chart

(function () {
    const SOLAR_NODE_IDS = [
        //1186266851, // SOLoRa - Väsjö Router
        //3189606141, // SOLoRa - Smidö Router
        1927973746, // Bredden
        2619482157, // Upplands Väsby 2.0
        350146207,  // Hagatoppen
        617744786,  // Kalvsvik
        //286692481,  // Tornberget
        3324004241, // Skårdal 1
        3328975709, // MDG Gränö
    ];

    const DAYS = 30;
    const nodesById = {};

    function getNodeColour(nodeId) {
        return "#" + (nodeId & 0x00FFFFFF).toString(16).padStart(6, '0');
    }

    async function fetchNodeMeta(nodeId) {
        try {
            const res = await fetch(`https://map.sthlm-mesh.se/api/v1/nodes/${nodeId}`);
            if (!res.ok) throw new Error('node fetch failed');
            const data = await res.json();
            const node = data.node;
            if (node && node.node_id != null) {
                nodesById[node.node_id] = node;
            }
        } catch (e) {
            // leave empty; we'll fall back to hex id
        }
    }

    async function fetchDeviceMetrics(nodeId) {
        const base = `https://map.sthlm-mesh.se/api/v1/nodes/${nodeId}/device-metrics`;
        const timeFromMs = Date.now() - (DAYS * 24 * 60 * 60 * 1000);
        const res = await fetch(`${base}?time_from=${encodeURIComponent(timeFromMs)}`);
        if (!res.ok) throw new Error(`Failed to fetch metrics for ${nodeId}`);
        const data = await res.json();
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.device_metrics)) return data.device_metrics;
        if (Array.isArray(data.metrics)) return data.metrics;
        return [];
    }

    function renderChart(seriesByNodeId) {
        const canvas = document.getElementById('solarBatteryChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear and destroy existing
        if (window.solarBatteryChartInstance) {
            window.solarBatteryChartInstance.destroy();
            window.solarBatteryChartInstance = null;
        }

        const datasets = SOLAR_NODE_IDS.map(nodeId => ({
            label: nodesById[nodeId]?.short_name || ("!" + Number(nodeId).toString(16)),
            nodeId: nodeId,
            data: seriesByNodeId.get(nodeId) || [],
            borderColor: getNodeColour(nodeId),
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.2,
            pointRadius: 0,
            fill: false,
        }));

        window.solarBatteryChartInstance = new Chart(ctx, {
            type: 'line',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'yyyy-MM-dd HH:mm',
                            displayFormats: {
                                day: 'yyyy-MM-dd'
                            }
                        }
                    },
                    y: {
                        min: 0,
                        max: 101,
                        title: { display: true, text: 'Battery Level (%)' }
                    }
                },
                plugins: {
                    legend: { display: true, position: 'top' },
                    tooltip: {
                        mode: 'nearest',
                        intersect: false,
                        callbacks: {
                            label: function(ctx) {
                                const val = (ctx.parsed && typeof ctx.parsed.y === 'number') ? ctx.parsed.y : ctx.raw?.y;
                                const ds = ctx.dataset || {};
                                const nodeId = ds.nodeId;
                                const shortName = nodeId != null
                                    ? (nodesById[nodeId]?.short_name || ("!" + Number(nodeId).toString(16)))
                                    : (ds.label || '');
                                const longName = nodeId != null ? (nodesById[nodeId]?.long_name || '') : '';
                                const name = longName ? `[${shortName}] ${longName}` : shortName;
                                return (typeof val === 'number') ? `${name}: ${val}%` : (name || '');
                            }
                        }
                    }
                }
            }
        });
    }

    async function draw() {
        const canvas = document.getElementById('solarBatteryChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px Arial';
        ctx.fillStyle = 'gray';
        ctx.textAlign = 'center';
        ctx.fillText('Loading solar nodes battery data...', canvas.width / 2, canvas.height / 2);

        try {
            // Fetch node metadata (short_name, long_name) for legend and tooltip
            await Promise.all(SOLAR_NODE_IDS.map(id => fetchNodeMeta(id)));
            const seriesByNodeId = new Map();

            // Fetch in parallel
            const fetches = SOLAR_NODE_IDS.map(async (nodeId) => {
                try {
                    const metrics = await fetchDeviceMetrics(nodeId);
                    const points = [];
                    for (const m of metrics) {
                        const t = m.created_at;
                        const pct = Number(m.battery_level);
                        if (Number.isNaN(pct)) continue;
                        points.push({ x: t, y: pct });
                    }

                    seriesByNodeId.set(nodeId, points);
                } catch (e) {
                    // Put empty series on failure, do not block others
                    seriesByNodeId.set(nodeId, []);
                }
            });

            await Promise.all(fetches);

            renderChart(seriesByNodeId);
        } catch (error) {
            console.error('Error building solar battery chart:', error);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'red';
            ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        draw();
    });
})();


