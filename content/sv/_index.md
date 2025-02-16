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
Rekommendereade inställningar
{.h1}
{{< cardpane >}}
  {{< card header="Device" >}}
    Preset: Long Range - Fast
    Device Role: *Client Mute* eller *Client*
    Ignore MQTT: True
    OK to MQTT: True
    Max Hops: 5
  {{< /card >}}
  {{< card header="Nodinfo och Telemetri" >}}
    Node Info Broadcast Interval: Three Hours
    Position Broadcast Interval: Twelve Hours
    Device Metrics: Six Hours
    Sensor Metrics: Six Hours
    Power Metrics: Six Hours
  {{< /card >}}
  {{< card header="MQTT" >}}
    asdf
  {{< /card >}}
{{< /cardpane >}}
{{% /blocks/section %}}
