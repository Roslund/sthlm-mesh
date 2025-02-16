---
title: Meetup
linkTitle: Meetup
menu: {main: {weight: 12}}
---

{{% blocks/cover title="About Goldydocs" image_anchor="top" height="min" %}}
A sample site using the Docsy Hugo theme.
{{% /blocks/cover %}}

{{% blocks/section  %}}
## Kommande Meetups

{{% /blocks/section %}}

{{% blocks/section  %}}
## Tidigare meetups:

{{< cardpane >}}
  {{< card >}}
* **Datum:** 2024-09-04
* **Tid:** 17:00 - 22:00
* **Plats:** The Bishops Arms, Sundbyberg
* **Event:** [Facebook](https://www.facebook.com/events/1183504712869737/)
  {{< /card >}}
  {{< card >}}
* **Datum:** 2024-05-05
* **Tid:** 17:00
* **Plats:** Takpark by Urban Deli, Sveavägen 44 
  {{< /card >}}
{{< /cardpane >}}

{{% /blocks/section %}}

{{% blocks/section %}}
{{< card code=true header="All Settings" >}}
device:
    device.node_info_broadcast_secs
    device.rebroadcast_mode
    device.role
position:
    position.fixed_position
    position.position_broadcast_secs
lora:
    lora.bandwidth
    lora.channel_num
    lora.coding_rate
    lora.config_ok_to_mqtt
    lora.frequency_offset
    lora.hop_limit
    lora.ignore_incoming
    lora.ignore_mqtt
    lora.modem_preset
    lora.override_duty_cycle
    lora.override_frequency
    lora.pa_fan_disabled
    lora.region
    lora.spread_factor
    lora.sx126x_rx_boosted_gain
    lora.tx_enabled
    lora.tx_power
    lora.use_preset
mqtt:
    mqtt.address
    mqtt.enabled
    mqtt.encryption_enabled
    mqtt.json_enabled
    mqtt.map_report_settings
    mqtt.map_reporting_enabled
    mqtt.password
    mqtt.proxy_to_client_enabled
    mqtt.root
    mqtt.tls_enabled
    mqtt.username
telemetry:
    telemetry.air_quality_enabled
    telemetry.air_quality_interval
    telemetry.device_update_interval
    telemetry.environment_display_fahrenheit
    telemetry.environment_measurement_enabled
    telemetry.environment_screen_enabled
    telemetry.environment_update_interval
    telemetry.health_measurement_enabled
    telemetry.health_screen_enabled
    telemetry.health_update_interval
    telemetry.power_measurement_enabled
    telemetry.power_screen_enabled
    telemetry.power_update_interval
neighbor_info:
    neighbor_info.enabled
    neighbor_info.transmit_over_lora
    neighbor_info.update_interval
{{< /card >}}
{{% /blocks/section %}}
