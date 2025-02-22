---
title: Mesh Status
linkTitle: Status
menu: {main: {weight: 12}}
draft: false
---
{{% blocks/cover title="Mesh Status Metrics" image_anchor="top" height="min" %}}
{{% /blocks/cover %}}

{{% blocks/section color="white"  %}}
## STHLM-MESH Channel utilization
Genomsnittlig Ch.utl i Stockholm senaste 12 timmarna. Notera att många noder inte sender telemetri när channel utilization är för (25%+) detta gör grafen något missvisande. Men gränsvärdena i grafen visar ändå hur meshen mår över tid.

<style>
  .img-container {
    position: relative;
    width: 100%;
    max-width: 774px; /* Ensures it scales with the parent container */
    height: auto; /* Let the height adjust based on width */
    aspect-ratio: 774/387; /* Maintains aspect ratio */
    background-color: #e0e0e0; /* Placeholder color */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* Ensures no overflow issues */
  }

  .img-container img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
  }

  .img-container img.lazy {
    opacity: 0;
  }

  .img-container img.loaded {
    opacity: 1;
  }
</style>
<div class="img-container">
  <!-- Bootstrap spinner -->
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  <!-- Lazy-loaded image -->
  <img src="https://dash.roslund.cloud/render/d-solo/edqkge9mf7v28g/main-dashboard?orgId=1&theme=light&panelId=23&width=1000&height=500&scale=1" class="lazy" loading="lazy" alt="Lazy Image" onload="this.classList.add('loaded'); this.previousElementSibling.style.display='none';">
</div>
{{% /blocks/section %}}


