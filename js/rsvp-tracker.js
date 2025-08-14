/**
 * RSVP Tracker for Meshtastic Events
 * Tracks attendance responses from LoRa mesh messages
 */

class RSVPTracker {
    constructor(eventLabel) {
        this.eventLabel = eventLabel;
        this.state = {
            messages: [],
            nodesById: {},
            rsvpResponses: new Map() // nodeId -> latest response
        };
        
        // RSVP response patterns
        this.responsePatterns = {
            'kommer': ['kommer', 'yes', 'ja', 'attending', 'deltar'],
            'kanske': ['kanske', 'maybe', 'unsure', 'oklart', 'tvekar'],
            'kommer inte': ['kommer inte', 'no', 'nej', 'not attending', 'kan inte', 'cannot attend']
        };
    }

    /**
     * Parse RSVP message format: "EventLabel - Response"
     * Example: "AW 21/8 - Kommer"
     */
    parseRSVPMessage(messageText) {
        const text = messageText.trim().toLowerCase();
        
        // Check if message matches our event pattern
        const eventPattern = this.eventLabel.toLowerCase();
        if (!text.includes(eventPattern)) {
            return null;
        }

        // Extract the response part after the separator
        const separatorIndex = text.indexOf(' - ');
        if (separatorIndex === -1) {
            // Try alternative separators
            const altSeparators = [' -', '- ', '-', ':'];
            let response = null;
            
            for (const sep of altSeparators) {
                const sepIndex = text.indexOf(sep);
                if (sepIndex !== -1 && text.substring(0, sepIndex).includes(eventPattern)) {
                    response = text.substring(sepIndex + sep.length).trim();
                    break;
                }
            }
            
            if (!response) return null;
        } else {
            const response = text.substring(separatorIndex + 3).trim();
        }

        // Determine response type
        for (const [responseType, patterns] of Object.entries(this.responsePatterns)) {
            for (const pattern of patterns) {
                if (text.includes(pattern)) {
                    return {
                        type: responseType,
                        originalText: messageText,
                        isValid: true
                    };
                }
            }
        }

        return null;
    }

