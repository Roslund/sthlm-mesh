---
title: Position
weight: 30
draft: true
---


{{< card code=true lang="yml" >}}
meshtastic --setlat 59.520790 --setlon 17.922659 --setalt 10
meshtastic --set position.position_broadcast_secs 43200

meshtastic --ch-set module_settings.position_precision 32 --ch-index 0
meshtastic --set mqtt.map_report_settings.position_precision 32
{{< /card>}}
