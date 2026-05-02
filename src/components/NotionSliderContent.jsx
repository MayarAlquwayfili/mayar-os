import { useCallback, useState } from 'react'

/**
 * Slide entries with `src` + `caption`. Leave empty to show the system placeholder
 * until Notion imagery is wired in.
 */
const SLIDES = []

function NotionSliderPlaceholder() {
  return (
    <div className="relative flex min-h-[min(52vh,420px)] w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-br from-[#f4f0ff] via-white to-[#eef8ff] px-6 py-12">
      <div
        className="pointer-events-none absolute inset-0 scale-110 bg-[radial-gradient(ellipse_at_30%_20%,rgba(107,63,160,0.22),transparent_55%),radial-gradient(ellipse_at_70%_80%,rgba(59,130,246,0.18),transparent_50%)] blur-2xl"
        aria-hidden
      />
      <div className="relative z-[1] text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ACDEE7]/90">
          System
        </p>
        <p className="mt-3 text-[20px] font-bold tracking-tight text-gray-900 sm:text-[22px]">
          Loading Brain…
        </p>
        <p className="mt-2 text-[13px] font-medium text-gray-500">Coming soon — workspace preview</p>
        <div className="mx-auto mt-6 flex h-1.5 w-40 overflow-hidden rounded-full bg-white/60">
          <div
            className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-[#ACDEE7] to-[#82ADB5]"
            style={{ animationDuration: '1.6s' }}
          />
        </div>
      </div>
    </div>
  )
}

export default function NotionSliderContent() {
  const [i, setI] = useState(0)

  const prev = useCallback(() => {
    setI((x) => Math.max(0, x - 1))
  }, [])
  const next = useCallback(() => {
    setI((x) => Math.min(Math.max(SLIDES.length - 1, 0), x + 1))
  }, [])

  if (SLIDES.length === 0) {
    return (
      <div className="flex h-full min-h-0 flex-col bg-white">
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-4 sm:px-5">
          <NotionSliderPlaceholder />
        </div>
        <div className="border-t border-gray-100 px-4 py-3">
          <p className="text-center text-[12px] leading-relaxed text-gray-500">Notion board slides will appear here.</p>
        </div>
      </div>
    )
  }

  const slide = SLIDES[i]
  const canPrev = i > 0
  const canNext = i < SLIDES.length - 1

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="relative flex min-h-0 flex-1 items-center gap-2 px-2 py-4 sm:gap-4 sm:px-4">
        <button
          type="button"
          aria-label="Previous slide"
          disabled={!canPrev}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-lg font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-35"
          onClick={prev}
        >
          ‹
        </button>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center">
          <img
            src={slide.src}
            alt=""
            className="max-h-[min(52vh,420px)] w-full max-w-full object-contain"
            draggable={false}
          />
        </div>

        <button
          type="button"
          aria-label="Next slide"
          disabled={!canNext}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-lg font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-35"
          onClick={next}
        >
          ›
        </button>
      </div>
      <div className="border-t border-gray-100 px-4 py-3">
        <p className="text-center text-[13px] leading-relaxed text-gray-600">{slide.caption}</p>
        <p className="mt-2 text-center text-[11px] font-medium text-gray-400">
          {i + 1} / {SLIDES.length}
        </p>
      </div>
    </div>
  )
}
