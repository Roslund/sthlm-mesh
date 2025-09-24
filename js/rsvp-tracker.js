// RSVP response patterns (order matters - check longer phrases first!)
const RESPONSE_PATTERNS = {
    'no': ['kommer inte', 'no', 'nej', 'not attending', 'kan inte', 'cannot attend'],
    'maybe': ['kanske', 'maybe', 'unsure', 'oklart', 'tvekar'],
    'yes': ['kommer', 'yes', 'ja', 'attending', 'deltar']
};

function parseRSVPMessage(messageText, messagePattern) {
    const text = messageText.trim().toLowerCase();
    const pattern = messagePattern.toLowerCase();
    
    if (!text.includes(pattern)) return null;

    // Find response type by checking patterns
    for (const [responseType, patterns] of Object.entries(RESPONSE_PATTERNS)) {
        for (const p of patterns) {
            if (text.includes(p)) {
                return { type: responseType };
            }
        }
    }
    
    return null;
}

async function fetchMessages() {
    const response = await fetch('https://map.sthlm-mesh.se/api/v1/text-messages?order=desc&count=1000');
    const data = await response.json();
    return data.text_messages;
}

function parseRSVPResponses(messages, messagePattern) {
    const responses = new Map();
    
    for (const message of messages) {
        const rsvp = parseRSVPMessage(message.text, messagePattern);
        if (!rsvp) continue;
        
        const existing = responses.get(message.from);
        if (!existing || new Date(message.created_at) > new Date(existing.timestamp)) {
            responses.set(message.from, {
                nodeId: message.from,
                response: rsvp.type,
                timestamp: message.created_at
            });
        }
    }
    
    return responses;
}

function findNodeById(id) {
    return nodes.find(node => node.node_id.toString() === id.toString()) ?? null;
}

function createRSVPSummary(responses) {
    const summary = { yes: [], maybe: [], no: [] };

    for (const [nodeId, rsvp] of responses) {
        const node = findNodeById(nodeId);
        summary[rsvp.response]?.push({
            nodeId,
            shortName: node?.short_name || '?',
            longName: node?.long_name || `!${parseInt(nodeId).toString(16)}`,
            response: rsvp.response,
            timestamp: rsvp.timestamp
        });
    }

    // Sort by timestamp (most recent first)
    Object.values(summary).forEach(arr => 
        arr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    );

    return summary;
}

function getNodeColour(nodeId) {
    return "#" + (nodeId & 0x00FFFFFF).toString(16).padStart(6, '0');
}

function generateAttendeeList(attendees) {
    if (attendees.length === 0) {
        return '<p class="text-muted small">Inga svar än</p>';
    }

    return attendees.map(attendee => `
        <div class="d-flex align-items-center mb-2">
            <div class="rounded-circle d-flex justify-content-center align-items-center me-2" 
                 style="width: 32px; height: 32px; background-color: ${getNodeColour(attendee.nodeId)}; color: white; font-size: 12px;">
                ${attendee.shortName.substring(0, 4)}
            </div>
            <div>
                <div class="small">
                    <a href="https://map.sthlm-mesh.se/?node_id=${attendee.nodeId}" 
                       target="_blank" class="text-decoration-none">
                        ${attendee.longName}
                    </a>
                </div>
                <div class="small text-muted">
                    ${new Date(attendee.timestamp).toLocaleString('sv-SE', { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                </div>
            </div>
        </div>
    `).join('');
}

function generateRSVPHTML(summary) {
    return `
        <div class="rsvp-tracker mt-4">
            <div class="row">
                <div class="col-md-4 mb-3">
                    <div class="card border-success">
                        <div class="card-header bg-success text-white">
                            <h6 class="mb-0">✅ Kommer (${summary.yes.length})</h6>
                        </div>
                        <div class="card-body">
                            ${generateAttendeeList(summary.yes)}
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4 mb-3">
                    <div class="card border-warning">
                        <div class="card-header bg-warning text-white">
                            <h6 class="mb-0">❓ Kanske (${summary.maybe.length})</h6>
                        </div>
                        <div class="card-body">
                            ${generateAttendeeList(summary.maybe)}
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4 mb-3">
                    <div class="card border-danger">
                        <div class="card-header bg-danger text-white">
                            <h6 class="mb-0">❌ Kommer inte (${summary.no.length})</h6>
                        </div>
                        <div class="card-body">
                            ${generateAttendeeList(summary.no)}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center">
                <small class="text-muted">
                    Totalt ${summary.yes.length + summary.maybe.length + summary.no.length} svar • 
                    Senast uppdaterad: ${new Date().toLocaleString('sv-SE')}
                </small>
            </div>
        </div>
    `;
}


/**
 * Initialize RSVP tracking for a specific event
 * Supports both active events (parse messages + JSON) and archived events (JSON only)
 */
async function initRSVPTracker(eventId) {
    const containerId = 'rsvp-tracker-' + eventId;
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID '${containerId}' not found. Make sure you have: <div id="${containerId}"></div>`);
        return;
    }

    try {
        // Show loading state
        container.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div><p>Laddar anmälningar...</p></div>';
        
        const eventData = await loadEventDataFromJSON(eventId);
        
        if (!eventData) {
            throw new Error(`Event data file not found: /events/${eventId}.json`);
        }
        
        let summary;
        
        if (eventData.archived) {
            summary = eventData.attendees;
        } else {            
            await fetchNodes();
            const messages = await fetchMessages();
            const responses = parseRSVPResponses(messages, eventData.messagePattern);
            summary = createRSVPSummary(responses);
            
            // Add manual attendees
            Object.entries(eventData.attendees).forEach(([type, attendees]) => {
                summary[type].push(...attendees);
            });
        }
        
        // Display results
        container.innerHTML = generateRSVPHTML(summary);
        
    } catch (error) {
        container.innerHTML = `<div class="alert alert-danger">Kunde inte ladda anmälningar: ${error.message}</div>`;
        console.error('Error initializing RSVP tracker:', error);
    }
}

/**
 * Export current RSVP data as JSON (for manual browser use)
 * Call this function in browser console: exportRSVPAsJSON('event-id', 'Message Pattern')
 */
async function exportRSVPAsJSON(eventId, messagePattern) {
    try {
        console.log('Fetching RSVP data for export...');
        
        await fetchNodes(); // Load nodes cache
        const messages = await fetchMessages();
        const responses = parseRSVPResponses(messages, messagePattern);
        const summary = createRSVPSummary(responses);
        
        const exportData = {
            messagePattern,
            archived: true,
            exportedAt: new Date().toISOString(),
            attendees: summary
        };

        console.log(JSON.stringify(exportData, null, 2));        
        return exportData;
        
    } catch (error) {
        console.error('Error exporting RSVP data:', error);
        throw error;
    }
}

async function loadEventDataFromJSON(eventId) {
    try {
        const response = await fetch(`/events/${eventId}.json`);
        if (!response.ok) throw new Error(`Event data not found: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`Could not load event data for ${eventId}:`, error.message);
        return null;
    }
}

// Export for use in other scripts
window.initRSVPTracker = initRSVPTracker;
window.exportRSVPAsJSON = exportRSVPAsJSON;