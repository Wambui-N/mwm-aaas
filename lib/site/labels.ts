/** Mono labels (Geist Mono, uppercase) and aria labels that are not site copy. Site copy is in lib/homepage/copy.ts and lib/site/shell.ts. */
export const MONO = {
  caseClient: "CLIENT",
  caseStack: "STACK",
  caseResult: "RESULT",
  testimonialPrefix: "CLIENT",
  titleBlock: { name: "NAME", links: "LINKS", contact: "CONTACT", year: "YEAR" },
} as const;

export const ARIA = { primaryNav: "Primary", footerNav: "Footer" } as const;
