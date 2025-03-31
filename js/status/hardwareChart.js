async function hardwareStatsGraph() {
    const canvas = document.getElementById('hardwareChart');
    const ctx = canvas.getContext('2d');

    // Show "Loading..." message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    // Function to generate a consistent color from a string
    function stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash % 360);
        return `hsl(${hue}, 70%, 60%)`;
    }


    try {
        const response = await fetch('https://map.sthlm-mesh.se/api/v1/stats/hardware-models');
        const data = await response.json();

        const labels = data.hardware_model_stats.map(item => item.hardware_model_name);
        const counts = data.hardware_model_stats.map(item => item.count);
        const colors = labels.map(name => stringToColor(name));

        // Adjust chart height based on number of items
        const chartContainer = document.getElementById('hardwareChartContainer');
        chartContainer.style.height = `${labels.length * 25}px`;


        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hardware Models',
                    data: counts,
                    backgroundColor: colors,
                    borderWidth: 1
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
        console.error('Error fetching data:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    }

}
hardwareStatsGraph();