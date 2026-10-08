import { IntroBar } from "@/components/intro/intro-bar"
import { IntroDescription } from "@/components/intro/intro-description"
import { IntroGridLines } from "@/components/intro/intro-grid-lines"
import { IntroHero } from "@/components/intro/intro-hero"
import { IntroSentence } from "@/components/intro/intro-sentence"

export function Intro() {
  return (
    <section id="intro" className="relative h-[calc(6901*var(--u))]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <IntroGridLines />
        <IntroDescription />
        <IntroBar />
        <IntroSentence />
        <IntroHero />
      </div>
    </section>
  )
}
