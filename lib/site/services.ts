/**
 * The services, in display order. `summary` is the one-or-two-sentence blurb on /services.
 * Proposal Pipeline has its own landing page (/proposal-pipeline); the others use the shared
 * detail template at /services/[slug], filled from `serviceDetails`.
 */
export type ServiceSummary = {
  slug: string;
  title: string;
  href: string;
  summary: string;
  popular?: boolean;
  cta: string;
};

export const serviceList: ServiceSummary[] = [
  {
    slug: "proposal-pipeline",
    title: "Proposal Pipeline",
    href: "/proposal-pipeline",
    popular: true,
    summary: "Send one RFP and get a complete first draft back in under 20 minutes, written in your firm's voice from your own past work.",
    cta: "See how it works",
  },
  {
    slug: "web-scraping",
    title: "Web Scraping",
    href: "/services/web-scraping",
    summary: "I collect data from websites on a schedule and deliver it clean and ready to use, so nobody has to copy and paste it by hand.",
    cta: "Learn more",
  },
  {
    slug: "web-development",
    title: "Web Development",
    href: "/services/web-development",
    summary: "A fast, clear website that explains what you do and makes it easy for the right people to get in touch.",
    cta: "Learn more",
  },
  {
    slug: "custom-automations",
    title: "Custom Automations",
    href: "/services/custom-automations",
    summary: "Got a repetitive task that does not fit a template? I design and build the workflow on Make.com and the tools you already use.",
    cta: "Learn more",
  },
];

export type ServiceDetail = {
  slug: string;
  /** Page h1 and the word inside it that gets the orange underline. */
  title: string;
  mark: string;
  metaDescription: string;
  keywords: string[];
  lede: string;
  forWho: string;
  gets: string[];
  steps: [string, string][];
  /** A real result when there is one; otherwise `examples`. */
  result?: { text: string; href: string; linkLabel: string };
  examples?: string[];
  ctaLabel: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "web-scraping",
    title: "Web Scraping",
    mark: "Scraping",
    metaDescription:
      "Web scraping that collects the data you need from websites on a schedule and delivers it clean to a sheet, database or inbox. No more copying and pasting.",
    keywords: ["web scraping service", "data scraping", "automated data collection", "Apify", "Make.com"],
    lede: "I collect data from websites on a schedule and deliver it clean and ready to use, so nobody on your team has to copy and paste it by hand.",
    forWho: "Teams that need listings, prices, leads or research gathered regularly.",
    gets: [
      "Scrapers built for the sites and the data you care about",
      "Data cleaned and sent to a sheet, database or inbox",
      "Runs automatically, daily or weekly",
      "Checked and set up so it keeps working",
    ],
    steps: [
      ["Tell me what you need.", "Which sites, which data, and how often you want it."],
      ["I build and test it.", "Scrapers are built and checked against the real pages."],
      ["The data arrives on schedule.", "Clean results land where your team already works."],
    ],
    result: {
      text: "We Are Kusudi went from about 50 hand-found job listings a week to up to 500, delivered fresh every Monday.",
      href: "/blog/from-50-to-500-listings-a-week-job-sourcing-automation-we-are-kusudi",
      linkLabel: "Read the case study",
    },
    ctaLabel: "Tell me what you need",
  },
  {
    slug: "web-development",
    title: "Web Development",
    mark: "Development",
    metaDescription:
      "A fast, clear website that explains what you do and makes it easy for the right people to get in touch. Designed, built and handed over so you can keep it updated.",
    keywords: ["web development", "website design for consultants", "business website", "website build"],
    lede: "A fast, clear website that explains what you do and makes it easy for the right people to get in touch.",
    forWho: "Founders who need a new site, or a rebuild of one that is not working for them.",
    gets: [
      "Design and build, mobile-friendly and quick to load",
      "Clear structure so visitors understand your offer",
      "Contact forms and booking connected to your tools",
      "Handover so you can keep it updated yourself",
    ],
    steps: [
      ["Plan it.", "We agree what the site needs to say and what visitors should do next."],
      ["Design and build it.", "I build it to load quickly and work well on phones."],
      ["Launch and hand over.", "You get a site you can update without calling anyone."],
    ],
    examples: ["A site that supports your sales process instead of sitting beside it."],
    ctaLabel: "Start a conversation",
  },
  {
    slug: "custom-automations",
    title: "Custom Automations",
    mark: "Automations",
    metaDescription:
      "Custom automations built on Make.com and the tools you already use: workflows, AI integrations and API connections that remove repetitive work from your week.",
    keywords: ["custom automation", "Make.com workflows", "AI integrations", "API connections", "process automation"],
    lede: "Got a repetitive task that does not fit a template? I design and build the workflow on Make.com and the tools you already use, then document it so your team can run it.",
    forWho: "Teams doing the same manual steps every week that a system could do for them.",
    gets: [
      "The process mapped out before anything is built",
      "Workflows built on Make.com, connected to your apps",
      "AI steps and API connections where they help",
      "Tested and documented, so your team can maintain it",
    ],
    steps: [
      ["Map it.", "We look at the process and decide what is worth automating."],
      ["Build and test it.", "I build the workflow and check it against real cases."],
      ["Hand it over.", "You get clear documentation and a system your team can run."],
    ],
    examples: ["Make.com workflows", "AI integrations", "API connections", "Process automation"],
    ctaLabel: "Tell me what to automate",
  },
];
