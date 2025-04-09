---
title: Mesh Status
linkTitle: Status
menu: {main: {weight: 60}}
draft: false
---
<br/>
{{% blocks/section color="white"  %}}

## Antal Enheter
<div class="container my-4 mx-0" style="max-width: 1000px;">
  <div class="row text-center px-0">
    <div class="col">
      <h2 class="display-4 text-primary" id="count-1">–</h2>
      <p class="text-muted">Hörts idag</p>
    </div>
    <div class="col">
      <h2 class="display-4 text-warning" id="count-7">–</h2>
      <p class="text-muted">Senaste 7 dagarna</p>
    </div>
    <div class="col">
      <h2 class="display-4 text-success" id="count-30">–</h2>
      <p class="text-muted">Senaste 30 dagarna</p>
    </div>
  </div>
</div>

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

## Enhetsroll
Antalet enheter av respektive Enhetsroll som synts i meshet de senaste 30 dagarna. I större mesh så som Stockholm bör i princip all noder vara `Client` eller `Client Mute`. Enbart ett fåtal `Router` eller `Repeater` behövs. Dessa måste vara placerade extremt strategiskt, till exempel högst upp i en skidbacke. `Router Client` är en avvecklad roll som inte finns längre, men i meshen lever det kvar några noder som inte blivit uppdaterade. För med info see vår [dokumentation]({{<ref device_role.md>}}).
<div id="deviceRolesContainer" style="min-height: 200px;width: 100%;max-width: 1000px;">
    <canvas id="deviceRoles"></canvas>
</div>


## Position Precision
Grafen visar position precision, eller noggrannhet, på de noder som rapporterat sin position de senaste 7 dagarna. 
Vi ser gärna att man använder en noggrannhet på ±182m eller noggrannare. Detta är dock inte möjligt att ställa in i iPhone Appen.
För mer info se vår [dokumentation]({{<ref position.md>}}#position-precision).
<div id="positionPrecisionContainer" style="min-height: 200px;width: 100%;max-width: 1000px;">
    <canvas id="positionPrecisionChart"></canvas>
</div>


## Packet typer
Fördelningen av olika pakettyper i nätverket under de senaste dygnet. Diagrammet visar hur nätverket används, inklusive meddelanden, positionstelemetri och andra systempaket. Sökrutan till höger kan användas för att visa antalet paket av respektive typ för en given nod.

<div class="d-flex justify-content-end m-0 p-0" style="max-width: 1000px">
  <div class="dropdown" style="width: 40%;min-width:400px;">
    <div class="input-group pe-3">
      <input id="nodeSearch" type="text" class="form-control" placeholder="Node Name" autocomplete="off">
      <button id="clearFilterBtn" class="btn btn-outline-info" type="button">✕</button>
    </div>
    <ul id="suggestions" class="dropdown-menu w-100" style="display: none; max-height: 300px; overflow-y: auto; position: absolute; z-index: 1000;"></ul>
  </div>
</div>
<div id="portnumDistributionContainer" style="min-height: 150px;width: 100%;max-width: 1000px;">
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
<script src="/js/status/device-roles.js"></script>
<script src="/js/status/nodes-seen.js"></script>