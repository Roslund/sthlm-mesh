async function transitionStatusGauge() {
    try {
        await fetchNodes();
        createTransitionGauge();
    } catch (err) {
        console.error('Error creating transition status gauge:', err);
        showTransitionGaugeError();
    }
}

async function createTransitionGauge() {
    const canvas = document.getElementById('transitionGauge');
    if (!canvas) {
        console.warn('Canvas transitionGauge not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');

    // Show loading
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading...', canvas.width/2, canvas.height/2);

    // Filter nodes heard today (last 24 hours)
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const nodesHeardToday = nodes.filter(node => 
        node.updated_at && 
        new Date(node.updated_at) >= twentyFourHoursAgo
    );

    if (nodesHeardToday.length === 0) {
        showNoDataMessage(ctx, canvas, 'No nodes heard today');
        return;
    }

    // Count nodes with MediumFast channel_id
    const mediumFastNodes = nodesHeardToday.filter(node => 
        node.channel_id === 'MediumFast'
    );

    const totalNodes = nodesHeardToday.length;
    const mediumFastCount = mediumFastNodes.length;
    const transitionPercentage = totalNodes > 0 ? (mediumFastCount / totalNodes) * 100 : 0;

    // Create gauge chart using doughnut chart
    const data = [mediumFastCount, totalNodes - mediumFastCount];
    const maxValue = totalNodes;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: [
                    getTransitionColor(transitionPercentage),
                    'rgba(220, 220, 220, 0.3)'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            rotation: -90, // Start from top
            circumference: 180, // Half circle
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        },
        plugins: [{
            afterDraw: function(chart) {
                // Add center text showing the counts and percentage
                const centerX = chart.width / 2;
                const centerY = chart.height / 2 + 20; // Adjust for half circle
                
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#333';
                ctx.textAlign = 'center';
                ctx.fillText(`${mediumFastCount}/${totalNodes}`, centerX, centerY);
                
                ctx.font = 'bold 18px Arial';
                ctx.fillStyle = getTransitionColor(transitionPercentage);
                ctx.fillText(`${transitionPercentage.toFixed(1)}%`, centerX, centerY + 25);
                
                ctx.font = '12px Arial';
                ctx.fillStyle = '#666';
                ctx.fillText('Använder MediumFast', centerX, centerY + 45);
                ctx.restore();
            }
        }]
    });

}

function getTransitionColor(percentage) {
    if (percentage >= 75) {
        return 'rgba(1, 163, 23, 0.8)'; // Green - excellent progress
    } else if (percentage >= 50) {
        return 'rgba(234, 184, 57, 0.8)'; // Yellow - good progress
    } else if (percentage >= 25) {
        return 'rgba(255, 140, 0, 0.8)'; // Orange - some progress
    } else {
        return 'rgba(255, 69, 0, 0.8)'; // Red - limited progress
    }
}


function showTransitionGaugeError() {
    const canvas = document.getElementById('transitionGauge');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('Error loading data', canvas.width/2, canvas.height/2);
}

function showNoDataMessage(ctx, canvas, message) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText(message, canvas.width/2, canvas.height/2);
}

// Initialize the transition gauge when the page loads
transitionStatusGauge();
