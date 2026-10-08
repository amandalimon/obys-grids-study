"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { addSteps, scrollTimeline, type ScrollStep } from "@/lib/readymag"

gsap.registerPlugin(useGSAP)

const boxCenterX = 398.5

const are = { left: 1441.5 }
const areSteps: ScrollStep[] = [{ dx: -2000 }]

const just: {
  char: string
  left: number
  bottom: number
  steps: ScrollStep[]
}[] = [
  {
    char: "J",
    left: 2363.5,
    bottom: 20,
    steps: [
      { dx: -2148, dy: 1 },
      { dx: -1336, dy: -380, rotate: 360, speed: 0.4, ease: "out" }
    ]
  },
  {
    char: "U",
    left: 2488.5,
    bottom: 20,
    steps: [
      { dx: -2286 },
      { dx: -1336, dy: -379, rotate: 360, speed: 0.5, ease: "out" }
    ]
  },
  {
    char: "S",
    left: 2664.5,
    bottom: 19,
    steps: [
      { dx: -2374 },
      { dx: -1336, dy: -379, rotate: 360, speed: 0.4, ease: "out" }
    ]
  },
  {
    char: "T",
    left: 2824.5,
    bottom: 20,
    steps: [
      { dx: -2451 },
      { dx: -1336, dy: -379, rotate: 360, speed: 0.26, ease: "out" }
    ]
  }
]

export function IntroSentence() {
  const root = useRef<HTMLDivElement>(null)
  const areWord = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const scroll = scrollTimeline(root.current?.closest("section") ?? null)
      addSteps(scroll, areWord.current, areSteps)
      gsap.utils.toArray<HTMLElement>("[data-just]").forEach((letter, i) => {
        addSteps(scroll, letter, just[i].steps)
      })
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
      {just.map((letter) => (
        <span
          key={letter.char}
          data-just
          className="absolute text-display"
          style={{
            left: `calc(${letter.left} * var(--u))`,
            bottom: `calc(${letter.bottom} * var(--u))`,
            transformOrigin: `calc(${boxCenterX} * var(--u)) 50%`
          }}
        >
          {letter.char}
        </span>
      ))}
    </div>
  )
}
