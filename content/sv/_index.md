---
title: STHLM-MESH
---

{{< blocks/cover title="En Mesh community för Stockholm" image_anchor="top" height="200px" >}}
{{< /blocks/cover >}}


{{% blocks/lead color="primary" %}}
STHLM-MESH är ett community som vekar för ett stabilt Meshtastic-nätverk i Stockholm.
{{% /blocks/lead %}}


{{% blocks/section type="row" %}}

{{% blocks/feature icon="fab fa-facebook" title="Facebook grupp" %}}
[Meshtastic Sweden](https://www.facebook.com/groups/815331140404197)
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-github" title="Contributions welcome!" %}}
We do a [Pull Request](https://github.com/google/docsy-example/pulls)
contributions workflow on **GitHub**. New users are always welcome!
{{% /blocks/feature %}}

{{% blocks/feature icon="fab fa-discord" title="Vi finns på Discord" %}}
På den [officiella discord servern](https://discord.gg/meshtastic-867578229534359593) så hänger i kanal #Sweden
{{% /blocks/feature %}}

{{% /blocks/section %}}


{{% blocks/section %}}
Kom igång med meshtastic
{.h1}
Följ instruktionerna på den officiella hemsidan: https://meshtastic.org

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
{{% blocks/section color="white" %}}
## Senaste medelanden
{{% iframe src="https://meshtastic.roslund.cloud/api/v1/text-messages/embed?gateway_id=3663385928" width="100%" style="min-height:55vh;overflow: hidden;" %}}
{{% /blocks/section %}}


