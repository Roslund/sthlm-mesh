---
title: Solnoder
weight: 100
---
Att bygga en solnod kan både vara en teknisk kul utmaning och ett effektivt sätt att få bättre täckning i meshet.
Många av de platser som är lämpliga att placera en nod saknar ofta bra sätt för strömförsörjning. Vare sig om det är på toppen av ett berg eller ett villatak. 

Kanalen [#solar-power](https://discord.com/channels/867578229534359593/970723761013800970) på den officiella Discord serven är en bra källa till tips, inspiration och diskussioner.


## Bygga solnod
### Val av LoRa hårdvara
Det är enorm skillnad i strömförbrukningen mellan noder baserade på ESP32 och noder baserade på nRF52840. 
Detta har gjort WisBlock RAK4631 som det självklara valet när man bygger en solnod.

### Komponenter
Bamse från Discord har satt ihop en lista och publicerat på [Github](https://github.com/TheBamse/Meshtastic-Solar-Nodes/blob/main/partslist_2025.md).


## Placering av solnod
Vi rekommenderar att alltid be om tillstånd när man ska placera ut en solnod.
En nod placerar gärna både diskret och oåtkomligt. Högt upp i en tall är en personlig favorit, på så sätt så behöver en utomstående vara väldigt motiverad för att inspektera eller stjäla noden. 

{{% alert title="Uppmärksamma" color="warning" %}}
Solnoder placerade i naturen eller på offentlig plats kan fånga uppmärksamhet av allmänheten, kommunen eller till och med polisen. Flertalet solnoder har försvunnit.
{{% /alert %}}

## Uppdatering av solnod
Både ESP32 och nRF52840 stöder uppdatering över bluetooth. Så det är viktigt även med bra bluetooth antenn. 
Själv har jag haft varierande lycka med uppdateringar över bluetooth, jag misstänker att det är väldigt viktigt att ha bra bluetooth signal.