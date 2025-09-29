document.addEventListener("DOMContentLoaded", async function () {
    const messagesContainer = document.getElementById("messages");
    const radioButtons = document.querySelectorAll("input[name='btnradio']");
    const channelRadioButtons = document.querySelectorAll("input[name='btnchannel']");
    const loadingDiv = document.getElementById("loading");
    const messagesList = document.createElement("div");
    messagesList.style="max-height:70vh;overflow: auto;"
    messagesContainer.appendChild(messagesList);
    
    // Initialize Bootstrap tooltips (delegated) so static and dynamic elements work
    if (window.bootstrap && typeof window.bootstrap.Tooltip === "function") {
        new window.bootstrap.Tooltip(document.body, {
            selector: "[data-bs-toggle='tooltip']",
            container: "body"
        });
    } else {
        console.warn("Bootstrap Tooltip not available; falling back to native titles.");
    }
    
    const state = {
        messages: [],
        nodesById: {},
    };

    radioButtons.forEach(radio => {
        radio.addEventListener("change", fetchMessages);
    });

    channelRadioButtons.forEach(radio => {
        radio.addEventListener("change", fetchMessages);
    });


    async function fetchMessages() {
        try {
            let url = "https://map.sthlm-mesh.se/api/v1/text-messages?order=desc&count=300";
            const selectedRadio = document.querySelector("input[name='btnradio']:checked");
            const selectedChannel = document.querySelector("input[name='btnchannel']:checked");

            if (selectedChannel) {
                const channelId = selectedChannel.getAttribute('data-channel');
                if (channelId) {
                    url += `&channel_id=${encodeURIComponent(channelId)}`;
                }
            }

            const response = await fetch(url);
            const data = await response.json();

            // Group by packet_id and collect all gateways that heard the packet (with hops left)
            const byPacket = new Map();
            for (const msg of data.text_messages) {
                let entry = byPacket.get(msg.packet_id);
                if (!entry) {
                    entry = { message: msg, gateways: new Map() };
                    byPacket.set(msg.packet_id, entry);
                }
                // store the latest hop_limit seen for this gateway_id
                entry.gateways.set(msg.gateway_id, msg.hop_limit);
            }

            // Build aggregated messages with gateways array [{ gateway_id, hop_limit }]
            let aggregated = Array.from(byPacket.values()).map(entry => ({
                ...entry.message,
                gateways: Array.from(entry.gateways.entries()).map(([gateway_id, hop_limit]) => ({ gateway_id, hop_limit }))
            }));

            // If a specific gateway is selected, filter to messages heard by that gateway
            if (selectedRadio && selectedRadio.id !== "all") {
                const selectedGatewayId = selectedRadio.id;
                aggregated = aggregated.filter(m => Array.isArray(m.gateways) && m.gateways.some(g => g.gateway_id?.toString() === selectedGatewayId));
            }

            state.messages = aggregated;

            // Sort the messages, for some reason with multiple mqtt gateways they are unsorted.
            state.messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            // fetch node info
            for (const message of state.messages) {
                await fetchNodeInfo(message.to);
                await fetchNodeInfo(message.from);
                if (Array.isArray(message.gateways)) {
                    for (const g of message.gateways) {
                        await fetchNodeInfo(g.gateway_id);
                    }
                }
            }

            updateUI();
        } catch (error) {
            console.error("Error fetching messages", error);
            loadingDiv.innerHTML = `<p style="color: red;">Error fetching messages: ${error.message}</p>`;
        }
    }
    async function fetchNodeInfo(nodeId) {
        // do nothing if already fetched
        if(nodeId in state.nodesById){
            return;
        }

        // do nothing if broadcast address
        if(nodeId.toString() === "4294967295"){
            return;
        }

        try {
            const response = await fetch(`https://map.sthlm-mesh.se/api/v1/nodes/${nodeId}`);
            const data = await response.json();
            const node = data.node;
            
            if(node){
                state.nodesById[node.node_id] = node;
            }

        } catch(e) {
            // do nothing
        }

    }

    function updateUI() {
        loadingDiv.innerHTML = "";  // Clear the loading message
        messagesList.innerHTML = "";
        state.messages.slice().reverse().forEach(message => {
            const messageDiv = document.createElement("div");
            messageDiv.className = "d-flex mb-2";
            messageDiv.innerHTML = `
                    <div class="p-2 flex">
                        <div class="d-flex rounded-circle shadow text-white justify-content-center align-items-center"
                            style="width: 48px; height: 48px; background-color: ${getNodeColour(message.from)}; color: #ffffff;">
                            ${getNodeShortName(message.from)}
                        </div>
                    </div>
                    <div class="flex">
                        <div class="small">
                            <a target="_blank" href="https://map.sthlm-mesh.se/?node_id=${message.from}" style="color: grey; text-decoration: none;">${getNodeLongName(message.from)}</a>
                            ${message.to !== "4294967295" ? ` → <a target="_blank" href="https://map.sthlm-mesh.se/?node_id=${message.to}" style="color: grey; text-decoration: none;">${getNodeLongName(message.to)}</a>` : ""}
                        </div>
                        <div class="px-2 py-1 pb-1 border rounded shadow-sm" style="background-color: #efefef">
                            <div class="">${escapeMessageText(message.text)}</div>
                        </div>
                        <div class="pt-1" style="font-size: 0.65rem;color: grey;">
                            ${formatMessageTimestamp(message.created_at)}
                            ${message.channel_id}&nbsp;
                            ${renderGatewayShortNames(message.gateways)}&nbsp;
                            ${renderOkToMqttWarning(message.ok_to_mqtt)}
                        </div>
                    </div>

            `;
            messagesList.appendChild(messageDiv);
        });
        messagesList.scrollTop = messagesList.scrollHeight;

    }

    function getNodeColour(nodeId) {
        return "#" + (nodeId & 0x00FFFFFF).toString(16).padStart(6, '0');
    }

    function getNodeHexId(nodeId) {
        return "!" + parseInt(nodeId).toString(16);
    }

    function getNodeShortName(nodeId) {
        return state.nodesById[nodeId]?.short_name?.substring(0, 4) ?? "?";
    }

    function getNodeLongName(nodeId) {
        return state.nodesById[nodeId]?.long_name ?? getNodeHexId(nodeId);
    }

    function getNodeName(nodeId) {
        const node = state.nodesById[nodeId];
        if(!node){
            return getNodeHexId(nodeId);
        }
        return `[${node.short_name}] ${node.long_name}`;
    }

    function escapeMessageText(text) {
        return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br/>');
    }

    function formatMessageTimestamp(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleString('sv-SE', { hour12: false }).slice(0, 16);
    }

    function renderOkToMqttWarning(okToMqtt) {
        if (okToMqtt === false) {
            return `<span class="text-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-container="body" data-bs-trigger="hover focus" title="Denna nod har inte ok_to_mqtt. Meddelanden ignoreras av flertalet gateways.">⚠️</span>`;
        }
        return "";
    }

    function renderGatewayShortNames(gateways) {
        if (!Array.isArray(gateways) || gateways.length === 0) {
            return "";
        }
        const sorted = gateways.slice().sort((a, b) => Number(a.gateway_id) - Number(b.gateway_id));
        const names = sorted
            .map(g => {
                const short = state.nodesById[g.gateway_id]?.short_name;
                if (!short) return null;
                const hop = (g.hop_limit ?? '').toString();
                return hop ? `[${short}: ${hop}]` : `[${short}]`;
            })
            .filter(Boolean)
            .join(' ');
        if (!names) {
            return "";
        }
        return `Gated by: ${names}`;
    }

    await fetchMessages();
    setInterval(fetchMessages, 30000);
});
