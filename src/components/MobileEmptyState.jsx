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
      className={`flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden px-8 pb-12 pt-[min(12vh,4rem)] text-center font-sans antialiased sm:px-12 sm:pt-[min(10vh,3.5rem)] min-[600px]:px-14 min-[600px]:pt-[min(8vh,3rem)] ${bg}`}
    >
      <div className="relative mx-auto mb-8 w-full max-w-[min(100%,20rem)] shrink-0 min-[480px]:max-w-[min(100%,26rem)] min-[600px]:mb-10 min-[600px]:max-w-[min(100%,32rem)] min-[900px]:max-w-[min(92vw,36rem)]">
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
        className={`max-w-md text-balance text-[22px] font-semibold leading-snug tracking-tight min-[480px]:max-w-lg min-[480px]:text-[24px] min-[600px]:max-w-xl min-[600px]:text-[28px] min-[900px]:text-[32px] ${titleColor}`}
      >
        Explore Mayar OS
      </h1>
      <p
        className={`mt-4 max-w-md text-balance text-[15px] leading-relaxed min-[480px]:max-w-lg min-[480px]:text-[16px] min-[600px]:max-w-xl min-[600px]:text-[17px] min-[900px]:text-[18px] ${bodyColor}`}
      >
        Open on desktop to view the full portfolio.
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-8 min-h-[44px] rounded-lg bg-[#FEF0BC] px-6 py-2.5 text-[15px] font-medium text-[#23262D] transition-opacity hover:opacity-90 active:opacity-100 min-[600px]:mt-10 min-[600px]:min-h-[48px] min-[600px]:px-8 min-[600px]:py-3 min-[600px]:text-[16px] min-[900px]:text-[17px]"
      >
        {copied ? 'Copied!' : 'Copy Portfolio Link'}
      </button>
    </div>
  )
}
