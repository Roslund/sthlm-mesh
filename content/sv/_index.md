---
title: STHLM-MESH
---
<style>
#td-cover-block-0 {
  background-image: url(/featured-background-map.png);
}
@media only screen and (min-width: 1200px) {
  #td-cover-block-0 {
    background-image: url(/featured-background-map.png);
  }
}
</style>
<section id="td-cover-block-0" class="row td-cover-block td-cover-block--height-med">
</section>


{{% blocks/lead color="meshtastic-green" %}}
STHLM-MESH är en informell gemenskap som verkar för ett stabilt Meshtastic-nätverk i Stockholm.
{{% /blocks/lead %}}

{{% blocks/section type="row" color="white" %}}
{{% blocks/feature icon="fab fa-facebook" title="Facebook grupp" %}}
<a href="https://www.facebook.com/groups/815331140404197" target="_blank" rel="noopener noreferrer">Meshtastic Sweden</a> - en Facebookgrupp för Sverige. Det finns även flertalet [lokala grupper]({{<ref communities.md>}}).
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-discord" title="Vi finns på Discord" %}}
Anslut till vår <a href="https://discord.gg/gchSzHkPGG" target="_blank" rel="noopener noreferrer">Discord server</a>.
Många av oss finns även i kanal `#Sweden` på den officiella 
<a href="https://discord.gg/meshtastic-867578229534359593" target="_blank" rel="noopener noreferrer">Meshtastic Discord</a> servern.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-champagne-glasses" title="Låt oss träffas!" %}}
Det är alltid trevligt att träffas och prata radio. Kolla in våra [Meetups]({{<ref meetups.md>}}).
{{% /blocks/feature %}}
{{% /blocks/section %}}

{{% blocks/section color="info" %}}
# Våra mål
* <h4>Dela information så som riktlinjer och best practices för nya användare.</h4>
* <h4>Inspirera andra genom att dela information och bilder.</h4>
* <h4>Koordinera utbyggnaden av meshet.</h4>
* <h4>Främja aktivitet i meshet.</h4>

{{% /blocks/section %}}

{{% blocks/lead color="meshtastic-green" %}}
Kom igång med Meshtastic
{.h1}
För att komma igång rekommenderar vi att följa instruktionerna på den officiella hemsidan: https://meshtastic.org.
{{% /blocks/lead %}}

{{% blocks/section type="row" color="info" %}}
{{% blocks/feature icon="fa-walkie-talkie" title="Införskaffa enhet" %}}
Det finns enheter för olika frekvensband, i Sverige och inom EU är det **868Mhz** som används. \
Några populära enheter:
<a href="https://store.rakwireless.com/products/wisblock-meshtastic-starter-kit?variant=43884034621638" target="_blank" rel="noopener noreferrer">RAK4631</a>, 
<a href="https://www.seeedstudio.com/SenseCAP-Card-Tracker-T1000-E-for-Meshtastic-p-5913.html" target="_blank" rel="noopener noreferrer">Seeed Studio T1000-E</a>, 
<a href="https://heltec.org/project/wifi-lora-32-v3/?attribute_pa_band=863-870mhz&attribute_need-plastic-shell=No" target="_blank" rel="noopener noreferrer">Heltec LoRa 32 v3</a>, 
<a href="https://lilygo.cc/products/t-deck-plus-1?variant=44897766506677" target="_blank" rel="noopener noreferrer">LILYGO T-Deck Plus</a>, 
<a href="https://lilygo.cc/products/t-beam?variant=44907400102069" target="_blank" rel="noopener noreferrer">LILYGO T-Beam</a>.\
Mer information <a href="https://meshtastic.org/docs/hardware/devices" target="_blank" rel="noopener noreferrer">här</a>.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-microchip" title="Flasha firmware" %}}
När du fått din enhet behöver Meshtastic programvaran laddas på. \
Detta görs enklast via en dator: <a href="https://flasher.meshtastic.org" target="_blank" rel="noopener noreferrer">Flasher</a>. \
Vi rekommenderar den senaste betan, men titta tillbaka regelbundet då utvecklingen går snabbt.
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-app-store-ios" title="Konfigurera med appen" %}}
För att konfigurera din enhet rekommenderas den officiella appen för <a href="https://apple.co/3Auysep" target="_blank" rel="noopener noreferrer">iOS</a> eller <a href="https://play.google.com/store/apps/details?id=com.geeksville.mesh" target="_blank" rel="noopener noreferrer">Android</a>. \
I Stockholm använder vi kanal-preseten **Medium Range - Fast**. \
För mer detaljer om enhetskonfiguration se vår sida: [Rekommenderade Inställningar]({{<ref settings>}}).
{{% /blocks/feature %}}

