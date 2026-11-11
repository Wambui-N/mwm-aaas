import type { Metadata } from "next";
import { PlaybookFrame } from "@/components/playbook/Frame";
import { CopyColumns } from "@/components/playbook/CopyColumns";
import { playbook } from "@/lib/playbook/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The 5-Stage Proposal Pipeline Playbook",
  description: playbook.lede,
  alternates: { canonical: `${siteConfig.url}/playbook` },
};

// The audit links here with ?start=<lowest stage>, which moves that stage to the top.
export const dynamic = "force-dynamic";

export default async function PlaybookPage({ searchParams }: { searchParams: Promise<{ start?: string }> }) {
  const { start } = await searchParams;
  const first = playbook.stages.find((s) => s.stage === start);
  const stages = first ? [first, ...playbook.stages.filter((s) => s !== first)] : [...playbook.stages];

  return (
    <PlaybookFrame
      label="The Playbook"
      title={playbook.title}
      lede={playbook.lede}
      closingTitle={playbook.retakeTitle}
      closingBody={playbook.retakeBody}
      reachOut={playbook.closing}
    >
      <div className="calm-body mt-8 space-y-4 text-ink/85">
        {playbook.how.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {stages.map((s, i) => (
        <section key={s.stage} id={s.stage} className="mt-[4.5rem] scroll-mt-24 md:mt-[6.75rem]" aria-labelledby={`${s.stage}-h`}>
          <p className="gl-mono text-ink/60">
            Stage {playbook.stages.indexOf(s) + 1} of 5{first && i === 0 ? ` · ${playbook.startHere}` : ""}
          </p>
          <h2 id={`${s.stage}-h`} className="sk-h2 mt-2">
            {s.name}
          </h2>
          <p className="calm-body mt-4 text-ink/85">{s.problem}</p>
          <p className="calm-body mt-3">
            <strong>What good looks like.</strong> {s.good}
          </p>

          <ol className="mt-6 border-b border-ink/20">
            {s.steps.map((st, n) => (
              <li key={st.title} className="grid gap-y-2 border-t border-ink/20 py-5 md:grid-cols-12 md:gap-x-6">
                <p className="gl-mono pt-1 text-ink/60 md:col-span-2">Step {n + 1}</p>
                <div className="md:col-span-10">
                  <p className="font-bold">{st.title}</p>
                  <p className="calm-body mt-2 text-ink/85">{st.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 border border-ink/30 bg-white p-5">
            <p className="gl-mono text-ink/60">Template</p>
            <p className="mt-2 font-bold">{s.template.name}</p>
            <p className="calm-body mt-1 text-ink/85">{s.template.use}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${s.template.name} columns`}>
              {s.template.columns.map((c) => (
                <li key={c} className="gl-mono border border-ink/30 bg-paper px-2 py-1" style={{ background: "var(--paper)" }}>
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <CopyColumns columns={s.template.columns} />
            </div>
          </div>

          <p className="calm-body mt-6 text-ink/75">
            <strong>When a system starts to pay off.</strong> {s.automate}
          </p>
        </section>
      ))}
    </PlaybookFrame>
  );
}
