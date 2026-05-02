import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import SparkleIcon from '../assets/sparkle.svg'
import IcWifi from '../assets/Ic_wifi.svg'
import IcGithub from '../assets/Ic_Github.svg'
import IcLinkedin from '../assets/Ic_linkedin.svg'
import IcBehance from '../assets/Ic_Behance.svg'

const SOCIAL_LINKS = [
  { href: 'https://github.com/MayarAlquwayfili', icon: IcGithub, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/mayar-alquwayfili/', icon: IcLinkedin, label: 'LinkedIn' },
  { href: 'https://www.behance.net/mayaralquway', icon: IcBehance, label: 'Behance' },
]

/* Static menu-bar chrome (no hover) */
const STATIC_CLUSTER = 'px-1.5 py-0.5 select-none'

function formatMenuBarClock(d) {
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'short' })
  const day = d.getDate()
  const month = d.toLocaleDateString('en-GB', { month: 'short' })
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${weekday} ${day} ${month} ${h}:${m}`
}

function StatusItem({ theme }) {
  const isDark = theme === 'dark'
  const dividerCls = isDark ? 'bg-[#F9F9F7]/25' : 'bg-[#23262D]/20'
  const textCls = isDark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
  return (
    <>
      <span className={`mx-1 h-3 w-px shrink-0 ${dividerCls}`} aria-hidden />
      <span
        role="status"
        aria-label="Hunting for COOP"
        className={`flex cursor-default items-center gap-1.5 ${STATIC_CLUSTER}`}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ACDEE7] animate-pulse"
          aria-hidden
        />
        <span
          className={`whitespace-nowrap text-[12px] font-medium leading-none tracking-tight sm:text-[13px] ${textCls}`}
        >
          Hunting for COOP
        </span>
      </span>
    </>
  )
}

function ThemeToggle({ theme, onToggleTheme }) {
  const isLight = theme === 'light'
  return (
    <button
      type="button"
      onClick={() => onToggleTheme?.()}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors duration-200 ${
        isLight ? 'hover:bg-[#FEF0BC]/40' : 'hover:bg-[#FEF0BC]/15'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.span
            key="moon"
            className="absolute flex items-center justify-center"
            initial={{ opacity: 0, rotate: -56 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 56 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <Moon className="h-4 w-4 text-[#23262D]" strokeWidth={2} aria-hidden />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            className="absolute flex items-center justify-center"
            initial={{ opacity: 0, rotate: 56 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -56 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <Sun className="h-4 w-4 text-[#FEF0BC]" strokeWidth={2} aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function TopStatusBar({ theme = 'light', onToggleTheme }) {
  const [now, setNow] = useState(() => new Date())
  const isDark = theme === 'dark'

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const barCls = isDark
    ? 'border-white/10 bg-[#23262D] text-[#F9F9F7]'
    : 'border-[#23262D]/10 bg-[#F9F9F7] text-[#23262D]'
  const insetHighlight = isDark
    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.06)'
    : 'inset 0 1px 0 rgba(255, 255, 255, 0.9)'
  const socialHover = isDark
    ? 'flex shrink-0 items-center justify-center rounded-md p-1 transition-all duration-150 ease-out hover:bg-[#FEF0BC]/15'
    : 'flex shrink-0 items-center justify-center rounded-md p-1 transition-all duration-150 ease-out hover:bg-[#FEF0BC]/50'
  const iconInvert = isDark ? 'brightness-0 invert opacity-90' : ''

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-[9999] box-border flex h-[28px] min-h-[28px] max-h-[28px] flex-nowrap items-center justify-between border-b px-2 font-sans sm:px-3 ${barCls}`}
      style={{
        boxShadow: insetHighlight,
      }}
    >
      {/* ── Left cluster (sparkle — menu anchor) ── */}
      <div
        className={`flex min-w-0 flex-1 flex-nowrap items-center gap-0.5 text-[13px] font-medium leading-none ${
          isDark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
        }`}
      >
        <span className={`flex items-center justify-center ${STATIC_CLUSTER}`} aria-hidden>
          <img
            src={SparkleIcon}
            alt=""
            aria-hidden
            className={`h-3 w-3 shrink-0 block ${iconInvert}`}
            draggable={false}
          />
        </span>
        <span className={`font-semibold ${STATIC_CLUSTER}`}>Mayar</span>
      </div>

      {/* ── Right cluster ── */}
      <div className={`flex shrink-0 flex-nowrap items-center gap-0.5 ${isDark ? 'text-[#F9F9F7]' : 'text-[#23262D]'}`}>
        {SOCIAL_LINKS.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={socialHover}
          >
            <img
              src={icon}
              alt={label}
              className={`block ${label === 'Behance' ? 'h-5 w-5' : 'h-4 w-4'} ${iconInvert}`}
              draggable={false}
            />
          </a>
        ))}

        <StatusItem theme={theme} />

        <span
          className={`mx-1 h-3 w-px shrink-0 ${isDark ? 'bg-[#F9F9F7]/30' : 'bg-[#23262D]/25'}`}
          aria-hidden
        />

        <span className="sr-only">Wi-Fi</span>
        <span className={`flex items-center ${STATIC_CLUSTER}`}>
          <img
            src={IcWifi}
            alt=""
            aria-hidden
            className={`h-[14px] w-[14px] block ${iconInvert}`}
            draggable={false}
          />
        </span>

        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

        <time
          dateTime={now.toISOString()}
          className={`shrink-0 whitespace-nowrap text-[12px] font-medium tabular-nums leading-none tracking-tight sm:text-[13px] ${STATIC_CLUSTER} ${
            isDark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
          }`}
        >
          {formatMenuBarClock(now)}
        </time>
      </div>
    </header>
  )
}
