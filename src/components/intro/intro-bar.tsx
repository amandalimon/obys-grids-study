"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { addSteps, scrollTimeline, type ScrollStep } from "@/lib/readymag"

gsap.registerPlugin(useGSAP)

const barSteps: ScrollStep[] = [
  { delay: 2064, dx: 992 },
  { delay: 10, dx: 0 },
  { delay: 1200, dx: 992, speed: 0.95 }
]

export function IntroBar() {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scroll = scrollTimeline(root.current?.closest("section") ?? null)
      addSteps(scroll, bar.current, barSteps)
    },
    { scope: root }
  )

  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      <div
        ref={bar}
        className="absolute bottom-[calc(20*var(--u))] left-[calc(-961.5*var(--u))] h-[calc(191*var(--u))] w-[calc(961*var(--u))] bg-fg"
      />
      <div className="absolute bottom-[calc(14*var(--u))] left-[calc(-1.5*var(--u))] h-[calc(199*var(--u))] w-[calc(223*var(--u))] bg-bg" />
    </div>
  )
}