{{% /blocks/section %}}


<section class="row td-box td-box--dark td-box--height-auto">
    <div class="col">
        <div class="container">
            <h1 id="enheter">Enheter<a class="td-heading-self-link" href="#enheter" aria-label="Heading self-link"></a></h1>
            <p>Här hittar du rekommendationer på enheter för olika behov – oavsett om du vill bygga en egen nod från grunden, behöver något plug-and-play, eller söker en lösning för familj och vänner som inte är lika teknikintresserade.</p>
            <p>Listan täcker både färdiga produkter och byggsatser från populära tillverkare inom LoRa- och Meshtastic-communityn. För varje enhet har vi lyft fram viktiga egenskaper, användningsområden, och länkar till var du kan köpa dem.</p> 
        </div>
    </div>
    <div class="container">
    <!-- Row 1 -->
    <div class="row align-items-center mb-5">
      <div class="col-4 col-md-2 d-flex justify-content-end mb-3">
        <img src="/images/hardware-icons/rak4631_case.png" class="img-fluid">
      </div>
      <div class="col-md-10">
        <h2>RAKwireless</h2>
        RAKwireless erbjuder både färdiga enheter och komponenter för dig som vill bygga egna noder. Bland de färdiga modellerna finns 
        <a href="https://store.rakwireless.com/products/wismesh-pocket">WisMesh Pocket V2</a>, 
        den nya <a href="https://store.rakwireless.com/products/wismesh-board-one-meshtastic-node?variant=44500173881542">WisMesh Board ONE</a>, 
        samt den kompletta solcellsdrivna noden <a href="https://store.rakwireless.com/products/wismesh-meshtastic-solar-repeater?variant=44485612765382">WisMesh Repeater</a>.</p>
        <p>För dig som föredrar att bygga själv finns en mängd moduler och tillbehör. En särskild favorit i communityn är RAK4631, kombinerad med antingen RAK19003 eller RAK19007. Dessa används flitigt i hemmabyggen, särskilt bland entusiaster med tillgång till 3D-skrivare.</p>
        <p>Observera att dessa enheter saknar WiFi, det finns tilläggsmoduler för Ethernet och PoE.</p>
        <p>RAKwireless säljer via sin egen <a href="https://store.rakwireless.com/collections/meshtastic">hemsida</a> samt på <a href="https://rakbitmall.aliexpress.com/store/2805180">AliExpress</a>. <a href="https://pileupdx.com/product-category/brands/rak-wireless/">PileupDX</a> är en svensk återförsäljare, vilket är ett bra alternativ om du vill slippa importavgifter och få snabbare leverans.</p>
      </div>
    </div>
    <!-- Row 2 -->
    <div class="row align-items-center mb-5">
      <div class="col-4 col-md-2 d-flex justify-content-end mb-3">
        <img src="/images/hardware-icons/tracker-t1000-e.png" class="img-fluid">
      </div>
      <div class="col-md-10">
        <h2>Seeed Studio T1000-E</h2>
        <p>T1000-E från Seeed Studio är en kompakt, tålig och lättanvänd enhet med inbyggd GPS och temperatursensor. Den är IP65-klassad och ungefär lika stor som ett kreditkort.</p>
        <p>Tack vare sina små mått och enkelhet är T1000-E ett utmärkt val för vardagsbruk – både för entusiaster och för familjemedlemmar som inte vill grotta ner sig i teknik. Den passar lika bra i jackfickan som i ryggsäcken, och är ett bra alternativ att alltid ha med sig.</p>
        <p>Trots sitt kompakta format och relativt lilla batteri levererar den upp till två dygns batteritid i läget CLIENT_MUTE, vilket är tillräckligt för de flesta mobila användningsfall.</p>
        <p><a href="https://www.seeedstudio.com/SenseCAP-Card-Tracker-T1000-E-for-Meshtastic-p-5913.html">🛒 seeedstudio.com/SenseCAP-Card-Tracker-T1000-E</a></p>
      </div>
    </div>
    <!-- Row 3 -->
    <div class="row align-items-center mb-5">
      <div class="col-4 col-md-2 d-flex justify-content-end mb-3">
        <img src="/images/hardware-icons/t-deck.png" class="img-fluid">
      </div>
      <div class="col-md-10">
        <h2>LilyGo T-Deck Plus</h2>
        <p><a href="https://lilygo.cc/products/t-deck-plus-1?variant=45002348724405">T-Deck Plus</a>  från LilyGo är en fristående kommunikationsenhet som fungerar helt utan smartphone. Den har ett inbyggt 2000 mAh-batteri som ger cirka en dags driftstid, och passar särskilt bra för dig som vill vara självständig från mobilen.</p>
        <p>Enheten har inbyggd GPS. Som tillval vid beställning kan man välja stöd för extern antenn via SMA-kontakt. 
        Det ska även vara möjligt matt montera i efterhand med hjälp av en SMA-pigtail-anslutning och ett breakout i höljet.</p>
        <p>LilyGo är kända för sitt breda utbud av LoRa-kompatibla enheter, som exempelvis 
        <a href="https://lilygo.cc/products/t3s3-v1-0?variant=42586879721653">T3-S3</a>,
        <a href="https://lilygo.cc/products/t-beam?variant=42204034990261">T-Beam</a>,
        <a href="https://lilygo.cc/products/t-echo-lilygo?variant=44875727470773">T-Echo</a> och 
        <a href="https://lilygo.cc/products/t-watch-s3">T-Watch</a>.
        Deras produkter säljs både via den officiella webbplatsen och på AliExpress.</p>
      </div>
    </div>
    <!-- Row 4 -->
    <div class="row align-items-centermb-5">
      <div class="col-4 col-md-2 d-flex justify-content-end mb-3">
        <img src="/images/hardware-icons/heltec-v3-case.png" class="img-fluid" style="object-fit: contain;">
      </div>
      <div class="col-md-10">
        <h2>Heltec LoRa 32 (V3)</h2>
        <p>Heltec LoRa 32 (V3) är en prisvärd enhet som passar perfekt för nybörjare. Den kombinerar en kraftfull ESP32-processor med det moderna LoRa-radiokretsen SX1262</p>
        <p>Enheten har inbyggd WiFi, Bluetooth samt en liten OLED-display för lokal visning av data. Tack vare möjligheten att ansluta en extern antenn är den flexibel nog att användas både stationärt och portabelt.</p>
        <p>Enheten säljs oftast utan batteri, men enheten har stöd för batteri och det finns plats i skalet. Det är dock viktigt att känna till att batteritiden är begränsad, särskilt i mobila tillämpningar, eftersom ESP32 är relativt strömkrävande jämfört med andra plattformar.</p>
        <p>Heltec LoRa 32 (V3) går att köpas från ca 250kr, Heltec säljer även flertalet andra populära enheter.</p>
      </div>
    </div>
  </div>
