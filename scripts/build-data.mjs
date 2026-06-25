// build-data.mjs
// Derives REAL spatial features for each Tanzanian district from the census
// shapefile (already converted to GeoJSON) and bakes them into a model file the
// app consumes. Everything computed here is REAL (geometry + 2022 census). The
// app layers transparently-labelled MODELLED proxies on top at runtime so the
// readiness rubric can be re-weighted live.
//
// Sources: National Bureau of Statistics 2022 PHC via citypopulation.de;
// admin boundaries from the UVIWADA Tanzania shapefile set.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import area from "@turf/area";
import centroid from "@turf/centroid";
import distance from "@turf/distance";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));

// --- winding fix --------------------------------------------------------
// d3-geo uses spherical winding (RFC7946): exterior rings counter-clockwise,
// holes clockwise. mapshaper's reprojection can emit clockwise exteriors,
// which d3 interprets as "whole world minus a hole" and fills the frame.
// Rewind in place so geoPath renders each district correctly.
const ringArea = (ring) => {
  let s = 0;
  for (let i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    s += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }
  return s / 2; // >0 == counter-clockwise (lat is y-up)
};
const fixRing = (ring, wantCCW) => {
  const ccw = ringArea(ring) > 0;
  if (ccw !== wantCCW) ring.reverse();
};
const rewindPolygon = (poly) =>
  poly.forEach((ring, i) => fixRing(ring, i === 0));
const rewind = (fc) => {
  for (const f of fc.features) {
    const g = f.geometry;
    if (g.type === "Polygon") rewindPolygon(g.coordinates);
    else if (g.type === "MultiPolygon") g.coordinates.forEach(rewindPolygon);
  }
  return fc;
};

const districts = rewind(read("public/data/districts.geojson"));
const regions = rewind(read("public/data/regions.geojson"));

// overwrite the public geojson the app fetches, with corrected winding
fs.writeFileSync(
  path.join(root, "public/data/districts.geojson"),
  JSON.stringify(districts)
);
fs.writeFileSync(
  path.join(root, "public/data/regions.geojson"),
  JSON.stringify(regions)
);

// Dar es Salaam city centre — Ernest's base and the de-facto reference node
// for "remoteness from the centre" (supervision logistics & commercial network).
const DAR = [39.2083, -6.7924];

const feats = districts.features.map((f, i) => {
  const p = f.properties;
  const km2 = area(f) / 1e6; // turf area is m^2
  const cen = centroid(f).geometry.coordinates;
  const pop = Number(p["2022"]) || Number(p.field_7) || 0;
  const density = pop / Math.max(km2, 1); // people / km2
  const distDar = distance(cen, DAR, { units: "kilometers" });
  return {
    id: i,
    name: p.Name,
    region: p.reg_name,
    status: p.status,
    pop2022: pop,
    area_km2: Math.round(km2),
    density: +density.toFixed(1),
    centroid: [+cen[0].toFixed(3), +cen[1].toFixed(3)],
    distToDar_km: Math.round(distDar),
  };
});

// --- normalisation helpers (min-max -> 0..1) -------------------------------
const norm = (vals) => {
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);
  const span = hi - lo || 1;
  return (v) => (v - lo) / span;
};
// log-scale normaliser for heavy-tailed quantities (population, density)
const lnorm = (vals) => {
  const lv = vals.map((v) => Math.log10(Math.max(v, 1)));
  const n = norm(lv);
  return (v) => n(Math.log10(Math.max(v, 1)));
};

const nDensity = lnorm(feats.map((d) => d.density));
const nPop = lnorm(feats.map((d) => d.pop2022));
const nDar = norm(feats.map((d) => d.distToDar_km));

for (const d of feats) {
  // REAL, derived 0..1 features
  d.f_density = +nDensity(d.density).toFixed(4); // urbanicity proxy
  d.f_pop = +nPop(d.pop2022).toFixed(4); // population weight / reach
  d.f_remote = +nDar(d.distToDar_km).toFixed(4); // 1 = far from Dar
  d.f_rurality = +(1 - d.f_density).toFixed(4); // 1 = most rural
}

const regionPop = regions.features
  .map((f) => ({
    region: f.properties.reg_name,
    pop1988: f.properties.pop_1988,
    pop2002: f.properties.pop_2002,
    pop2012: f.properties.pop_2012,
    pop2022: f.properties.pop_2022,
  }))
  .filter((r) => r.pop2022);

const out = {
  generatedAt: "2026-06-25",
  source:
    "Tanzania 2022 Population & Housing Census (NBS) and public administrative boundaries. Geometry features computed with @turf.",
  darReference: DAR,
  nDistricts: feats.length,
  districts: feats,
  regions: regionPop,
};

fs.writeFileSync(
  path.join(root, "src/data/model.json"),
  JSON.stringify(out, null, 0)
);

// quick console summary
const top = [...feats].sort((a, b) => b.density - a.density).slice(0, 3);
const bot = [...feats].sort((a, b) => a.density - b.density).slice(0, 3);
console.log(`✓ ${feats.length} districts processed`);
console.log(`  total pop (sum of districts): ${feats.reduce((s, d) => s + d.pop2022, 0).toLocaleString()}`);
console.log(`  most dense: ${top.map((d) => `${d.name} (${d.density}/km²)`).join(", ")}`);
console.log(`  most sparse: ${bot.map((d) => `${d.name} (${d.density}/km²)`).join(", ")}`);
console.log(`  regions with full census: ${regionPop.length}`);
