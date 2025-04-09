
async function nodesSeen() {
    const response = await fetch('https://map.sthlm-mesh.se/api/v1/nodes/');
    const data = await response.json();
    const nodes = data.nodes;
    const now = new Date();


    const countNodesSince = (daysAgo) => {
        const threshold = new Date(now);
        threshold.setDate(threshold.getDate() - daysAgo);
        return nodes.filter(node => new Date(node.updated_at) >= threshold).length;
    };

    document.getElementById("count-30").textContent = countNodesSince(30);
    document.getElementById("count-7").textContent = countNodesSince(7);
    document.getElementById("count-1").textContent = countNodesSince(1);

}

nodesSeen();