import { IntroDescription } from "@/components/intro/intro-description"
import { IntroGridLines } from "@/components/intro/intro-grid-lines"
import { IntroHero } from "@/components/intro/intro-hero"

export function Intro() {
  return (
    <section id="intro" className="relative h-[calc(6901*var(--u))]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <IntroGridLines />
        <IntroDescription />
        <IntroHero />
      </div>
    </section>
  )
}
