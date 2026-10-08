"use client"
import { Fragment, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { easeOut } from "@/lib/eases"
import { unit } from "@/lib/unit"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const groups = [
  {
    distance: 3000,
    lines: [
      517.5, 639.5, 901.5, 897.5, 887.5, 867.5, 1240.5, 1235.5, 1205.5, 2271.5,
      2305.5, 2275.5, 2435.5, 2440.5, 2450.5, 2480.5, 2860.5
    ],
    labels: [
      { text: "Columns", left: 1255.5 },
      { text: "Van De Graaf", left: 2495.5 }
    ]
  },
  {
    distance: 7000,
    lines: [
      3815.5, 3829.5, 3909.5, 3929.5, 3934.5, 3941.5, 3951.5, 6854.5, 7174.5,
      7354.5, 7350.5, 7346.5, 7336.5, 7316.5, 7164.5, 7084.5
    ],
    labels: [
      { text: "Rectangular", left: 3844.5 },
      { text: "Others", left: 6869.5 }
    ]
  }
]

export function IntroGridLines() {
  const root = useRef<HTMLDivElement>(null)
  const mask = useRef<HTMLDivElement>(null)
  const rule = useRef<HTMLSpanElement>(null)
  const { contextSafe } = useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: easeOut } })
        .to(rule.current, { opacity: 1, duration: 0.6 }, 4)
        .to(mask.current, { y: -1200 * unit(), duration: 2.6 }, 4.2)
        .set(mask.current, { autoAlpha: 0 })

      const scrollLeft = (target: Element, distance: number, delay: number) =>
        gsap.to(target, {
          x: () => -distance * unit(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current?.closest("section"),
            start: () => `top top-=${delay * unit()}`,
            end: () => `+=${distance * unit()}`,
            scrub: true,
            invalidateOnRefresh: true
          }
        })
      const lineLayers = gsap.utils.toArray<HTMLElement>("[data-lines]")
      const labelLayers = gsap.utils.toArray<HTMLElement>("[data-labels]")
      groups.forEach((group, i) => {
        scrollLeft(lineLayers[i], group.distance, 10)
        scrollLeft(labelLayers[i], group.distance, 0)
      })
    },
    { scope: root }
  )
  const bounce = contextSafe((line: Element | null) => {
    if (!line || gsap.getTweensOf(line).length) return
    gsap
      .timeline({ delay: 0.1 })
      .to(line, { y: -30 * unit(), duration: 0.2, ease: "power1.out" })
      .to(line, { y: 0, duration: 0.4, ease: "power1.inOut" })
  })
  return (
    <div
      ref={root}
      className="absolute inset-0 [--rule:round(calc(261*var(--u)),1px)]"
    >
      <div className="absolute inset-x-0 top-header bottom-(--rule) overflow-hidden">
        {groups.map((group) => (
          <Fragment key={group.distance}>
            <div data-lines className="pointer-events-none absolute inset-0">
              {group.lines.map((left) => (
                <span
                  key={left}
                  className="pointer-events-auto absolute inset-y-0 w-[calc(5*var(--u))]"
                  onMouseEnter={(event) =>
                    bounce(event.currentTarget.firstElementChild)
                  }
                  style={{
                    left: `calc(round(calc(${left} * var(--u)), 1px) - 2.5 * var(--u))`
                  }}
                >
                  <span className="absolute top-[calc(-30*var(--u))] bottom-0 left-[calc(2.5*var(--u))] w-(--line) bg-fg" />
                </span>
              ))}
            </div>
            <div data-labels className="pointer-events-none absolute inset-0">
              {group.labels.map((label) => (
                <span
                  key={label.text}
                  className="absolute bottom-[calc(10.5*var(--u))] rotate-180 text-ui whitespace-nowrap [writing-mode:vertical-rl]"
                  style={{ left: `calc(${label.left} * var(--u))` }}
                >
                  {label.text}
                </span>
              ))}
            </div>
          </Fragment>
        ))}
        <div
          ref={mask}
          className="pointer-events-none absolute inset-0 bg-bg"
        />
      </div>
      <span
        ref={rule}
        className="absolute inset-x-margin bottom-(--rule) h-(--line) bg-fg opacity-0"
      />
    </div>
  )
}
