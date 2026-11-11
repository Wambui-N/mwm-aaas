import { SectionLabel } from "@/components/site/SectionLabel";
import { Underlined } from "@/components/site/Underlined";
import { CtaLink } from "@/components/scorecard/CtaLink";
import { costBlock, helpFlagLine, nextSteps, pages, resultsHeading, resultsLabels, stageInsights, strongLine, tiers } from "@/lib/scorecard/copy";
import { CONTACT_EMAIL, CONTACT_HREF, SCORECARD_PATH } from "@/lib/scorecard/config";
import { STAGES, STAGE_NAMES, type Stage } from "@/lib/scorecard/questions";
import { formatUsd, priorityFixes, weakestStages, type Segment, type StageLabel, type TierKey } from "@/lib/scorecard/scoring";
import type { NextLink } from "@/lib/scorecard/server/links";

export type ResultsData = {
  firstName: string;
  totalPct: number;
  tier: TierKey;
  stageScores: Record<Stage, { points: number; pct: number; label: StageLabel }>;
  helpFlags: Stage[];
  hoursMonth: number;
  costMonth: number;
  savedHours: number;
  segment: Segment;
};

function DemoSlot({ url }: { url: string }) {
  const isFile = /\.(mp4|webm|mov)(\?|$)/i.test(url);
  return (
    <section className="mt-[4.5rem] md:mt-[6.75rem]" aria-label="Demo video">
      <div className="aspect-video w-full max-w-[56rem] border border-ink/30 bg-ink/5">
        {isFile ? <video className="h-full w-full" controls preload="metadata" src={url} /> : <iframe className="h-full w-full" src={url} title="Demo video" allow="fullscreen; picture-in-picture" loading="lazy" />}
      </div>
    </section>
  );
}

/**
 * The results: heading, tier, stage bars, cost, three fixes, then a next step that depends on the page (ready, almost,
 * playbook). The shared parts come first so every visitor gets the same useful audit. No prices.
 */
