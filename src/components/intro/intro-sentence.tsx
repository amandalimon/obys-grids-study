"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { addSteps, scrollTimeline, type ScrollStep } from "@/lib/readymag"

gsap.registerPlugin(useGSAP)

const are = { left: 1441.5 }
const areSteps: ScrollStep[] = [{ dx: -2000 }]

export function IntroSentence() {
  const root = useRef<HTMLDivElement>(null)
  const areWord = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const scroll = scrollTimeline(root.current?.closest("section") ?? null)
      addSteps(scroll, areWord.current, areSteps)
    },
    { scope: root }
  )

  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      <span
        ref={areWord}
        className="absolute bottom-[calc(20*var(--u))] text-display"
        style={{ left: `calc(${are.left} * var(--u))` }}
      >
        ARE
      </span>
    </div>
  )
}
