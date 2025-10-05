async function isUnmessagableGraph() {
    const canvas = document.getElementById('isUnmessagableChart');
    const ctx = canvas.getContext('2d');

    // Show "Loading..." message
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    try {
        await fetchNodes();
        const channelId = (typeof StatusFilter !== 'undefined' && StatusFilter.getChannelId) ? StatusFilter.getChannelId() : null;
        // Filter nodes to only include those updated within the last 30 days and channel match
        const recentNodes = nodes
            .filter(node => new Date(node.updated_at) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
            .filter(node => !channelId || node.channel_id === channelId);

        let countTrue = 0;
        let countFalse = 0;
        let countNull = 0;


        for (const node of recentNodes) {
            const val = node.is_unmessagable;
            if (val === true) countTrue++;
            else if (val === false) countFalse++;
            else countNull++;
        }

        const container = canvas.parentElement;
        if (container) container.style.height = `${2 * 35 + 50}px`;


        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (window.isUnmessagableChartInstance) {
            window.isUnmessagableChartInstance.destroy();
            window.isUnmessagableChartInstance = null;
        }

        window.isUnmessagableChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['unmessagable', 'messagable'],
                datasets: [
                    {
                        label: 'true',
                        data: [countTrue, 0,],
                        backgroundColor: '#0d6efd', // blue
                    },
                                        {
                        label: 'false',
                        data: [0, countFalse],
                        backgroundColor: '#7EB26D', // green
                    },
                    {
                        label: 'unset',
                        data: [0, countNull],
                        backgroundColor: '#808080', // grey
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error building is_unmessagable chart:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    }
}

isUnmessagableGraph();

// Re-render on channel change
document.addEventListener('DOMContentLoaded', () => {
    if (typeof StatusFilter !== 'undefined' && StatusFilter.subscribe) {
        StatusFilter.subscribe(() => isUnmessagableGraph());
    }
});