import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { unit } from "@/lib/unit"

gsap.registerPlugin(ScrollTrigger)

export type ScrollStep = {
  dx?: number
  dy?: number
  rotate?: number
  opacity?: number
  speed?: number
  delay?: number
  ease?: "in" | "out"
}

const eases = { in: "power1.in", out: "power1.out" }

export function scrollTimeline(trigger: Element | null) {
  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger,
      start: "top top",
      end: (self) => `+=${(self.animation?.duration() ?? 0) * unit()}`,
      scrub: true,
      invalidateOnRefresh: true
    }
  })
}

export function addSteps(
  timeline: gsap.core.Timeline,
  target: gsap.TweenTarget,
  steps: ScrollStep[]
) {
  let time = 0
  let x = 0
  let y = 0
  for (const step of steps) {
    const nextX = step.dx ?? x
    const nextY = step.dy ?? y
    const speed = step.speed ?? 1
    const travel = Math.hypot(nextX - x, nextY - y)
    const duration =
      travel > 0 ? Math.ceil(travel / speed) : Math.ceil(300 / speed) / unit()
    const vars: gsap.TweenVars = { duration }
    if (step.ease) vars.ease = eases[step.ease]
    if (step.dx !== undefined) vars.x = () => nextX * unit()
    if (step.dy !== undefined) vars.y = () => nextY * unit()
    if (step.rotate !== undefined) vars.rotation = step.rotate
    if (step.opacity !== undefined) vars.opacity = step.opacity / 100
    time += step.delay ?? 0
    timeline.to(target, vars, time)
    time += duration
    x = nextX
    y = nextY
  }
}
