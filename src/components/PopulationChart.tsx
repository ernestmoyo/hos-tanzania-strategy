import { useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import { line as d3line, area as d3area } from "d3-shape";
import { REGIONS } from "../lib/model";
import { fmtInt } from "../lib/viz";

const YEARS = [1988, 2002, 2012, 2022] as const;

type Row = {
  region: string;
  series: { year: number; pop: number }[];
  pop2022: number;
  cagr: number; // 2002->2022 compound annual growth
};

export function PopulationChart() {
  const rows = useMemo<Row[]>(() => {
    return REGIONS.map((r) => {
      const series = YEARS.map((y) => ({
        year: y,
        pop: (r as any)[`pop${y}`] as number | null,
      })).filter((d) => d.pop != null) as { year: number; pop: number }[];
      const a = series.find((d) => d.year === 2002)?.pop;
      const b = series.find((d) => d.year === 2022)?.pop;
      const cagr = a && b ? Math.pow(b / a, 1 / 20) - 1 : 0;
      return { region: r.region, series, pop2022: r.pop2022 ?? 0, cagr };
    })
      .filter((r) => r.series.length >= 2)
      .sort((a, b) => b.pop2022 - a.pop2022);
  }, []);

  const [active, setActive] = useState<string>(rows[0]?.region ?? "");

  const W = 720;
  const H = 320;
  const M = { t: 16, r: 16, b: 30, l: 56 };
  const iw = W - M.l - M.r;
  const ih = H - M.t - M.b;

  const x = scaleLinear().domain([1988, 2022]).range([0, iw]);
  const yMax = Math.max(...rows.flatMap((r) => r.series.map((d) => d.pop)));
  const y = scaleLinear().domain([0, yMax]).nice().range([ih, 0]);

  const lineGen = d3line<{ year: number; pop: number }>()
    .x((d) => x(d.year))
    .y((d) => y(d.pop));
  const areaGen = d3area<{ year: number; pop: number }>()
    .x((d) => x(d.year))
    .y0(ih)
    .y1((d) => y(d.pop));

  const activeRow = rows.find((r) => r.region === active);

  // national total trajectory
  const national = YEARS.map((yr) => ({
    year: yr,
    pop: rows.reduce(
      (s, r) => s + (r.series.find((d) => d.year === yr)?.pop ?? 0),
      0
    ),
  }));

  const fastest = [...rows].sort((a, b) => b.cagr - a.cagr).slice(0, 5);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="eyebrow">Regional population · 1988 → 2022</div>
            <div className="mono mt-1 text-xs text-fg-dim">
              4 census rounds · {rows.length} regions · NBS PHC
            </div>
          </div>
          <div className="text-right">
            <div className="mono text-[0.65rem] text-fg-dim">selected</div>
            <div className="text-sm font-semibold text-emerald">{active}</div>
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
          <g transform={`translate(${M.l},${M.t})`}>
            {/* y grid */}
            {y.ticks(4).map((t) => (
              <g key={t} transform={`translate(0,${y(t)})`}>
                <line x1={0} x2={iw} stroke="#1a2527" />
                <text x={-10} dy="0.32em" textAnchor="end" className="mono" fill="#6c807c" fontSize="10">
                  {t >= 1e6 ? `${(t / 1e6).toFixed(1)}M` : `${(t / 1e3).toFixed(0)}k`}
                </text>
              </g>
            ))}
            {/* x labels */}
            {YEARS.map((yr) => (
              <text key={yr} x={x(yr)} y={ih + 20} textAnchor="middle" className="mono" fill="#6c807c" fontSize="10">
                {yr}
              </text>
            ))}
            {/* faint all regions */}
            {rows.map((r) => (
              <path
                key={r.region}
                d={lineGen(r.series) || ""}
                fill="none"
                stroke={r.region === active ? "#2dd4a7" : "#26393b"}
                strokeWidth={r.region === active ? 0 : 1}
                opacity={r.region === active ? 0 : 0.7}
                onMouseEnter={() => setActive(r.region)}
                style={{ cursor: "pointer" }}
              />
            ))}
            {/* active region area + line */}
            {activeRow && (
              <>
                <path d={areaGen(activeRow.series) || ""} fill="url(#g1)" opacity={0.35} />
                <path d={lineGen(activeRow.series) || ""} fill="none" stroke="#2dd4a7" strokeWidth={2.5} />
                {activeRow.series.map((d) => (
                  <circle key={d.year} cx={x(d.year)} cy={y(d.pop)} r={3.5} fill="#2dd4a7" stroke="#0b1011" />
                ))}
              </>
            )}
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4a7" />
                <stop offset="100%" stopColor="#2dd4a7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </g>
        </svg>
        <p className="mono mt-2 text-[0.65rem] text-fg-dim">
          Hover any line to inspect a region. National total grew{" "}
          <span className="text-fg">
            {fmtInt(national[1].pop)} → {fmtInt(national[3].pop)}
          </span>{" "}
          (2002→2022) across these regions.
        </p>
      </div>

      <div className="card p-5">
        <div className="eyebrow">Fastest-growing regions</div>
        <div className="mono mt-1 text-xs text-fg-dim">CAGR 2002–2022 · why static plans go stale</div>
        <div className="mt-4 space-y-2.5">
          {fastest.map((r) => (
            <button
              key={r.region}
              onClick={() => setActive(r.region)}
              className="group w-full"
            >
              <div className="flex items-center justify-between text-sm">
                <span className={r.region === active ? "text-emerald" : "text-fg"}>{r.region}</span>
                <span className="mono text-xs text-gold">{(r.cagr * 100).toFixed(1)}%/yr</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-line">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-emerald-deep to-emerald"
                  style={{ width: `${(r.cagr / fastest[0].cagr) * 100}%` }}
                />
              </div>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-fg-muted">
          A pilot scoped to 2012 demographics is already wrong. Districts in the
          fastest-growing regions need an offline-first design that scales with
          the population, not the map you drew at inception.
        </p>
      </div>
    </div>
  );
}
