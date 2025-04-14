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

        const countsByVersion = {};

        // Filter out nodes without firmware_version
        const nodesWithVersion = nodes.filter(node => node.firmware_version != null);

        // Count how many nodes have each firmware version
        for (const node of nodesWithVersion) {
            const version = node.firmware_version;
            if(version != '2.4.3 or older') {
                countsByVersion['2.5.0 or newer'] = (countsByVersion['2.5.0 or newer'] || 0) + 1;
            }
            else {
                countsByVersion[version] = (countsByVersion[version] || 0) + 1;
            }
        }

        // Convert to array of { version, count }
        const statsArray = Object.entries(countsByVersion).map(([version, count]) => ({
            version,
            count
        }));

        console.log(statsArray)

        // Sort by count ascending
        const sorted = statsArray.sort((a, b) => a.count - b.count);

        const labels = sorted.map(entry => entry.version);
        const counts = sorted.map(entry => entry.count);

        const chartContainer = document.getElementById('firmwareVersionContainer');
        chartContainer.style.height = `${labels.length * 35}px`;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Firmware Version',
                    data: counts,
                    backgroundColor: ['#7EB26D', '#BF1B00']
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
