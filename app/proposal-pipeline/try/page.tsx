import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SketchButton } from "@/components/site/SketchButton";
import { FirstDraftForm } from "@/components/proposal-pipeline/FirstDraftForm";
import { CONTACT_EMAIL, CONTACT_HREF, SCORECARD_PATH } from "@/lib/scorecard/config";
import { DONORS, NO_DONORS } from "@/lib/scorecard/questions";
import { dbConfigured, getSubmission, isUuid, type SubmissionRow } from "@/lib/scorecard/server/db";
import { bookingUrl } from "@/lib/scorecard/server/links";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your free first draft",
  robots: { index: false, follow: false },
};

const link = "font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline";

function Message({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-[46rem]">
      <SectionLabel>Your free first draft</SectionLabel>
      <h1 className="sk-title">{title}</h1>
      <div className="calm-body mt-6 space-y-4 text-ink/85">{children}</div>
    </div>
  );
}

/**
 * The free first draft. It opens only from a completed audit's results page (the link carries that audit's id), and
 * the server checks the id again when the files are sent. Everyone else is pointed to the audit, politely.
 */
export default async function FirstDraftPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id = "" } = await searchParams;

  const row =
    isUuid(id) && dbConfigured()
      ? ((await getSubmission(id, "status,segment,first_name,firm_name,draft_requested_at").catch(() => null)) as Partial<SubmissionRow> | null)
      : null;

  let body: React.ReactNode;

  if (!row) {
    body = (
      <Message title="Your first draft comes with your audit result.">
        <p>Take the free Proposal Audit first. It takes about 4 minutes, and your results page shows your best next step.</p>
        <div className="pt-2">
          <SketchButton href={SCORECARD_PATH} variant="marker" seed={41} className="text-lg">
            Find My Proposal Gaps →
          </SketchButton>
        </div>
      </Message>
    );
  } else if (row.status !== "completed") {
    redirect(`${SCORECARD_PATH}?resume=${id}`);
  } else if (!["ready", "ideal"].includes(String(row.segment))) {
    // ("ideal" is the segment name saved before the three results pages existed)
    body = (
      <Message title="Your best next step is on your results page.">
        <p>
          Your audit points to a different next step for now, and it is waiting on your results page.{" "}
          <Link href={`${SCORECARD_PATH}/results/${id}`} className={link}>
            Back to my results
          </Link>
        </p>
        <p>
          Questions, or want to talk it through? Write to me any time at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
            {CONTACT_EMAIL}
          </a>{" "}
          or use the{" "}
          <Link href={CONTACT_HREF} className={link}>
            contact page
          </Link>
          .
        </p>
      </Message>
    );
  } else if (row.draft_requested_at) {
    body = (
      <Message title="Your first draft is already on its way.">
        <p>
          You have requested your free first draft. It should arrive by email in under 20 minutes from when you sent your files. If it has not arrived, write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          <a href={bookingUrl()} target="_blank" rel="noopener noreferrer" className={link}>
            Book a call to go through it →
          </a>
        </p>
      </Message>
    );
  } else {
    body = (
      <div className="max-w-[46rem]">
        <SectionLabel>Your free first draft</SectionLabel>
        <h1 className="sk-title">Send one RFP. Get a complete first draft back.</h1>
        <p className="pg-lede mt-6">Upload a live RFP and a couple of your past proposals. A complete first draft, in your firm&rsquo;s voice, lands in your inbox in under 20 minutes.</p>
        <div className="mt-10">
          <FirstDraftForm
            auditId={id}
            firstName={row.first_name ?? ""}
            firmName={row.firm_name ?? ""}
            donors={DONORS.filter((d) => d !== NO_DONORS)}
            bookingUrl={bookingUrl()}
          />
        </div>
      </div>
    );
  }

  return (
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">{body}</div>
      </main>
    </SiteShell>
  );
}
