let highlightedIndex = -1;
let chartInstance;


function filterSuggestions(query) {
    const lowerQuery = query.toLowerCase();
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 1);
    return nodes
        .filter(node => new Date(node.updated_at) >= threshold)
        .filter(node => node.long_name?.toLowerCase().includes(lowerQuery)) || [];
}

function showSuggestions(matches) {
    const ul = document.getElementById('suggestions');
    ul.innerHTML = '';

    if (matches.length === 0) {
        ul.innerHTML = '<li class="dropdown-item text-muted disabled">No matching nodes</li>';
        ul.style.display = 'block';
        return;
    }

    matches.forEach(node => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = node.long_name;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('nodeSearch').value = node.long_name;
            ul.style.display = 'none';
            portnumDistributionChart(node.node_id);
        });
        li.appendChild(a);
        ul.appendChild(li);
    });

    ul.style.display = 'block';
}

function updateHighlight(suggestions) {
    suggestions.forEach((el, i) => {
        if (i === highlightedIndex) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

document.getElementById('nodeSearch').addEventListener('keydown', (e) => {
    const suggestions = document.querySelectorAll('#suggestions .dropdown-item');

    if (suggestions.length === 0) return;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            highlightedIndex = (highlightedIndex + 1) % suggestions.length;
            updateHighlight(suggestions);
            break;

        case 'ArrowUp':
            e.preventDefault();
            highlightedIndex = (highlightedIndex - 1 + suggestions.length) % suggestions.length;
            updateHighlight(suggestions);
            break;

        case 'Enter':
            e.preventDefault();
            if (highlightedIndex >= 0) {
                suggestions[highlightedIndex].click();
            }
            break;

        case 'Escape':
            document.getElementById('nodeSearch').value = '';
            document.getElementById('suggestions').style.display = 'none';
            portnumDistributionChart(); // Reload full chart
            highlightedIndex = -1;
            break;
    }
});

document.getElementById('nodeSearch').addEventListener('input', (e) => {
    highlightedIndex = -1;
    const matches = filterSuggestions(e.target.value);
    showSuggestions(matches);
});

document.getElementById('clearFilterBtn').addEventListener('click', () => {
    highlightedIndex = -1;
    document.getElementById('nodeSearch').value = '';
    document.getElementById('suggestions').style.display = 'none';
    portnumDistributionChart(); // Reload full chart
});

// Main chart function
async function portnumDistributionChart(nodeId = null) {
    const canvas = document.getElementById('portnumDistribution');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText('Loading data...', canvas.width / 2, canvas.height / 2);

    try {
        await fetchNodes();
        const url = nodeId 
            ? `https://map.sthlm-mesh.se/api/v1/stats/portnum-counts?nodeId=${nodeId}`
            : 'https://map.sthlm-mesh.se/api/v1/stats/portnum-counts';

        const response = await fetch(url);
        const data = await response.json();

        const labels = data.map(entry => entry.label.replace(/_APP$/, ''));
        const counts = data.map(entry => entry.count);

        const backgroundColors = counts.map(count => {
            if (nodeId) {
                // Filtered chart: use tighter thresholds
                if (count < 50) return '#7EB26D';       // Green
                if (count < 100) return '#EAB839';      // Yellow
                return '#BF1B00';                       // Red
            } else {
                // Global chart: use broader thresholds
                if (count < 500) return '#7EB26D';      // Green
                if (count < 2000) return '#EAB839';     // Yellow
                return '#BF1B00';                       // Red
            }
        });
        
        const chartContainer = document.getElementById('portnumDistributionContainer');
        chartContainer.style.height = `${labels.length * 35 + 50}px`;

        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Packages',
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

portnumDistributionChart();
