import { getTopTags } from "@/lib/content/blog";
import { getAllResources, type ResourceType } from "@/lib/content/resources";

export type NavMenuItem = { label: string; href: string };
export type NavMenus = { articles: NavMenuItem[]; resources: NavMenuItem[] };

const TYPE_LABELS: Record<ResourceType, string> = { tool: "Tools", template: "Templates", checklist: "Checklists" };
const TYPES: ResourceType[] = ["tool", "template", "checklist"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * The dropdown contents for the nav, built on the server from the content on disk:
 * Articles = all, case studies and the most-used topics; Resources = all and one entry per type that has items.
 */
export function getNavMenus(): NavMenus {
  const topics = getTopTags(6)
    .filter((t) => t.toLowerCase() !== "case-study" && t.toLowerCase() !== "case study")
    .slice(0, 4);
  const resources = getAllResources();
  return {
    articles: [
      { label: "All articles", href: "/blog" },
      { label: "Case studies", href: "/blog?tag=case-study" },
      ...topics.map((t) => ({ label: cap(t), href: `/blog?tag=${encodeURIComponent(t)}` })),
    ],
    resources: [
      { label: "All resources", href: "/resources" },
      ...TYPES.filter((t) => resources.some((r) => r.type === t)).map((t) => ({
        label: TYPE_LABELS[t],
        href: `/resources?type=${t}`,
      })),
    ],
  };
}
