async function channelUtilizationHourlyAverage() {
  const canvas = document.getElementById('channelUtilizationChart');
  const ctx = canvas.getContext('2d');

  // show loading
  ctx.font = '16px Arial';
  ctx.fillStyle = 'gray';
  ctx.textAlign = 'center';
  ctx.fillText('Loading...', canvas.width/2, canvas.height/2);

  try {
    const response = await fetch('https://map.sthlm-mesh.se/api/v1/stats/channel-utilization-stats?days=7');
    const data = await response.json();

    const labels = data.map(entry => entry.recorded_at);
    const values = data.map(entry => parseFloat(entry.avg_channel_utilization));

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Hourly Avg Channel Utilization',
          data: values,
          borderColor: 'rgb(15, 169, 252)',
          borderWidth: 2,
          tension: 0.1,
          pointRadius: 0,
        }]
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
            min: 11,
            max: 14,
            title: { display: true, text: 'Avg. Channel Utilization (%)' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false },
          annotation: {
            annotations: {
              bad: {
                type: 'box',
                yMin: 13,
                yMax: 15,
                backgroundColor: 'rgba(255, 0, 0, 0.2)'
              },
              medium: {
                type: 'box',
                yMin: 12,
                yMax: 13,
                backgroundColor: 'rgba(234, 184, 57, 0.2)', //'rgba(255, 165, 0, 0.1)'
              },
              good: {
                type: 'box',
                yMin: 0,
                yMax: 12,
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