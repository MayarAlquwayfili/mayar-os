import { useCallback, useState } from 'react'
import Figure1 from '../assets/Cash/Figure1.png'
import Table1 from '../assets/Cash/Table1.png'
import Figure3 from '../assets/Cash/Figure3.png'

const SLIDES = [
  {
    src: Figure1,
    caption:
      'Figure 1: Trend Digital Payment Adoption Rate (2015–2024) — research context.',
  },
  {
    src: Table1,
    caption:
      'Table 1: Multiple Linear Regression Results — methodological reference.',
  },
  {
    src: Figure3,
    caption:
      'Figure 3: SME Loan Delinquency Rate Trend (2015–2024) — resilience lens.',
  },
]

export default function NotionSliderContent() {
  const [i, setI] = useState(0)
  const slide = SLIDES[i]
  const canPrev = i > 0
  const canNext = i < SLIDES.length - 1

  const prev = useCallback(() => {
    setI((x) => Math.max(0, x - 1))
  }, [])
  const next = useCallback(() => {
    setI((x) => Math.min(SLIDES.length - 1, x + 1))
  }, [])

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
        <p className="text-center text-[13px] leading-relaxed text-gray-600">
          {slide.caption}
        </p>
        <p className="mt-2 text-center text-[11px] font-medium text-gray-400">
          {i + 1} / {SLIDES.length}
        </p>
      </div>
    </div>
  )
}
