let nodes = [];
let fetchPromise = null;

async function fetchNodes() {
    if (nodes.length > 0) return;

    if (!fetchPromise) {
        fetchPromise = fetch('https://map.sthlm-mesh.se/api/v1/nodes/')
            .then(res => res.json())
            .then(data => {
                nodes = data.nodes;
                fetchPromise = null; // reset after successful fetch
            })
            .catch(err => {
                fetchPromise = null; // reset on failure
                throw err;
            });
    }

    await fetchPromise;
}