export function ResultsView({ data, links, demoUrl }: { data: ResultsData; links: NextLink[]; demoUrl: string }) {
  const tier = tiers[data.tier];
  const heading = resultsHeading(data.firstName, data.totalPct, tier.name);
  const pctText = `${data.totalPct}%`;
  const at = heading.indexOf(pctText);
  const fixes = priorityFixes(data.stageScores, data.helpFlags);
  const ready = data.segment === "ready";
  const page = ready ? pages.ready : data.segment === "almost" ? pages.almost : pages.playbook;

  return (
    <div className="cols-8">
      <header>
        <SectionLabel>The Proposal Audit</SectionLabel>
        <h1 className="sk-title">
          {heading.slice(0, at)}
          <Underlined seed={91}>{pctText}</Underlined>
          {heading.slice(at + pctText.length)}
        </h1>
        <p className="pg-lede mt-6">{tier.copy}</p>
      </header>

      <section className="mt-[4.5rem] md:mt-[6.75rem]" aria-labelledby="rs-stages">
        <h2 id="rs-stages" className="calm-h3">
          {resultsLabels.stages}
        </h2>
        <ul className="mt-4 border-b border-ink/20">
          {STAGES.map((s) => {
            const sc = data.stageScores[s];
            const help = data.helpFlags.includes(s);
            return (
              <li key={s} className="border-t border-ink/20 py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-bold">{STAGE_NAMES[s]}</p>
                  <p className="gl-mono text-ink/70">
                    {sc.pct}% · {sc.label}
                  </p>
                </div>
                <div className="mt-3 h-[6px] w-full bg-ink/[0.15]" role="img" aria-label={`${STAGE_NAMES[s]}: ${sc.pct}%, ${sc.label}`}>
                  <div className="h-full bg-ink" style={{ width: `${sc.pct}%` }} />
                </div>
                <p className="calm-body mt-3 text-ink/80">{sc.label === "Strong" ? strongLine : stageInsights[s].diagnosis}</p>
                {help && <p className="gl-mono mt-2 font-bold text-ink">{helpFlagLine}</p>}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-[4.5rem] md:mt-[6.75rem]" aria-labelledby="rs-cost">
        <h2 id="rs-cost" className="calm-h3">
          {resultsLabels.cost}
        </h2>
        <dl className="mt-4 grid border-t border-ink/40 md:grid-cols-3 md:gap-x-6">
          {[
            [String(data.hoursMonth), "Hours a month"],
            [formatUsd(data.costMonth), "Cost a month"],
            [String(data.savedHours), "Hours you could get back"],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 border-b border-ink/40 py-4 md:block md:border-b-0 md:py-5">
              <dd className="font-[family-name:var(--font-brule)] text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-none">{value}</dd>
              <dt className="gl-mono text-right md:mt-3 md:text-left">{label}</dt>
            </div>
          ))}
        </dl>
        <p className="calm-body mt-4 max-w-[46rem] border-t border-ink/20 pt-4 text-ink/85">{costBlock(String(data.hoursMonth), formatUsd(data.costMonth), String(data.savedHours))}</p>
      </section>

      <section className="mt-[4.5rem] md:mt-[6.75rem]" aria-labelledby="rs-fixes">
        <h2 id="rs-fixes" className="calm-h3">
          {resultsLabels.fixes}
        </h2>
        <ol className="mt-4 border-b border-ink/20">
          {fixes.map((fx, n) => (
            <li key={fx.stage} className="grid gap-y-2 border-t border-ink/20 py-5 md:grid-cols-12 md:gap-x-6">
              <p className="gl-mono pt-1 text-ink/60 md:col-span-2">
                {String(n + 1).padStart(2, "0")} · {STAGE_NAMES[fx.stage]}
              </p>
              <div className="md:col-span-10">
                <p className="font-bold">{stageInsights[fx.stage].diagnosis}</p>
                <p className="calm-body mt-2 text-ink/85">{stageInsights[fx.stage].fix}</p>
                {fx.note && <p className="calm-body mt-2 text-ink/70">{fx.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {ready && demoUrl && <DemoSlot url={demoUrl} />}

      <section className="mt-[4.5rem] md:mt-[6.75rem]" aria-labelledby="rs-next">
        <h2 id="rs-next" className="calm-h3">
          {page.heading}
        </h2>
        <p className="calm-body mt-4 max-w-[46rem] text-ink/85">{page.lede}</p>

        {ready && (
          <ol className="mt-6 border-b border-ink/20">
            {pages.ready.steps.map((st, n) => (
              <li key={st.title} className="grid gap-y-2 border-t border-ink/20 py-5 md:grid-cols-12 md:gap-x-6">
                <p className="gl-mono pt-1 text-ink/60 md:col-span-2">{String(n + 1).padStart(2, "0")}</p>
                <div className="md:col-span-10">
                  <p className="font-bold">{st.title}</p>
                  <p className="calm-body mt-2 text-ink/85">{st.body}</p>
                </div>
              </li>
            ))}
          </ol>
        )}

        {!ready && (
          <p className="calm-body mt-4 max-w-[46rem] text-ink/85">
            {nextSteps.weakestNote(...(weakestStages(data.stageScores).map((s) => STAGE_NAMES[s]) as [string, string]))}
          </p>
        )}

        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
            {links.map((l, n) => (
              <CtaLink key={l.key} href={l.href} cta={l.key} primary={l.primary} seed={20 + n}>
                {l.label} →
              </CtaLink>
            ))}
          </div>
        )}

        {!ready && (
          <div className="calm-body mt-10 max-w-[46rem] border-t border-ink/20 pt-6 text-ink/85">
            <p>
              {"retake" in page && page.retake}{" "}
              <a href={SCORECARD_PATH} className="font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline">
                Start again
              </a>
            </p>
            <p className="mt-3">
              {pages.reachOut}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline">
                {CONTACT_EMAIL}
              </a>{" "}
              or the{" "}
              <a href={CONTACT_HREF} className="font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline">
                contact page
              </a>
              .
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
