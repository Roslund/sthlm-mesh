async function messagesStatsGraph() {
    const canvas = document.getElementById('messagesChart');
    const ctx = canvas.getContext('2d');

    // Show "Loading..." message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    function formatMessageTimestamp(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleString('sv-SE', { hour12: false }).slice(0, 16);
    }

    try {
        const response = await fetch('https://map.sthlm-mesh.se/api/v1/stats/messages-per-hour')
        const data = await response.json();
        
        const labels = data.map(entry => formatMessageTimestamp(entry.hour));
        const counts = data.map(entry => entry.count);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Messages Per Hour',
                    data: counts,
                    backgroundColor: 'rgb(1, 163, 23)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 2.5,
                scales: {
                    x: {
                        ticks: {
                            callback: function(value, index) {
                                return labels[index].endsWith('00:00') ? labels[index].split(' ')[0] : null;
                            },
                            autoSkip: false
                        }
                    },
                    y: { 
                        beginAtZero: true,
                        max: 10,
                    }
                },
                plugins: { legend: { display: false } },
            }
        });
    } catch(error) {
        console.error('Error fetching data:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    }
}


messagesStatsGraph();