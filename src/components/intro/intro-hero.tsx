const letters = [
  { char: "G", left: 245.5 },
  { char: "R", left: 436 },
  { char: "I", left: 599.8 },
  { char: "D", left: 657.4 },
  { char: "S", left: 833 }
]

export function IntroHero() {
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
        data-square-load
        className="absolute bottom-[calc(20*var(--u))] left-margin size-[calc(191*var(--u))]"
      >
        <div data-square-scroll className="size-full bg-fg" />
      </div>
    </div>
  )
}
