---
title: Rekommenderade Inställningar
linkTitle: Inställningar
weight: 10
---
Här listas rekommenderade inställningar för Stockholm. Inställningarna heter olika saker och konfigureras på olika sätt i de olika klienterna. För mer information och detaljer rekommenderas den [officiella dokumentationen](https://meshtastic.org/docs/configuration/).

## LoRa Configuration

| Inställning      | Värde       | Beskrivning |
|------------------|-------------|-------------|
| Region           | EU_868      | Den som primärt används i Sverige och EU |
| Modem Preset     | `LONG_FAST` |             |
| Max Hops         | 4-5         | Försök håll så lågt som möjligt |
| Transmit Enabled | true        | Kan stängas av vid byta antenn [^1] |
| Ignore MQTT      | true        | Vidarebefordra inte meddelanden som kommer från MQTT |
| OK to MQTT       | true        | Kan stängas av föra att inte synas på karttjänsterna [^2] |


[^1]: Det kan vara skadligt för enheten att sända utan antenn.
[^2]: Detta är enbart en vädjan, det finns inget kryptografiskt skydd. Flertalet tjänster ignorerar denna vädjan och publicerar din nod ändå. 

## Device Configuration

| Inställning         | Värde                      | Beskrivning |
|---------------------|----------------------------|-------------|
| Role                | CLIENT_MUTE eller CLIENT   | För mer info, se [enhetsroll]({{% ref device_role.md %}}) |
| Rebroadcast Mode    | ALL                        | Vidarebefordrar även krypterade meddelanden                |
| Node Info Broadcast | 6h                         | Kommer ändå skicka Node info när det efterfrågas[^3]       |

[^3]: Enheten kommer fortfarande att svara ad hoc på NodeInfo-meddelanden när det efterfrågas. 
När en enhet hör ett paket från en nod den ännu inte känner till, kommer den att skicka sin NodeInfo och automatiskt be om ett svar.

## Position
| Inställning         | Värde | Beskrivning        |
|---------------------|-------|--------------------|
| Broadcast Interval  | 12h   | För statiska noder |

Position inställningar är luriga, för mer info se [position]({{% ref position.md %}})


## Telemetry
| Inställning                    | Värde    | Beskrivning        |
|--------------------------------|----------|--------------------|
| Device Metrics Update Interval | 3h       | Battery Level, Voltage, Channel Utilization and Airtime |
| Environment Telemetry Enabled  | false    | 
| Environment Telemetry          | 6h       |
| Power Metrics Enabled          | false    |
| Power Metrics Interval         | 6h       |
| Air Quality Enabled            | false    |
| Air Quality Interval           | 6h       |


Notera att batterinivå är inkluderad i Device Metrics. Power Metrics är enbart till för externa strömsensorer, så som: [MPPT Solar Battery Charger for IoT & Meshtastic](https://www.etsy.com/listing/1609406536/mppt-solar-battery-charger-for-iot)




## Neighbor Info
| Inställning         | Värde    |
|---------------------|----------|
| Enabled             | True     |
| Transmit over LoRa  | False    |
| Update interval     | 1h       |

Om en nod är är uppkopplad mot en MQTT server så kan man skicka neighbor info frekvent.
Om man vill skicka neighbor info över LoRa så bör man inte skicka oftare än var 12:e timme. Dock så är detta begränsat i firmware. För mer detaljer se [Neighbor Info]({{% ref neighbor_info.md %}})