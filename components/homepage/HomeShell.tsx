import { SiteShell } from "@/components/site/SiteShell";
import { Audit } from "@/components/homepage/sections/Audit";
import { Cases } from "@/components/homepage/sections/Cases";
import { Checklist } from "@/components/homepage/sections/Checklist";
import { FinalCta } from "@/components/homepage/sections/FinalCta";
import { Founder } from "@/components/homepage/sections/Founder";
import { Hero } from "@/components/homepage/sections/Hero";
import { How } from "@/components/homepage/sections/How";
import { Pain } from "@/components/homepage/sections/Pain";
import { Testimonial } from "@/components/homepage/sections/Testimonial";
import { Tools } from "@/components/homepage/sections/Tools";

/** The homepage: the shared shell (curtain footer) around the ten sections. Rendered only by app/page.tsx. */
export function HomeShell() {
  return (
    <SiteShell footer="curtain">
      <main>
        <Hero />
        <Pain />
        <Tools />
        <How />
        <Cases />
        <Audit />
        <Checklist />
        <Testimonial />
        <Founder />
        <FinalCta />
      </main>
    </SiteShell>
  );
}
