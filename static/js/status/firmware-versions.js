async function firmwareVersionGraph() {
    const canvas = document.getElementById('firmwareVersionChart');
    const ctx = canvas.getContext('2d');

    // Show "Loading..." message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    try {
        await fetchNodes();
        const channelId = (typeof StatusFilter !== 'undefined' && StatusFilter.getChannelId) ? StatusFilter.getChannelId() : null;
        // Filter out nodes without firmware_version and channel match
        const nodesWithVersion = nodes
            .filter(node => node.firmware_version != null)
            .filter(node => !channelId || node.channel_id === channelId);

        const countsByVersion = {};
        const validVersions = ['<2.5.0', '>2.5.0', '>2.6.8'];

        for (const node of nodesWithVersion) {
            const version = node.firmware_version;
            // Default to '>2.5.0' for other version. 
            // This is mainly the nodes that report their firmware version using MQTT map_report
            const bucket = validVersions.includes(version) ? version : '>2.5.0';
            countsByVersion[bucket] = (countsByVersion[bucket] || 0) + 1;
        }

        // Convert to array of { version, count }
        const statsArray = Object.entries(countsByVersion).map(([version, count]) => ({
            version,
            count
        }));

        // Sort by firmware version descending
        const sorted = statsArray.sort((a, b) => b.version.localeCompare(a.version));

        const labels = sorted.map(entry => entry.version);
        const counts = sorted.map(entry => entry.count);

        const chartContainer = document.getElementById('firmwareVersionContainer');
        chartContainer.style.height = `${labels.length * 35 + 50}px`;

        if (window.firmwareVersionChartInstance) {
            window.firmwareVersionChartInstance.destroy();
            window.firmwareVersionChartInstance = null;
        }

        window.firmwareVersionChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Firmware Version',
                    data: counts,
                    backgroundColor: ['#7EB26D', '#7EB26D', '#BF1B00']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                barPercentage: 0.8,
                indexAxis: 'y',
                y: { ticks: { autoSkip: false, font: { size: 12 } } },
                plugins: { legend: { display: false } }
            }
        });
    } catch (error) {
        console.error('Error fetching firmware version data:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    }
}

firmwareVersionGraph();

// Re-render on channel change
document.addEventListener('DOMContentLoaded', () => {
    if (typeof StatusFilter !== 'undefined' && StatusFilter.subscribe) {
        StatusFilter.subscribe(() => firmwareVersionGraph());
    }
});
