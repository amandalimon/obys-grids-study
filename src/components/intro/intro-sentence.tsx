"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { addSteps, scrollTimeline, type ScrollStep } from "@/lib/readymag"

gsap.registerPlugin(useGSAP)

type Letter = {
  char: string
  left: number
  bottom: number
  steps: ScrollStep[]
}

const justPivotX = 398.5
const powerfulPivotX = 108

const are = { left: 1441.5 }
const areSteps: ScrollStep[] = [{ dx: -2000 }]

const just: Letter[] = [
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

const powerful: Letter[] = [
  {
    char: "P",
    left: 5435,
    bottom: 21,
    steps: [
      { dx: -5183, dy: 0 },
      { dx: -5391, dy: -655, rotate: -180, ease: "out" }
    ]
  },
  {
    char: "O",
    left: 5591,
    bottom: 22,
    steps: [
      { dx: -5331, dy: 1 },
      { dx: -5418, dy: 343, rotate: 180, ease: "out" }
    ]
  },
  {
    char: "W",
    left: 5786,
    bottom: 20,
    steps: [
      { dx: -5494, dy: 0 },
      { dx: -5631, dy: -655, rotate: -180, ease: "out" }
    ]
  },
  {
    char: "E",
    left: 6013,
    bottom: 20,
    steps: [
      { dx: -5641, dy: 0 },
      { dx: -5708, dy: 500, rotate: 180, ease: "out" }
    ]
  },
  {
    char: "R",
    left: 6172,
    bottom: 21,
    steps: [
      { dx: -5710, dy: 0 },
      { dx: -5811, dy: -651, rotate: -180, ease: "out" }
    ]
  },
  {
    char: "F",
    left: 6338,
    bottom: 20,
    steps: [
      { dx: -5806, dy: 0 },
      { dx: -5818, dy: 501, rotate: 180, ease: "out" }
    ]
  },
  {
    char: "U",
    left: 6481,
    bottom: 20,
    steps: [
      { dx: -5856, dy: 0 },
      { dx: -5979, dy: -652, rotate: -180, ease: "out" }
    ]
  },
  {
    char: "L",
    left: 6659,
    bottom: 20,
    steps: [
      { dx: -5948, dy: 0 },
      { dx: -5996, dy: 501, rotate: 180, ease: "out" }
    ]
  }
]

const tools = { left: 4108.5, bottom: 21 }
const toolsSteps: ScrollStep[] = [{ dx: -5000 }]

const phrase = { left: 4963, bottom: 164 }
const phraseSteps: ScrollStep[] = [{ dx: -6000 }]

const dashes: { left: number; steps: ScrollStep[] }[] = [
  { left: 1205.5, steps: [{ dx: -1174 }, { opacity: 0, speed: 10 }] },
  { left: 2145.5, steps: [{ dx: -1800 }, { opacity: 0, speed: 40 }] },
  { left: 5207.5, steps: [{ dx: -5000 }, { opacity: 0, speed: 10 }] }
]

export function IntroSentence() {
  const root = useRef<HTMLDivElement>(null)
  const areWord = useRef<HTMLSpanElement>(null)
  const toolsWord = useRef<HTMLSpanElement>(null)
  const phraseText = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const scroll = scrollTimeline(root.current?.closest("section") ?? null)
      addSteps(scroll, areWord.current, areSteps)
      gsap.utils.toArray<HTMLElement>("[data-just]").forEach((letter, i) => {
        addSteps(scroll, letter, just[i].steps)
      })
      addSteps(scroll, toolsWord.current, toolsSteps)
      addSteps(scroll, phraseText.current, phraseSteps)
      gsap.utils
        .toArray<HTMLElement>("[data-powerful]")
        .forEach((letter, i) => {
          addSteps(scroll, letter, powerful[i].steps)
        })
      gsap.utils.toArray<HTMLElement>("[data-dash]").forEach((dash, i) => {
        addSteps(scroll, dash, dashes[i].steps)
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
            transformOrigin: `calc(${justPivotX} * var(--u)) 50%`
          }}
        >
          {letter.char}
        </span>
      ))}
      <span
        ref={toolsWord}
        className="absolute text-display"
        style={{
          left: `calc(${tools.left} * var(--u))`,
          bottom: `calc(${tools.bottom} * var(--u))`
        }}
      >
        TOOLS
      </span>
      <p
        ref={phraseText}
        className="absolute text-ui whitespace-pre"
        style={{
          left: `calc(${phrase.left} * var(--u))`,
          bottom: `calc(${phrase.bottom} * var(--u))`
        }}
      >
        {"... but\n     these tools\nare..."}
      </p>
      {powerful.map((letter) => (
        <span
          key={letter.char}
          data-powerful
          className="absolute text-display"
          style={{
            left: `calc(${letter.left} * var(--u))`,
            bottom: `calc(${letter.bottom} * var(--u))`,
            transformOrigin: `calc(${powerfulPivotX} * var(--u)) 50%`
          }}
        >
          {letter.char}
        </span>
      ))}
      {dashes.map((dash) => (
        <div
          key={dash.left}
          data-dash
          className="absolute bottom-[calc(9*var(--u))] flex h-[calc(24*var(--u))] w-[calc(191*var(--u))] items-center"
          style={{ left: `calc(${dash.left} * var(--u))` }}
        >
          <span className="h-(--line) w-full bg-fg" />
        </div>
      ))}
    </div>
  )
}
