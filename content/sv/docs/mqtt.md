---
title: MQTT
description: MQTT
date: 2025-02-15
weight: 3
---

{{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}}

MQTT (Message Queuing Telemetry Transport) är ett protokoll för meddelandeöverföring som är vanligt att använa för IoT kommunikation. Det är designat för att vara effektivt, även i nätverk med låg bandbredd eller hög latens.

Meshtastic har stöd för att använda MQTT för att ___brygga___ olika mesh-nätverk. I Stockholm har vi redan ett stort mesh och MQTT trafik skulle snabbt överbeslast meshet. 

Vi använder MQTT för att kunna analysera meshet. Detta gör vi genom att enbart ha ___uplink___ igång. På så sätt kan man tillhandahålla information om meshet som går att analysera med andra verktyg.

{{< card code=true lang="yml" >}}
LoRa.OkToMQTT = true
LoRa.aafdasfdLoRa.aafdasfd
{{< /card>}}

### MQTT konfiguration
Vi rekomenderar att man uplinkar till Liam Cottle's mqtt broaker och karta.

{{< card code=true lang="yml" >}}
mqtt:
    mqtt.enabled: True
    mqtt.address: mqtt.meshtastic.liamcottle.net
    mqtt.username: uplink
    mqtt.password: uplink
    mqtt.root: /msh/#
    mqtt.encryption_enabled: True
    mqtt.json_enabled: False
    mqtt.tls_enabled: False
    mqtt.proxy_to_client_enabled: False
    mqtt.map_reporting_enabled: True
    mqtt.map_report_settings.publish_interval_secs: 900
    mqtt.map_report_settings.position_precision: 32
{{< /card>}}
