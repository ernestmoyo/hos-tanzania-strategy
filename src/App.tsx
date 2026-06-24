import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { Mermaid } from "./components/Mermaid";
import { Reveal } from "./components/Reveal";
import { Callout, Quote, CardItem } from "./components/UI";
import { ReadinessModel } from "./components/ReadinessModel";
import { PopulationChart } from "./components/PopulationChart";
import { MODEL_META } from "./lib/model";
import {
  stakeholderChart,
  engagementChart,
  offlineChart,
  crisisChart,
  roadmapChart,
} from "./data/charts";

export default function App() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      const el = document.getElementById(id);
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "auto" }));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />

      {/* ---------------- THESIS ---------------- */}
      <Section
        id="thesis"
        kicker="Operating thesis"
        title={
          <>
            Tanzania is at the rare moment when a{" "}
            <span className="text-emerald">government-owned</span> platform wins —
            and a donor-style one dies.
          </>
        }
        lede="Everything below follows from one read of the timing."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <CardItem badge="The shock" badgeTone="rose" title="Donor money collapsed in 2025">
              The US aid freeze and PEPFAR drawdown removed roughly a quarter to a
              half of planned HIV resources — on a response that was{" "}
              <strong>~90% US-funded</strong>. Vertical donor programmes are
              suddenly fragile.
            </CardItem>
          </Reveal>
          <Reveal delay={0.08}>
            <CardItem badge="The pivot" badgeTone="emerald" title="Tanzania funds its own systems">
              AI, telemedicine, teleradiology and HIS strengthening went into
              Tanzania's <strong>own 2026/27 budget (TZS 1.8 trillion)</strong>,
              and Universal Health Insurance began enrolling households from{" "}
              <strong>26 January 2026</strong>.
            </CardItem>
          </Reveal>
          <Reveal delay={0.16}>
            <CardItem badge="The opening" badgeTone="gold" title="HOS becomes a national priority">
              That shift — from donor-dependent verticals to government-owned,
              data-driven systems — is precisely the gap HOS fills.{" "}
              <strong>But only if it is demonstrably owned, funded and controlled
              by Tanzania.</strong>
            </CardItem>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6">
            <Callout tone="emerald" title="Why I wrote this against the real system, not a generic one">
              I live in Dar es Salaam and I'm doing a PhD with the Malaria Atlas
              Project here. Tanzania held a general election in October 2025 and
              President Samia Suluhu Hassan named a restructured cabinet on 17
              November 2025 — <strong>several health officials changed</strong>.
              I've used post-reshuffle names and flagged what I'd re-verify on day
              one. Treating <em>"the system just changed"</em> as part of the
              homework is itself the answer.
            </Callout>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- TASK 1 ---------------- */}
      <Section
        id="stakeholders"
        taskTag="TASK 1 · Stakeholder map"
        kicker="Who can say yes"
        title="Tanzania runs health on two principals — get that wrong and the project dies."
        lede="Most candidates draw one Ministry of Health at the top. Under decentralisation-by-devolution, the facilities where ~90% of patient contacts happen aren't MoH's at all."
      >
        <Reveal>
          <Mermaid chart={stakeholderChart} />
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Reveal>
            <CardItem badge="The structural fact" badgeTone="indigo" title="MoH ≠ PO-RALG">
              <strong>MoH</strong> owns policy, the national HMIS/registries
              (DHIS2, AfyaCare) and the referral tier. <strong>PO-RALG /
              TAMISEMI</strong> owns every dispensary and health centre, staffs
              them, channels Direct Health Facility Financing, and owns{" "}
              <strong>GoTHOMIS</strong> (≈96% of primary facilities). The
              intelligence centre is an MoH conversation; the clinics are a
              PO-RALG one. Plus a wholly separate <strong>Zanzibar</strong> track —
              health is a non-union matter.
            </CardItem>
          </Reveal>
          <Reveal delay={0.08}>
            <CardItem badge="The gates" badgeTone="gold" title="Clear compliance before the pilot">
              <strong>e-GA</strong> — the #1 technical gate: GISP registration,
              domestic hosting & DR. <strong>PDPC</strong> — health data as
              sensitive personal data, with a national-security veto on
              cross-border transfer. Retrofitting compliance after a pilot is how
              foreign platforms get killed. Engage both <em>before</em>, not after.
            </CardItem>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5">
            <Callout title="The strategic read — what makes this a map, not a list">
              Plot every stakeholder on <strong>influence × disposition</strong>{" "}
              and sequence: (1) anchor the two PSs/ICT directors who own the two
              stacks I must integrate; (2) clear e-GA + PDPC early; (3) recruit one
              respected RMO/DMO as the pilot's internal owner — a peer voice
              converts skeptics far better than a vendor; (4) treat CHWs and
              facility staff as co-designers from week one; (5) map Zanzibar as a
              separate engagement entirely.
            </Callout>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- TASK 2 ---------------- */}
      <Section
        id="relationship"
        taskTag="TASK 2 · Relationship strategy"
        kicker="The skeptical Deputy Minister"
        title="Her skepticism is earned. So I make her concerns the acceptance criteria."
        lede="Tanzania has a graveyard of ~18 parallel digital-health systems that never spoke to each other. I don't walk in with a deck — I walk in with questions and a notebook. The goal of meeting one is to earn meeting two."
      >
        <Reveal>
          <Mermaid chart={engagementChart} />
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4">
              <Quote>
                "Before I tell you anything about what we do, I'd genuinely like to
                understand what's been tried here before — what worked, and
                especially what didn't. I'd rather design against your real history
                than my assumptions."
              </Quote>
              <Quote>
                "The data is Tanzania's — hosted in Tanzania, owned by this
                Ministry, governed by your rules and your law. You can switch us
                off without losing a single record. We succeed the day your team
                can run it without us."
              </Quote>
              <Quote>
                "I'd rather prove this in a few districts first — integrated with
                GoTHOMIS and DHIS2 — than promise it across the country and become
                system number nineteen."
              </Quote>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5">
              <Callout tone="rose" title="What I will NOT do">
                No "transformative" or "revolutionise". No national-rollout
                promise. No implication that donor money quietly covers it — the
                trap that killed the last programmes. And no claim that the
                platform "brings Tanzania sovereignty":{" "}
                <strong>sovereignty is hers to assert; my job is to build to it.</strong>
              </Callout>
              <Callout tone="emerald" title="Converting a skeptic into a champion">
                <strong>48 hours:</strong> a note that proves I listened —
                referencing the <em>specific</em> failure she named.{" "}
                <strong>30 days:</strong> deliver the one small thing, exactly as
                scoped. Trust is built by the kept small promise, not the
                impressive big one. Then make her visible in the win and take none
                of the credit.
              </Callout>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- TASK 3 ---------------- */}
      <Section
        id="pilot"
        taskTag="TASK 3 · Operational plan"
        kicker="3 rural districts · poor connectivity · low digital literacy"
        title="Meet the constraints in the architecture and the change plan — not in the brochure."
        lede="The binding constraint isn't connectivity, it's power: rural electrification sits around a quarter of households. So the design is offline-first, built on the national rails, and engineered to reduce a nurse's work, not add to it."
      >
        <Reveal>
          <Mermaid chart={offlineChart} />
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <Reveal>
            <CardItem badge="A · Local realities" title="Offline-first, solar-powered">
              All capture, validation and decision logic run on-device; records
              queue and sync when signal returns. SMS/USSD fallback for critical
              events on 2G. Solar + battery treated as core kit. Built{" "}
              <strong>on</strong> DHIS2 + GoTHOMIS via the HDU API — not beside them.
            </CardItem>
          </Reveal>
          <Reveal delay={0.08}>
            <CardItem badge="B · Staff" badgeTone="gold" title="Design out rational resistance">
              The single highest-leverage move: <strong>kill the paper
              duplicate</strong> so the tool reduces work. Peer super-users in
              every facility; supportive (not punitive) supervision; give each
              worker their own dashboard; Swahili job aids and a train-the-trainer
              cascade.
            </CardItem>
          </Reveal>
          <Reveal delay={0.16}>
            <CardItem badge="C · Wins" badgeTone="indigo" title="Leading vs lagging">
              <strong>Leading (weekly):</strong> active-user rate, digital-vs-paper
              ratio, reporting-time saved, sync health, referral completion,
              evidence of local data use. <strong>Lagging (track honestly over
              years):</strong> facility delivery, ANC4, immunisation — don't
              promise to move them in a quarter.
            </CardItem>
          </Reveal>
        </div>

        {/* ---- THE MODEL ---- */}
        <div className="mt-12">
          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="eyebrow text-gold">Live model · the data-science layer</span>
            </div>
            <h3 className="display text-2xl font-semibold text-fg sm:text-3xl">
              Where would I start? A published, re-weightable rubric over every
              Tanzanian district.
            </h3>
            <p className="prose-body mt-4 max-w-3xl text-fg-muted">
              The brief warns against cherry-picking pilot districts. So here's the
              opposite: a transparent scoring model over all{" "}
              <strong>{MODEL_META.nDistricts} districts</strong>, computed from the
              2022 census and real geometry. Move any weight and the choropleth,
              the ranking and the three pilot picks recompute live. The picks
              deliberately span the range — one to show value early, one median,
              one to stress-test the offline design — exactly as the strategy
              argues.
            </p>
          </Reveal>
          <div id="model" className="mt-6 scroll-mt-20">
            <Reveal>
              <ReadinessModel />
            </Reveal>
          </div>
          <Reveal>
            <p className="mono mt-3 text-[0.7rem] leading-relaxed text-fg-dim">
              Integrity note: features tagged <span className="text-emerald">real</span>{" "}
              are computed from census + geometry. Features tagged{" "}
              <span className="text-gold">modelled</span> are transparent proxies
              (e.g. density as a connectivity stand-in) to be replaced by a SARA
              readiness assessment at inception. Council/RMO buy-in — the #1
              sustainability factor — is deliberately <em>not</em> in the model: it
              is assessed in person, not inferred from a map.
            </p>
          </Reveal>
        </div>

        {/* 90-day roadmap */}
        <div className="mt-12">
          <Reveal>
            <h3 className="display text-2xl font-semibold text-fg">First 90 days</h3>
            <p className="prose-body mt-3 max-w-2xl text-fg-muted">
              Anchor and clear gates before evidence; build evidence before design;
              prove value before promising scale.
            </p>
          </Reveal>
          <div className="mt-5">
            <Reveal>
              <Mermaid chart={roadmapChart} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------- TASK 4 ---------------- */}
      <Section
        id="crisis"
        taskTag="TASK 4 · Crisis management"
        kicker="A newspaper questions foreign data programmes"
        title="The first instinct — rebut publicly — is the single most damaging move."
        lede="It makes a foreign company the protagonist and confirms the article's frame. A Ministry calmly demonstrating it owns and controls its citizens' data refutes it. We respond to the concern, not the article."
      >
        <Reveal>
          <Mermaid chart={crisisChart} />
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["This data is Tanzanian", "Owned by the Ministry, hosted in Tanzania, governed by Tanzanian law — stated as settled fact, not defence."],
            ["Tanzania chose & funds it", "Part of Tanzania's own 2026/27 investment — the opposite of trading data for aid."],
            ["The custodian can be switched off", "Exit clauses, data portability, local staff trained to run it, a named handover horizon."],
            ["We welcome the scrutiny", "The Ministry publishes its governance terms and names an oversight mechanism — verification, not trust."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <CardItem badge={`Message ${i + 1}`} badgeTone="emerald" title={t}>
                {d}
              </CardItem>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5">
            <Callout tone="gold" title="The memo's core recommendation (to the PS-MoH)">
              Do not engage the newspaper adversarially. The Ministry — not Sand —
              is the lead voice. Within 24 hours we provide a one-page
              data-governance fact sheet (where hosted, who can access, how it
              complies with the Personal Data Protection Act 2022) so the
              spokesperson speaks from facts, not assurances. The vendor enables
              Tanzania's sovereignty; only Tanzania asserts it.
            </Callout>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- DATA LAB ---------------- */}
      <Section
        id="lab"
        kicker="Data lab · who I am"
        title="I read this country in data before I read it in slides."
        lede="The same census that powers the readiness model tells you why a static pilot plan goes stale. Four census rounds, 1988 → 2022."
      >
        <Reveal>
          <PopulationChart />
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <Reveal>
            <CardItem badge="Method" title="How this was built">
              Admin boundaries reprojected to WGS84 and simplified with{" "}
              <span className="mono text-xs">mapshaper</span>; geometry features
              (area, density, geodesic distance to Dar) computed with{" "}
              <span className="mono text-xs">@turf</span>; choropleth rendered with{" "}
              <span className="mono text-xs">d3-geo</span>; scoring recomputed in
              the browser so the rubric is honestly inspectable.
            </CardItem>
          </Reveal>
          <Reveal delay={0.08}>
            <CardItem badge="Discipline" badgeTone="gold" title="Real vs modelled, always labelled">
              Every input in the model is tagged. I don't dress an assumption as a
              measurement — the same discipline I'd use before repeating a Rwanda
              figure to a Tanzanian minister: cite it as a claim to be
              corroborated, not a fact.
            </CardItem>
          </Reveal>
          <Reveal delay={0.16}>
            <CardItem badge="Track record" badgeTone="indigo" title="Ten years of this exact work">
              Zimbabwe's first national DHIS2 Tracker rollout for malaria; Focus
              Investigations from concept to field with the Namibia NMCP; Data-Use
              Strategies for two national programmes; multi-country feedback loops
              with CHAI, the Malaria Atlas Project and Swiss TPH.
            </CardItem>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- CLOSE / CONTACT ---------------- */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-line bg-ground px-5 py-20 sm:px-8"
      >
        <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-emerald/8 blur-[140px]" />
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="eyebrow">The through-line</div>
            <h2 className="display mt-3 text-3xl font-semibold text-fg sm:text-4xl">
              Take a platform into a real, under-resourced system — win the
              ministry <span className="text-emerald">and</span> the frontline, and
              close the loop so the data actually gets used.
            </h2>
            <p className="prose-body mx-auto mt-5 max-w-xl text-fg-muted">
              That's exactly this role, and exactly my last decade — now with an
              AI-augmented layer through my PhD. I'd be the in-country anchor
              between the Ministry, the frontline and the product team.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:ernestmoyo35@gmail.com"
                className="rounded-lg bg-emerald px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-emerald/90"
              >
                ernestmoyo35@gmail.com
              </a>
              <span className="mono text-sm text-fg-dim">Dar es Salaam, Tanzania · June 2026</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mono mx-auto mt-12 max-w-2xl text-[0.7rem] leading-relaxed text-fg-dim">
              Prepared for assignment purposes. Named officials current to
              Tanzania's Nov-2025 cabinet and flagged for re-verification.
              Rwanda/HOS figures treated as Sand's published claims pending
              independent corroboration. Spatial model: {MODEL_META.source}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
