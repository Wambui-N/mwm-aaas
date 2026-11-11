import type { Metadata } from "next";
import { Checklist } from "@/components/playbook/Checklist";
import { PlaybookFrame } from "@/components/playbook/Frame";
import { getReadyChecklist as c, playbook } from "@/lib/playbook/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.lede,
  alternates: { canonical: `${siteConfig.url}/playbook/get-ready-checklist` },
};

export default function GetReadyChecklistPage() {
  const groups = c.groups.map((g, gi) => ({ title: g.title, items: g.items.map((label, i) => ({ key: `${gi}-${i}`, label })) }));
  return (
    <PlaybookFrame label="Checklist" title={c.title} lede={c.lede} closingTitle={c.closing.title} closingBody={c.closing.body} reachOut={playbook.closing}>
      <Checklist id="get-ready" groups={groups} />
    </PlaybookFrame>
  );
}
