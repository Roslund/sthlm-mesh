---
title: Neighbor Info
weight: 90
---
[Neighbor Info modulen](https://meshtastic.org/docs/configuration/module/neighbor-info/) samlar information om en nods grannar som den har direktkontakt med (0-hopp). Denna information kan sedan skickas över MQTT eller LoRa.

Informationen kan sedan visualiseras på karttjänster. Liam Cottles karta visar information om varje förbindelse. Utöver SNR visas även en terränggraf från [HeyWhatsThat.com](HeyWhatsThat.com).


{{< figure src="/images/docs/neighbors.png" width="400px" height="300px" >}}

## Neighbor Info Konfiguration
Neighbor Info bör **endast** konfigureras på **statiska noder**, helst de som har kontakt med många andra noder.
För portabla noder som flyttar sig blir Neighbor Info missvisande.

### För noder med MQTT
För noder som har MQTT-uppkoppling kan modulen konfigureras enligt följande:

{{< card code=true lang="yml" >}}
neighbor_info:
    neighbor_info.enabled: True
    neighbor_info.transmit_over_lora: False
    neighbor_info.update_interval: 43200
{{< /card>}}

### För ROUTERS
Att skicka Neighbor Info över LoRa rekommenderas inte, eftersom det använder mycket bandbredd.
Men för vissa noder, särskilt routrar, kan det ändå vara intressant.

I senare versioner av firmware tillåts det inte att skicka Neighbor Info över standardkanaler, t.ex. LongFast.
Denna begränsning fungerar bättre i USA, där de olika kanalerna får sina egna frekvens-slotar. I EU spelar detta dock ingen roll.

För att kringgå denna begränsning måste man ta bort spärren i koden och själv kompilera sin firmware.