---
title: Mesh Status
linkTitle: Status
menu: {main: {weight: 60}}
draft: false
---
<br/>
{{% blocks/section color="white"  %}}

## Text Meddelanden
Antalet meddelande per timme senaste 7 dygnen.
<div style="min-height: 300px;width: 100%;max-width: 1000px;">
    <canvas id="messagesChart"></canvas>
</div>

## Skapade paket per nod
Grafen nedan visar vilka noder som har skickat flest paket under det senaste dygnet. Vidarebefordrade meddelanden och krypterade paket är inte medräknade.
Datat i grafen är endast en uppskattning och bör inte ses som exakt. Graferna bygger på MQTT-data från ett begränsat antal noder.
Eftersom vi har begränsad bandbredd är det viktigt att hålla nere trafiken. En sändningsvolym på max 50–100 paket per dygn är önskvärd.
{{< lazy-img max-width="800px" aspect-ratio="1/1"
src="https://dash.roslund.cloud/render/d-solo/aedo2cbpvy800a/sthlm-mesh?orgId=1&theme=light&panelId=7&width=1000&height=1000&scale=1" >}}

## Packet typer
Fördelningen av olika pakettyper i nätverket under de senaste dygnet. Diagrammet visar hur nätverket används, inklusive meddelanden, positionstelemetri och andra systempaket.
{{< lazy-img max-width="774px" aspect-ratio="774/387"
src="https://dash.roslund.cloud/render/d-solo/aedo2cbpvy800a/sthlm-mesh?orgId=1&theme=light&panelId=6&width=1000&height=500&scale=1" >}}

## Hårdvarumodeller
Antalet enheter av respektive hårdvarutyp som synts i meshet de senaste 30 dagarna.
<div style="width: 100%;max-width: 1000px;">
    <canvas id="hardwareChart"></canvas>
</div>

## Kanalutnyttjande
Den genomsnittliga kanalutnyttjandet i Stockholm under de senaste 7 dygnen. Observera att många noder slutar skicka telemetri vid hög belastning (över 25 %), vilket kan påverka grafens noggrannhet. Trots detta ger gränsvärdena i grafen en god indikation på nätverkets hälsa över tid.

{{< lazy-img max-width="774px" aspect-ratio="774/387"
src="https://dash.roslund.cloud/render/d-solo/edqkge9mf7v28g/main-dashboard?orgId=1&from=now-7d&to=now&theme=light&panelId=23&width=774&height=387&scale=1&tz=Europe%2FStockholm" >}}

## Batteri
Visar den genomsnittliga batteri-nivån i meshet senaste 7 dygnen. Grafen försöker exkludera noder som är inkopplade till en strömkälla och som således inte går på batteri.
{{< lazy-img max-width="774px" aspect-ratio="774/387"
src="https://dash.roslund.cloud/render/d-solo/aedo2cbpvy800a/sthlm-mesh?orgId=1&from=now-7d&to=now&theme=light&panelId=2&width=1000&height=500&scale=1&tz=Europe%2FStockholm" >}}


{{% /blocks/section %}}

{{% blocks/section color=info %}}
## OM
Denna sida använder [Meshtastic-metrics-exporter](https://github.com/tcivie/meshtastic-metrics-exporter) och en privat MQTT broker som samlar in data från ett par noder i Stockholm. 

Graferna laddas från en separat server. Med hjälp av Nginx så cacheas bilderna för att inte överbelasta Grafana instansen. 
Om graferna inte laddas så är det troligtvis för att vi har problem, eller så tror servern att du ansluter från ett annat land, då enbart ett fåtal länder är white-listade.
{{% /blocks/section %}}

<script src="/js/status/messagesChart.js"></script>
<script src="/js/status/hardwareChart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>