---
title: Mesh Status
linkTitle: Status
menu: {main: {weight: 60}}
draft: false
---
<br/>
{{% blocks/section color="white"  %}}

## Text Meddelanden
Antalet meddelanden per timme senaste 7 dygnen. Grafen visar meddelanden som skickats på LongFast kanalen, men även okrypterade meddelanden mellan noder. De meddelanden som skickas går att se [här]({{< ref messages >}}).
<div style="min-height: 300px;width: 100%;max-width: 1000px;">
    <canvas id="messagesChart"></canvas>
</div>


## Skapade paket per nod
Grafen nedan visar vilka noder som har skickat flest paket under det senaste dygnet. 
Graferna bygger på MQTT-data från ett begränsat antal noder.
Eftersom vi har begränsad bandbredd är det viktigt att hålla nere trafiken. En sändningsvolym på max 100 paket per dygn är önskvärd.
<div id="mostActiveNodesContainer" style="min-height: 300px;width: 100%;max-width: 1000px;">
    <canvas id="mostActiveNodes"></canvas>
</div>


## Position Precision
Grafen visar position precision, eller noggrannhet, på de noder som rapporterat sin position de senaste 7 dagarna. 
Vi ser gärna att man använder en noggrannhet på ±182m eller mer. Detta är dock inte möjligt att ställa in i iPhone Appen.
För mer info se vår [dokumentation]({{<ref position.md>}}#position-precision).
<div style="min-height: 300px;width: 100%;max-width: 1000px;">
    <canvas id="positionPrecisionChart"></canvas>
</div>


## Packet typer
Fördelningen av olika pakettyper i nätverket under de senaste dygnet. Diagrammet visar hur nätverket används, inklusive meddelanden, positionstelemetri och andra systempaket.
<div id="portnumDistributionContainer" style="width: 100%;max-width: 1000px;">
    <canvas id="portnumDistribution"></canvas>
</div>


## Hårdvarumodeller
Antalet enheter av respektive hårdvarutyp som synts i meshet de senaste 30 dagarna.
<div id="hardwareChartContainer" style="width: 100%;max-width: 1000px;">
    <canvas id="hardwareChart"></canvas>
</div>


{{% /blocks/section %}}

{{% blocks/section color=info %}}
## OM
Graferna baseras på data från [map.sthlm-mesh.se](https://map.sthlm-mesh.se), där data samlas in från ett par noder i Stockholmsområdet. Data hämtas från API't, som vi dessutom har utökat med fler funktioner för att möjliggöra mer analys. Visualisering sker genom biblioteket [chartjs.org](https://www.chartjs.org/).
{{% /blocks/section %}}

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/js/status/messagesChart.js"></script>
<script src="/js/status/most-active-nodes.js"></script>
<script src="/js/status/hardwareChart.js"></script>
<script src="/js/status/position-precision-chart.js"></script>
<script src="/js/status/portnum-distribution-chart.js"></script>