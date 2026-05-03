import { useState, useCallback } from 'react'
import HelloCardLight from '../assets/HelloCardLight.svg'
import HelloCardDark from '../assets/HelloCardDark.svg'

const PORTFOLIO_URL = 'https://mayaralquwayfili.github.io/mayar-os/'

export default function MobileEmptyState({ uiTheme = 'light' }) {
  const dark = uiTheme === 'dark'
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }, [])

  const bg = dark ? 'bg-[#23262D]' : 'bg-[#F9F9F7]'
  const titleColor = dark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
  const bodyColor = dark ? 'text-[#F9F9F7]/70' : 'text-[#23262D]/70'

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden px-10 pb-12 pt-[min(14vh,4.5rem)] text-center font-sans antialiased ${bg}`}
    >
      <div className="relative mx-auto mb-8 w-full max-w-[min(100%,320px)] shrink-0">
        <img
          src={dark ? HelloCardDark : HelloCardLight}
          alt=""
          className="relative z-0 h-auto w-full drop-shadow-lg"
          draggable={false}
          width={560}
          height={360}
          loading="lazy"
          decoding="async"
        />
      </div>

      <h1
        className={`max-w-md text-balance text-[22px] font-semibold leading-snug tracking-tight sm:text-[24px] ${titleColor}`}
      >
        Explore Mayar OS
      </h1>
      <p className={`mt-4 max-w-md text-balance text-[15px] leading-relaxed ${bodyColor}`}>
        Open on desktop to view the full portfolio.
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-8 min-h-[44px] rounded-lg bg-[#FEF0BC] px-6 py-2.5 text-[15px] font-medium text-[#23262D] transition-opacity hover:opacity-90 active:opacity-100"
      >
        {copied ? 'Copied!' : 'Copy Portfolio Link'}
      </button>
    </div>
  )
}
