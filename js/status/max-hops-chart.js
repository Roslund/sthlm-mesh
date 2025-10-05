function getHopsColor(maxHops) {
    switch(maxHops){
        case 0: return 'rgb(41, 156, 70)';
        case 1: return 'rgb(41, 156, 70)';
        case 2: return 'rgb(79, 170, 77)'; 
        case 3: return 'rgb(118, 182, 84)';
        case 4: return 'rgb(157, 195, 91)';
        case 5: return 'rgb(195, 208, 98)'; 
        case 6: return 'rgb(229, 189, 82)';
        case 7: return 'rgb(242, 161, 67)';
    }
    return 'rgb(200, 200, 200)';
}

let maxHopsChartInstance = null;

async function maxHopsGraph() {
  const canvas = document.getElementById('maxHopsChart');
  const ctx = canvas.getContext('2d');

  // Loading message
  ctx.font = '16px Arial';
  ctx.fillStyle = 'gray';
  ctx.textAlign = 'center';
  ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

  try {
    await fetchNodes();

    // Initialize buckets
    const countsByHops = {};
    for (let i = 0; i <= 7; i++) countsByHops[i] = 0;

    const channelId = (typeof StatusFilter !== 'undefined' && StatusFilter.getChannelId) ? StatusFilter.getChannelId() : null;
    const filteredNodes = Array.isArray(nodes) ? nodes.filter(n => {
      if (!channelId) return true;
      return n.channel_id === channelId;
    }) : [];

    const nodesWithMaxHops = filteredNodes.filter(n => n.max_hops !== null && n.max_hops !== undefined);

    for (const node of nodesWithMaxHops) {
      const val = Number(node.max_hops);
      countsByHops[val] += 1;
    }

    const labels = [0, 1, 2, 3, 4, 5, 6, 7];
    const counts = labels.map(n => countsByHops[n]);
    const backgroundColors = labels.map(n => getHopsColor(n));

    const chartContainer = document.getElementById('maxHopsContainer');
    if (chartContainer) chartContainer.style.height = `${labels.length * 35 + 50}px`;

    if (maxHopsChartInstance) {
      maxHopsChartInstance.destroy();
      maxHopsChartInstance = null;
    }

    maxHopsChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Antal',
          data: counts,
          backgroundColor: backgroundColors,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          y: { ticks: { autoSkip: false, font: { size: 12 } } },
          x: { beginAtZero: true },
        },
        plugins: { legend: { display: false } },
      },
    });
  } catch (error) {
    console.error('Error building max_hops chart:', error);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
  }
}

maxHopsGraph();


// Re-render on channel change
document.addEventListener('DOMContentLoaded', () => {
  if (typeof StatusFilter !== 'undefined' && StatusFilter.subscribe) {
    StatusFilter.subscribe(() => maxHopsGraph());
  }
});


