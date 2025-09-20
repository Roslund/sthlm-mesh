async function channelUtilizationGauges() {
    try {
        await fetchNodes();

        // Create gauges for both channels
        await createChannelUtilizationGauge('LongFast', 'longfastGauge');
        await createChannelUtilizationGauge('MediumFast', 'mediumfastGauge');

    } catch (err) {
        console.error('Error creating channel utilization gauges:', err);
        
        // Show error on both canvases
        showGaugeError('longfastGauge');
        showGaugeError('mediumfastGauge');
    }
}

async function createChannelUtilizationGauge(channelName, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn(`Canvas ${canvasId} not found`);
        return;
    }
    
    const ctx = canvas.getContext('2d');

    // Show loading
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading...', canvas.width/2, canvas.height/2);

    // Filter nodes by channel_id, recent updates (last 24 hours), and valid channel utilization
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const channelNodes = nodes.filter(node => 
        node.channel_id === channelName && 
        node.channel_utilization != null && 
        node.channel_utilization !== '' &&
        node.updated_at && 
        new Date(node.updated_at) >= twentyFourHoursAgo
    );

    if (channelNodes.length === 0) {
        showNoDataMessage(ctx, canvas, `No ${channelName} data`);
        return;
    }

    // Get top 10 nodes with highest channel utilization for this channel
    const top10Nodes = channelNodes
        .map(node => ({
            ...node,
            utilizationValue: parseFloat(node.channel_utilization)
        }))
        .sort((a, b) => b.utilizationValue - a.utilizationValue)
        .slice(0, 10);

    // Calculate average channel utilization for top 10 nodes only
    const avgUtilization = top10Nodes.length > 0 
        ? top10Nodes.reduce((sum, node) => sum + node.utilizationValue, 0) / top10Nodes.length
        : 0;

    // Create gauge chart using doughnut chart (0-30% scale)
    const maxScale = 30;
    const displayValue = Math.min(avgUtilization, maxScale); // Cap at 30%
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [displayValue, maxScale - displayValue],
                backgroundColor: [
                    getUtilizationColor(avgUtilization),
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
            },
            onComplete: function() {
                // Add center text showing the percentage
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2 + 20; // Adjust for half circle
                
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#333';
                ctx.textAlign = 'center';
                ctx.fillText(`${avgUtilization.toFixed(1)}%`, centerX, centerY);
                
                ctx.font = '12px Arial';
                ctx.fillStyle = '#666';
                ctx.fillText(`Top ${top10Nodes.length} noder (24h)`, centerX, centerY + 25);
                ctx.restore();
            }
        },
        plugins: [{
            afterDraw: function(chart) {
                // Add center text showing the percentage
                const centerX = chart.width / 2;
                const centerY = chart.height / 2 + 20; // Adjust for half circle
                
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#333';
                ctx.textAlign = 'center';
                ctx.fillText(`${avgUtilization.toFixed(1)}%`, centerX, centerY);
                
                ctx.font = '12px Arial';
                ctx.fillStyle = '#666';
                ctx.fillText(`Top ${top10Nodes.length} noder (24h)`, centerX, centerY + 25);
                ctx.restore();
            }
        }]
    });

    // Show top 10 nodes legend after chart is created
    showTop10NodesLegend(channelName, top10Nodes);
}

function getUtilizationColor(utilization) {
    if (utilization >= 25) {
        return 'rgba(255, 0, 0, 0.8)';
    } else if (utilization >= 20) {
        return 'rgba(255, 69, 0, 0.8)';
    } else if (utilization >= 15) {
        return 'rgba(255, 140, 0, 0.8)';
    } else if (utilization >= 10) {
        return 'rgba(234, 184, 57, 0.8)';
    } else {
        return 'rgba(1, 163, 23, 0.8)';
    }
}

function showNoDataMessage(ctx, canvas, message) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText(message, canvas.width/2, canvas.height/2);
}

function showTop10NodesLegend(channelName, top10Nodes) {
    const legendId = channelName.toLowerCase() + 'Legend';
    const legendContainer = document.getElementById(legendId);
    
    if (!legendContainer || top10Nodes.length === 0) return;

    let legendHTML = '<h6 class="text-muted mb-2">Top 10 Nodes:</h6>';
    legendHTML += '<div class="row">';
    
    top10Nodes.forEach((node, index) => {
        const utilizationColor = getUtilizationColor(node.utilizationValue);
        const shortName = node.short_name || node.node_id_hex || `Node ${node.node_id}`;
        
        legendHTML += `
            <div class="col-6 mb-1 d-flex align-items-center">
                <span class="badge me-2" style="background-color: ${utilizationColor}; color: white; font-size: 0.7rem; min-width: 35px;">
                    ${node.utilizationValue.toFixed(1)}%
                </span>
                <span class="text-truncate" style="font-size: 0.75rem;" title="${node.long_name || shortName}">
                    ${shortName}
                </span>
            </div>
        `;
    });
    
    legendHTML += '</div>';
    legendContainer.innerHTML = legendHTML;
}

function showGaugeError(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('Error loading data', canvas.width/2, canvas.height/2);
}

// Initialize the gauges when the page loads
channelUtilizationGauges();
