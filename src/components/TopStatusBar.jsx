import { useState, useEffect } from 'react'
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

const SOCIAL_HOVER =
  'flex shrink-0 items-center justify-center rounded-md p-1 transition-all duration-150 ease-out hover:bg-[#FEF0BC]/50'

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

function StatusItem() {
  return (
    <>
      <span className="mx-1 h-3 w-px shrink-0 bg-[#23262D]/20" aria-hidden />
      <span
        role="status"
        aria-label="Hunting for COOP"
        className={`flex cursor-default items-center gap-1.5 ${STATIC_CLUSTER}`}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ACDEE7] animate-pulse"
          aria-hidden
        />
        <span className="whitespace-nowrap text-[12px] font-medium leading-none tracking-tight text-[#23262D] sm:text-[13px]">
          Hunting for COOP
        </span>
      </span>
    </>
  )
}

export default function TopStatusBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-[9999] box-border flex h-[28px] min-h-[28px] max-h-[28px] flex-nowrap items-center justify-between border-b border-[#23262D]/10 bg-[#F9F9F7] px-2 font-sans text-[#23262D] sm:px-3"
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      {/* ── Left cluster (sparkle — menu anchor) ── */}
      <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-0.5 text-[13px] font-medium leading-none text-[#23262D]">
        <span className={`flex items-center justify-center ${STATIC_CLUSTER}`} aria-hidden>
          <img
            src={SparkleIcon}
            alt=""
            aria-hidden
            className="h-3 w-3 shrink-0 block"
            draggable={false}
          />
        </span>
        <span className={`font-semibold ${STATIC_CLUSTER}`}>Mayar</span>
      </div>

      {/* ── Right cluster ── */}
      <div className="flex shrink-0 flex-nowrap items-center gap-0.5 text-[#23262D]">
        {SOCIAL_LINKS.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={SOCIAL_HOVER}
          >
            <img
              src={icon}
              alt={label}
              className={`block ${label === 'Behance' ? 'h-5 w-5' : 'h-4 w-4'}`}
              draggable={false}
            />
          </a>
        ))}

        <StatusItem />

        <span className="mx-1 h-3 w-px shrink-0 bg-[#23262D]/25" aria-hidden />

        <span className="sr-only">Wi-Fi</span>
        <span className={`flex items-center ${STATIC_CLUSTER}`}>
          <img src={IcWifi} alt="" aria-hidden className="h-[14px] w-[14px] block" draggable={false} />
        </span>

        <time
          dateTime={now.toISOString()}
          className={`shrink-0 whitespace-nowrap text-[12px] font-medium tabular-nums leading-none tracking-tight text-[#23262D] sm:text-[13px] ${STATIC_CLUSTER}`}
        >
          {formatMenuBarClock(now)}
        </time>
      </div>
    </header>
  )
}
