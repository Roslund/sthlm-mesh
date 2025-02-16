---
title: MQTT
weight: 80
---
MQTT (Message Queuing Telemetry Transport) är ett protokoll för meddelandeöverföring som ofta används för IoT-kommunikation. Det är designat för att vara effektivt, även i nätverk med låg bandbredd eller hög latens.

Vi använder MQTT för att kunna analysera meshet. Detta gör vi genom att enbart ha _uplink_ igång. På så sätt kan vi tillhandahålla information om meshet som går att analysera med andra verktyg.

Meshtastic har stöd för att använda MQTT för att _brygga_ olika mesh-nätverk.
I Stockholm har vi redan ett stort mesh, och MQTT-trafik skulle snabbt överbelasta meshet.
Därför har vi _downlink_ avstängt samt `lora.ignore_mqtt` aktiverat.

{{% alert title="Uppmärksamma" color="warning" %}}
För att andra ska kunna vidarebefordra dina meddelanden till MQTT måste du ha `lora.config_ok_to_mqtt` aktiverat.
{{% /alert %}}

## MQTT Konfiguration
Vi rekommenderar att man uplinkar till Liam Cottles MQTT-broker och karta.

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
För att skicka information om andra noder i meshet måste _uplink_ slås på i kanalinställningarna.
{{% /pageinfo %}}

### Map report
Map report används för att skicka information om just din nod över MQTT.
Bland annat skickas `position`, `hårdvarumodell`, `firmware version`. 
Även `Online nodes` (senaste 2 timmarna) rapporteras. 
Detta kan dock vara missvisande, eftersom standardintervallet för nodeinfo är 3 timmar och många skickar mycket mer sällan än så.


## MQTT Broakers
Om man är riktigt nördig kan man hosta sin egen MQTT-broker. Detta kan vara användbart, eftersom Liam Cottles broker enbart tillåter uppladdning av data.
Vill man analysera data eller använda andra verktyg kan man därför köra en egen broker.

Den rekommenderade mjukvaran för detta är [mosquitto](https://mosquitto.org).

### MQTT Bridge
En Mosquitto Bridge gör det möjligt att koppla ihop två MQTT-servrar (brokers) så att meddelanden kan flöda mellan dem.
I vårt fall använder vi detta för att vidarebefordra våra meddelanden så att de syns på Liam Cottles karta.

Detta görs genom att lägga till följande rader i din `mosquitto.conf`
{{< card code=true >}}
connection LiamCottle
address mqtt.meshtastic.liamcottle.net
remote_password uplink
remote_username uplink
try_private true
topic # out 0 msh/ msh/
{{< /card>}}

## Verktyg 
* https://github.com/tcivie/meshtastic-metrics-exporter
* http://github.com/liamcottle/meshtastic-map