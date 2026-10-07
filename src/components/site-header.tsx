"use client"
import { useState } from "react"

const links = [
  { label: "Intro", target: "#intro" },
  { label: "Grids", target: "#types" },
  { label: "Books", target: "#books" }
]

const scrollToSection = (target: string) =>
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth" })

export function SiteHeader() {
  const [grid, setGrid] = useState(false)
  const [crazy, setCrazy] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 grid h-header grid-cols-8 items-start gap-x-gutter px-margin pt-[calc(16*var(--u))] text-ui text-white mix-blend-difference">
        <button
          type="button"
          onClick={() => scrollToSection("#intro")}
          className="flex items-baseline gap-1 justify-self-start transition-opacity [-webkit-text-stroke:0.3px_currentColor] hover:opacity-70"
        >
          <span className="size-[calc(8*var(--u))] bg-current" />
          GRIDS
        </button>
        <nav className="col-span-2 col-start-3 hidden gap-1 md:flex">
          {links.map((link, i) => (
            <button
              key={link.target}
              type="button"
              onClick={() => scrollToSection(link.target)}
              className="transition-opacity hover:opacity-70"
            >
              {link.label} {i < links.length - 1 && "/"}
            </button>
          ))}
        </nav>
        <Switch
          label="Grid"
          value={grid}
          onChange={setGrid}
          className="col-start-5"
        />
        <Switch
          label="Crazy Mode"
          value={crazy}
          onChange={setCrazy}
          className="col-span-2 col-start-6"
        />
        <span className="col-start-8 hidden justify-self-end whitespace-nowrap sm:block">
          GSAP Practice ©2026
        </span>
        <span className="absolute inset-x-margin bottom-0 h-(--line) bg-current" />
      </header>
      {grid && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-40 grid grid-cols-8 gap-gutter px-margin"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="bg-[rgb(86_86_86/0.1)]" />
          ))}
        </div>
      )}
    </>
  )
}
function Switch({
  label,
  value,
  onChange,
  className
}: {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-[calc(3*var(--u))] whitespace-nowrap ${className ?? ""}`}
    >
      <span>{label}:</span>
      <div className="flex gap-[calc(1.1*var(--u))]">
        <SwitchOption
          label="On"
          active={value}
          onClick={() => onChange(true)}
        />
        <SwitchOption
          label="Off"
          active={!value}
          onClick={() => onChange(false)}
        />
      </div>
    </div>
  )
}

function SwitchOption({
  label,
  active,
  onClick
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-[calc(16*var(--u))] w-[calc(26.7*var(--u))] items-center justify-center rounded-full border leading-none ${active ? "border-white bg-white text-black" : "border-current"}`}
    >
      {label}
    </button>
  )
}
