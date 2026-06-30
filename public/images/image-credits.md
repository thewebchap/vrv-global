# VRV Global — Image Credits & Sourcing

All imagery on the VRV Global website is either (a) supplied by VRV Global, or
(b) free-to-use under a licence that permits commercial website use. No
copyrighted images are used without permission.

## How images are wired

- The central registry is [`lib/images.ts`](../../lib/images.ts). Most slots
  point at **local, commodity-relevant photography** in this folder; a few
  fall back to royalty-free Unsplash CDN links.
- Product/section image paths also live in `data/*` (e.g. `productDetails.ts`,
  `productSegments.ts`, `productEcosystem.ts`, `heroSlides.ts`, `caseStudies.ts`).
- To swap an image, replace the file in `/public/images/...` (keep the filename)
  or update the `src` in the registry/data file — the keys stay the same.

## Current local images

| File | Subject | Source / Licence |
| --- | --- | --- |
| `hero/natural-rubber.jpg` | Natural rubber plantation / latex | Wikimedia Commons (CC BY-SA 4.0) |
| `hero/responsible-metals.jpg` | Industrial / responsible metals | Wikimedia Commons (CC BY-SA) |
| `hero/circular-economy.jpg` | Recovered scrap / circular flows | Wikimedia Commons (CC0) |
| `hero/singapore-global-network.jpg` | Singapore global network | Free commercial use |
| `hero/sustainable-global-trade.jpg` | Cargo / global trade & logistics | Free commercial use |
| `products/agro-commodities.jpg` | Rubber tapping / agro origin | Wikimedia Commons (CC BY-SA 4.0) |
| `products/metals.jpg` | Aluminium billets | Wikimedia Commons (CC BY-SA 4.0) |
| `products/ferrous-metals.jpg` | Steel coils | Wikimedia Commons (CC BY-SA 2.0) |
| `products/circular-economy.jpg` | Scrap-metal recycling yard | Wikimedia Commons (CC0) |
| `products/biomass.jpg` | Wood chips / biomass | Wikimedia Commons (CC BY-SA 4.0) |
| `products/nuts-spices.jpg` | Spices / pulses | Wikimedia Commons (CC BY-SA 4.0) |
| `case-studies/natural-rubber-traceability.jpg` | Rubber traceability case study | Wikimedia Commons (CC BY-SA) |
| `case-studies/metals-documentation-flow.jpg` | Metals documentation case study | Wikimedia Commons (CC BY-SA) |

A small number of secondary slots (trade-finance desk, leadership/boardroom,
governance documents, careers team) still use Unsplash
(https://unsplash.com/license — free, commercial use, no attribution required).

## Recommended folders for new VRV photography

When real, premium photography is available, drop optimized files (`.webp`/`.jpg`,
reasonably compressed, cropped for cards/hero) into:

```
/public/images/commodities/rubber/    rubber-plantation-latex-tapping.jpg, natural-rubber-processing-bales.jpg, ...
/public/images/commodities/metals/    copper-cathodes-warehouse.jpg, aluminium-ingots-industrial.jpg, ...
/public/images/sustainability/        sustainable-sourcing-farmer-engagement.jpg, traceability-field-inspection.jpg, ...
/public/images/logistics/             cargo-shipment-port-containers.jpg, commodity-trading-logistics-warehouse.jpg, ...
/public/images/farmers/               rubber-farmer-field-inspection.jpg, ...
/public/images/case-studies/          <slug>.jpg
/public/images/news/                  <category>-default.jpg
```

Then point the matching `src` in `lib/images.ts` (or the relevant `data/*` file)
at the new path. Use descriptive filenames and meaningful `alt` text — never
"image", "photo", "banner" or "sustainability image".

### Sourcing rules
- Use only VRV-supplied images, or images licensed for commercial website use
  (e.g. Unsplash, Pexels, Wikimedia Commons CC BY-SA / CC0 with attribution here).
- Record the source/licence for every new image in this file.
- Keep files web-optimized to avoid large GitHub pushes / Vercel build issues.
