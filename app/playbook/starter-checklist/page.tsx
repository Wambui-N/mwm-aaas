import type { Metadata } from "next";
import { Checklist } from "@/components/playbook/Checklist";
import { PlaybookFrame } from "@/components/playbook/Frame";
import { playbook, starterChecklist as c } from "@/lib/playbook/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.lede,
  alternates: { canonical: `${siteConfig.url}/playbook/starter-checklist` },
};

export default function StarterChecklistPage() {
  const groups = [
    {
      title: "",
      items: c.habits.map((h, i) => ({
        key: `h-${i}`,
        label: (
          <>
            <span className="gl-mono block text-ink/60">{h.stage}</span>
            <strong>{h.title}.</strong> {h.body}
          </>
        ),
      })),
    },
  ];
  return (
    <PlaybookFrame label="Checklist" title={c.title} lede={c.lede} closingTitle={c.closing.title} closingBody={c.closing.body} reachOut={playbook.closing}>
      <Checklist id="starter" groups={groups} />
    </PlaybookFrame>
  );
}
