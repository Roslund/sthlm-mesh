document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mostActiveNodes');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let chartInstance = null;

    function getSelectedChannelId() {
        return (typeof StatusFilter !== 'undefined' && StatusFilter.getChannelId) ? StatusFilter.getChannelId() : null;
    }

    async function renderMostActiveNodes() {
        // Show "Loading..." message
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px Arial';
        ctx.fillStyle = 'gray';
        ctx.textAlign = 'center';
        ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

        try {
            // Build URL with optional channel_id
            const baseUrl = 'https://map.sthlm-mesh.se/api/v1/stats/most-active-nodes';
            const channelId = getSelectedChannelId();
            const url = channelId ? `${baseUrl}?channel_id=${encodeURIComponent(channelId)}` : baseUrl;

            const response = await fetch(url);
            const data = await response.json();

            const labels = data.map(entry => entry.long_name);
            const counts = data.map(entry => entry.count);

            // Adjust chart height based on number of items
            const chartContainer = document.getElementById('mostActiveNodesContainer');
            if (chartContainer) {
                chartContainer.style.height = `${labels.length * 22 + 50}px`;
            }

            const backgroundColors = counts.map(count => {
                if (count < 100) return '#7EB26D'; // Green
                if (count < 200) return '#EAB839'; // Yellow
                return '#BF1B00'; // Red
            });

            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }

            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Packages originated',
                        data: counts,
                        backgroundColor: backgroundColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        y: {
                            ticks: { autoSkip: false, font: { size: 12 } }
                        },
                        x: { max: 200 },
                    },
                    plugins: {
                        legend: { display: false },
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'red';
            ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
        }
    }

    // Listen via shared StatusFilter
    if (typeof StatusFilter !== 'undefined' && StatusFilter.subscribe) {
        StatusFilter.subscribe(() => renderMostActiveNodes());
    }

    // Initial render
    renderMostActiveNodes();
});
