import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import HelloCardLight from '../assets/HelloCardLight.svg'
import HelloCardDark from '../assets/HelloCardDark.svg'
import SparkleIcon from '../assets/sparkle.svg'

const PORTFOLIO_URL = 'https://mayaralquwayfili.github.io/mayar-os/'

function DesktopIcon({ className }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="8" y="12" width="56" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M4 50h64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="24" y="52" width="24" height="3" rx="1" fill="currentColor" />
    </svg>
  )
}

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
  const accentIcon = dark ? 'text-[#ACDEE7]' : 'text-[#82ADB5]'
  const titleColor = dark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
  const bodyColor = dark ? 'text-[#F9F9F7]/70' : 'text-[#23262D]/70'
  const sparkleInvert = dark ? 'brightness-0 invert opacity-90' : ''

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden px-10 py-12 text-center font-sans antialiased ${bg}`}
    >
      <div className="relative mx-auto mb-10 w-full max-w-[min(100%,320px)] shrink-0">
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

        <motion.div
          className={`pointer-events-none absolute -right-1 top-[10%] z-10 flex items-start gap-1 sm:-right-2 ${accentIcon}`}
          animate={{
            y: [0, -14, 2, -8, 0],
            x: [0, 6, -4, 8, 0],
            rotate: [0, 4, -3, 2, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden
        >
          <motion.div
            animate={{ opacity: [0.45, 1, 0.55, 1, 0.45], scale: [0.92, 1.06, 0.98, 1.04, 0.92] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={SparkleIcon}
              alt=""
              className={`h-5 w-5 shrink-0 ${sparkleInvert}`}
              draggable={false}
              width={20}
              height={20}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.88, 1, 0.92, 1, 0.88] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DesktopIcon className="h-10 w-10 drop-shadow-sm" />
          </motion.div>
        </motion.div>
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
        className="mt-8 min-h-[44px] rounded-lg bg-[#FEF0BC] px-6 py-2.5 text-[15px] font-medium text-[#23262D] transition-opacity hover:opacity-90 active:opacity-100 min-[600px]:min-h-[48px] min-[600px]:px-8 min-[600px]:py-3 min-[600px]:text-[16px] min-[900px]:text-[17px]"
      >
        {copied ? 'Copied!' : 'Copy Portfolio Link'}
      </button>
    </div>
  )
}
