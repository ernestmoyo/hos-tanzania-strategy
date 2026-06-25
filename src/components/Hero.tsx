import { motion } from "motion/react";

const STATS = [
  ["10+", "yrs in African health systems"],
  ["5", "countries · field-to-ministry loops"],
  ["195", "districts modelled here"],
  ["PhD", "Malaria Atlas Project · Tanzania"],
];

export function Hero() {
  return (
    <section
      id="top"
      className="bg-topo relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-36"
    >
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-emerald/10 blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow mb-5">
            Healthcare Solutions Manager · Recruitment Assignment · Sand Technologies
          </div>
          <h1 className="display max-w-4xl text-4xl font-semibold leading-[1.05] text-fg sm:text-6xl md:text-7xl">
            Launching the Health Operating System in{" "}
            <span className="text-emerald">Tanzania</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            A 90-day strategy to win the Ministry, the frontline and the public,
            built on the real Tanzanian health system and on a live spatial model
            of where to start. By{" "}
            <strong className="font-semibold text-fg">Ernest Moyo</strong>,
            digital-health implementer &amp; data scientist, Dar es Salaam.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#pilot"
              className="rounded-lg bg-emerald px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-emerald/90"
            >
              Explore the readiness model →
            </a>
            <a
              href="#thesis"
              className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-fg-muted transition hover:text-fg"
            >
              Read the strategy
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {STATS.map(([n, l]) => (
            <div key={l} className="bg-ground p-5">
              <div className="display text-3xl font-semibold text-emerald">{n}</div>
              <div className="mt-1 text-xs leading-snug text-fg-dim">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
