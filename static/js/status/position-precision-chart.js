function getPositionPrecisionInMeters(positionPrecision) {
    switch(positionPrecision){
        case 2: return 5976446;
        case 3: return 2988223;
        case 4: return 1494111;
        case 5: return 747055;
        case 6: return 373527;
        case 7: return 186763;
        case 8: return 93381;
        case 9: return 46690;
        case 10: return 23345;
        case 11: return 11672; // Android LOW_PRECISION
        case 12: return 5836;
        case 13: return 2918;
        case 14: return 1459;
        case 15: return 729;
        case 16: return 364; // Android MED_PRECISION
        case 17: return 182;
        case 18: return 91;
        case 19: return 45;
        case 20: return 22;
        case 21: return 11;
        case 22: return 5;
        case 23: return 2;
        case 24: return 1;
        case 32: return 0; // Android HIGH_PRECISION
    }
    return null;
}

function getPositionColor(positionPrecision) {
    switch(positionPrecision){
        case 2: return 'rgb(196, 36, 18)';
        case 3: return 'rgb(196, 36, 18)';
        case 4: return 'rgb(196, 36, 18)';
        case 5: return 'rgb(196, 36, 18)';
        case 6: return 'rgb(196, 36, 18)';
        case 7: return 'rgb(196, 36, 18)';
        case 8: return 'rgb(196, 36, 18)';
        case 9: return 'rgb(196, 36, 18)';
        case 10: return 'rgb(196, 36, 18)';
        case 11: return 'rgb(196, 36, 18)'; // Android LOW_PRECISION
        case 12: return 'rgb(196, 36, 18)';
        case 13: return 'rgb(212, 74, 58)'; // Default +/- 3km
        case 14: return 'rgb(242, 161, 67)';
        case 15: return 'rgb(229, 189, 82)';
        case 16: return 'rgb(195, 208, 98)'; // Android MED_PRECISION
        case 17: return 'rgb(157, 195, 91)'; //182
        case 18: return 'rgb(118, 182, 84)';
        case 19: return 'rgb(79, 170, 77)'; //45
        case 20: return 'rgb(41, 156, 70)';
        case 21: return 'rgb(41, 156, 70)';
        case 22: return 'rgb(41, 156, 70)';
        case 23: return 'rgb(41, 156, 70)';
        case 24: return 'rgb(41, 156, 70)';
        case 32: return 'rgb(41, 156, 70)'; // Android HIGH_PRECISION
    }
    return 'rgb(200, 200, 200)';
}

function formatPositionPrecision(positionPrecision) {

    // get position precision in meters
    const positionPrecisionInMeters = getPositionPrecisionInMeters(positionPrecision);
    if(positionPrecisionInMeters == null){
        return "?";
    }

    // format kilometers
    if(positionPrecisionInMeters > 1000){
        const positionPrecisionInKilometers = Math.ceil(positionPrecisionInMeters / 1000);
        return `±${positionPrecisionInKilometers}km`;
    }

    // format meters
    return `±${positionPrecisionInMeters}m`;

}

async function positionPrecisionGraph() {
    const canvas = document.getElementById('positionPrecisionChart');
    const ctx = canvas.getContext('2d');

    // Show "Loading..." message
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);


    try {
        await fetchNodes();
        const countsByPrecision = {};

        // Filter out nodes without position_precision
        const nodesWithPoistion = nodes.filter(node => node.position_precision != null);

        // Count how many nodes fall into each precision value
        for (const node of nodesWithPoistion) {
            const precision = node.position_precision
            countsByPrecision[precision] = (countsByPrecision[precision] || 0) + 1;
        }

        // Convert to array of { precision, count }
        const statsArray = Object.entries(countsByPrecision).map(([precision, count]) => ({
            precision: parseInt(precision, 10),
            count
        }));

        // Sort by precision descending
        const sorted = statsArray.sort((a, b) => b.precision - a.precision);
        const labels = sorted.map(entry => formatPositionPrecision(entry.precision));
        const counts = sorted.map(entry => entry.count);
        const backgroundColors = sorted.map(entry => getPositionColor(entry.precision));

        const chartContainer = document.getElementById('positionPrecisionContainer');
        chartContainer.style.height = `${labels.length * 35 + 50}px`;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Position Precision',
                    data: counts,
                    backgroundColor: backgroundColors,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                barPercentage: 0.8,
                indexAxis: 'y',
                y: { ticks: { autoSkip: false, font: { size: 12 } } },
                plugins: { legend: { display: false } }
            }
        });
    } catch(error) {
        console.error('Error fetching data:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillText('Error loading data', canvas.width / 2, canvas.height / 2);
    }
}


positionPrecisionGraph();