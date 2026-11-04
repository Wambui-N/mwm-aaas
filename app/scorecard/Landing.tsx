import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Underlined } from "@/components/site/Underlined";
import { Faq } from "@/components/proposal-pipeline/Faq";
import { ResumeNotice, StartButton } from "@/components/scorecard/ScorecardFlow";
import { FOUNDERS_FREEDOM_POST } from "@/lib/scorecard/config";
import { landing as c } from "@/lib/scorecard/copy";

const ruled = "calm-body border-t border-ink/20 py-4";

/** A ruled, unboxed list under a mono label. */
function RuledList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h2 className="calm-h3">{title}</h2>
      <ul className="mt-4 border-b border-ink/20">
        {items.map((t) => (
          <li key={t} className={ruled}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Demo({ url }: { url: string }) {
  const isFile = /\.(mp4|webm|mov)(\?|$)/i.test(url);
  return (
    <section className="mt-[4.5rem] md:mt-[6.75rem]" aria-labelledby="sc-demo-h">
      <h2 id="sc-demo-h" className="calm-h3">
        {c.demoTitle}
      </h2>
      <div className="mt-4 aspect-video w-full max-w-[56rem] border border-ink/30 bg-ink/5">
        {isFile ? (
          <video className="h-full w-full" controls preload="metadata" src={url} />
        ) : (
          <iframe className="h-full w-full" src={url} title={c.demoTitle} allow="fullscreen; picture-in-picture" loading="lazy" />
        )}
      </div>
    </section>
  );
}

/** The landing page. Server-rendered; the buttons are small client islands that start the quiz. */
export function Landing({ demoUrl }: { demoUrl: string }) {
  const [before, after] = c.headline.split(c.headlineMark);
  return (
    <div>
      <header className="grid gap-10 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-7 md:self-center">
          <SectionLabel>{c.label}</SectionLabel>
          <h1 className="sk-title">
            {before}
            <Underlined seed={81}>{c.headlineMark}</Underlined>
            {after}
          </h1>
          <p className="pg-lede mt-6 max-w-[40rem]">{c.sub}</p>
          <div className="mt-8">
            <StartButton seed={82}>{c.button} →</StartButton>
          </div>
          <ResumeNotice />
          <p className="gl-mono mt-6 text-ink/60">{c.noPrep}</p>
        </div>

        <figure className="md:col-span-4 md:col-start-9">
          <div className="relative aspect-[4/5] max-w-[22rem] overflow-hidden md:max-w-none" style={{ background: "var(--paper-2)" }}>
            <Image src="/founder.jpg" alt="Wambui Ndung'u, founder of Made With Make" fill priority sizes="(min-width: 768px) 30vw, 80vw" className="object-cover" />
          </div>
          <figcaption className="gl-mono mt-3 text-ink/60">Wambui Ndung&apos;u, Made With Make</figcaption>
        </figure>
      </header>

      <div className="mt-[4.5rem] grid gap-x-12 gap-y-12 md:mt-[6.75rem] md:grid-cols-2">
        <RuledList title={c.familiarTitle} items={c.familiar} />
        <RuledList title={c.getTitle} items={c.gets} />
      </div>

      <figure className="mt-[4.5rem] border-t border-ink/30 pt-10 md:mt-[6.75rem]">
        <blockquote className="max-w-[48rem] font-[family-name:var(--font-brule)] text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.25] tracking-tight">
          “{c.proofQuote}”
        </blockquote>
        <figcaption className="gl-mono mt-5 text-ink/70">
          <Link href={FOUNDERS_FREEDOM_POST} className="underline-offset-4 hover:underline focus-visible:underline">
            {c.proofName}
          </Link>
        </figcaption>
      </figure>

      {demoUrl && <Demo url={demoUrl} />}

      <section className="mt-[4.5rem] md:mt-[6.75rem]" aria-labelledby="sc-built-h">
        <h2 id="sc-built-h" className="calm-h3">
          {c.builtTitle}
        </h2>
        <p className="calm-body mt-4 max-w-[46rem] text-ink/85">{c.built}</p>
      </section>

      <section className="mt-[4.5rem] md:mt-[6.75rem]" aria-labelledby="sc-faq-h">
        <h2 id="sc-faq-h" className="calm-h3">
          {c.faqTitle}
        </h2>
        <Faq items={c.faqs} />
        <div className="mt-10">
          <StartButton seed={83}>{c.buttonRepeat} →</StartButton>
        </div>
      </section>
    </div>
  );
}
