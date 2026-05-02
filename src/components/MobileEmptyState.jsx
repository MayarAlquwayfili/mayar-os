import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import HelloCardLight from '../assets/HelloCardLight.svg'
import HelloCardDark from '../assets/HelloCardDark.svg'
import SparkleIcon from '../assets/sparkle.svg'

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
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      await navigator.clipboard.writeText(url)
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
      {/* Digital business card + floating accent */}
      <div className="relative mx-auto mb-10 w-full max-w-[min(100%,320px)] shrink-0">
        <img
          src={dark ? HelloCardDark : HelloCardLight}
          alt=""
          className="relative z-0 h-auto w-full drop-shadow-lg"
          draggable={false}
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

      <h1 className={`max-w-md text-[22px] font-semibold leading-snug tracking-tight sm:text-[24px] ${titleColor}`}>
        Best Experienced on Desktop
      </h1>
      <p className={`mt-4 max-w-md text-[15px] leading-relaxed ${bodyColor}`}>
        To explore the full interactive interface and project details, please visit Mayar OS from a laptop or PC.
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className={`mt-8 min-h-[44px] rounded-lg border px-6 py-2.5 text-[15px] font-medium transition-opacity hover:opacity-90 active:opacity-100 ${
          dark
            ? 'border-[#ACDEE7]/25 bg-[#ACDEE7]/15 text-[#F9F9F7]'
            : 'border-[#82ADB5]/20 bg-[#82ADB5]/15 text-[#23262D]'
        }`}
      >
        {copied ? 'Copied!' : 'Copy Portfolio Link'}
      </button>
    </div>
  )
}
