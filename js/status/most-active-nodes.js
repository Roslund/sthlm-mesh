async function mostActiveNodesGraph() {
    const canvas = document.getElementById('mostActiveNodes');
    const ctx = canvas.getContext('2d');

    // Show "Loading..." message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    try {
        const response = await fetch('https://map.sthlm-mesh.se/api/v1/stats/most-active-nodes');
        const data = await response.json();

        const labels = data.map(entry => entry.long_name);
        const counts = data.map(entry => entry.count);

        // Adjust chart height based on number of items
        const chartContainer = document.getElementById('mostActiveNodesContainer');
        chartContainer.style.height = `${labels.length * 22 + 50}px`;

        const backgroundColors = counts.map(count => {
            if (count < 100) return '#7EB26D';     // Green
            if (count < 200) return '#EAB839';     // Yellow
                             return '#BF1B00';     // Red
        });


        new Chart(ctx, {
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
                indexAxis: 'y', // horizontal bars
                scales: {
                    y: {
                        ticks: { autoSkip: false, font: { size: 12 } }
                    },
                    x: { max: 300 },
                },
                plugins: {
                    legend: { display: false },
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

mostActiveNodesGraph();
