# STHLM-MESH

**[STHLM-MESH](https://sthlm-mesh.se)** är webbsida byggd med [Hugo][] och använder [Docsy][] som tema.
Sidan riktar sig till de som är intresserade av LoRa mesh teknologi i allmänhet. Med huvudfokus är det [Meshtastic][] mesh i som omfattar Stockholms området. 

Innehållet skrivs på svenska eller svengelska. Sidan har stöd för flera språk, men att översätta innehållet till engelska är inte prioriterat, då det finns redan massvis med information om Meshtastic på Engelska.

Sidan är hostad genom _GitHub Pages_ och en GitHub Action uppdaterar sidan vid varje commit till `main` branchen. 


## Bidra till projektet
Vi välkomnar om man vill dela med sig av tips & tricks, _best practices_ eller guider.
Sidans innehåll finns i mappen `content`. Innehållet är i markdown och borde vara relativt tillgängligt att uppdatera.
Själva dokumentationen finns under `content/sv/docs/`, det är primärt där vi önskar förslag på innehåll.


## Lokal utveckling i en container
Webbsidan kan enkelt köras inuti en [Docker](https://docs.docker.com/)-container. Detta kräver endast installation av [Docker Desktop](https://www.docker.com/products/docker-desktop) på Windows och Mac, samt [Docker Compose](https://docs.docker.com/compose/install/) på Linux.


1. Bygg containern

   ```bash
   docker compose up --build
   ```
1. Öppna en webbläsare och anslut till `http://localhost:1313` 

1. Du kan nu göra förändringar på innehållet och du ska direkt se resultatet i din webbläsare när du sparat.

För mer information, se [Docker Compose documentation][].

[Meshtastic]: http://meshtastic.org/
[Docsy]: https://github.com/google/docsy
[Hugo]: https://gohugo.io/
[Docker Compose documentation]: https://docs.docker.com/compose/gettingstarted/
