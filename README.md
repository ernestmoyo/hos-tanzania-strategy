# HOS Tanzania — Launch Strategy

An interactive companion to my Healthcare Solutions Manager recruitment
assignment for **Sand Technologies**: a 90-day strategy to launch the Health
Operating System (HOS) in Tanzania, plus a live spatial model of *where* to
start.

**By Ernest Moyo** — digital-health implementer & data scientist, Dar es Salaam.
`ernestmoyo35@gmail.com`

---

## What's here

- **The operating thesis** — why this is the rare moment a *government-owned*
  platform wins in Tanzania and a donor-style one dies.
- **Task 1 · Stakeholder map** — the two-principal (MoH / PO-RALG) structure that
  most candidates miss, rendered as a Mermaid graph.
- **Task 2 · Relationship strategy** — meeting the skeptical Deputy Minister;
  the five-phase plan and the actual talk track.
- **Task 3 · Operational plan** — an offline-first pilot design **and** a live,
  re-weightable district-readiness model.
- **Task 4 · Crisis management** — the data-privacy news cycle and the memo that
  puts the Ministry, not the vendor, in the lead.
- **Data Lab** — four census rounds (1988–2022) over real Tanzanian geography.

## The data-science layer

The centrepiece is a **pilot-readiness model over all 195 Tanzanian districts**,
computed from the 2022 census and real admin geometry. Move any criterion weight
and the choropleth, the ranking and the three recommended pilot districts
recompute in the browser.

Every input is labelled:

- **`real`** — derived from the census + geometry (population, density, geodesic
  distance to the Dar hub, rurality).
- **`modelled`** — transparent proxies (e.g. density as a connectivity
  stand-in) to be replaced by a SARA readiness assessment at inception.

Council/RMO buy-in — the #1 sustainability factor — is deliberately *not* in the
model: it is assessed in person, not inferred from a map.

### Pipeline

1. Admin boundaries (regions, districts) reprojected to WGS84 and simplified with
   **mapshaper**.
2. `scripts/build-data.mjs` rewinds ring orientation, computes geometry features
   with **@turf** (area, centroid, density, distance-to-Dar), normalises them,
   and bakes `src/data/model.json`.
3. The choropleth renders with **d3-geo** (`geoIdentity`); scoring is recomputed
   client-side so the rubric stays honestly inspectable.

## Run locally

```bash
npm install
npm run data    # regenerate model.json + corrected geojson (optional)
npm run dev
```

## Stack

Vite · React · TypeScript · Tailwind v4 · d3-geo / d3-shape / d3-scale ·
Mermaid · Motion.

## Disclaimer

This work is based on my own experience as a researcher and on publicly
available data, which may need verification. Named officials are current to
Tanzania's November 2025 cabinet. Rwanda/HOS figures are treated as published
claims pending independent corroboration. Census and boundaries: National Bureau
of Statistics 2022 Population & Housing Census and public administrative
boundaries.
