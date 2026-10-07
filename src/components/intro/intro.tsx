import { IntroGridLines } from "@/components/intro/intro-grid-lines"

export function Intro() {
  return (
    <section id="intro" className="relative h-[calc(6901*var(--u))]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <IntroGridLines />
      </div>
    </section>
  )
}
