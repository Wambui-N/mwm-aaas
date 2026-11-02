import "./homepage.css";
import { brule, geistMono, satoshi } from "@/lib/homepage/fonts";
import { SmoothScrollProvider } from "@/components/homepage/providers/SmoothScrollProvider";
import { ReadyOnMount } from "@/components/homepage/providers/ReadyOnMount";
import { HomeNav } from "@/components/homepage/HomeNav";
import { HomeFooter } from "@/components/homepage/HomeFooter";
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

/**
 * The redesigned homepage: the wrapper that carries the design's scope attributes and font variables
 * (from the handoff's route-group layout) plus the ten sections. Rendered only by app/page.tsx.
 * All CSS in homepage.css is scoped to [data-sketch][data-calm], so other routes are unaffected.
 */
export function HomeShell() {
  return (
    <div data-sketch data-calm className={`${brule.variable} ${satoshi.variable} ${geistMono.variable}`}>
      <SmoothScrollProvider>
        <ReadyOnMount />
        <HomeNav />
        <div className="relative z-10">
          <HomeFooter>
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
          </HomeFooter>
        </div>
      </SmoothScrollProvider>
    </div>
  );
}
