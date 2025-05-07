---
title: Mesh Status
linkTitle: Status
menu: {main: {weight: 60}}
draft: false
---
<br/>
{{% blocks/section color="white"  %}}

## Antal Enheter
<div class="container my-3 mx-0" style="max-width: 1000px;">
  <div class="row text-center px-0">
    <div class="col">
      <h2 class="display-4 text-primary fw-bold" id="count-1">–</h2>
      <p class="text-muted">Hörts idag</p>
    </div>
    <div class="col">
      <h2 class="display-4 text-warning fw-bold" id="count-7">–</h2>
      <p class="text-muted">Senaste 7 dagarna</p>
    </div>
    <div class="col">
      <h2 class="display-4 text-success fw-bold" id="count-30">–</h2>
      <p class="text-muted">Senaste 30 dagarna</p>
    </div>
  </div>
</div>

## Text Meddelanden
Antalet meddelanden per timme senaste 7 dygnen. Grafen visar meddelanden som skickats på LongFast kanalen, men även okrypterade meddelanden mellan noder. De meddelanden som skickas går att se [här]({{< ref messages >}}).
<div class="stats-chart-container" style="min-height:300px;">
    <canvas id="messagesChart"></canvas>
</div>


## Skapade paket per nod
Grafen nedan visar vilka noder som har skickat flest paket under det senaste dygnet. 
Graferna bygger på MQTT-data från ett begränsat antal noder.
Eftersom vi har begränsad bandbredd är det viktigt att hålla nere trafiken. En sändningsvolym på max 100 paket per dygn är önskvärd.
<div id="mostActiveNodesContainer" class="stats-chart-container">
    <canvas id="mostActiveNodes"></canvas>
</div>


## Packet typer
Fördelningen av olika pakettyper i nätverket under de senaste dygnet. Diagrammet visar hur nätverket används, inklusive meddelanden, positionstelemetri och andra systempaket. Sökrutan till höger kan användas för att visa antalet paket av respektive typ för en given nod.

<div class="d-flex justify-content-end m-0 p-0" style="max-width: 1000px">
  <div class="dropdown" style="width: 40%;min-width:300px;">
    <div class="input-group pe-3">
      <input id="nodeSearch" type="text" class="form-control" placeholder="Node Name" autocomplete="off">
      <button id="clearFilterBtn" class="btn btn-outline-info" type="button">✕</button>
    </div>
    <ul id="suggestions" class="dropdown-menu w-100" style="display: none; max-height: 300px; overflow-y: auto; position: absolute; z-index: 1000;"></ul>
  </div>
</div>
<div id="portnumDistributionContainer" class="stats-chart-container">
    <canvas id="portnumDistribution"></canvas>
</div>


## Enhetsroll
Antalet enheter av respektive Enhetsroll som synts i meshet de senaste 30 dagarna. I större mesh så som Stockholm bör i princip all noder vara `Client` eller `Client Mute`. Enbart ett fåtal `Router` eller `Repeater` behövs. Dessa måste vara placerade extremt strategiskt, till exempel högst upp i en skidbacke. `Router Client` är en avvecklad roll som inte finns längre, men i meshen lever det kvar några noder som inte blivit uppdaterade. För mer info see vår [dokumentation]({{<ref device_role.md>}}).
<div id="deviceRolesContainer" class="stats-chart-container">
    <canvas id="deviceRoles"></canvas>
</div>


## Position Precision
Grafen visar position precision, eller noggrannhet, på de noder som rapporterat sin position de senaste 30 dagarna. 
Vi ser gärna att man använder en noggrannhet på ±182m eller noggrannare. Detta är dock inte möjligt att ställa in i iPhone Appen.
För mer info se vår [dokumentation]({{<ref position.md>}}#position-precision).
<div id="positionPrecisionContainer" class="stats-chart-container">
    <canvas id="positionPrecisionChart"></canvas>
</div>

## Firmware versioner
Antalet enheter av firmware version som synts i meshet de senaste 30 dagarna. Information om firmware information skickas inte över meshet. Men vi kan se om en enhet kör en gammal firmware version genom att kolla efter ["ok_to_mqtt" bitten](https://github.com/meshtastic/firmware/pull/4643)  som infördes i [2.5.0.9ac0e26](https://github.com/meshtastic/firmware/releases/tag/v2.5.0.9ac0e26).
<div id="firmwareVersionContainer" class="stats-chart-container">
    <canvas id="firmwareVersionChart"></canvas>
</div>


## Batteri
Visar genomsnittlig batterinivå av de noder som rapporterat batteri nivå och inte har fast strömförsörjning.
<div id="batteryContainer" class="stats-chart-container" style="min-height:300px;">
    <canvas id="batteryChart"></canvas>
</div>


## Channel Utilization
Visar den genomsnittliga Channel Utilization, det vill säga hur mycket radiofrekvensen används, baserat på rapporter från enheter i meshen. Eftersom enheter inte skickar telemetri när kanalutnyttjandet är högt kan siffran bli missvisande. Detsamma gäller för portabla enheter eller enheter som är placerade inomhus. Förhoppningsvis ger grafen ändå ett värdefullt underlag för att förstå hur meshen mår.
<div id="channelUtilizationContainer" class="stats-chart-container" style="min-height:300px;">
    <canvas id="channelUtilizationChart"></canvas>
</div>


## Hårdvarumodeller
Antalet enheter av respektive hårdvarutyp som synts i meshet de senaste 30 dagarna.
<div id="hardwareChartContainer" class="stats-chart-container">
    <canvas id="hardwareChart"></canvas>
</div>


{{% /blocks/section %}}

{{% blocks/section color=info %}}
## OM
Graferna baseras på data från [map.sthlm-mesh.se](https://map.sthlm-mesh.se), där data samlas in från ett par noder i Stockholmsområdet. Data hämtas från API't, som vi dessutom har utökat med fler funktioner för att möjliggöra mer analys. Visualisering sker genom biblioteket [chartjs.org](https://www.chartjs.org/).
{{% /blocks/section %}}

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation"></script>
<script src="https://cdn.jsdelivr.net/npm/luxon"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon"></script>
<script src="/js/status/shared.js"></script>
<script src="/js/status/messagesChart.js"></script>
<script src="/js/status/most-active-nodes.js"></script>
<script src="/js/status/hardwareChart.js"></script>
<script src="/js/status/position-precision-chart.js"></script>
<script src="/js/status/portnum-distribution-chart.js"></script>
<script src="/js/status/device-roles.js"></script>
<script src="/js/status/nodes-seen.js"></script>
<script src="/js/status/firmware-versions.js"></script>
<script src="/js/status/battery-stats.js"></script>
<script src="/js/status/channel-utilization.js"></script>