export { AUDIT_HREF } from "@/lib/site/shell";


export const hero = {
  label: "[00] Automation & AI Consulting, with Execution",
  lines: ["Your team is too good", "to be doing things manually."],
  body: "You've built a real business. But somewhere between growing from 5 people to 25, the operations stopped keeping up. Now your best people are spending their mornings on admin that a well-built system could do overnight.",
  // Phrases the live site shows in bold inside `body` (exact substrings).
  bodyBold: ["the operations stopped keeping up", "a well-built system could do overnight"],
  cta: "Take the Automation Gap Audit",
  secondary: "See how it works",
};

export const pain = {
  id: "growth-pain",
  label: "[01] Sound familiar?",
  heading: "The business grew. The processes didn't.",
  intro:
    "At some point, running on memory and goodwill stops working. Here's what that usually looks like.",
  items: [
    {
      title: "Skilled people doing admin",
      body: "You're paying experienced people to copy data between tools, chase approvals, and send the same email for the fifth time this week.",
    },
    {
      title: "Data living everywhere",
      body: "Six tools, four spreadsheets, one group chat. Nobody knows which version is current. Things fall through the cracks and nobody notices until it's too late.",
    },
    {
      title: "Leads and revenue leaking",
      body: "Follow-ups that didn't happen. Proposals that went out late. Clients who went quiet because nobody caught it in time.",
    },
    {
      title: "DIY automations that broke",
      body: "You or someone on your team tried to fix it with Zapier or Make. It worked for two weeks, then broke - because the underlying process was never fixed first.",
    },
  ],
};

export const tools = {
  label: "[02] Integrations",
  heading: "Some of the tools I work with",
  items: [
    "ShelfCue", "Make.com", "Google Sheets", "Slack", "Airtable", "Notion", "Tally",
    "Cal.com", "ClickUp", "ChatGPT", "Typeform", "WhatsApp", "Claude", "Calendly",
    "Google Drive", "Google Forms", "LinkedIn", "Instagram", "Perplexity", "DeepSeek",
    "Google Calendar",
  ],
};

export const how = {
  label: "[03] How it works",
  heading: ["From \"we're drowning\"", "to \"it just runs.\""],
  intro:
    "This isn't consulting where you get a strategy deck and a handshake. Every engagement ends with a working system your team can actually maintain.",
  steps: [
    {
      title: "Find where you're bleeding time and money",
      body: "We start with the Automation Gap Audit - a fast diagnostic that shows exactly which processes are costing you the most, and which ones are ready to automate right now. No fluff, no 40-page report.",
    },
    {
      title: "Fix the process before we automate it",
      body: "Most automations break because people automate a broken process. Before anything gets built, we map out what the workflow should actually look like - so the system we build doesn't just run faster, it runs right.",
    },
    {
      title: "Build it. Test it. Hand it over.",
      body: "Then we build - on Make.com, Google Workspace, and whatever tools your team already uses. Everything gets documented so your non-technical team can maintain it without calling anyone.",
    },
    {
      title: "Your team focuses on work that actually needs them",
      body: "The system runs. The admin disappears. Your people do the work they were hired to do. And when you're ready to scale the next thing, you know where to come.",
    },
  ],
};

export const cases = {
  label: "[04] Proof it works",
  heading: ["What a real before and after", "looks like."],
  intro:
    "Numbers matter more than promises. Here's what actually changed for a client after we built their system.",
  items: [
    {
      client: "Founders Freedom Africa",
      title:
        "From First Contact to Signed Client: Automating Founders Freedom Africa's Growth Engine",
      body: "How we automated Founders Freedom Africa's proposal-to-onboarding pipeline using Google Forms, Google Docs, ClickUp, and Make.com, cutting proposal creation from hours to minutes and closing every gap between first contact and signed agreement.",
      stack: "Google Forms, Google Docs, ClickUp, Make.com",
      // Wording from the post's own "Result:" line ("from several hours to a few minutes").
      result: "Several hours -> a few minutes",
      href: "/blog/from-first-contact-to-signed-client-founders-freedom-africa",
      count: null as null | { from: number; to: number; unit: string; toPrefix: string },
    },
    {
      client: "We Are Kusudi",
      title: "From 50 to 500 Listings a Week: Automating Job Sourcing for We Are Kusudi",
      body: "How we automated We Are Kusudi's job listing search using Apify, scaling from roughly 50 manually-found listings a week to up to 500, delivered fresh every Monday.",
      // The post builds the scrapers in Apify and runs them from Make.com ("What We Built").
      stack: "Apify, Make.com",
      result: "Listings / week",
      href: "/blog/from-50-to-500-listings-a-week-job-sourcing-automation-we-are-kusudi",
      // The post says "up to 500" / "as many as 500, depending on what was posted".
      count: { from: 50, to: 500, unit: "listings / week", toPrefix: "up to " },
    },
  ],
  cta: "Read case study",
};

export const audit = {
  label: "[05] Start here",
  heading: ["Not sure where your biggest", "bottleneck actually is?"],
  body: "That's exactly what the Automation Gap Audit is for. Ten questions across your operations, client management, and tools stack. You'll leave knowing where you're losing the most, and what to fix first.",
  panelTitle: "The Automation Gap Audit",
  panelSub: "In 5 minutes, know exactly what to automate first.",
  bullets: [
    "See your automation score across 3 key areas",
    "Get your top gaps identified and explained clearly",
    "Receive a personalised next step.",
  ],
  cta: "Take the Free Audit",
  stats: [
    { value: 10, label: "Questions" },
    { value: 5, label: "Minutes" },
    { value: 1, label: "Clear next step" },
  ],
};

export const fit = {
  label: "[06] Is this for you?",
  heading: "You're in the right place if...",
  items: [
    "Your team has grown past 10 people but you're still running on the same processes you used when it was just you.",
    "You suspect you're losing time - or clients - to things that should be automatic by now.",
    "You've tried to fix it before (Zapier, a VA, a spreadsheet) and it didn't stick.",
    "You want something built and handed over - not a consultant who tells you what to do and leaves.",
    "You run most of your business on Google Workspace and want your tools to actually work together.",
  ],
};

export const testimonial = {
  label: "[07] Client feedback",
  quote:
    "I enjoyed working with Wambui on automating our proposal process. She is honest, professional, and ensures that she follows through on what she promises. I would definitely recommend working with her.",
  name: "Joyce Kayima",
  company: "Founder's Freedom",
};

/**
 * All testimonials, in display order (same wording as `testimonial` above, which other designs still
 * use). To add one, append an entry here; `highlights` are exact phrases from that quote that get an
 * orange marker highlight.
 */
export const testimonials = [{ ...testimonial, highlights: ["honest, professional", "follows through"] }];

export const founder = {
  label: "[08] Founder",
  name: "Wambui Ndung'u",
  title: "Automation consultant & problem solver for established teams.",
  paragraphs: [
    "I built my first automation to stop doing something I hated doing manually. That was it, no grand vision, just a problem I wanted to go away. It worked. Then I built another one.",
    "Turns out, finding a messy workflow and making the repetitive parts disappear is genuinely fun for me. That probably says something about me. It definitely explains the business.",
  ],
  linkedin: "https://www.linkedin.com/in/wambui-ndungu-210409193/",
  caption: "FIG. 01 / WAMBUI NDUNG'U, FOUNDER",
  cta: "Take the Automation Gap Audit",
};

export const finalCta = {
  label: "[09] Is this for you?",
  heading: "Find out exactly where your business is leaking time.",
  body: "The audit takes five minutes. The results stay with you forever.",
  cta: "Take the Free Automation Gap Audit",
};
