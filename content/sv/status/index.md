---
title: Mesh Status
linkTitle: Status
menu: {main: {weight: 12}}
draft: false
---
{{% blocks/cover title="Mesh Status Metrics" image_anchor="top" height="min" %}}
Grafer och statistic specifikt för Stockholm's meshen.
{{% /blocks/cover %}}

{{% blocks/section color="white"  %}}
## Kanalutnyttjande
Den genomsnittliga kanalutnyttjandet i Stockholm under de senaste 12 timmarna. Observera att många noder slutar skicka telemetri vid hög belastning (över 25 %), vilket kan påverka grafens noggrannhet. Trots detta ger gränsvärdena i grafen en god indikation på nätverkets hälsa över tid.

{{< lazy-img max-width="774px" aspect-ratio="774/387"
src="https://dash.roslund.cloud/render/d-solo/edqkge9mf7v28g/main-dashboard?orgId=1&theme=light&panelId=23&width=774&height=387&scale=1" >}}


## Batteri
Visar den genomsnittliga batteri-nivån i meshet senaste 7 dagarna. Grafen försöker exkludera noder som är inkopplade till en strömkälla och som således inte går på batter.
{{< lazy-img max-width="774px" aspect-ratio="774/387"
src="https://dash.roslund.cloud/render/d-solo/aedo2cbpvy800a/sthlm-mesh?orgId=1&from=now-7d&to=now&theme=light&panelId=2&width=1000&height=500&scale=1" >}}


## Packet typer
Fördelningen av olika pakettyper i nätverket under de senaste 12 timmarna. Diagrammet visar hur nätverket används, inklusive meddelanden, positionstelemetri och andra systempaket.
{{< lazy-img max-width="500px" aspect-ratio="1/1"
src="https://dash.roslund.cloud/render/d-solo/edqkge9mf7v28g/main-dashboard?orgId=1&theme=light&panelId=5&width=500&height=500&scale=1" >}}
{{% /blocks/section %}}

{{% blocks/section color=info %}}
## OM
Denna sida använder [Meshtastic-metrics-exporter](https://github.com/tcivie/meshtastic-metrics-exporter) och en privat MQTT broker som samlar in data från ett par noder i Stockholm. 

Graferna laddas från en separat server. Med hjälp av en Nginx så cacheas bilderna för att inte överbelasta Grafana instansen. 
Om graferna inte laddas så är det troligtvis för att vi har problem, eller så tror servern att du ansluter från ett annat land, då enbart ett fåtal länder är white-listade.
{{% /blocks/section %}}
