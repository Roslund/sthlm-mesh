async function hardwareStatsGraph() {
    const canvas = document.getElementById('hardwareChart');
    const ctx = canvas.getContext('2d');

    // Show "Loading..." message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    // Manufacturer colors (fixed palette)
    const MANUFACTURER_COLORS = {
        Lilygo: '#3B82F6',      // blue-500
        Heltec: '#10B981',      // emerald-500
        RakWireless: '#A855F7', // purple-500
        Seeedstudio: '#EAB308', // yellow-500
        Other: '#9CA3AF'        // gray-400
    };

    // Single source of truth: models listed under each manufacturer
    const HARDWARE_MODELS = {
        Heltec: [
            'HELTEC_V3',
            'HELTEC_V4',
            'HELTEC_V2_1',
            'HELTEC_V2_0',
            'HELTEC_WSL_V3',
            'HELTEC_MESH_NODE_T114',
            'HELTEC_MESH_POCKET',
            'HELTEC_WIRELESS_PAPER',
            'HELTEC_WIRELESS_TRACKER'
        ],
        RakWireless: [
            'RAK4631',
            'RAK2560',
            'WISMESH_TAG'
        ],
        Lilygo: [
            'LILYGO_TBEAM_S3_CORE',
            'TBEAM',
            'TLORA_T3_S3',
            'T_DECK',
            'T_ECHO',
            'T_WATCH_S3'
        ],
        Seeedstudio: [
            'SEEED_XIAO_S3',
            'TRACKER_T1000_E',
            'XIAO_NRF52_KIT',
            'SENSECAP_INDICATOR',
            'SEEED_WIO_TRACKER_L1',
        ]
    };

    // Simple lookup without a prebuilt map
    function getManufacturerForModel(modelName) {
        const key = modelName.toUpperCase();
        for (const [manufacturer, models] of Object.entries(HARDWARE_MODELS)) {
            if (models.some(m => m.toUpperCase() === key)) return manufacturer;
        }
        return 'Other';
    }


    try {
        const response = await fetch('https://map.sthlm-mesh.se/api/v1/stats/hardware-models');
        const data = await response.json();

        const labels = data.hardware_model_stats.map(item => item.hardware_model_name);
        const counts = data.hardware_model_stats.map(item => item.count);

        // Manufacturers present and interactive filter state
        const presentManufacturers = Array.from(new Set(labels.map(getManufacturerForModel)));
        const enabledManufacturers = new Set(presentManufacturers);

        // Color bars per model based on manufacturer
        const backgroundColors = labels.map(model => {
            const manu = getManufacturerForModel(model);
            return MANUFACTURER_COLORS[manu] || MANUFACTURER_COLORS.Other;
        });

        // Adjust chart height based on number of items
        const chartContainer = document.getElementById('hardwareChartContainer');
        chartContainer.style.height = `${labels.length * 25 + 50}px`;


        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hardware Models',
                    data: counts,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                barPercentage: 0.8,
                indexAxis: 'y',
                y: { ticks: { autoSkip: false, font: { size: 12 } } },
                plugins: {
                    legend: {
                        display: true,
                        onClick: (_evt, legendItem) => {
                            const manu = legendItem.text;
                            if (enabledManufacturers.has(manu)) {
                                enabledManufacturers.delete(manu);
                            } else {
                                enabledManufacturers.add(manu);
                            }
                            // Rebuild labels, data and colors to remove hidden manufacturers entirely
                            const mask = labels.map((model) => enabledManufacturers.has(getManufacturerForModel(model)));
                            const newLabels = labels.filter((_, i) => mask[i]);
                            const newData = counts.filter((_, i) => mask[i]);
                            const newColors = newLabels.map(model => {
                                const m = getManufacturerForModel(model);
                                return MANUFACTURER_COLORS[m] || MANUFACTURER_COLORS.Other;
                            });
                            // Adjust chart height to the filtered number of items
                            chartContainer.style.height = `${newLabels.length * 25 + 70}px`;
                            chart.data.labels = newLabels;
                            chart.data.datasets[0].data = newData;
                            chart.data.datasets[0].backgroundColor = newColors;
                            chart.update();
                        },
                        labels: {
                            generateLabels: (chart) => {
                                // Use the full set of manufacturers present in the original data
                                const present = presentManufacturers;
                                const preferredOrder = ['Heltec', 'RakWireless', 'Lilygo', 'Seeedstudio', 'Other'];
                                const ordered = preferredOrder.filter(m => present.includes(m)).concat(
                                    present.filter(m => !preferredOrder.includes(m))
                                );
                                return ordered.map((m) => ({
                                    text: m,
                                    fillStyle: MANUFACTURER_COLORS[m] || MANUFACTURER_COLORS.Other,
                                    strokeStyle: MANUFACTURER_COLORS[m] || MANUFACTURER_COLORS.Other,
                                    lineWidth: 0,
                                    hidden: !enabledManufacturers.has(m),
                                    // Needed by Chart.js internals; keep pointing to first dataset
                                    datasetIndex: 0
                                }));
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    }

}
hardwareStatsGraph();