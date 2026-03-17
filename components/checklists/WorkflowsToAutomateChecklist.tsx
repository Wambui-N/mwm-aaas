"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { downloadChecklistPdf } from "@/lib/pdf/checklist-pdf";

type ChecklistItem = {
  id: string;
  number: string;
  section: string;
  title: string;
  desc: string;
  howTo: string;
  tools: string;
  guideSlug: string;
};

const ITEMS: ChecklistItem[] = [
  {
    id: "01",
    number: "01",
    section: "Document & File Creation",
    title: "Automate proposal & document creation",
    desc:
      "Stop building proposals, work plans, and contracts from scratch every time. Trigger document creation automatically from a form submission.",
    howTo:
      "Build a Tally form to capture the key details → use Make.com to auto-generate a Google Doc or PDF from a template → send it automatically to the client.",
    tools: "Tally, Make.com, Google Docs, PandaDoc",
    guideSlug: "/blog/How-to-Automate-Proposal-and-Document-Creation",
  },
  {
    id: "02",
    number: "02",
    section: "Document & File Creation",
    title: "Automate contract sending & signature collection",
    desc:
      "Once a proposal is approved, contracts should go out automatically — no manual attaching, emailing, or chasing required.",
    howTo:
      "Connect your proposal tool to an e-signature tool → trigger contract send on deal won → notify you when it's signed.",
    tools: "Make.com, DocuSign, PandaDoc, Google Drive",
    guideSlug: "/blog/how-to-automate-contract-sending-and-signature-collection",
  },
  {
    id: "03",
    number: "03",
    section: "Client Onboarding & Management",
    title: "Build an automated client onboarding flow",
    desc:
      "When a new client signs, a sequence of tasks should kick off automatically — welcome email, intake form, project setup, access sharing — without you lifting a finger.",
    howTo:
      "Trigger on contract signed or payment received → send welcome email → create project in your PM tool → assign onboarding tasks to your team.",
    tools: "Make.com, ClickUp, Notion, Calendly, Gmail",
    guideSlug: "/blog/how-to-build-an-automated-client-onboarding-flow",
  },
  {
    id: "04",
    number: "04",
    section: "Client Onboarding & Management",
    title: "Automate invoice & payment follow-up",
    desc:
      "Stop manually chasing unpaid invoices. Set up automatic reminders that go out at set intervals and stop the moment payment is received.",
    howTo:
      "Connect your invoicing tool to Make.com → trigger reminder emails at 3, 7, and 14 days overdue → mark resolved on payment.",
    tools: "Make.com, Wave, QuickBooks, Stripe",
    guideSlug: "/blog/how-to-automate-invoice-and-payment-follow-up",
  },
  {
    id: "05",
    number: "05",
    section: "Lead Management",
    title: "Set up automated lead follow-up",
    desc:
      "Every new enquiry should get an immediate, personalised response — not sit in your inbox waiting for you to notice it. Speed to response is one of the biggest drivers of conversion.",
    howTo:
      "Connect your contact form to Make.com → send an instant acknowledgement email → notify you in Slack → add the lead to your CRM or tracker.",
    tools: "Tally, Make.com, Gmail, Airtable, Notion",
    guideSlug: "/blog/how-to-set-up-automated-lead-follow-up",
  },
  {
    id: "06",
    number: "06",
    section: "Lead Management",
    title: "Automate meeting scheduling",
    desc:
      "The back-and-forth of finding a meeting time is entirely unnecessary. A booking link with automated confirmations and reminders handles it all.",
    howTo:
      "Set up a Calendly or Cal.com booking page → connect to your calendar → trigger confirmation email + reminder 24 hours before the meeting.",
    tools: "Calendly, Cal.com, Google Calendar, Make.com",
    guideSlug:
      "/blog/how-to-automate-meeting-scheduling-and-cut-out-the-back-and-forth",
  },
  {
    id: "07",
    number: "07",
    section: "Operations & Internal Workflow",
    title: "Automate internal task creation",
    desc:
      "When a project starts or a client signs, your project tasks should be created automatically — not manually typed out one by one every single time.",
    howTo:
      "Define your standard task templates per project type → trigger task creation in ClickUp or Notion whenever a new project is created.",
    tools: "Make.com, ClickUp, Notion, Airtable",
    guideSlug:
      "/blog/how-to-automate-internal-task-creation-when-a-new-project-starts",
  },
  {
    id: "08",
    number: "08",
    section: "Operations & Internal Workflow",
    title: "Eliminate manual data entry between tools",
    desc:
      "If anyone on your team is copying data from one tool and pasting it into another — that's a workflow that should be automated.",
    howTo:
      "Map every place your team does copy-paste work → pick the highest frequency task → build a Make.com scenario to connect the two tools directly.",
    tools: "Make.com, Google Sheets, Airtable, your CRM",
    guideSlug:
      "/blog/how-to-eliminate-manual-data-entry-between-your-business-tools",
  },
  {
    id: "09",
    number: "09",
    section: "Operations & Internal Workflow",
    title: "Set up automated reporting & status updates",
    desc:
      "Weekly status reports and performance summaries shouldn't require manual data pulling. Connect your tools and let the report build itself.",
    howTo:
      "Identify what data you report on weekly → pull it automatically from your PM tool and sheets → format and send or post to Slack on a schedule.",
    tools: "Make.com, Google Sheets, Slack, ClickUp",
    guideSlug:
      "/blog/how-to-set-up-automated-reporting-and-status-updates",
  },
  {
    id: "10",
    number: "10",
    section: "Marketing & Content",
    title: "Automate social media scheduling & repurposing",
    desc:
      "Manually posting content every day is a time drain. Batch your content creation and let automation handle the publishing — and repurposing across platforms.",
    howTo:
      "Write your content in a Google Sheet or Notion → use Make.com to push posts to a scheduling tool → repurpose LinkedIn posts to other channels automatically.",
    tools: "Make.com, Buffer, Notion, Google Sheets",
    guideSlug:
      "/blog/how-to-automate-social-media-scheduling-and-content-repurposing",
  },
];

