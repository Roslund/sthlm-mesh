async function portnumDistributionChart() {
    const canvas = document.getElementById('portnumDistribution');
    const ctx = canvas.getContext('2d');

    // Loading message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    try {
        const response = await fetch('https://map.sthlm-mesh.se/api/v1/stats/portnum-counts');
        const data = await response.json();

        const labels = data.map(entry => entry.label.replace(/_APP$/, ''));
        const counts = data.map(entry => entry.count);

        // Optional: dynamically size the container
        const chartContainer = document.getElementById('portnumDistributionContainer');
        chartContainer.style.height = `${labels.length * 35}px`;

        const backgroundColors = counts.map(count => {
            if (count < 500) return '#7EB26D';     // Green
            if (count < 2000) return '#EAB839';     // Yellow
                             return '#BF1B00';     // Red
        });

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Packages',
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
                    x: { beginAtZero: true },
                },
                plugins: {
                    legend: { display: false },
                }
            }
        });
    } catch (error) {
        console.error('Error loading portnum data:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    }
}

portnumDistributionChart();
