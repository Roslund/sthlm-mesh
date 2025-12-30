---
title: Hårdvara
weight: 30
---
Bortsett från skruvar och buntband som kan behövas vid byggen så finns ett gäng nyckelkomponenter som behövs vid byggen av en Meshtastic-nod.

Vi går igenom några av de nedan och vilka som passar bäst för olika områden när man bygger / köper en färdig nod.

{{% alert title="Observera" color="warning" %}}
Du behöver i princip enbart läsa om antenner / mikrokontrollrar om du ämnar att köpa en färdig nod.
{{% /alert %}}

## Mikrokontroller / Styrenhet: 

Mikrokontrollern är hjärtat i verket och du kommer inte särskilt långt utan en.

De mest vanliga brädorna kommer idag med inbyggda sändtagare och oftast följer även en enklare antenn med de.

Det är enklast att koka ner de vanligaste brädorna till de med två sorters processorer, ESP32-baserade och nRF52-baserade.

### ESP32-baserade (Heltec, T-Beam, T-Deck, Station G1/G2 med flera):
- Kraftfull processor som oftast har två kärnor. 
- Hög strömförbrukning.
- Inbyggt WiFi och Bluetooth.
- De flesta enheterna har en liten skärm inbyggd.

### NRF52-baserade (RAK, T-Echo, Seeedstudio Xiao, med flera)
- Extremt låg strömförbrukning.
- Inte särskilt kraftfull processor
- Oftast enbart Bluetooth inbyggt.
- Färdigbyggda enheter kommer enbart med skärm.

__Förenkling, om du ska bygga__:
- Solnod, välj: RAK Wisblock Meshtastic Starter kit
- Portabelnod, välj: Någon RAK-baserad nod
- Balkongnod, välj: Någon ESP32-baserad nod
- Tracker för bil: T-Beam med GPS, RAK med GPS för optimal batteritid.

## Sändtagarkretsar
När du väljer en mikrokontroller för de mest vanligt förekommande syftena så är detta inget du behöver tänka på.
Däremot; Ifall du exempelvis skall installera en nod väldigt nära en mobilmast eller annan störningskälla så är det sannolikt mer viktigt.

Det finns som utgångsläge två modeller av Sändtagare, SX1276 och SX1262.
SX1262 är den kretsen som i dagsläget är mest förekommande, den är mer strömsnål samt har högre uteffekt, denna förekommer i nästan alla hårdvaror.
SX1276 är dock av högre kvalitet, men med något sämre känslighet och uteffekt. 

SX1276 har dock ett ess i rockärmen, och detta är dess utmärkta blockeringsförmåga. När en stark sändare på en närliggande frekvens (mobilmast) sänder så inför detta störningar i kretsen. 
Just specifikt SX1276 har bättre värden i denna kategorin och klarar därmed att fungera bättre i sådana miljöer.


