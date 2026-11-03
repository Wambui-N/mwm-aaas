/**
 * Data for the shared site shell (nav and footer on every route). Page copy lives with each page;
 * only what the shell itself renders is here.
 */
export const AUDIT_HREF = "/assessment";
export const AUDIT_CTA = "Find My Proposal Gaps";

export const siteNav = {
  brand: "Made with Make",
  links: [
    { label: "Articles", href: "/blog", menu: "articles" as "articles" | "resources" | undefined },
    { label: "Resources", href: "/resources", menu: "resources" as "articles" | "resources" | undefined },
    { label: "Contact us", href: "/contact-us", menu: undefined as "articles" | "resources" | undefined },
  ],
};

export const siteFooter = {
  brand: "Made with Make",
  tagline: "Consult. Build. Execute.",
  links: [
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Contact us", href: "/contact-us" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
  linkedin: "https://www.linkedin.com/company/made-with-make/",
  email: "wambui@madewithmake.com",
};
