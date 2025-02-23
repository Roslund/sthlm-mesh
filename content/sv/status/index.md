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

## Packet typer
Fördelningen av olika pakettyper i nätverket under de senaste 12 timmarna. Diagrammet visar hur nätverket används, inklusive meddelanden, positionstelemetri och andra systempaket.
{{< lazy-img max-width="500px" aspect-ratio="1/1"
src="https://dash.roslund.cloud/render/d-solo/edqkge9mf7v28g/main-dashboard?orgId=1&theme=light&panelId=5&width=500&height=500&scale=1" >}}
{{% /blocks/section %}}


