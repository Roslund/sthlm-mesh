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
Många av oss finns i kanal `#Sweden` på den officiella 
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
För att konfigurera din en rekommenderas den officiella appen för <a href="https://apple.co/3Auysep" target="_blank" rel="noopener noreferrer">iOS</a> eller <a href="https://play.google.com/store/apps/details?id=com.geeksville.mesh" target="_blank" rel="noopener noreferrer">Android</a>. \
I Stockholm använder vi kanal-preseten **Long Fast**. \
För mer detaljer om enhetskonfiguration se vår sida: [Rekommenderade Inställningar]({{<ref settings>}}).
{{% /blocks/feature %}}

{{% /blocks/section %}}

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
</section>
<div class="container my-4">
    <div class="row g-4">
        <div class="col-lg-4">
            <div class="card" >
                <h3 class="card-header"><b>Client Mute</b></h3>
                <img src="/client_mute.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">För portabla noder eller noder som används inomhus. <b>Notera</b>: En nod inställd på Client Mute kan fortfarande skicka och ta emot meddelanden.<p>
                    <a href="/docs/device_role/#client-mute" class="btn btn-primary" style="color: #f9f9f9 !important;">Läs mer</a>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card" >
                <h3 class="card-header"><b>Client</b></h3>
                <img src="/client.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">En statisk nod placerad på en bra plats, till exempel en nod monterad på en balkong eller ett hustak.<p>
                    <a href="/docs/device_role/#client" class="btn btn-primary" style="color: #f9f9f9 !important;">Läs mer</a>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card" >
                <h3 class="card-header"><b>ROUTER</b></h3>
                <img src="/router.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">En nod placerad högt upp med fri sikt åt alla håll. Använder en optimerad och väl-testad setup. Måste koordineras med övriga meshet.<p>
                    <a href="/docs/device_role/#router" class="btn btn-primary" style="color: #f9f9f9 !important;">Läs mer</a>
                </div>
            </div>
        </div>
    </div>
</div>