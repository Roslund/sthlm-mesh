function countNodesSince(daysAgo) {
    const now = new Date();
    const threshold = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return nodes.filter(node => new Date(node.updated_at) >= threshold).length;
}

async function nodesSeen() {
    await fetchNodes();

    document.getElementById("count-30").textContent = countNodesSince(30);
    document.getElementById("count-7").textContent = countNodesSince(7);
    document.getElementById("count-1").textContent = countNodesSince(1);
}

nodesSeen();
