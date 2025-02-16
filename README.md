# STHLM-MESH

https://sthlm-mesh.se är statik sida byggd med [Hugo][] och avnänder [Docsy][] som tema.
Sidan riktar sig till LoRa mesh teknoligi i stockholms området. Primärt fokus är [Meshtastic][] , men vi är öppna för andra teknologier.

Innehållet skrivs på svenska eller svengelska. Sidan har stöd för multipla språk, men det är inget vi är redo att utforska än.

Sidan är hostad genom _GitHub Pages_ och en GitHub Action uppdaterar sidan vid varje commit till `main` barnchen. 

## Contributing
Vi välkomnar om man vill dela med sig av tips & triks, best practises eller guider.
Sidans inntehåll finns i mappen `content`. Innehållet är i markdown och borde vara relativt tillgängligt att uppdatera.
Själva dokumentationen finns under `content/sv/docks/`, det är primärt där vi önskar förslag på innehåll.


## Running a container locally
You can run docsy-example inside a [Docker](https://docs.docker.com/)
container, the container runs with a volume bound to the `docsy-example`
folder. This approach doesn't require you to install any dependencies other
than [Docker Desktop](https://www.docker.com/products/docker-desktop) on
Windows and Mac, and [Docker Compose](https://docs.docker.com/compose/install/)
on Linux.

1. Build the docker image

   ```bash
   docker-compose up --build
   ```
1. Verify that the service is working.

   Open your web browser and type `http://localhost:1313` in your navigation bar,
   This opens a local instance of the docsy-example homepage. You can now make
   changes to the docsy example and those changes will immediately show up in your
   browser after you save.

For more information see the [Docker Compose documentation][].

[Meshtastic]: http://meshtastic.org/
[Docsy]: https://github.com/google/docsy
[Hugo]: https://gohugo.io/
[Docker Compose documentation]: https://docs.docker.com/compose/gettingstarted/