export default function WorkflowsToAutomateChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<Set<string>>(new Set());

  const total = ITEMS.length;
  const done = checked.size;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const sections = useMemo(
    () => Array.from(new Set(ITEMS.map((i) => i.section))),
    []
  );

  const toggleChecked = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleOpen = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleDownloadPdf = async () => {
    await downloadChecklistPdf({
      title: "10 Workflows to Automate First",
      subtitle:
        "The highest-impact manual tasks to automate in your business, what each one is, why it matters, and exactly how to get started.",
      items: ITEMS.map(({ number, title, desc, howTo, tools, guideSlug }) => ({
        number,
        title,
        desc,
        howTo,
        tools,
        guideUrl: `https://madewithmake.com${guideSlug}`,
      })),
    });
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 md:p-8 shadow-sm">
      {/* Header + progress + download */}
      <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          {/* <p className="inline-flex items-center rounded-full bg-brand-grey/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-black/80">
            Free resource
          </p> */}
          <h2 className="mt-3 text-2xl font-display font-semibold text-brand-orange md:text-3xl">
            10 Workflows to Automate First
          </h2>
          <p className="mt-2 max-w-xl text-sm text-gray-600 md:text-base">
            The highest-impact manual tasks to automate in your business; what
            each one is, why it matters, and exactly how to get started.
          </p>
        </div>
        <div className="flex justify-end gap-3 w-full md:w-auto flex-col items-center">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Progress
              </p>
              <p className="text-xs font-medium text-brand-black">
                {done} / {total} workflows
              </p>
            </div>
            <div className="h-2 w-28 overflow-hidden rounded-full bg-brand-grey/30">
              <div
                className="h-full rounded-full bg-brand-orange transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center justify-center rounded-lg border border-brand-grey/50 bg-white px-4 py-2.5 text-xs font-medium text-brand-black transition-colors hover:bg-brand-grey/20"
          >
            Download PDF checklist
          </button>
        </div>
      </div>

      {/* Sections + items */}
      {sections.map((section) => (
        <div key={section} className="mb-8 last:mb-0">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              {section}
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {ITEMS.filter((i) => i.section === section).map((item) => {
            const isChecked = checked.has(item.id);
            const isOpen = open.has(item.id);

            return (
              <div
                key={item.id}
                className={`relative mb-3 grid cursor-pointer grid-cols-[20px,32px,1fr] gap-x-3 rounded-xl border bg-white px-4 py-4 text-left transition-colors sm:grid-cols-[22px,40px,1fr] ${
                  isChecked
                    ? "bg-brand-grey/10 border-brand-grey/60"
                    : "border-gray-100 hover:border-brand-grey/80"
                }`}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("[data-checkbox]")) return;
                  toggleOpen(item.id);
                }}
              >
                {/* Checkbox area */}
                <button
                  type="button"
                  data-checkbox
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleChecked(item.id);
                  }}
                  className={`mt-1 flex h-5 w-5 items-center justify-center rounded-md border text-xs font-bold transition-colors ${
                    isChecked
                      ? "border-brand-black bg-brand-black text-white"
                      : "border-brand-grey/70 bg-white"
                  }`}
                >
                  {isChecked ? "✓" : ""}
                </button>

                {/* Number */}
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                  {item.number}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-semibold leading-snug text-brand-black ${
                        isChecked ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.title}
                    </p>
                    <span className="ml-2 rounded-full bg-brand-grey/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-600">
                      How to start {isOpen ? "↑" : "↓"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">{item.desc}</p>

                  <div
                    className={`mt-2 overflow-hidden text-xs transition-[max-height] duration-300 ${
                      isOpen ? "max-h-64" : "max-h-0"
                    }`}
                  >
                    <div className="rounded-md border-l-4 border-brand-orange bg-brand-grey/20 px-3 py-2">
                      <p className="text-[12px] text-brand-black">
                        <span className="font-semibold">How to start: </span>
                        {item.howTo}
                      </p>
                    </div>
                    <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <p className="inline-block rounded-md bg-brand-orange/10 px-2 py-1 text-[11px] font-medium text-brand-black">
                        🛠 Tools: {item.tools}
                      </p>
                      <Link
                        href={item.guideSlug}
                        className="text-[11px] font-medium text-brand-orange hover:underline"
                      >
                        Read full guide &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* CTA */}
      {/* <div className="mt-10 grid gap-4 rounded-2xl bg-brand-black px-6 py-6 text-left text-white md:grid-cols-[1.6fr,auto] md:items-center">
        <div>
          <h3 className="font-display text-xl font-semibold">
            Want help actually building these?
          </h3>
          <p className="mt-2 text-sm text-gray-300">
            Book a free 30-minute consultation. We&apos;ll look at your setup and
            choose 2–3 automations to ship first.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <a
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-4 py-2.5 text-xs font-medium text-brand-black transition-colors hover:bg-brand-orange/90"
          >
            Get a free consultation
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </div>
      </div> */}
    </div>
  );
}

