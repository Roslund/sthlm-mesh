---
title: Realtime Traceroutes på Kartan
date: 2026-01-03
---
<video autoplay loop muted playsinline style="width: 100%; max-width: 500px; height: auto; border-radius: 8px;">
  <source src="/images/blog/2026-01-03-traceroute-demo.mp4" type="video/mp4">
  Din webbläsare stödjer inte video-elementet.
</video>

Kartan är nu uppdaterad med ny funktionalitet för att visa traceroutes i realtid. 

Visningen av traceroutes aktiveras genom att klicka på "layer"-ikonen uppe till höger och sedan aktivera "Traceroutes" i overlay-menyn. 

För att en traceroute ska visas måste samtliga noder som tracerouten går via ha en position på kartan, och någon av våra MQTT-gateways måste ha tagit emot paketet. 

Detta har nu ersatt den tidigare funktionen för att visa historiska traceroutes. Inställningen "Traceroutes Max Age" finns kvar och används för att utnyttja traceroute-data för att visa neighbours och backbone connections.