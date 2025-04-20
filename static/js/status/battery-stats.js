async function batteryStatsGraph() {
    const canvas = document.getElementById('batteryChart');
    const ctx = canvas.getContext('2d');

    // Show "Loading..." message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading battery data...', canvas.width / 2, canvas.height / 2);

    try {
        const response = await fetch('https://map.sthlm-mesh.se/api/v1/stats/battery-stats?days=7');
        const data = await response.json();

        const labels = data.map(entry => entry.recorded_at);
        const values = data.map(entry => parseFloat(entry.avg_battery_level));

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Battery Level',
                    data: values,
                    borderColor: 'rgba(1, 163, 23, 1.0)',
                    backgroundColor: 'rgba(1, 163, 23, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 2.5,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'MMM d, HH:mm',
                            displayFormats: {
                                day: 'yyyy-MM-dd'
                            }
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Battery Level (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading battery stats:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    }
}

batteryStatsGraph();
