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
{{% blocks/section color="info" %}}
# Stockholms mesh går tungt  
Det har tillkommit många nya noder, och det är mycket aktivitet i meshet trots att det är vinter.  
Tyvärr fungerar dock meshet sämre än i somras. Den faktor som påverkar prestandan mest är mängden trafik och hur varje nod är konfigurerad.  

## **Vad kan man göra för att hjälpa till?**  

### **1. Uppdatera firmware**  
Speciellt om du har en version äldre än 2.5.0. Nyare firmware hanterar trafiken mycket bättre.  

### **2. Se till att din nod har rätt roll**  
- **Använd inte** `ROUTER` eller `REPEATER`.  
- Noder på **balkonger** och **villatak** bör vara inställda som `CLIENT`.  
- **Portabla noder** och **inomhusnoder** bör primärt vara `CLIENT_MUTE`.  
- **Om du har flera noder** (t.ex. en på hustaket och en inomhus) kan du experimentera med `ROUTER_LATE`.  

### **3. Skicka Nodeinfo och Telemetri mer sällan**  
Majoriteten av trafiken i meshet består av `nodeinfo`, `telemetri` och `position`. Mindre än 1% av alla paket är textmeddelanden.  

- **Nodeinfo** behöver inte skickas oftare än var **tredje timme**.  
- **Statiska noder** som inte flyttar sig kan skicka sin position mer sällan, t.ex. var **12:e timme**.  
- **Telemetri** – fundera på om du verkligen behöver skicka detta över meshet. Om du gör det, skicka så sällan som möjligt, t.ex. var **6:e timme**.  

### **4. Bonus: Tips för er som har ROUTERs**  
- **Sänk max hops** – en välplacerad router når långt med bara **ett eller två hopp**.  
- Din ROUTER bör nå en nod med MQTT uplink, så att du kan få den telemetri du behöver via [kartan](https://meshtastic.liamcottle.net/)
{{% /blocks/section %}}