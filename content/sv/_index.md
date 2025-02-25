---
title: STHLM-MESH
---
<style>
#td-cover-block-0 {
  background-image: url(/background-map.png);
}
@media only screen and (min-width: 1200px) {
  #td-cover-block-0 {
    background-image: url(/background-map.png);
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
<a href="https://www.facebook.com/groups/815331140404197" target="_blank" rel="noopener noreferrer">Meshtastic Sweden</a> - en Facebookgrupp för Sverige. Det finns även flertalet [lokala grupper]({{<ref communities.md >}}).
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-discord" title="Vi finns på Discord" %}}
Många av oss finns i kanal `#Sweden` på den officiella 
<a href="https://discord.gg/meshtastic-867578229534359593" target="_blank" rel="noopener noreferrer">Meshtastic Discord</a> servern.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-champagne-glasses" title="Låt träffas!" %}}
Det är alltid trevligt att träffas och prata radio. Kolla in våra [Meetups]({{< ref meetups >}})
{{% /blocks/feature %}}
{{% /blocks/section %}}

{{% blocks/section color="info" %}}
# Våra mål
* <h4>Dela information så som riktlinjer och best practices för nya användare.</h4>
* <h4>Inspirera andra genom att dela information och bilder.</h4>
* <h4>Koordinera utbyggnaden av meshet.</h4>
* <h4>Främja aktivitet i meshet.</h4>

{{% /blocks/section %}}
{{% blocks/section color="primary"  %}}
Kom igång med Meshtastic
{.h1}
För att komma igång rekommenderar vi att följa instruktionerna på den officiella hemsidan: https://meshtastic.org.


{{% alert title="Viktigt" color="success" %}}
Vi använder oss av 868mhz på preset Long Range - Fast.
{{% /alert %}}
{{% /blocks/section %}}

<!-- Det finns garanterat bättre sätt att göra detta på... --> 
<section class="row td-box td-box--white td-box--height-auto" style="padding-bottom: 0px !important;">
<div class="col">
<div class="container">
<h1 id="val-av-enhetsroll">Val av enhetsroll<a class="td-heading-self-link" href="#val-av-enhetsroll" aria-label="Heading self-link"></a></h1>
<p>En enhetsroll i Meshtastic definierar enhetens primära funktion inom nätverket. Varje roll är anpassad för specifika användningsområden och hjälper till att effektivt hantera nätverket och enhetens beteende.</p> 

<p>Att välja rätt roll är avgörande för ett välfungerande meshnätverk. Om enheten har fel roll märks det ofta inte för en själv, men det kan påverka prestandan för hela nätverket. Valet av enhetsroll är också beroende av sin omgivning, det är stor skillnad i hur man väljer roll och inställningar i ett lite och ett stort meshnätverk.</p>

<p>Här är de vanligaste rollerna och under vilka omständigheter de passar in i Stockholms mesh:</p>
</div>
</div>
</section>
<div class="container my-4">
    <div class="row g-4">
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
                <h3 class="card-header"><b>Client Mute</b></h3>
                <img src="/client_mute.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">För portabla noder eller noder som används inomhus. <b>Notera</b>: En nod inställd på Client Mute kan fortfarande skicka och ta emot meddelanden.<p>
                    <a href="/docs/device_role/#client-mute" class="btn btn-primary" style="color: #f9f9f9 !important;">Läs mer</a>
                </div>
            </div>
        </div>
    </div>
</div>