</section>


<!-- Det finns garanterat bättre sätt att göra detta på... --> 
<section class="row td-box td-box--white td-box--height-auto" style="padding-bottom: 0px !important;">
<div class="col">
<div class="container">
<h1 id="val-av-enhetsroll">Val av enhetsroll<a class="td-heading-self-link" href="#val-av-enhetsroll" aria-label="Heading self-link"></a></h1>
<p>En enhetsroll i Meshtastic definierar enhetens primära funktion inom nätverket. Varje roll är anpassad för specifika användningsområden och hjälper till att effektivt hantera nätverket och enhetens beteende.</p> 

<p>Att välja rätt roll är avgörande för ett välfungerande meshnätverk. Om enheten har fel roll märks det ofta inte för användaren själv, men det kan påverka hela nätverkets prestanda negativt. Valet av enhetsroll är också beroende av sin omgivning, det är stor skillnad i hur man väljer roll och inställningar i ett lite och ett stort meshnätverk.</p>

<p>Här är de vanligaste rollerna och under vilka omständigheter de passar in i Stockholms mesh:</p>
</div>
</div>
<div class="container my-4">
    <div class="row g-4">
        <div class="col-lg-4">
            <div class="card" >
                <h3 class="card-header"><b>Client Mute</b></h3>
                <img src="/client_mute.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">För portabla noder eller noder som används inomhus. <b>Notera</b>: En nod inställd på Client Mute kan fortfarande skicka och ta emot meddelanden.<p>
                    <a href="/docs/meshtastic/device_role/#client-mute" class="btn btn-primary" style="color: #f9f9f9 !important;">Läs mer</a>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card" >
                <h3 class="card-header"><b>Client</b></h3>
                <img src="/client.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">En statisk nod placerad på en bra plats, till exempel en nod monterad på en balkong eller ett hustak.<p>
                    <a href="/docs/meshtastic/device_role/#client" class="btn btn-primary" style="color: #f9f9f9 !important;">Läs mer</a>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card" >
                <h3 class="card-header"><b>ROUTER</b></h3>
                <img src="/router.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">En nod placerad högt upp med fri sikt åt alla håll. Använder en optimerad och väl-testad setup. Måste koordineras med övriga meshet.<p>
                    <a href="/docs/meshtastic/device_role/#router" class="btn btn-primary" style="color: #f9f9f9 !important;">Läs mer</a>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
