---
title: Hårdvara
weight: 100
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

## Batteri:
{{% alert title="Varning" color="danger" %}}
Hantera LiPo och Li-Ion-celler med försiktighet! De är högst reaktiva och känsliga för punktering / kortslutning.
{{% /alert %}}
Precis som med en mikrokontroller så kommer man inte särskilt långt utan ström från ett batteri, såvida det inte är en fast inkopplad nod.

Det finns en hel uppsjö med alternativ att välja från, men för de flesta rekommenderas att man börjar med Litiumjon-celler (Li-Ion) eller Litiumpolymer (LiPo).

- Litiumpolymer (LiPo):
  En vanligt förekommande batterityp. Utformningen är nästan alltid en platt påse av metall som är väldigt lättpunkterad, så hanteras försiktigt!
  De har en dräglig energidensitet, men har primärt hög urladdningsström och kommer i olika behändiga former som passar väl i handhållna enheter.

- Litiumjon (Li-Ion): 
  Likväl som LiPo en vanligt förekommande batterityp, primärt i elfordon, ficklampor och äldre laptopbatterier. Kommer i princip alltid som cylindriska celler (18650, 21700) som är lite mer lätthanterliga.
  De har en högre energidensitet än LiPo, men passar inte i alla enheter lika bra.

- Nickelmetallhydrid (NiMH):
  Väldigt vanligt förekommande batterityp som används i hem världen över. De är oftast laddningsbara men nackdelen är att enskilda celler nästan aldrig är kompatibla med moderna elektroniska enheters spänningskrav.
  De är väldigt säkra däremot, och det finns syfte för de (Primärt för vinterdrift) som gör att de hamnar här.

- Litiumtitanat (LTO):
  Väldigt dyr celltyp enbart för de som ämnar att bygga de mest extrema noderna. Kan laddas i -40C, däremot kräver de speciella laddningskretsar, samt har lägre energidensitet.
  Dessa används militärt för bland annat arktiska syften.

## Solceller
När det kommer till solcellsnoder så finns det en uppsjö med alternativ, men här rundar vi ner till de vanligaste typerna och mest förekommande spänningarna.

### Monokristallina Solceller:
Det överlägset bästa alternativet för solcellsladdning
- Bättre laddning vid lågt ljus.
- Längre livslängder.
- Högre uteffekt per area.

### Polykristallina solceller:
Billigare paneler än Monokristallina men fungerar ändå väl
- Sämre uteffekt
- Aningen lägre livslängd
- Lägre uteffekt per area.

### Spänningsnivåer på Solceller
För de flesta mikrokontrollrarna med inbyggd laddning så är det solceller på 5/6-volt som du skall leta efter. 
På detta sätt behöver du färre ytterligare komponenter och de kostar även mindre.

För dig som tittar på laddning med 12V-paneler eller högre spänningar så finns det givetvis vinster med det såsom högre uteffekter (och därmed snabbare laddning med rätt kretsar). Däremot är kostnaden högre, inte bara på panelerna men på step-up/down-kretsar och effektiv spänningsomvandling.

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

