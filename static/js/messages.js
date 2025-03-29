document.addEventListener("DOMContentLoaded", async function () {
    const messagesContainer = document.getElementById("messages");
    const radioButtons = document.querySelectorAll("input[name='btnradio']");
    const loadingDiv = document.getElementById("loading");
    const messagesList = document.createElement("div");
    messagesList.style="max-height:70vh;overflow: auto;"
    messagesContainer.appendChild(messagesList);
    
    const state = {
        messages: [],
        nodesById: {},
    };

    radioButtons.forEach(radio => {
        radio.addEventListener("change", fetchMessages);
    });


    async function fetchMessages() {
        try {
            let url = "https://map.sthlm-mesh.se/api/v1/text-messages?order=desc";
            const selectedRadio = document.querySelector("input[name='btnradio']:checked");

            //If all is not selected we get 15 messages. If not we get 35 due to duplicates
            if (selectedRadio.id !== "all") {
                url += `&gateway_id=${selectedRadio.id}`;
                url += `&count=15`;
            } else {
                url += `&count=35`;
            }

            const response = await fetch(url);
            const data = await response.json();
            
            //Filter duplicate messages
            state.messages = Array.from(
                new Map(data.text_messages.map(msg => [msg.packet_id, msg])).values()
            );

            // Sort the messages, for some reason with multiple mqtt gateways they are unsorted.
            state.messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            // fetch node info
            for(const message of state.messages){
                await fetchNodeInfo(message.to);
                await fetchNodeInfo(message.from);
                await fetchNodeInfo(message.gateway_id);
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
                            ${message.to !== "4294967295" ? ` → <a target="_blank" href="https://map.sthlm-mesh.se//?node_id=${message.to}" style="color: grey; text-decoration: none;">${getNodeLongName(message.to)}</a>` : ""}
                        </div>
                        <div class="px-2 py-1 pb-1 border rounded shadow-sm" style="background-color: #efefef">
                            <div class="">${escapeMessageText(message.text)}</div>
                        </div>
                        <div class="pt-1" style="font-size: 0.65rem;color: grey;">${formatMessageTimestamp(message.created_at)}</div>
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
        return date.toLocaleString('sv-SE', { hour12: false }).replace(' ', ' ').slice(0, 16);
    }

    await fetchMessages();
    setInterval(fetchMessages, 30000);
});
