---
title: Mesh Status
linkTitle: Status
menu: {main: {weight: 60}}
draft: false
---
<br/>
{{% blocks/section color="white"  %}}

<style>
@media (max-width: 576px) {
  #channelToolbar { top: 16px !important; }
}
</style>

<div id="channelToolbar" class="d-flex justify-content-end sticky-top" style="top: 84px;">
  <div class="btn-toolbar bg-white shadow-sm rounded-3 py-2 px-2" role="toolbar" aria-label="Channel toolbar">
    <div class="btn-group btn-group-sm me-2" role="group" aria-label="Channel filter">
      <input type="radio" class="btn-check" name="btnchannel-nodes" id="filterChannelAll" autocomplete="off" checked>
      <label class="btn btn-outline-primary" for="filterChannelAll">Alla</label>
    </div>
    <div class="btn-group btn-group-sm me-2" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnchannel-nodes" id="filterChannelMediumFast" data-channel="MediumFast" autocomplete="off">
      <label class="btn btn-outline-primary" for="filterChannelMediumFast">MediumFast</label>
      <input type="radio" class="btn-check" name="btnchannel-nodes" id="filterChannelLongFast" data-channel="LongFast" autocomplete="off">
      <label class="btn btn-outline-primary" for="filterChannelLongFast">LongFast</label>
    </div>
    <div data-bs-toggle="tooltip" data-bs-placement="left" title="Filtrera på kanal eller visa alla.">
      <span class="badge rounded-pill bg-dark">?</span>
    </div>
  </div>
</div>

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


## Kanalutnyttjande
Mätarna visar genomsnittligt kanalutnyttjande för de 10 noder som har högst kanalutnyttjande. Kanalutnyttjande (Channel Utilization) visar hur mycket av radiokanalen som är upptagen. Under 15–20% är allt normalt, över 25% får Telemetri lägre prioritet, vilket kan ge längre tid mellan uppdateringar. Runt 40% stryps positionsuppdateringar. Här i EU gäller dessutom max 10% sändtid per timme som kan pausa sändningar helt.

<div class="container my-3 mx-0" style="max-width: 1000px;">
  <div class="row text-center px-0">
    <div class="col-md-6 mb-4">
      <h5 class="text-muted mb-3">LongFast</h5>
      <div id="longfastGaugeContainer" class="stats-chart-container" style="height: 300px;">
        <canvas id="longfastGauge"></canvas>
      </div>
      <div id="longfastLegend" class="mt-3" style="font-size: 0.85rem;"></div>
    </div>
    <div class="col-md-6">
      <h5 class="text-muted mb-3">MediumFast</h5>
      <div id="mediumfastGaugeContainer" class="stats-chart-container" style="height: 300px;">
        <canvas id="mediumfastGauge"></canvas>
      </div>
      <div id="mediumfastLegend" class="mt-3" style="font-size: 0.85rem;"></div>
    </div>
  </div>
</div>
<div id="channelUtilizationContainer" class="stats-chart-container" style="min-height:300px;">
    <canvas id="channelUtilizationChart"></canvas>
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
Antalet enheter av firmware version som synts i meshet de senaste 30 dagarna. Information om firmware information skickas inte över meshet. Men det går att härleda till viss del utifrån vilken information de paket som skickas innehåller.
<div id="firmwareVersionContainer" class="stats-chart-container">
    <canvas id="firmwareVersionChart"></canvas>
</div>

## Max antal hopp
Visar fördelningen av konfigurerade max-hopp för noder som synts de senaste 30 dagarna. För att värna om meshens stabilitet bör man använda ett så lågt antal max hops som möjlig. Används traceroute funktionen för att se hur många hops det krävs för dig att nå olika noder.
<div id="maxHopsContainer" class="stats-chart-container">
    <canvas id="maxHopsChart"></canvas>
</div>

## Unmessagable
Visar antalet noder som är markerade som "unmessagable" respektive "messagable" baserat på de senaste 30 dagarnas aktivitet. Inställningen "unmessagable" används för att identifiera oövervakade infrastrukturnoder så att meddelanden inte skickas till noder som aldrig kommer att svara. Noder som inte har denna inställning definierad räknas som "messagable" eftersom denna egenskap infördes i version 2.6.8.

<div id="isUnmessagableContainer" class="stats-chart-container">
    <canvas id="isUnmessagableChart"></canvas>
</div>

## OK to MQTT
Visar antalet noder som har "ok_to_mqtt" aktiverad eller avstängd under de senaste 30 dagarna. Flaggan är en begäran om att paket inte ska vidarebefordras till MQTT-servrar och karttjänster som sthlm-mesh. Begäran behöver dock inte respekteras. För att undvika exponering på karttjänster bör man använda krypterade kanaler istället för att dela information publikt.
Äldre firmware skickar inte denna flagga och behandlas som falskt värde.

<div id="isOkToMqttContainer" class="stats-chart-container">
    <canvas id="isOkToMqttChart"></canvas>
</div>

## Batteri
Visar genomsnittlig batterinivå av de noder som rapporterat batteri nivå och inte har fast strömförsörjning.
<div id="batteryContainer" class="stats-chart-container" style="min-height:300px;">
    <canvas id="batteryChart"></canvas>
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
<script src="/js/status/channel-utilization-gauges.js"></script>
<script src="/js/status/is-unmessagable-chart.js"></script>
<script src="/js/status/is-ok-to-mqtt-chart.js"></script>
<script src="/js/status/max-hops-chart.js"></script>
<script>
  // Initialize Bootstrap tooltips (delegated) so static and dynamic elements work
  document.addEventListener('DOMContentLoaded', function () {
      if (window.bootstrap && typeof window.bootstrap.Tooltip === 'function') {
          new window.bootstrap.Tooltip(document.body, {
              selector: "[data-bs-toggle='tooltip']",
              container: 'body'
          });
      } else {
          console.warn("Bootstrap Tooltip not available; falling back to native titles.");
      }
  });
</script>