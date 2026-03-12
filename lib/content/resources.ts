export type ResourceType = "tool" | "template" | "checklist";

export interface Resource {
  slug: string;
  title: string;
  description: string;
  type: ResourceType;
  /** External URL or path to file in /public (e.g. /resources/roi-calculator.xlsx) */
  url: string;
  /** Whether url is external (opens in new tab) or internal asset */
  external?: boolean;
  /**
   * Key matching a registered interactive React component.
   * When set, the detail page renders the component instead of a link/download.
   */
  component?: string;
}

const resourcesData: Resource[] = [
  {
    slug: "webhook-tester",
    title: "Webhook Tester / Inspector",
    description:
      "Test incoming webhooks and inspect payloads. Debug Make.com, Zapier, or custom integrations by viewing headers and body.",
    type: "tool",
    url: "#",
    external: false,
    component: "WebhookTester",
  },
  {
    slug: "document-signer",
    title: "Document Signer",
    description:
      "Sign a PDF directly in your browser. Draw or type your signature, place it on any page, and download the signed file. Nothing leaves your device.",
    type: "tool",
    url: "#",
    external: false,
    component: "DocumentSigner",
  },
  {
    slug: "10-workflows-to-automate-first",
    title: "10 Workflows to Automate First",
    description:
      "The highest-impact manual tasks to automate in your business — what each one is, why it matters, and exactly how to get started.",
    type: "checklist",
    url: "#",
    external: false,
    component: "WorkflowsToAutomateChecklist",
  },
];

export function getAllResources(): Resource[] {
  return resourcesData;
}

export function getResource(type: ResourceType, slug: string): Resource | null {
  return resourcesData.find((r) => r.type === type && r.slug === slug) ?? null;
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return resourcesData.filter((r) => r.type === type);
}
