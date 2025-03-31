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

## Position Precision
Grafen visar position precision, eller noggrannhet, på de noder som rapporterat sin position de senaste 7 dagarna. 
Vi ser gärna att man använder en noggrannhet på ±182m eller mer. Detta är dock inte möjligt att ställa in i iPhone Appen.
För mer info se vår [dokumentation]({{<ref position.md>}}#position-precision).
<div style="min-height: 300px;width: 100%;max-width: 1000px;">
    <canvas id="positionPrecisionChart"></canvas>
</div>


## Hårdvarumodeller
Antalet enheter av respektive hårdvarutyp som synts i meshet de senaste 30 dagarna.
<div id="hardwareChartContainer" style="width: 100%;max-width: 1000px;">
    <canvas id="hardwareChart"></canvas>
</div>

{{% /blocks/section %}}

{{% blocks/section color=info %}}
## OM
Majoriteten av graferna baseras på data från [map.sthlm-mesh.se](https://map.sthlm-mesh.se), där data samlas in från ett par noder i Stockholmsområdet. Data hämtas från API't, som vi dessutom har utökat med fler funktioner för att möjliggöra mer analys. Visualisering sker genom biblioteket [chartjs.org](https://www.chartjs.org/).

Vissa av graferna är genererade av  [Meshtastic-metrics-exporter](https://github.com/tcivie/meshtastic-metrics-exporter) som är kopplad mot en annan privat MQTT broker. Graferna laddas från en separat server. Med hjälp av Nginx så cacheas bilderna för att inte överbelasta Grafana instansen. Dessa grafer jobbar vi på att ersätta med våra egna.
{{% /blocks/section %}}

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/js/status/messagesChart.js"></script>
<script src="/js/status/hardwareChart.js"></script>
<script src="/js/status/position-precision-chart.js"></script>