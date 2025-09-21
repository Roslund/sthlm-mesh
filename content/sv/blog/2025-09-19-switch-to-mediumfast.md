---
title: Övergång till MediumFast den 27 September!
date: 2025-09-19
---
Meshtastic nätverket i Stockholm har vuxit kraftigt under de senaste två åren. Med över 200 dagligt aktiva noder räcker inte längre bandbredden till, även med optimerade inställningar, detta påverkar tillförlitligheten i meshen och flertalet meddelanden når inte fram. 

För att få ett stabilare mesh där vi har möjlighet att fortsätta växa kommer vi gå över från LongFast till MediumFast modulation. Detta innebär bland annat:
- **Snabbare meddelanden**: 3x kortare sändningstid
- **Mindre kollisioner**: Färre störningar och högre leveranssäkerhet
- **Bättre batteritid**: Särskilt viktigt för solcellsdrivna noder
- **Högre nodkapacitet**: Plats för fler noder i nätverket


Bilden nedan visar hur en övergång till MediumFast påverkar förbindelser i meshen. I praktiken förväntar vi oss ännu bättre resultat då risken för kollisioner minskar. Bilden är baserad på data från traceroutes och är inte heltäckande. 

{{< image-compare left="/images/blog/2025-09-19-switch-to-mediumfast-lf.png" right="/images/blog/2025-09-19-switch-to-mediumfast-mf.png" left-alt="LongFast anslutningar" right-alt="MediumFast anslutningar" caption="Jämförelse mellan LongFast (vänster) och MediumFast (höger) anslutningar i Stockholm mesh. Dra reglaget för att se skillnaden." >}}

### Meetup
Vi planerar även att köra en meetup den 1:a oktober för att utvärdera övergången till MediumFast. Förhoppningsvis kan vi fira och fokusera på hur meshet blir ännu bättre i framtiden. Mer info kommer.

### Övergångsstatus till MediumFast
Denna mätare visar hur många noder som har växlat till MediumFast-kanalen av det totala antalet noder som hörts idag.

<div class="container my-3 mx-0" style="max-width: 600px;">
  <div class="row text-center px-0">
    <div class="col">
      <div id="transitionGaugeContainer" class="stats-chart-container" style="height: 300px;">
        <canvas id="transitionGauge"></canvas>
      </div>
    </div>
  </div>
</div>


### Mer teknisk information
För fler tekniska detaljer om MediumFast, läs Meshtastics officiella artikel: [Why Your Mesh Should Switch From LongFast](https://meshtastic.org/blog/why-your-mesh-should-switch-from-longfast/)

### Frågor och svar
##### Behöver jag göra något?
**Ja**, du behöver manuellt uppdatera till MediumFast-preset under LoRa inställningarna. Detta fungerar även över RemoteAdmin för noder på svåråtkomliga platser.


##### Kan jag byta till MediumFast redan nu?
**Ja**, flertalet noder har redan bytt till MediumFast då meshen har fungerat dåligt för dem på LongFast. Dock så är övergången planerad till den 27 september, det är först den helgen många av våra välplacerade routrar kommer gå över. Vill du testa innan dess så är det fritt fram, men det är inte säkert att du når ut.


##### Kan jag köra MediumFast och LongFast samtidigt?
För att göra det behöver du två enheter. Tanken är att vi genomför en övergång från LongFast till MediumFast och inte kör båda samtidigt.


##### Vilken frekvens kör MediumFast på?
__869.400MHz - 869.650MHz__ i Europa är det exakt samma som LongFast. Det fria ISM-frekvensbandet i EU är begränsat och Meshtastic använder hela, både på LongFast och MediumFast. 


##### Kommer enheter på LongFast vidarebefordra meddelanden som skickas på MediumFast?
**Nej**, det är därför vi planerar en gemensam övergång.


##### Riskerar detta inte kortare räckvidd?
Rent teoretiskt kanske? Men även på MediumFast kommer vi klara de 45km långa förbindelser vi har mellan vissa noder i Stockholm. MediumFast är mer lämpad för den stadsmiljö vi har här i Stockholm.
Hela poängen med Meshtastic är att bygga ett meshnätverk. På MediumFast kommer meshet bli stabilare och klara flera hopp tillförlitligt.


##### Hur kan jag se om MediumFast kommer fungera för mig?
MediumFast klarar en Signal to Noise Ratio på `-15dBm` till skillnad mot LongFasts `-20dBm`. Genomför traceroutes till dina närmsta grannar, får du SNR på över `-15dBm` så kommer MediumFast fungera bättre än LongFast.


##### Vilka andra europeiska städer har bytt?
Stockholm följer trenden. Flertalet andra stora europeiska mesh-nätverk har bytt från LongFast med lyckat resultat. Till exempel:
- **Berlin**: [Bytte till MediumFast](https://www.reddit.com/r/meshtastic/comments/1kal6vv/berlin_is_switching_to_mediumfast/)
- **Paris**: [Använder MediumFast](https://wiki.mesh-idf.fr/fr/carte/carte-du-mesh-idf)  
- **Polen**: [Nationell kampanj för MediumFast](https://przejdznamediumfast.pl/)
- **Madrid**: Har bytt till MediumSlow.

Det finns säkert fler som vi inte känner till. Har du koll på andra städer i Europa som har bytt, meddela oss på Discord.


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation"></script>
<script src="/js/status/shared.js"></script>
<script src="/js/status/transition-status-gauge.js"></script>