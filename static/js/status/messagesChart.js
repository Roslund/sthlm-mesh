const canvas = document.getElementById('messagesChart');
const ctx = canvas.getContext('2d');

// Show "Loading..." message
ctx.font = '16px Arial';
ctx.fillStyle = 'gray';
ctx.textAlign = 'center';
ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

fetch('https://map.sthlm-mesh.se/api/v1/messages-per-hour')
    .then(response => response.json())
    .then(data => {
        const labels = data.map(entry => entry.hour);
        const counts = data.map(entry => entry.count);

        // Clear the canvas before drawing the chart
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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
                                return labels[index].endsWith('00') ? labels[index].split('T')[0] : null;
                            },
                            autoSkip: false
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hides the dataset label
                    }
                },
            }
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);

        // Clear the canvas before showing an error message
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    });
