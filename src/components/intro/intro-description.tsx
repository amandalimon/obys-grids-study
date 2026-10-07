"use client"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { unit } from "@/lib/unit"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const scrollDistance = 500

export function IntroDescription() {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const distance = () => scrollDistance * unit()
    gsap.to(root.current, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: root.current?.closest("section"),
        start: "top top",
        end: () => `+=${distance()}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    })
  })
  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      <p className="absolute bottom-[calc(299*var(--u))] left-margin w-[calc(480*var(--u))] text-lead">
        An independent front-end recreation of{" "}
        <a
          href="https://grids.obys.agency/"
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto underline transition-opacity hover:opacity-70"
        >
          Grids by Obys Agency
        </a>
        . <br />
        The original Readymag experience, rebuilt with Next.js and GSAP.
      </p>
      <p className="absolute bottom-[calc(237*var(--u))] left-[calc(33*var(--u))] text-ui">
        4 types of grids
      </p>
    </div>
  )
}
