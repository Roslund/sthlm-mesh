---
title: MQTT
date: 2025-02-15
weight: 3
---
MQTT (Message Queuing Telemetry Transport) är ett protokoll för meddelandeöverföring som är vanligt att använa för IoT kommunikation. Det är designat för att vara effektivt, även i nätverk med låg bandbredd eller hög latens.


Vi använder MQTT för att kunna analysera meshet. Detta gör vi genom att enbart ha _uplink_ igång. På så sätt kan man tillhandahålla information om meshet som går att analysera med andra verktyg.


Meshtastic har stöd för att använda MQTT för att _brygga_ olika mesh-nätverk. 
I Stockholm har vi redan ett stort mesh och MQTT trafik skulle snabbt överbeslast meshet. 
Därför har vi _downlink_ avsängt samt `lora.ignore_mqtt`.

{{% alert title="Uppmärksamma" color="warning" %}}
För att andra ska få vidarebefodra dina medelanden till MQTT så måte du ha `lora.config_ok_to_mqtt` på.
{{% /alert %}}

### MQTT konfiguration
Vi rekomenderar att man uplinkar till Liam Cottle's mqtt broaker och karta.

{{< card code=true lang="yml" >}}
mqtt:
    mqtt.enabled: True
    mqtt.address: mqtt.meshtastic.liamcottle.net
    mqtt.username: uplink
    mqtt.password: uplink
    mqtt.root: msh/EU_868
    mqtt.encryption_enabled: True
    mqtt.json_enabled: False
    mqtt.tls_enabled: False
    mqtt.proxy_to_client_enabled: False
    mqtt.map_reporting_enabled: True
    mqtt.map_report_settings.publish_interval_secs: 900
    mqtt.map_report_settings.position_precision: 32
{{< /card>}}

{{% pageinfo %}}
För att skicka information om andra noder i meshen måste _uplink_ slås på i kanalinställningarna.
{{% /pageinfo %}}

### Map report
Map report används för att skicka information om just din nod över mqtt. 
Bland annat så skickar den `position`, `hårdvarumodell`, `firmware version`. 
Även `Online nodes` (senaste 2 timmarna). Detta kan vara missvisande då default intervall för nodeinfo är 3timmar, många skickar mycket mer sällan än så.
