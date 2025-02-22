---
title: Position
weight: 30
---
En nod kan dela sin position till alla andra noder över meshet. 
Det gör det möjligt att se hur meshset sträcker sig geografiskt.

För att dela position behövs antingen en GPS-modul eller en ansluten smartphone.
Alternativt så kan man sätta en _fixed location_  där man själv anger koordinater, eller använder telefonens nuvarande position. 


## Position Precision
Som standard kommer din nod inte dela med sig av sin exakta position. Den kommer skicka en position och en noggrannhet. Detta visar sig som en cirkel runt noden på karta, där din nod är någonstans inom den cirkeln.

![](/images/docs/position_precision_circles.jpeg)
Detta gör att du inte avslöjar din exakta address, eller den exakta positionen på din solnod. 
Men följddefekten blir att kartan blir väldigt stökig. För noder som använder fixed location så kan man istället sätta den positionen en liten bit ifrån din plats, kanske grannhuset?

**Position precision konfigureras i kanalinställningarna.**

{{% alert title="Uppmärksamma" color="warning" %}}
iPhone appen har begränsat möjligheten att sätta noggrannhet på position til 1.5km. Detta då det kan anses personlig information enligt GDPR. För att konfigurera högre noggrannhet så behöver man använda en annan klient (tex: [web klienten](https://meshtastic.org/docs/software/web-client/) eller [Python CLI](https://meshtastic.org/docs/software/python/cli/))
{{% /alert %}}

## Konfigurera fixed position genom Python CLI
Som iPhone användare väljer jag att använda [Python CLI](https://meshtastic.org/docs/software/python/cli/) för att konfigurera position.
{{< card code=true lang="yml" >}}
meshtastic --setlat 59.520790 --setlon 17.922659 --setalt 10
meshtastic --set position.position_broadcast_secs 43200
meshtastic --ch-set module_settings.position_precision 32 --ch-index 0
{{< /card>}}

Är din nod kopplad till MQTT och du använder _map report_ så finns det en position precision inställning även där.
{{< card code=true lang="yml" >}}
meshtastic --set mqtt.map_report_settings.position_precision 32
{{< /card>}}
