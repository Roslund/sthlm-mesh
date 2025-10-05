let nodes = [];
let fetchPromise = null;
const StatusFilter = {
    _channelId: null,
    _subscribers: [],
    getChannelId() {
        return this._channelId;
    },
    subscribe(callback) {
        if (typeof callback === 'function') this._subscribers.push(callback);
    },
    _notify() {
        for (const cb of this._subscribers) {
            try { cb(this._channelId); } catch (_) {}
        }
    }
};

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

// Initialize global channel filter listeners once
document.addEventListener('DOMContentLoaded', () => {
    const radios = document.querySelectorAll("input[name='btnchannel-nodes']");
    if (!radios || radios.length === 0) return;
    const checked = document.querySelector("input[name='btnchannel-nodes']:checked");
    StatusFilter._channelId = checked ? (checked.getAttribute('data-channel') || null) : null;
    radios.forEach(r => r.addEventListener('change', () => {
        const channel = r.getAttribute('data-channel');
        StatusFilter._channelId = channel || null;
        StatusFilter._notify();
    }));
});
