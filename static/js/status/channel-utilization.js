let chUtilChart = null;

async function channelUtilizationHourlyAverage(days = 7) {
  const canvas = document.getElementById('channelUtilizationChart');
  const ctx = canvas.getContext('2d');

  // Destroy existing chart if any
  if (chUtilChart) {
    chUtilChart.destroy();
    chUtilChart = null;
  }

  // show loading
  ctx.font = '16px Arial';
  ctx.fillStyle = 'gray';
  ctx.textAlign = 'center';
  ctx.fillText('Loading...', canvas.width/2, canvas.height/2);

  try {
    const response = await fetch(`https://map.sthlm-mesh.se/api/v1/stats/channel-utilization-stats?days=${days}&channel_id=MediumFast`);
    const allData = await response.json();

    // Single dataset containing all points
    const datasets = [];  

    const points = allData.map(entry => ({
      x: entry.recorded_at,
      y: entry.avg_channel_utilization
    }));

    datasets.push({
      label: 'channelutilization',
      data: points,
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 0,
      fill: false,
    });

    chUtilChart = new Chart(ctx, {
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
            min: 8,
            max: 26,
            title: { display: true, text: 'Avg. Channel Utilization (%)' }
          }
        },
        plugins: {
          legend: { 
            display: false
          },
          tooltip: { mode: 'index', intersect: false },
          annotation: {
            annotations: {
              bad: {
                type: 'box',
                yMin: 22,
                yMax: 100,
                backgroundColor: 'rgba(255, 0, 0, 0.2)'
              },
              medium: {
                type: 'box',
                yMin: 16,
                yMax: 22,
                backgroundColor: 'rgba(234, 184, 57, 0.2)', //'rgba(255, 165, 0, 0.1)'
              },
              good: {
                type: 'box',
                yMin: 0,
                yMax: 16,
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

document.querySelectorAll('input[name="chUtilPeriod"]').forEach(radio => {
  radio.addEventListener('change', e => channelUtilizationHourlyAverage(e.target.value));
});

channelUtilizationHourlyAverage();