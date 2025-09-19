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

### Behöver jag göra något?
**Ja**, du behöver manuellt uppdatera till MediumFast-preset under LoRa inställningarna. Detta fungerar även över RemoteAdmin för noder på svåråtkomliga platser.


### Riskerar detta inte kortare räckvidd?
MediumFast klarar en Signal to Noise Ratio på `-15dBm` till skillnad mot LongFasts `-20dBm`. Bilden nedan visar hur en övergång till MediumFast påverkar förbindelser i meshen. I praktiken förväntar vi oss ännu bättre resultat då risken för kollisioner minskar. Bilden är baserad på data från traceroutes och är inte heltäckande. För att se hur du blir påverkad genomför traceroutes till dina närmsta grannar, får du SNR på över `-15dBm` så kommer MediumFast fungera bättre än LongFast.

{{< image-compare left="/images/blog/2025-09-19-switch-to-mediumfast-lf.png" right="/images/blog/2025-09-19-switch-to-mediumfast-mf.png" left-alt="LongFast anslutningar" right-alt="MediumFast anslutningar" caption="Jämförelse mellan LongFast (vänster) och MediumFast (höger) anslutningar i Stockholm mesh. Dra reglaget för att se skillnaden." >}}

### Andra europeiska städer som bytt
Stockholm följer trenden från andra stora europeiska mesh-nätverk:
- **Berlin**: [Bytte till MediumFast](https://www.reddit.com/r/meshtastic/comments/1kal6vv/berlin_is_switching_to_mediumfast/)
- **Paris**: [Använder MediumFast](https://wiki.mesh-idf.fr/fr/carte/carte-du-mesh-idf)  
- **Polen**: [Nationell kampanj för MediumFast](https://przejdznamediumfast.pl/)


### Mer teknisk information
För fler tekniska detaljer om MediumFast, läs Meshtastics officiella artikel: [Why Your Mesh Should Switch From LongFast](https://meshtastic.org/blog/why-your-mesh-should-switch-from-longfast/)