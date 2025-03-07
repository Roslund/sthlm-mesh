---
title: Kartor
weight: 80
---
Det finns massvis med olika karttjänster, vi rekommenderar Liam Cottles karta:
https://meshtastic.liamcottle.net/

  <a href="https://meshtastic.liamcottle.net/"><img src="/featured-background-map.png" width="50%"></a>

{{% alert title="Uppmärksamma" color="warning" %}}
För att tillåta andra noder publicera din nod på kartan behöver `lora.config_ok_to_mqtt` vara aktiverat.
{{% /alert %}}

Kartan är ett fantastik verktyg för att analysera meshen, man kan se vart olika noder finns. vilka noder som har vilken roll. Klickar man på en nod och visar detaljer så får man grafer över telemetri. Kartan kan visa vilka noder som har kontakt med vilka genom [neighbor info]({{< ref "neighbor_info.md" >}}) modulen.

En lite mer okänd funktion är att kartan kan visa de meddelanden som skickas okrypterat. Klicka på någon av de noder som har MQTT uplink igång (de gröna) och välj "Show Full Details", sedan "Gated Msgs". Detta är ett bra sätt att analysera vilka noder som hör de meddelanden du skickar. Det kan även används för att hålla koll på vad som skrivs när man inte är ansluten till sin nod.

För att själv bidra med information till kartan för instruktionerna på följande sida:
[MQTT Konfiguration]({{< ref "mqtt.md#mqtt-konfiguration" >}})


## Community hostade forks
Liam Cottle har publicerat källkoden och instruktioner på sin [GitHub](https://github.com/liamcottle/meshtastic-map). 
Detta har lett till att flertalet entusiaster hostar sina egna instanser eller forks:
* https://karta.meshat.se/
* https://meshtastic.roslund.cloud/



## Övriga karttjänster
* https://meshmap.net
* https://map.meshtastic.org