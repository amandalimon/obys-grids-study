"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { easeOut } from "@/lib/eases"

gsap.registerPlugin(useGSAP)

const letters = [
  { char: "G", left: 245.5 },
  { char: "R", left: 436 },
  { char: "I", left: 599.8 },
  { char: "D", left: 657.4 },
  { char: "S", left: 833 }
]

const square = { size: 191, centerX: 127.5, centerY: 115.5 }
const loaderSquare = { size: 95, centerX: 512, centerY: 277.5 }

export function IntroHero() {
  const squareLoad = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap
      .timeline({ defaults: { duration: 1.2, ease: easeOut } })
      .set(squareLoad.current, {
        xPercent: ((loaderSquare.centerX - square.centerX) / square.size) * 100,
        yPercent: ((square.centerY - loaderSquare.centerY) / square.size) * 100,
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
  })

  return (
    <div className="pointer-events-none absolute inset-0">
      {letters.map((letter) => (
        <span
          key={letter.char}
          data-letter
          className="absolute bottom-[calc(20*var(--u))] text-display"
          style={{ left: `calc(${letter.left} * var(--u))` }}
        >
          {letter.char}
        </span>
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
