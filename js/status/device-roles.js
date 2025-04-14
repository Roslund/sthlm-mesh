async function deviceRolesChart() {
    const canvas = document.getElementById('deviceRoles');
    const ctx = canvas.getContext('2d');

    // Loading message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    try {
        await fetchNodes();
        const predefinedLabels = ['CLIENT', 'CLIENT_MUTE', 'CLIENT_HIDDEN', 'ROUTER_LATE', 'ROUTER', 'ROUTER_CLIENT'];

        // Count role occurrences
        const roleCounts = {};
        nodes.forEach(node => {
          const role = node.role_name || "UNKNOWN";
          roleCounts[role] = (roleCounts[role] || 0) + 1;
        });
        
        // Add extra roles not in predefined list
        const extraLabels = Object.keys(roleCounts).filter(role => !predefinedLabels.includes(role)).sort();
        const labels = [...predefinedLabels, ...extraLabels];
        const counts = labels.map(label => roleCounts[label] || 0);


        // Dynamically size the container based on the number of elements
        const chartContainer = document.getElementById('deviceRolesContainer');
        chartContainer.style.height = `${labels.length *35}px`;

        const backgroundColors = labels.map(label => {
            if (label == "ROUTER_CLIENT") return 'rgb(196, 36, 18)';
            if (label == "ROUTER")        return 'rgb(242, 161, 67)';
            if (label == "ROUTER_LATE")   return 'rgb(229, 189, 82)';
                                          return 'rgb(41, 156, 70)';
        });

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Count',
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

deviceRolesChart();
