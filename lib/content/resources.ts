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
    slug: "pomodoro-focus-timer",
    title: "Pomodoro Focus Timer",
    description:
      "A simple Pomodoro timer to stay focused in work blocks. Set your intervals, track sessions, and build a habit of deep work.",
    type: "tool",
    url: "#",
    external: false,
    component: "PomodoroTimer",
  },
  {
    slug: "json-to-csv-converter",
    title: "JSON to CSV Converter",
    description:
      "Convert JSON data to CSV for spreadsheets, imports, or reporting. Paste JSON and download a clean CSV file.",
    type: "tool",
    url: "#",
    external: false,
    component: "JsonToCsvConverter",
  },
  {
    slug: "sheets-to-csv-converter",
    title: "Sheets to CSV Converter",
    description:
      "Export or convert Google Sheets–style data to CSV. Useful for moving data between tools or preparing files for automation.",
    type: "tool",
    url: "#",
    external: false,
    component: "SheetsToCsvConverter",
  },
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
