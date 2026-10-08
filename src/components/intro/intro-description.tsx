"use client"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { easeOut } from "@/lib/eases"
import { unit } from "@/lib/unit"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const scrollDistance = 500

export function IntroDescription() {
  const root = useRef<HTMLDivElement>(null)
  const description = useRef<HTMLParagraphElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  useGSAP(() => {
    gsap
      .timeline({ defaults: { ease: easeOut } })
      .fromTo(
        description.current,
        { "--reveal": 0 },
        { "--reveal": 33, duration: 1 },
        4
      )
      .fromTo(
        label.current,
        { "--reveal": 0 },
        { "--reveal": 32, duration: 1.2 },
        4
      )

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
      <p
        ref={description}
        className="absolute bottom-[calc(299*var(--u))] left-margin w-[calc(480*var(--u))] text-lead reveal-up"
      >
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
      <p
        ref={label}
        className="absolute bottom-[calc(237*var(--u))] left-[calc(33*var(--u))] text-ui reveal-up"
      >
        4 types of grids
      </p>
    </div>
  )
}
