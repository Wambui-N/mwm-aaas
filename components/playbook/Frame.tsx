import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SketchButton } from "@/components/site/SketchButton";
import { CONTACT_EMAIL, CONTACT_HREF, SCORECARD_PATH } from "@/lib/scorecard/config";

const link = "font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline";

/** Shared page frame for the Playbook and the two checklists: site shell, a title, and the same closing block. */
export function PlaybookFrame({
  label,
  title,
  lede,
  children,
  closingTitle,
  closingBody,
  reachOut,
}: {
  label: string;
  title: string;
  lede: string;
  children: React.ReactNode;
  closingTitle: string;
  closingBody: string;
  reachOut: string;
}) {
  return (
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <article className="max-w-[46rem]">
            <header>
              <SectionLabel>{label}</SectionLabel>
              <h1 className="sk-title">{title}</h1>
              <p className="pg-lede mt-6">{lede}</p>
            </header>

            {children}

            <aside className="mt-[4.5rem] border-t border-ink/30 pt-10 print:hidden md:mt-[6.75rem]">
              <h2 className="calm-h3">{closingTitle}</h2>
              <p className="calm-body mt-3 text-ink/85">{closingBody}</p>
              <div className="mt-6">
                <SketchButton href={SCORECARD_PATH} variant="marker" seed={51} className="text-lg">
                  Find My Proposal Gaps →
                </SketchButton>
              </div>
              <p className="calm-body mt-8 text-ink/85">
                {reachOut}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
                  {CONTACT_EMAIL}
                </a>{" "}
                or the{" "}
                <Link href={CONTACT_HREF} className={link}>
                  contact page
                </Link>
                .
              </p>
            </aside>
          </article>
        </div>
      </main>
    </SiteShell>
  );
}
