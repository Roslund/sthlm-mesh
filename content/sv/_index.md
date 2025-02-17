---
title: STHLM-MESH
---

{{< blocks/cover title="" image_anchor="top" height="med" >}}
{{< /blocks/cover >}}


{{% blocks/lead color="primary" %}}
STHLM-MESH är en informell gemenskap som vekar för ett stabilt Meshtastic-nätverk i Stockholm.
{{% /blocks/lead %}}

{{% blocks/section type="row" %}}
{{% blocks/feature icon="fab fa-facebook" title="Facebook grupp" %}}
<a href="https://www.facebook.com/groups/815331140404197" target="_blank" rel="noopener noreferrer">Meshtastic Sweden</a>
En facebookgrupp för Sverige.
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-discord" title="Vi finns på Discord" %}}
Många av oss finns i kanal `#Sweden` på den officiella 
<a href="https://discord.gg/meshtastic-867578229534359593" target="_blank" rel="noopener noreferrer">Meshtastic Discord</a> servern.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-champagne-glasses" title="Låt träffas!" %}}
Det är alltid trevligt att träffas och prata radio. Kolla in våra Meetups.
{{< ref "meetups" >}}
{{% /blocks/feature %}}
{{% /blocks/section %}}

{{% blocks/section %}}
# Våra mål
* Dela information så som riktlinjer och best practices för nya användare.
* Inspirea andra genom att dela infomration och bilder.
* Koordinera utbygganden av meshet.
* Främja aktivitet i meshen.

{{% /blocks/section %}}
{{% blocks/section %}}
Kom igång med meshtastic
{.h1}
För att komma igång rekomenderar vi att följa instruktionerna på den officiella hemsidan: https://meshtastic.org.


{{% alert title="Viktigt" color="success" %}}
Vi använders oss av 868mhz på LongFast.
{{% /alert %}}


{{% /blocks/section %}}
{{% blocks/section %}}
# Stockholms meshet går tungt
Det har tillkommit många nya noder, och det är mycket aktivitet i meshet trots att det är vinter. 
Men tyvärr så fungerar meshet sämre än i sommras. Det som påverkar meshet prestanda mest är mängden av trafik och hur man konfigurerar sin nod.

### SÅ VAD KAN MAN GÖRA FÖR ATT HJÄLPA TILL?

#####  1. Uppdatera firmware
Speciellt om man ligger under 2.5.0. Nyare firmware hanterar trafiken mycket bättre.

#####  2. Se till att din nod har rätt roll.
Använd inte ROUTER eller REPEATER.
Noder på ballkonger och villahustak bör vara satt till CLIENT
Portabla noder och noder man har innomhus bör primärt vara CLIENT MUTE.
Har man en setup med flera noder, till exempel en nod på hustaket och sen noder innomhus, så kan man experementera med ROUTER_LATE.

#####  3. Skicka Nodeinfo och Telemetri mer sällan.
Majoriteten av trafiken i meshen är nodeinfo, telemetri och position. Under 1% av alla paket är text-medelanden.
Nodeinfo behöver inte skickas oftare än var 3:e timme. En statisk nod som inte flyttar sig behöver inte skicka ut sin position särskilt ofta, jag kör med var 12:e timme.
Gällande telemetri så fundera en extra gång varför du behöver skicka telemetri över meshen. OM man ska köra telemetri så skicka så sällan som möjligt, jag tänker att var 6:e timme är lagom

#####  4. Bonus tips för er som har ROUTERs
Sänk max hops. Har du en väl placerad router så bör den nå åt väldigt långt med bara ett hopp eller två. Din ROUTER bör direkt kunna nå en nod som har MQTT uplink igång, på så sätt kan du få den telemetri du behöver genom kartan: https://meshtastic.liamcottle.net/
{{% /blocks/section %}}
