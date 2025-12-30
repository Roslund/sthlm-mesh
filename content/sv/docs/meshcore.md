---
title: MeshCore
weight: 20
---
Information om MeshCore finns här: https://meshcore.co.uk/ och här: https://github.com/meshcore-dev/

Den grundläggande tjänst som ett MeshCore-nät tillhandahåller är textkommunikation (tjatt/epost) och Telemetri

Ett MeshCore-nät kan innehålla tre nodtyper som alla kan kommunicera med varandra via LoRa

- **Router**: bygger nät genom att reläa meddelanden till andra routrar
- **Room Server**: Tillhandahåller en BBS inkl Router funktioner
- **Companion**: Klientnod som en användare kan ansluta sin mobil eller dator till via BLE, USB eller WiFi. Det finns en variant som stöder kryptering av textmeddelanden.

Varje nodtyp har sin egen firmware som flashas endera 1) via en web-applikation (webgui) eller 2) via kommandoraden (cli)

## 1) Flashning via webgui

Via webgui (https://flasher.meshcore.co.uk/) kan man ange den LoRa-hårdvara man har och vilken nodtyp som skall skapas.

- Companion (klient)
- Repeater
- Room Server

Repeaters och Room Servers konfigureras genom seriell kommunikation med den flashade enheten startad från Web-applikationen.

Companion konfigureras via bluetooth, antingen med mobilapplikationen Meshcore (ios/android) eller över Web-applikationens serieinterface.

Web applikationen kan även användas till att ladda ner den firmware som man sedan vill flasha i en annan miljö, exempelvis en headless Linux-miljö där webapplikationen inte kan användas.

## 2) Flashning via cli

### a) Installera esptool med beroenden

Om man har en LoRa-enhet ansluten till en Raspberry pi headless, måste denna uppdateras med "esptool" för att man ska kunna flasha.

Förutsättningen är att python och pip är installerade och uppdaterade

**Fungerar på Linux Trixie:**

```bash
pip3 install --upgrade esptool --break-system-packages
cd /usr/local/bin
ln -s /home/pi/.local/bin/esptool esptool
```

**Fungerar på Linux bullseye:**

```bash
sudo apt-get install python3-full
sudo apt-get install python3-pip
pip3 install --upgrade pip setuptools wheel
sudo apt-get install libhdf5-dev
sudo apt-get install build-essential libssl-dev libffi-dev python3-dev
pip3 install --upgrade esptool
```

### b) Flashning

Aktuell firmware som laddas ner via Meshcores Web applikationen och flashningen görs med cli kommandot:

```bash
python -m esptool --port /dev/ttyUSB0 write_flash 0x0 Heltec_v3_repeater-v1.9.1-f5f5886-merged.bin
```

Endast en LoRa burk kan vara inkopplad i pajen när man skall flasha.

### c) Konfigurering med hjälp av seriell terminalemulator

CLI konfigurations kommandon via picocom eller annan seriekonsol, exempel:

```bash
picocom /dev/ttyUSB0 -b 115200 --imap lfcrlf
```

**Repeater SK0BU (exempel)**

```
Heltec v3 868 MHz
set name Repeater SK0BU
set lat 59.3477783
set lon 18.0748596
time 17026...  se https://www.epochconverter.com/
(när en Repeater eller Room Server bootas om måste man sätta tiden igen. Kan antingen
göras via cli eller att man loggar in på Repeatern/Room Servern via companium klienten)
set radio 869.618,62.5,8,8
(reboot)
set repeat on
password xxxxx
set advert. interval 60
set flood.advert.interval 3
```

### d) Konfigurering av Companion via mobilen och bluetooth

- Name, lämpligt namn
- Latitude (behöver inte anges om LoRa enheten innehåller GPS)
- Longitude
- Markera "Share Position in Advert"
- **Radio Settings:**
  - EU/UK (Narrow)
  - Frequency 869.618 MHz
  - Bandwidth 62.5 KHz
  - Spreading Factor 8
  - Coding rate 8
  - Transmit Power 22

## Förteckning över cli kommandon

**Repeater & Room Server CLI Reference**

https://github.com/meshcore-dev/MeshCore/wiki/Repeater-&-Room-Server-CLI-Reference
