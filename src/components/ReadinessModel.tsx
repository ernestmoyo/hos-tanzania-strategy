import { useEffect, useMemo, useRef, useState } from "react";
import { geoIdentity, geoPath } from "d3-geo";
import type { FeatureCollection } from "geojson";
import {
  CRITERIA,
  DEFAULT_WEIGHTS,
  DISTRICTS,
  MODEL_META,
  pickPilots,
  scoreAll,
  type CriterionKey,
  type Weights,
} from "../lib/model";
import {
  fmtInt,
  fmt1,
  scoreRamp,
  popRamp,
  scoreGradientCss,
  popGradientCss,
} from "../lib/viz";

const W = 680;
const H = 720;

type Mode = "score" | "pop";

export function ReadinessModel() {
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [weights, setWeights] = useState<Weights>({ ...DEFAULT_WEIGHTS });
  const [mode, setMode] = useState<Mode>("score");
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(
    null
  );
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetch("/data/districts.geojson")
      .then((r) => r.json())
      .then(setGeo)
      .catch(() => setGeo(null));
  }, []);

  const path = useMemo(() => {
    if (!geo) return null;
    // planar projection (lon/lat as Cartesian, y flipped) — winding-insensitive,
    // so it never mis-renders as a filled frame; fine for a single small country.
    const proj = geoIdentity().reflectY(true).fitSize([W, H], geo);
    return geoPath(proj);
  }, [geo]);

  const paths = useMemo(() => {
    if (!geo || !path) return [];
    return geo.features.map((f) => path(f) || "");
  }, [geo, path]);

  const scored = useMemo(() => scoreAll(weights), [weights]);
  const pilots = useMemo(() => pickPilots(weights), [weights]);
  const pilotIds = useMemo(
    () => new Set([pilots.strong.id, pilots.median.id, pilots.hard.id]),
    [pilots]
  );

  const popMax = useMemo(() => Math.max(...DISTRICTS.map((d) => d.pop2022)), []);

  // rank (quantile) colouring: scores cluster near the median, so a linear
  // stretch would wash out to a single hue. Mapping each district to its rank
  // spreads the full ramp evenly and makes relative readiness legible — and it
  // recomputes live as the weights change.
  const rankFrac = useMemo(() => {
    const order = [...scored].sort((a, b) => a.score - b.score);
    const m = new Map<number, number>();
    order.forEach((d, idx) => m.set(d.id, idx / (order.length - 1)));
    return m;
  }, [scored]);

  const fill = (i: number) => {
    if (mode === "pop")
      return popRamp(Math.pow(DISTRICTS[i].pop2022 / popMax, 0.5));
    return scoreRamp(rankFrac.get(DISTRICTS[i].id) ?? 0);
  };

  const ranked = useMemo(
    () => [...scored].sort((a, b) => b.score - a.score),
    [scored]
  );

  const reset = () => setWeights({ ...DEFAULT_WEIGHTS });

  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* ---- MAP ---- */}
        <div className="relative border-b border-line p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="eyebrow">Tanzania · {MODEL_META.nDistricts} districts</div>
              <div className="mono mt-1 text-xs text-fg-dim">
                {mode === "score"
                  ? "Pilot-readiness score (re-weightable)"
                  : "Population, 2022 census"}
              </div>
            </div>
            <div className="flex gap-1 rounded-lg border border-line bg-ground p-1">
              {(["score", "pop"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`mono rounded px-2.5 py-1 text-xs transition ${
                    mode === m
                      ? "bg-emerald/15 text-emerald"
                      : "text-fg-dim hover:text-fg-muted"
                  }`}
                >
                  {m === "score" ? "Readiness" : "Population"}
                </button>
              ))}
            </div>
          </div>

          {!geo && (
            <div className="flex h-[420px] items-center justify-center text-sm text-fg-dim">
              loading map…
            </div>
          )}

          {geo && (
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className="geo h-auto w-full"
              onMouseLeave={() => setHover(null)}
            >
              {paths.map((d, i) => {
                const isPilot = pilotIds.has(DISTRICTS[i].id);
                return (
                  <path
                    key={i}
                    d={d}
                    fill={fill(i)}
                    stroke={isPilot && mode === "score" ? "#ffffff" : "#070b0d"}
                    strokeWidth={isPilot && mode === "score" ? 2.2 : 0.5}
                    opacity={hover && hover.i !== i ? 0.82 : 1}
                    onMouseMove={(e) => {
                      const r = svgRef.current!.getBoundingClientRect();
                      setHover({
                        i,
                        x: e.clientX - r.left,
                        y: e.clientY - r.top,
                      });
                    }}
                  />
                );
              })}
            </svg>
          )}

          {/* tooltip */}
          {hover && geo && (
            <div
              className="pointer-events-none absolute z-10 w-52 rounded-lg border border-line bg-ink/95 p-3 text-xs shadow-xl backdrop-blur"
              style={{
                left: Math.min(hover.x + 14, W - 60),
                top: hover.y + 14,
                position: "absolute",
              }}
            >
              <div className="font-semibold text-fg">{DISTRICTS[hover.i].name}</div>
              <div className="text-fg-dim">{DISTRICTS[hover.i].region} region</div>
              <div className="mono mt-2 space-y-0.5 text-fg-muted">
                <div className="flex justify-between">
                  <span>pop 2022</span>
                  <span className="text-fg">{fmtInt(DISTRICTS[hover.i].pop2022)}</span>
                </div>
                <div className="flex justify-between">
                  <span>density</span>
                  <span className="text-fg">{fmt1(DISTRICTS[hover.i].density)}/km²</span>
                </div>
                <div className="flex justify-between">
                  <span>readiness</span>
                  <span className="text-emerald">{(scored[hover.i].score * 100).toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}

          {/* legend */}
          <div className="mt-3 flex items-center gap-2">
            <span className="mono text-[0.65rem] text-fg-dim">low</span>
            <div
              className="h-2 flex-1 rounded-full"
              style={{
                background: mode === "score" ? scoreGradientCss : popGradientCss,
              }}
            />
            <span className="mono text-[0.65rem] text-fg-dim">high</span>
            {mode === "score" && (
              <span className="mono ml-2 flex items-center gap-1 text-[0.65rem] text-fg">
                <span className="inline-block h-2 w-2 rounded-sm ring-1 ring-white" />
                pilot pick
              </span>
            )}
          </div>
        </div>

        {/* ---- CONTROLS ---- */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h4 className="display text-xl font-semibold text-fg">
              Re-weight the rubric
            </h4>
            <button
              onClick={reset}
              className="mono rounded-md border border-line px-2.5 py-1 text-xs text-fg-dim transition hover:text-emerald"
            >
              reset
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Drag a criterion and the choropleth, ranking and three pilot picks
            recompute instantly. This is the Task-3 selection rubric made live —
            transparent inputs, no cherry-picking.
          </p>

          <div className="mt-5 space-y-4">
            {CRITERIA.map((c) => (
              <div key={c.key}>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-fg">
                    {c.label}
                    <span
                      className={`mono rounded px-1.5 py-0.5 text-[0.6rem] ${
                        c.kind === "real"
                          ? "bg-emerald/12 text-emerald"
                          : "bg-gold/12 text-gold"
                      }`}
                    >
                      {c.kind}
                    </span>
                  </label>
                  <span className="mono text-xs text-fg-muted">{weights[c.key]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={weights[c.key]}
                  onChange={(e) =>
                    setWeights((w) => ({
                      ...w,
                      [c.key]: Number(e.target.value) as number,
                    }))
                  }
                  className="mt-2 w-full"
                  aria-label={c.label}
                />
                <p className="mono mt-1 text-[0.65rem] leading-snug text-fg-dim">
                  {c.note}
                </p>
              </div>
            ))}
          </div>

          {/* pilot picks */}
          <div className="mt-6 rounded-xl border border-line bg-ground p-4">
            <div className="eyebrow mb-3 text-gold">Recommended 3-district pilot</div>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["strong", pilots.strong, "Show value early"],
                  ["median", pilots.median, "The median case"],
                  ["hard", pilots.hard, "Stress-test design"],
                ] as const
              ).map(([k, d, tag]) => (
                <div key={k} className="rounded-lg border border-line-soft bg-surface p-2.5">
                  <div className="mono text-[0.6rem] uppercase tracking-wide text-gold">
                    {k}
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold text-fg" title={d.name}>
                    {d.name}
                  </div>
                  <div className="mono truncate text-[0.65rem] text-fg-dim">{d.region}</div>
                  <div className="mono mt-1 text-[0.65rem] text-emerald">
                    {(d.score * 100).toFixed(0)} · {fmt1(d.density)}/km²
                  </div>
                  <div className="mt-1 text-[0.6rem] leading-tight text-fg-dim">{tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ranked strip */}
      <div className="border-t border-line bg-ground/60 px-4 py-3 sm:px-6">
        <div className="mono mb-2 text-[0.65rem] uppercase tracking-wide text-fg-dim">
          Top 12 by current weights
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ranked.slice(0, 12).map((d, idx) => (
            <span
              key={d.id}
              className={`mono rounded-md border px-2 py-1 text-[0.7rem] ${
                pilotIds.has(d.id)
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-line bg-surface text-fg-muted"
              }`}
            >
              {idx + 1}. {d.name}
              <span className="ml-1.5 text-fg-dim">{(d.score * 100).toFixed(0)}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
