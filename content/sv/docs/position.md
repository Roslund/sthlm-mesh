---
title: Position
weight: 30
---
En nod kan dela sin position till alla andra noder över meshet.
Det gör det möjligt att se hur meshet sträcker sig geografiskt.

För att dela position behövs antingen en GPS-modul eller en ansluten smartphone.
Alternativt kan man sätta en _fixed location_ där man själv anger koordinater eller använder telefonens nuvarande position.


## Position Precision
Som standard kommer din nod inte dela med sig av sin exakta position. Den kommer skicka en position och en noggrannhet. Detta visar sig som en cirkel runt noden på karta, där din nod är någonstans inom den cirkeln.

![](/images/docs/position_precision_circles.jpeg)
Detta gör att du inte avslöjar din exakta adress eller den exakta positionen på din solnod.
Men följddefekten blir att kartan blir väldigt stökig. För noder som använder fixed location så kan man istället sätta den positionen en liten bit ifrån din plats, kanske grannhuset?

**Position precision konfigureras i kanalinställningarna.**

{{% alert title="Uppmärksamma" color="warning" %}}
iPhone-appen har begränsat möjligheten att sätta noggrannhet på position till 1,5 km. Detta då det kan anses vara personlig information enligt GDPR. För att konfigurera högre noggrannhet behöver man använda en annan klient (t.ex. [webbklienten](https://meshtastic.org/docs/software/web-client/) eller [Python CLI](https://meshtastic.org/docs/software/python/cli/))
{{% /alert %}}

## Konfigurera fixed position genom Python CLI
Som iPhone-användare väljer jag att använda [Python CLI](https://meshtastic.org/docs/software/python/cli/) för att konfigurera position.
{{< card code=true lang="yml" >}}
meshtastic --setlat 59.520790 --setlon 17.922659 --setalt 10
meshtastic --set position.position_broadcast_secs 43200
meshtastic --ch-set module_settings.position_precision 32 --ch-index 0
{{< /card>}}

Är din nod kopplad till MQTT och du använder _map report_ finns det även en inställning för position precision där.
{{< card code=true lang="yml" >}}
meshtastic --set mqtt.map_report_settings.position_precision 32
{{< /card>}}
