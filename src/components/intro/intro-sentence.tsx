"use client"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { unit } from "@/lib/unit"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const are = { left: 1441.5, distance: 2000 }

export function IntroSentence() {
  const root = useRef<HTMLDivElement>(null)
  const areWord = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current?.closest("section"),
            start: "top top",
            end: (self) => `+=${(self.animation?.duration() ?? 0) * unit()}`,
            scrub: true,
            invalidateOnRefresh: true
          }
        })
        .to(
          areWord.current,
          { x: () => -are.distance * unit(), duration: are.distance },
          0
        )
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
