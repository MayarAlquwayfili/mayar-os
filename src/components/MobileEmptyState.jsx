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
      className={`flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center overflow-x-hidden px-[min(8vw,2.5rem)] py-12 text-center font-sans antialiased ${bg}`}
    >
      {/* Single 32rem-wide column: card + copy align as one unit on tablets. */}
      <div className="flex w-full max-w-[min(92vw,32rem)] flex-col items-center">
        <div className="relative mx-auto w-full max-w-[min(90vw,320px)] shrink-0 min-[480px]:max-w-[min(90vw,380px)] min-[600px]:max-w-[min(90vw,440px)] min-[768px]:max-w-[min(90vw,32rem)]">
          <img
            src={dark ? HelloCardDark : HelloCardLight}
            alt=""
            className="relative z-0 mx-auto max-h-[300px] w-full max-w-full object-contain drop-shadow-xl"
            draggable={false}
            width={560}
            height={360}
            loading="lazy"
            decoding="async"
          />
        </div>

        <h1
          className={`mt-8 w-full max-w-[32rem] text-balance text-[22px] font-semibold leading-snug tracking-tight min-[480px]:text-[24px] min-[600px]:text-[28px] min-[900px]:text-[32px] ${titleColor}`}
        >
          Explore Mayar OS
        </h1>
        <p
          className={`mt-4 w-full max-w-[32rem] text-balance text-[15px] leading-relaxed min-[480px]:text-[16px] min-[600px]:text-[17px] min-[900px]:text-[18px] ${bodyColor}`}
        >
          Open on desktop to view the full portfolio.
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-8 w-full max-w-[22rem] min-h-[44px] rounded-lg bg-[#FEF0BC] px-6 py-2.5 text-[15px] font-medium text-[#23262D] transition-opacity hover:opacity-90 active:opacity-100 min-[600px]:min-h-[48px] min-[600px]:text-[16px] min-[900px]:text-[17px]"
        >
          {copied ? 'Copied!' : 'Copy Portfolio Link'}
        </button>
      </div>
    </div>
  )
}
