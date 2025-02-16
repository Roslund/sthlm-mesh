---
title: Neighbor Info
description: Neighbor Info
date: 2025-02-15
weight: 90
---
[Neighbor Info modulen](https://meshtastic.org/docs/configuration/module/neighbor-info/) samlar infomration om en nods grannar den har direktkontakt med (0-hopp). Denna information kan sedan skickas över MQTT eller LoRa.

Informationen kan sedan visualiseras på karttjänster.
![](/docs/neighbors.png)

### Neighbour Info konfiguration

{{< card code=true lang="yml" >}}
neighbor_info:
    neighbor_info.enabled: True
    neighbor_info.transmit_over_lora: True
    neighbor_info.update_interval: 43200
{{< /card>}}
