// Readiness scoring model.
// Each criterion maps a district's REAL spatial features to a 0..1 sub-score.
// MODELLED criteria are derived deterministically from real features and are
// flagged so the UI can label them honestly as proxies to be replaced by a
// SARA readiness assessment at inception.
import modelData from "../data/model.json";

export type District = {
  id: number;
  name: string;
  region: string;
  status: string;
  pop2022: number;
  area_km2: number;
  density: number;
  centroid: [number, number];
  distToDar_km: number;
  f_density: number;
  f_pop: number;
  f_remote: number;
  f_rurality: number;
};

export const DISTRICTS = modelData.districts as District[];
export const REGIONS = modelData.regions as {
  region: string;
  pop1988: number | null;
  pop2002: number | null;
  pop2012: number | null;
  pop2022: number | null;
}[];
export const MODEL_META = {
  generatedAt: modelData.generatedAt,
  source: modelData.source,
  nDistricts: modelData.nDistricts,
};

export type CriterionKey =
  | "need"
  | "reach"
  | "connectivity"
  | "logistics"
  | "solar";

export type Criterion = {
  key: CriterionKey;
  label: string;
  note: string;
  kind: "real" | "modelled";
  score: (d: District) => number;
};

export const CRITERIA: Criterion[] = [
  {
    key: "need",
    label: "Need / rurality",
    note: "Rural, underserved districts score higher. Real, from population density.",
    kind: "real",
    score: (d) => d.f_rurality,
  },
  {
    key: "reach",
    label: "Reach (population)",
    note: "Larger populations mean more patients reached per pilot. Real, 2022 census.",
    kind: "real",
    score: (d) => d.f_pop,
  },
  {
    key: "connectivity",
    label: "Connectivity",
    note: "Density used as a proxy for mobile coverage. Modelled, replace with SARA or network data.",
    kind: "modelled",
    score: (d) => d.f_density,
  },
  {
    key: "logistics",
    label: "Supervision access",
    note: "Closer to the Dar hub means cheaper supportive supervision. Real, geodesic distance.",
    kind: "real",
    score: (d) => 1 - d.f_remote,
  },
  {
    key: "solar",
    label: "Solar feasibility",
    note: "Off-grid rural sites have high solar relevance & potential. Modelled proxy.",
    kind: "modelled",
    score: (d) => 0.55 + 0.35 * d.f_rurality,
  },
];

export type Weights = Record<CriterionKey, number>;

export const DEFAULT_WEIGHTS: Weights = {
  need: 28,
  reach: 16,
  connectivity: 16,
  logistics: 18,
  solar: 10,
};

export function scoreDistrict(d: District, w: Weights): number {
  let num = 0;
  let den = 0;
  for (const c of CRITERIA) {
    const wi = w[c.key];
    num += wi * c.score(d);
    den += wi;
  }
  return den ? num / den : 0;
}

export type Scored = District & { score: number };

export function scoreAll(w: Weights): Scored[] {
  return DISTRICTS.map((d) => ({ ...d, score: scoreDistrict(d, w) }));
}

/**
 * Pick three RURAL pilot districts that deliberately span the readiness range —
 * one strong, one median, one hard — exactly as the written Task-3 rubric argues:
 * test the offline/solar/SMS design against the conditions a national rollout
 * will actually face, while keeping one district likely to show value early.
 */
export function pickPilots(w: Weights): { strong: Scored; median: Scored; hard: Scored } {
  const medianDensity =
    [...DISTRICTS].map((d) => d.density).sort((a, b) => a - b)[
      Math.floor(DISTRICTS.length / 2)
    ];
  const rural = scoreAll(w)
    .filter((d) => d.density <= medianDensity) // rural half only
    .sort((a, b) => b.score - a.score);
  const strong = rural[0];
  const median = rural[Math.floor(rural.length / 2)];
  const hard = rural[rural.length - 1];
  return { strong, median, hard };
}
