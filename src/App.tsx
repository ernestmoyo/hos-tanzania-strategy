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
            <span className="text-emerald">government-owned</span> platform wins,
            and a donor-style one dies.
          </>
        }
        lede="Everything below follows from one read of the timing."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <CardItem badge="The shock" badgeTone="rose" title="Donor money collapsed in 2025">
              The US aid freeze and PEPFAR drawdown removed roughly a quarter to a
              half of planned HIV resources, on a response that was{" "}
              <strong>about 90% US-funded</strong>. Vertical donor programmes are
              suddenly fragile.
            </CardItem>
          </Reveal>
          <Reveal delay={0.08}>
            <CardItem badge="The pivot" badgeTone="emerald" title="Tanzania funds its own systems">
              AI, telemedicine, teleradiology and health-information systems went
              into Tanzania's <strong>own 2026/27 budget (TZS 1.8 trillion)</strong>,
              and Universal Health Insurance began enrolling households from{" "}
              <strong>26 January 2026</strong>.
            </CardItem>
          </Reveal>
          <Reveal delay={0.16}>
            <CardItem badge="The opening" badgeTone="gold" title="HOS becomes a national priority">
              That shift, from donor-dependent verticals to government-owned,
              data-driven systems, is precisely the gap HOS fills.{" "}
              <strong>But only if it is demonstrably owned, funded and controlled
              by Tanzania.</strong>
            </CardItem>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6">
            <Callout tone="emerald" title="Why I wrote this against the real system, not a generic one">
              I live in Dar es Salaam and I am doing a PhD with the Malaria Atlas
              Project here. Tanzania held a general election in October 2025 and
              President Samia Suluhu Hassan named a restructured cabinet on 17
              November 2025, so <strong>several health officials changed</strong>.
              I have used post-reshuffle names and treat knowing that the system
              just changed as part of the homework.
            </Callout>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- TASK 1 ---------------- */}
      <Section
        id="stakeholders"
        taskTag="TASK 1 · Stakeholder map"
        kicker="Who can say yes"
        title="Tanzania runs health on two principals. Get that wrong and the project dies."
        lede="Most candidates draw one Ministry of Health at the top. Under decentralisation-by-devolution, the facilities where about 90% of patient contacts happen are not the Ministry's at all."
      >
        <Reveal>
          <Mermaid chart={stakeholderChart} />
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Reveal>
            <CardItem badge="The structural fact" badgeTone="indigo" title="MoH is not PO-RALG">
              The <strong>Ministry of Health</strong> owns policy, the national
              registries (DHIS2, AfyaCare) and the referral tier.{" "}
              <strong>PO-RALG / TAMISEMI</strong> owns every dispensary and health
              centre, staffs them, channels Direct Health Facility Financing, and
              owns <strong>GoTHOMIS</strong> (about 96% of primary facilities). The
              intelligence centre is a Ministry conversation; the clinics are a
              PO-RALG one. Zanzibar is a separate track again, since health is a
              non-union matter.
            </CardItem>
          </Reveal>
          <Reveal delay={0.08}>
            <CardItem badge="The gates" badgeTone="gold" title="Clear compliance before the pilot">
              <strong>e-GA</strong> is the first technical gate: GISP registration,
              domestic hosting and disaster recovery. <strong>PDPC</strong> treats
              health data as sensitive personal data, with a national-security veto
              on cross-border transfer. Retrofitting compliance after a pilot is how
              foreign platforms get killed, so engage both before, not after.
            </CardItem>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5">
            <Callout title="The strategic read: what makes this a map, not a list">
              Plot every stakeholder on <strong>influence by disposition</strong>{" "}
              and sequence the work. First, anchor the two permanent secretaries and
              ICT directors who own the two stacks I must integrate. Second, clear
              e-GA and PDPC early. Third, recruit one respected RMO or DMO as the
              pilot's internal owner, because a peer voice converts skeptics far
              better than a vendor. Fourth, treat CHWs and facility staff as
              co-designers from week one. Fifth, map Zanzibar as a separate
              engagement entirely.
            </Callout>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- TASK 2 ---------------- */}
      <Section
        id="relationship"
        taskTag="TASK 2 · Relationship strategy"
        kicker="The skeptical Deputy Minister"
        title="Her skepticism is earned, so I make her concerns the acceptance criteria."
        lede="Tanzania has a graveyard of roughly 18 parallel digital-health systems that never spoke to each other. I do not walk in with a deck. I walk in with questions and a notebook. The goal of meeting one is to earn meeting two."
      >
        <Reveal>
          <Mermaid chart={engagementChart} />
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4">
              <Quote>
                "Before I tell you anything about what we do, I would genuinely like
                to understand what has been tried here before, what worked, and
                especially what did not. I would rather design against your real
                history than my assumptions."
              </Quote>
              <Quote>
                "The data is Tanzania's. It is hosted in Tanzania, owned by this
                Ministry, governed by your rules and your law. You can switch us off
                without losing a single record. We succeed the day your team can run
                it without us."
              </Quote>
              <Quote>
                "I would rather prove this in a few districts first, integrated with
                GoTHOMIS and DHIS2, than promise it across the country and become
                system number nineteen."
              </Quote>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5">
              <Callout tone="rose" title="What I will not do">
                No "transformative", no "revolutionise", no national-rollout
                promise. No implication that donor money quietly covers it, which is
                the trap that killed the last programmes. And no claim that the
                platform "brings Tanzania sovereignty":{" "}
                <strong>sovereignty is hers to assert; my job is to build to it.</strong>
              </Callout>
              <Callout tone="emerald" title="Converting a skeptic into a champion">
                Within 48 hours, a note that proves I listened, referencing the
                specific failure she named. Within 30 days, deliver the one small
                thing exactly as scoped. Trust is built by the kept small promise,
                not the impressive big one. Then make her visible in the win and take
                none of the credit.
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
        title="Meet the constraints in the architecture and the change plan, not in the brochure."
        lede="The binding constraint is not connectivity, it is power: rural electrification sits around a quarter of households. So the design is offline-first, built on the national rails, and engineered to reduce a nurse's work rather than add to it."
      >
        <Reveal>
          <Mermaid chart={offlineChart} />
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <Reveal>
            <CardItem badge="A · Local realities" title="Offline-first, solar-powered">
              All capture, validation and decision logic run on-device; records
              queue and sync when signal returns. SMS or USSD fallback for critical
              events on 2G. Solar and battery treated as core kit. Built on DHIS2
              and GoTHOMIS through the HDU API, not beside them.
            </CardItem>
          </Reveal>
          <Reveal delay={0.08}>
            <CardItem badge="B · Staff" badgeTone="gold" title="Design out rational resistance">
              The single highest-leverage move is to{" "}
              <strong>kill the paper duplicate</strong> so the tool reduces work.
              Peer super-users in every facility; supportive rather than punitive
              supervision; give each worker their own dashboard; Swahili job aids and
              a train-the-trainer cascade.
            </CardItem>
          </Reveal>
          <Reveal delay={0.16}>
            <CardItem badge="C · Wins" badgeTone="indigo" title="Leading vs lagging">
              <strong>Leading (weekly):</strong> active-user rate, digital-vs-paper
              ratio, reporting-time saved, sync health, referral completion, evidence
              of local data use. <strong>Lagging (track honestly over years):</strong>{" "}
              facility delivery, ANC4, immunisation. I do not promise to move those in
              a quarter.
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
              The brief warns against cherry-picking pilot districts, so here is the
              opposite: a transparent scoring model over all{" "}
              <strong>{MODEL_META.nDistricts} districts</strong>, computed from the
              2022 census and real geometry. Move any weight and the choropleth, the
              ranking and the three pilot picks recompute live. The picks span the
              range on purpose: one to show value early, one median, one to
              stress-test the offline design, exactly as the strategy argues.
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
              are computed from census and geometry. Features tagged{" "}
              <span className="text-gold">modelled</span> are transparent proxies
              (for example, density as a connectivity stand-in) to be replaced by a
              SARA readiness assessment at inception. Council and RMO buy-in, the
              first sustainability factor, is deliberately not in the model: it is
              assessed in person, not inferred from a map.
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
        title="The first instinct, to rebut publicly, is the single most damaging move."
        lede="It makes a foreign company the protagonist and confirms the article's frame. A Ministry calmly demonstrating that it owns and controls its citizens' data refutes it. We respond to the concern, not the article."
      >
        <Reveal>
          <Mermaid chart={crisisChart} />
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["This data is Tanzanian", "Owned by the Ministry, hosted in Tanzania, governed by Tanzanian law. Stated as settled fact, not defence."],
            ["Tanzania chose and funds it", "Part of Tanzania's own 2026/27 investment. The opposite of trading data for aid."],
            ["The custodian can be switched off", "Exit clauses, data portability, local staff trained to run it, a named handover horizon."],
            ["We welcome the scrutiny", "The Ministry publishes its governance terms and names an oversight mechanism. Verification, not trust."],
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
            <Callout tone="gold" title="The memo's core recommendation (to the PS, Ministry of Health)">
              Do not engage the newspaper adversarially. The Ministry, not Sand, is
              the lead voice. Within 24 hours we provide a one-page data-governance
              fact sheet (where data is hosted, who can access it, how it complies
              with the Personal Data Protection Act 2022) so the spokesperson speaks
              from facts, not assurances. The vendor enables Tanzania's sovereignty;
              only Tanzania asserts it.
            </Callout>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- DATA LAB ---------------- */}
      <Section
        id="lab"
        kicker="Data lab · who I am"
        title="I read this country in data before I read it in slides."
        lede="The same census that powers the readiness model shows why a static pilot plan goes stale. Four census rounds, 1988 to 2022."
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
              <span className="mono text-xs">d3-geo</span>; scoring recomputed in the
              browser so the rubric stays inspectable.
            </CardItem>
          </Reveal>
          <Reveal delay={0.08}>
            <CardItem badge="Discipline" badgeTone="gold" title="Real vs modelled, always labelled">
              Every input in the model is tagged. I do not dress an assumption as a
              measurement. It is the same discipline I use before repeating a Rwanda
              figure to a Tanzanian minister: cite it as a claim to be corroborated,
              not a fact.
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
              Take a platform into a real, under-resourced system, win the ministry{" "}
              <span className="text-emerald">and</span> the frontline, and close the
              loop so the data actually gets used.
            </h2>
            <p className="prose-body mx-auto mt-5 max-w-xl text-fg-muted">
              That is this role, and it is my last decade, now with an AI-augmented
              layer through my PhD. I would be the in-country anchor between the
              Ministry, the frontline and the product team.
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
              Disclaimer: this work is based on my own experience as a researcher and
              on publicly available data, which may need verification.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
