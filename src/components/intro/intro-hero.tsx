"use client"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { easeOut } from "@/lib/eases"
import { unit } from "@/lib/unit"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const letters = [
  { char: "G", left: 245.5, fallDelay: 330 },
  { char: "R", left: 436, fallDelay: 250 },
  { char: "I", left: 599.8, fallDelay: 170 },
  { char: "D", left: 657.4, fallDelay: 90 },
  { char: "S", left: 833, fallDelay: 10 }
]

const letterPivotX = 398.5
const letterLoadOffset = 224
const fall = { x: -40, y: 300, rotation: -7 }
const fallDuration = Math.ceil(Math.hypot(fall.x, fall.y))

const square = { size: 191, centerX: 127.5, centerY: 115.5 }
const loaderSquare = { size: 95, centerX: 512, centerY: 277.5 }

export function IntroHero() {
  const root = useRef<HTMLDivElement>(null)
  const squareLoad = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { duration: 1.2, ease: easeOut } })
        .set(squareLoad.current, {
          xPercent:
            ((loaderSquare.centerX - square.centerX) / square.size) * 100,
          yPercent:
            ((square.centerY - loaderSquare.centerY) / square.size) * 100,
          scale: loaderSquare.size / square.size,
          visibility: "visible"
        })
        .to(squareLoad.current, { rotation: 180 })
        .to(squareLoad.current, { rotation: 360 }, "+=0.4")
        .to(
          squareLoad.current,
          { xPercent: 0, yPercent: 0, scale: 1, rotation: 540 },
          "+=0.4"
        )

      const scroll = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current?.closest("section"),
          start: "top top",
          end: (self) => `+=${(self.animation?.duration() ?? 0) * unit()}`,
          scrub: true,
          invalidateOnRefresh: true
        }
      })
      gsap.utils
        .toArray<HTMLElement>("[data-letter-scroll]")
        .forEach((letter, i) => {
          scroll.to(
            letter,
            {
              x: () => fall.x * unit(),
              y: () => fall.y * unit(),
              rotation: fall.rotation,
              duration: fallDuration,
              ease: "power1.in"
            },
            letters[i].fallDelay
          )
        })

      gsap.fromTo(
        "[data-letter]",
        { y: 224 * unit(), rotation: -7, visibility: "visible" },
        {
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: easeOut,
          stagger: 0.1,
          delay: 3.8
        }
      )
    },
    { scope: root }
  )

  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      {letters.map((letter) => (
        <div
          key={letter.char}
          data-letter-scroll
          className="absolute bottom-[calc(20*var(--u))]"
          style={{
            left: `calc(${letter.left} * var(--u))`,
            transformOrigin: `calc(${letterPivotX} * var(--u)) calc(50% + ${letterLoadOffset} * var(--u))`
          }}
        >
          <span
            data-letter
            className="block text-display"
            style={{
              transformOrigin: `calc(${letterPivotX} * var(--u)) 50%`
            }}
          >
            {letter.char}
          </span>
        </div>
      ))}
      <div
        data-square-scroll
        className="absolute bottom-[calc(20*var(--u))] left-margin size-[calc(191*var(--u))]"
      >
        <div
          ref={squareLoad}
          data-square-load
          className="invisible size-full bg-fg"
        />
      </div>
    </div>
  )
}
