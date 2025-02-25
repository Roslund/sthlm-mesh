---
title: Enhetsroller i Meshtastic
linkTitle: Enhetsroll
weight: 20
---
Enhetsrollen i Meshtastic avgör hur en nod fungerar inom nätverket. Varje roll är optimerad för specifika användningsområden och påverkar hur meshnätverket fungerar.

Att välja rätt roll är avgörande för ett välfungerande meshnätverk. Om en enhet har fel roll märks det sällan för användaren själv, men det kan försämra nätverkets prestanda.


## Client
`CLIENT` är _standardrollen_ för Meshtastic och fungerar bäst i de flesta fall. Det är först när nätverket blir större som det blir viktigt att noggrant välja rätt roller.

En nod med rollen `CLIENT` deltar aktivt i meshnätverket och vidarebefordrar meddelanden enligt en [algoritm](https://meshtastic.org/docs/overview/mesh-algo/). Förenklat innebär det att den nod som tar emot ett meddelande med svagast signal styrs att skicka det vidare. Om en Client-nod hör ett meddelande men inte uppfattar att någon annan vidarebefordrar det, kommer den själv att skicka vidare.

I teorin innebär detta att noder längre bort oftast vidarebefordrar först. Men om en `CLIENT`-nod har dålig mottagning, exempelvis om den är placerad inomhus, kan den felaktigt sända vidare innan en mer optimalt placerad nod gör det. Detta kan leda till att nätverkets _hopp_ förbrukas snabbare, vilket begränsar räckvidden.

Därför är det viktigt att `CLIENT`-noder i större meshnätverk placeras väl. **I Stockholm bör de noder som har enhetsroll `CLIENT` vara noder placerade på balkonger och villahustak**.

## Client Mute
`CLIENT_MUTE`-rollen liknar `CLIENT` men med en viktig skillnad – den vidarebefordrar eller routar inga meddelanden. Detta gör den idealisk för större meshnätverk med hög nätverkstrafik, där extra routing kan orsaka överbelastning.

För de som har flera enheter på samma plats rekommenderas att **max en** enhet sätts som `CLIENT` medan resten får rollen CLIENT_MUTE för att minska onödig trafik och optimera nätverkets prestanda.

I Stockholm bör portabla noder och noder man har inomhus primärt vara `CLIENT MUTE`.

## Router
`ROUTER`-rollen är designad för enheter som främst ska vidarebefordra meddelanden till andra enheter på meshet. Denna roll är **ENDAST** lämplig för stationära enheter placerade på extremt strategiska platser.

Routrar vidarebefordrar meddelanden från andra enheter direkt, medan andra noder väntar en liten stund innan de sänder. En strategiskt placerad ROUTER kan öka både räckvidden och stabiliteten i nätverket.

Routrar vidarebefordrar alltid, medan andra roller kan välja att inte vidarebefordra om de hör en granne vidarebefordra först.

För att optimera nätverkets prestanda och undvika kollisioner bör ROUTER-noder placeras så att **så få noder som möjligt når mer än en ROUTER samtidigt.** Detta då om ett meddelanden når flera routrar, så kommer de alla vidarebefordra meddelande samtidigt och störa ut varandra.

{{% alert title="Tips" color="primary" %}}
Sänk `max_hops`. En välplacerad router når långt med bara **ett eller två hopp**. Din router bör nå en nod med MQTT uplink, så att du kan få den telemetri du behöver via [kartan](https://meshtastic.liamcottle.net/)
{{% /alert %}}


## Router Late
`ROUTER_LATE`-rollen är lik `ROUTER`, den vidarebefordrar alla meddelanden, men den gör det under samma tidsfönster som `CLIENT` noder. Detta kan vara mycket användbart i områden där man når ut till meshen, men har svårt att ta emot alla meddelanden. 

## Repeater
REPEATER-rollen fungerar liknande ROUTER-rollen, men går ett steg längre genom att enbart vidarebefordra den meddelanden den tar emot. Den skickar inte ut några paket om sig själv, tex. nod-info.

Detta är en mycket effektiv roll. Men vi rekommenderar istället att använda `ROUTER` med optimerade inställningar, så att noden syns och registreras som en aktiv del av meshnätverket.