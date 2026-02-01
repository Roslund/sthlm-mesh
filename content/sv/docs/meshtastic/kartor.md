---
title: Kartor
weight: 80
---
Kartan är ett fantastik verktyg för att analysera meshen. STHLM-MESH har en egen [fork](https://github.com/roslund/meshtastic-map/) av Liam Cottle's karta, där vi gjort massvis med anpassningar för att bättre kunna analysera meshen i stokholm.


## Connections
Connections-lagret visar vilka noder som har kontakt med varandra. Data baseras primärt på data från traceroutes. Det visar aggregerad signalstyrka över tid och ersätter neighbours-lagret.

### Datainsamling
Extraherar "edges" (anslutningar) från traceroute-paket (portnum 70)
Endast paket där want_response = false (svarspaket, inte förfrågningar)
Lagrar: från-nod, till-nod, SNR, nodernas positioner vid skapandet, packet_id, channel_id, gateway_id

### Visning på kartan
Ett "Connections"-lager i overlay-menyn
En linje per nodpar (bidirektionell, inga pilar)
Färg baserad på sämsta genomsnittliga SNR (grön ≥ -5dB, gul > -15dB, röd ≤ -15dB)
### Aggregering
Beräknar genomsnittlig SNR per riktning över en tidsperiod som går att specificera i inställningarna.

Visar de senaste 5 unika edges per riktning (deduplicerar samma packet_id från flera gateways)
Räknar totalt antal unika paket per riktning

### Positionstillstånd
Visar endast connections där båda noderna fortfarande är på samma position som när edgen skapades. Om en nod flyttats visas inte edges från den gamla positionen.

### Tooltip-information
Nodnamn för båda riktningarna
Genomsnittlig SNR per riktning
Totalt antal edges per riktning
De senaste 5 edges per riktning med SNR, tid och källa (Traceroute eller Neighbourinfo)
Avstånd mellan noderna
Terrainprofilbild från HeyWhatsThat

### Inställningar:
* "Connections Time Period" i inställningar (15 min–30 dagar, standard 7 Dagar)
Styr vilken tidsperiod som används för aggregering

## Traceroutes
Visar traceroutes i realtid

## Backbone och backbone connections
Ett lager tänkt för att kunna visa enbart de infrastruktur-noder som håller ihop meshet. Vilka noder som kallificeras som "Backbone" är manuellt hårdkodat. Har du en mycket bra infrastruktur-nod säg till i Discord så kan vi överväga att lägga till den.