    /**
     * Fetch messages from the API and parse RSVP responses
     */
    async fetchRSVPData() {
        try {
            const response = await fetch('https://map.sthlm-mesh.se/api/v1/text-messages?order=desc&count=500');
            const data = await response.json();
            
            // Filter duplicate messages and sort by timestamp
            this.state.messages = Array.from(
                new Map(data.text_messages.map(msg => [msg.packet_id, msg])).values()
            ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            // Parse RSVP responses
            this.parseRSVPResponses();
            
            // Fetch node information for all RSVP responders
            await this.fetchNodeInfoForRSVPs();
            
            return this.getRSVPSummary();
            
        } catch (error) {
            console.error('Error fetching RSVP data:', error);
            throw error;
        }
    }

    /**
     * Parse all messages for RSVP responses
     */
    parseRSVPResponses() {
        this.state.rsvpResponses.clear();
        
        for (const message of this.state.messages) {
            const rsvp = this.parseRSVPMessage(message.text);
            if (rsvp) {
                // Only keep the latest response from each node
                const existingResponse = this.state.rsvpResponses.get(message.from);
                if (!existingResponse || new Date(message.created_at) > new Date(existingResponse.timestamp)) {
                    this.state.rsvpResponses.set(message.from, {
                        nodeId: message.from,
                        response: rsvp.type,
                        originalText: rsvp.originalText,
                        timestamp: message.created_at,
                        messageId: message.id
                    });
                }
            }
        }
    }

    /**
     * Fetch node information for all RSVP responders
     */
    async fetchNodeInfoForRSVPs() {
        const nodeIds = Array.from(this.state.rsvpResponses.keys());
        
        for (const nodeId of nodeIds) {
            if (!this.state.nodesById[nodeId]) {
                try {
                    const response = await fetch(`https://map.sthlm-mesh.se/api/v1/nodes/${nodeId}`);
                    const data = await response.json();
                    if (data.node) {
                        this.state.nodesById[nodeId] = data.node;
                    }
                } catch (error) {
                    console.warn(`Failed to fetch node info for ${nodeId}:`, error);
                }
            }
        }
    }

    /**
     * Get summary of RSVP responses
     */
    getRSVPSummary() {
        const summary = {
            kommer: [],
            kanske: [],
            'kommer inte': [],
            total: 0
        };

        for (const [nodeId, rsvp] of this.state.rsvpResponses) {
            const node = this.state.nodesById[nodeId];
            const attendee = {
                nodeId: nodeId,
                shortName: node?.short_name || '?',
                longName: node?.long_name || `!${parseInt(nodeId).toString(16)}`,
                response: rsvp.response,
                timestamp: rsvp.timestamp,
                originalText: rsvp.originalText
            };

            if (summary[rsvp.response]) {
                summary[rsvp.response].push(attendee);
            }
            summary.total++;
        }

        // Sort each category by timestamp (most recent first)
        Object.keys(summary).forEach(key => {
            if (Array.isArray(summary[key])) {
                summary[key].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            }
        });

        return summary;
    }

    /**
     * Generate HTML for displaying RSVP results
     */
    generateRSVPHTML(summary) {
        const html = `
            <div class="rsvp-tracker mt-4">
                <h4>📋 Anmälningsstatus</h4>
                <p class="text-muted">Skicka meddelande över LoRa-meshen: "<strong>${this.eventLabel} - [Kommer/Kanske/Kommer inte]</strong>"</p>
                
                <div class="row">
                    <div class="col-md-4">
                        <div class="card border-success">
                            <div class="card-header bg-success text-white">
                                <h6 class="mb-0">✅ Kommer (${summary.kommer.length})</h6>
                            </div>
                            <div class="card-body">
                                ${this.generateAttendeeList(summary.kommer)}
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card border-warning">
                            <div class="card-header bg-warning text-white">
                                <h6 class="mb-0">❓ Kanske (${summary.kanske.length})</h6>
                            </div>
                            <div class="card-body">
                                ${this.generateAttendeeList(summary.kanske)}
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card border-danger">
                            <div class="card-header bg-danger text-white">
                                <h6 class="mb-0">❌ Kommer inte (${summary['kommer inte'].length})</h6>
                            </div>
                            <div class="card-body">
                                ${this.generateAttendeeList(summary['kommer inte'])}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-3 text-center">
                    <small class="text-muted">
                        Totalt ${summary.total} svar • 
                        Senast uppdaterad: ${new Date().toLocaleString('sv-SE')}
                    </small>
                </div>
            </div>
        `;
        
        return html;
    }

    /**
     * Generate attendee list HTML
     */
    generateAttendeeList(attendees) {
        if (attendees.length === 0) {
            return '<p class="text-muted small">Inga svar än</p>';
        }

        return attendees.map(attendee => `
            <div class="d-flex align-items-center mb-2">
                <div class="rounded-circle d-flex justify-content-center align-items-center me-2" 
                     style="width: 32px; height: 32px; background-color: ${this.getNodeColour(attendee.nodeId)}; color: white; font-size: 12px;">
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

    /**
     * Get node color based on ID
     */
    getNodeColour(nodeId) {
        return "#" + (nodeId & 0x00FFFFFF).toString(16).padStart(6, '0');
    }

    /**
     * Get example message format
     */
    getExampleMessage() {
        return `${this.eventLabel} - Kommer`;
    }
}

/**
 * Generate container ID from event label
 */
function generateContainerId(eventLabel) {
    return 'rsvp-tracker-' + eventLabel.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

/**
 * Initialize RSVP tracking for a specific event
 */
async function initRSVPTracker(eventLabel) {
    const tracker = new RSVPTracker(eventLabel);
    const containerId = generateContainerId(eventLabel);
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID '${containerId}' not found. Make sure you have: <div id="${containerId}"></div>`);
        return;
    }

    try {
        // Show loading state
        container.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div><p>Laddar anmälningar...</p></div>';
        
        // Fetch and display RSVP data
        const summary = await tracker.fetchRSVPData();
        container.innerHTML = tracker.generateRSVPHTML(summary);
        
        // Set up auto-refresh every 60 seconds
        setInterval(async () => {
            try {
                const summary = await tracker.fetchRSVPData();
                container.innerHTML = tracker.generateRSVPHTML(summary);
            } catch (error) {
                console.error('Error refreshing RSVP data:', error);
            }
        }, 60000);
        
    } catch (error) {
        container.innerHTML = `<div class="alert alert-danger">Kunde inte ladda anmälningar: ${error.message}</div>`;
        console.error('Error initializing RSVP tracker:', error);
    }
}

// Export for use in other scripts
window.RSVPTracker = RSVPTracker;
window.initRSVPTracker = initRSVPTracker;
