async function channelUtilizationHourlyAverage() {
  const canvas = document.getElementById('channelUtilizationChart');
  const ctx = canvas.getContext('2d');

  // show loading
  ctx.font = '16px Arial';
  ctx.fillStyle = 'gray';
  ctx.textAlign = 'center';
  ctx.fillText('Loading...', canvas.width/2, canvas.height/2);

  try {
    // Fetch data for both channels over the last 7 days
    const [mediumFastResponse, longFastResponse] = await Promise.all([
      fetch('https://map.sthlm-mesh.se/api/v1/stats/channel-utilization-stats?days=7&channel_id=MediumFast'),
      fetch('https://map.sthlm-mesh.se/api/v1/stats/channel-utilization-stats?days=7&channel_id=LongFast')
    ]);

    const mediumFastData = await mediumFastResponse.json();
    const longFastData = await longFastResponse.json();

    // Create datasets for both channels
    const datasets = [];
    
    const mediumFastPoints = mediumFastData.map(entry => ({
      x: entry.recorded_at,
      y: parseFloat(entry.avg_channel_utilization)
    }));
    
    datasets.push({
      label: 'MediumFast',
      data: mediumFastPoints,
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 0,
      fill: false,
    });

    const longFastPoints = longFastData.map(entry => ({
      x: entry.recorded_at,
      y: parseFloat(entry.avg_channel_utilization)
    }));
    
    datasets.push({
      label: 'LongFast',
      data: longFastPoints,
      borderColor: 'rgb(15, 169, 252)',
      backgroundColor: 'rgba(15, 169, 252, 0.1)',
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 0,
      fill: false,
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'yyyy-MM-dd HH:mm',
              displayFormats: { day: 'yyyy-MM-dd' }
            },
          },
          y: {
            min: 10,
            max: 24,
            title: { display: true, text: 'Avg. Channel Utilization (%)' }
          }
        },
        plugins: {
          legend: { 
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: { mode: 'index', intersect: false },
          annotation: {
            annotations: {
              bad: {
                type: 'box',
                yMin: 20,
                yMax: 24,
                backgroundColor: 'rgba(255, 0, 0, 0.2)'
              },
              medium: {
                type: 'box',
                yMin: 15,
                yMax: 20,
                backgroundColor: 'rgba(234, 184, 57, 0.2)', //'rgba(255, 165, 0, 0.1)'
              },
              good: {
                type: 'box',
                yMin: 0,
                yMax: 15,
                backgroundColor: 'rgba(1, 163, 23, 0.1)', //'rgba(0, 128, 0, 0.1)'
              }
            }
          }
        }
      }
    });

  } catch (err) {
    console.error('Error loading channel utilization:', err);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillText('Error loading data', canvas.width/2, canvas.height/2);
  }

}

channelUtilizationHourlyAverage();