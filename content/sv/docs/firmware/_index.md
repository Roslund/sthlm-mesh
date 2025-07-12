---
title: Custom Firmware
toc_hide: true
_build:
  render: true
  list: false
  publishResources: false
---


## Binärer
{{% alert title="Varning" color="danger" %}}
Att ladda ner firmware från internet medför alltid en risk. Istället bör du själv genomföra kodändringarna nedan och kompilera firmware själv.
{{% /alert %}}
* [ros-firmware-rak4631-2.6.11.60ec05e.uf2](/firmware/ros-firmware-rak4631-ota-2.6.11.60ec05e.uf2)
* [ros-firmware-rak4631-ota-2.6.11.60ec05e.zip](/firmware/ros-firmware-rak4631-ota-2.6.11.60ec05e.zip)
* [ros-firmware-rak4631-2.6.4.b89355f.uf2](/firmware/ros-firmware-rak4631-2.6.4.b89355f.uf2)
* [ros-firmware-rak4631-ota-2.6.4.b89355f.zip](/firmware/ros-firmware-rak4631-ota-2.6.4.b89355f.zip)
* [ros-firmware-rak4631-2.5.21.447533a.uf2](/firmware/ros-firmware-rak4631-2.5.21.447533a.uf2)
* [nrf_erase2.uf2](/firmware/nrf_erase2.uf2)

## Kodändringar
Nedan är de ändringar jag gör på firmwaren för att det ska passa mig.

### Channels.cpp
```diff
-    channelSettings.module_settings.position_precision = 13; // default to sending location on the primary channel
+    channelSettings.module_settings.position_precision = 32; // default to sending location on the primary channel
```

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