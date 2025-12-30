---
title: Laddkretsar
weight: 50
---

## Laddningskretsar
För dig som tittar på att ladda dina noder effektivt så rekommenderar vi dig starkt att använda en extern laddningskrets för dina batterier. 
Oftast är mikrokontrollrarnas inbyggdna laddningskretsar extremt begränsade (50-100mA per timme), något som kan sätta spiken i kistan för en annars välfungerande solnod.

### TP4056:
En alldeles utmärkt laddningskrets för både USB-laddning och Solcellsladdning. [PDF](https://www.digikey.in/htmldatasheets/production/2049110/0/0/1/TP4056.pdf)

* Inbyggd laddningskurva för Litiumbatterier, och trappar ner laddströmmen för att skydda cellerna rätt.
* Laddström (0.5A - 1A)

### VoltaicEnclosures - [MPPT Solar Battery Charger](https://www.etsy.com/se-en/listing/1609406536/mppt-solar-battery-charger-for-iot)
Designad för Meshtastic, perfekt för seriösa solcellsnoder. Men kanske lite väl dyr...

* Hanterar de flesta batterikemier (LTO, NA+, LifePo4, Li-ion, ...)
* Laddström: 1A
* Inbyggd INA3221 I2C sensor för att övervaka strömmen från solcellen, batteriet och den externa enheten.