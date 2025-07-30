---
title: Custom Firmware
toc_hide: true
_build:
  render: true
  list: false
  publishResources: false
---
Här publicerar vi custom firmware. Vi har genomfört förändringar på den officiella firmwaren för att bättre passa våra behov och användningssätt. Vi försöker att enbart publicera riktigt väl-testade versioner.

{{% alert title="Varning" color="danger" %}}
Att ladda ner firmware från internet medför alltid en risk. Istället bör du själv genomföra kodändringarna som anges lite längre ned på sidan och kompilera firmware själv.
{{% /alert %}}

Än så länge stödjer vi bara RAK4631. Ladda ner antingen en uf2 fil, eller en zip fil som används för uppdatering via blåtand.

<!-- Accordion will be injected here -->
<div class="accordion" id="firmwareAccordion"></div>


<!-- Flash‑log modal -->
<div class="modal fade" id="flashModal" tabindex="-1" aria-labelledby="flashModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="flashModalLabel">Flashing</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <pre id="espLog" class="bg-dark text-light p-2 rounded overflow-auto" style="height:16rem;font-size:.85rem"></pre>
        <small class="text-muted">Requires Chrome/Edge ≥ 89 over HTTPS.</small>
      </div>
      <div class="modal-footer d-flex align-items-center w-100">
        <div class="form-check form-switch mb-0">
          <input class="form-check-input" type="checkbox" id="eraseSwitch">
          <label class="form-check-label" for="eraseSwitch">
            Full Erase & Install
          </label>
        </div>
        <div class="ms-auto d-flex gap-2">
          <button id="startFlashBtn" class="btn btn-primary">
            Start Flash
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

## Kodändringar
Nedan är de ändringars som gjort i den senaste firmwaren. Äldre versioner kan ha andra ändringar.


### NeighborInfoModule.cpp
Tillåt sändning av Neighbor info över default kanalen.
```diff
int32_t NeighborInfoModule::runOnce()
{
    if (moduleConfig.neighbor_info.transmit_over_lora &&
-       (!channels.isDefaultChannel(channels.getPrimaryIndex()) || !RadioInterface::uses_default_frequency_slot) &&
        airTime->isTxAllowedChannelUtil(true) && airTime->isTxAllowedAirUtil()) {
        sendNeighborInfo(NODENUM_BROADCAST, false);
    } else {
        sendNeighborInfo(NODENUM_BROADCAST_NO_LORA, false);
    }
    return Default::getConfiguredOrDefaultMs(moduleConfig.neighbor_info.update_interval, default_neighbor_info_broadcast_secs);
}
```

Behåll noder längre i neighbor info databasen. 
Då noder inte sänder nodinfo om channel utilization är för hög så vill vi låta dom vara kvar lite längre.
```diff
void NeighborInfoModule::cleanUpNeighbors()
{
    uint32_t now = getTime();
    NodeNum my_node_id = nodeDB->getNodeNum();
    for (auto it = neighbors.rbegin(); it != neighbors.rend();) {
        // We will remove a neighbor if we haven't heard from them in twice the broadcast interval
        // cannot use isWithinTimespanMs() as it->last_rx_time is seconds since 1970
-        if ((now - it->last_rx_time > it->node_broadcast_interval_secs * 2) && (it->node_id != my_node_id)) {
+        if ((now - it->last_rx_time > it->node_broadcast_interval_secs * 4) && (it->node_id != my_node_id)) {
            LOG_DEBUG("Remove neighbor with node ID 0x%x", it->node_id);
            it = std::vector<meshtastic_Neighbor>::reverse_iterator(
                neighbors.erase(std::next(it).base())); // Erase the element and update the iterator
        } else {
            ++it;
        }
    }
}
```

### Channels.cpp
```diff
-    channelSettings.module_settings.position_precision = 13; // default to sending location on the primary channel
+    channelSettings.module_settings.position_precision = 32; // default to sending location on the primary channel
```

### MQTT.h
```diff
-    const uint32_t default_map_position_precision = 14;         // defaults to max. offset of ~1459m
+    const uint32_t default_map_position_precision = 32;         // defaults to max. offset of ~1459m

```

### MQTT.c
Respektera __inte__ OK_TO_MQTT flaggan
```diff
- // For uplinking other's packets, check if it's not OK to MQTT or if it's an older packet without the bitfield
- bool dontUplink = !mp_decoded.decoded.has_bitfield || !(mp_decoded.decoded.bitfield & BITFIELD_OK_TO_MQTT_MASK);
- // check for the lowest bit of the data bitfield set false, and the use of one of the default keys.
- if (!isFromUs(&mp_decoded) && !isMqttServerAddressPrivate && dontUplink &&
-     (ch.settings.psk.size < 2 || (ch.settings.psk.size == 16 && memcmp(ch.settings.psk.bytes, defaultpsk, 16)) ||
-         (ch.settings.psk.size == 32 && memcmp(ch.settings.psk.bytes, eventpsk, 32)))) {
-     LOG_INFO("MQTT onSend - Not forwarding packet due to DontMqttMeBro flag");
-     return;
- }
```

<script src="/js/firmware-ui.js"></script>
<script src="/js/esp-flasher.js"></script>