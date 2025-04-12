---
title: Solnoder
weight: 100
---
{{< figure src="/images/docs/solar_nodes/IMG_86552.jpg" width="700px">}}

Att bygga en solnod är både en rolig teknisk utmaning och ett effektivt sätt att förbättra täckningen i meshnätverket.
Många platser som är optimala för att placera en nod saknar ofta strömförsörjning. Oavsett om det är på toppen av ett berg eller ett villatak.

Kanalen [#solar-power](https://discord.com/channels/867578229534359593/970723761013800970) på den officiella Discord serven är en bra källa till tips, inspiration och diskussioner.


## Att bygga en solnod
### Val av LoRa hårdvara
Det är en stor skillnad i strömförbrukning mellan ESP32-baserade och nRF52840-baserade enheter.
Detta har gjort WisBlock RAK4631 som det självklara valet när man bygger en solnod.

### Komponenter
Bamse från Discord har satt ihop en lista och publicerat på [Github](https://github.com/TheBamse/Meshtastic-Solar-Nodes/blob/main/partslist_2025.md).

### Märkning
Det är viktigt att märka din solnod så att det tydligt framgår vad det är, samt kontaktuppgifter. Om polisen eller kommunen får upp ögonen för din nod är det viktigt att dom förstår vad det är. Skulle placeringen inte vara okej har du en chans att få tillbaka noden om den är märkt med kontaktuppgifter. Vill man vara _anonym_ kan man använda sig av en icke personlig mailadress som sedan vidarebefordrar inkommande epost till din privata.

## Placering av solnod
Vi rekommenderar att alltid be om tillstånd innan du placerar ut en solnod.
En nod bör placeras både diskret och oåtkomligt.
Att placera en nod högt upp i en tall är en personlig favorit – det gör den svåråtkomlig och minskar risken för stöld.

Vid placering i träd är det viktigt att antennen kommer upp __över__ trädkronorna, detta genom att exempelvis montera noden på ett rör eller en pinne föra att sedan placeras i trädet.
{{< figure src="/images/docs/solar_nodes/20250301_1506242.jpg" width="300px">}}


{{% alert title="Varning" color="danger" %}}
Solnoder placerade i naturen eller på offentlig plats kan fånga uppmärksamhet av allmänheten, kommunen eller till och med polisen. Flertalet solnoder har försvunnit.
{{% /alert %}}

## Uppdatering av solnod
Både ESP32 och nRF52840 stöder uppdateringar via Bluetooth, vilket gör en bra Bluetooth-antenn särskilt viktig. 
Mina erfarenheter av Bluetooth-uppdateringar har varit blandade, en stark och stabil Bluetooth-signal verkar vara avgörande för en pålitlig uppdatering.

För uppdatering av nRF52840 används appen nRF Connect Device Manager på din smartphone. Den finns på både [App store](https://apps.apple.com/us/app/nrf-connect-device-manager/id1519423539) och [Google play store](https://play.google.com/store/apps/details?id=no.nordicsemi.android.nrfconnectdevicemanager&hl=en&gl=US).

{{% alert title="Varning" color="danger" %}}
OTA-firmwareuppdateringar medför en ökad risk för misslyckande. Om uppdateringsprocessen misslyckas kommer din enhet att lämnas i ett icke-fungerande tillstånd och kräva fysisk åtkomst för åtgärd.
{{% /alert %}}

{{% alert title="Observera" color="warning" %}}
`ROUTER`-rollen aktiverar strömsparläge som standard (endast ESP32). Om du ska uppdatera en `ROUTER` via bluetooth rekommenderas det att använda remote-admin för att tillfälligt ändra roll, uppdatera och sedan återställa den när uppdateringen är klar.
{{% /alert %}}
