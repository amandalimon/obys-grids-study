"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const counter = ["00", "20", "70", "100"]

export function Loader() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const count = (value: string) => `[data-count="${value}"]`
      gsap
        .timeline({ defaults: { duration: 0.2, ease: "none" } })
        .set(count("00"), { autoAlpha: 0 }, 0.4)
        .to(count("20"), { autoAlpha: 1 }, 0.7)
        .set(count("20"), { autoAlpha: 0 }, 2.4)
        .to(count("70"), { autoAlpha: 1 }, 2.5)
        .set(count("70"), { autoAlpha: 0 }, 3.3)
        .to(count("100"), { autoAlpha: 1 }, 3.4)
        .to("[data-loading-label]", { autoAlpha: 0 }, 3.8)
        .to(count("100"), { autoAlpha: 0 }, 3.9)
    },
    { scope: root }
  )

  return (
    <div ref={root} aria-hidden className="pointer-events-none text-ui">
      <p
        data-loading-label
        className="fixed bottom-[calc(16*var(--u))] left-[calc(31*var(--u))]"
      >
        Loading...
      </p>
      <div className="fixed right-margin bottom-[calc(16*var(--u))] grid justify-items-end">
        {counter.map((value, i) => (
          <span
            key={value}
            data-count={value}
            className={`col-start-1 row-start-1 ${i === 0 ? "" : "invisible opacity-0"}`}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  )
}
