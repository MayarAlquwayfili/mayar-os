import { useState, useEffect } from 'react'
import SparkleIcon from '../assets/sparkle.svg'
import IcWifi from '../assets/Ic_wifi.svg'
import IcGithub from '../assets/Ic_Github.svg'
import IcLinkedin from '../assets/Ic_linkedin.svg'
import IcBehance from '../assets/Ic_Behance.svg'

const SOCIAL_LINKS = [
  { href: 'https://github.com/MayarAlquwayfili',          icon: IcGithub,   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/mayar-alquwayfili/', icon: IcLinkedin, label: 'LinkedIn' },
  { href: 'https://www.behance.net/mayaralquway',           icon: IcBehance,  label: 'Behance'  },
]

/* Hover only on real controls — subtle gray pill */
const INTERACTIVE_PILL =
  'rounded-md px-1.5 py-0.5 transition-all duration-150 ease-out hover:bg-black/5 cursor-pointer select-none'

const SOCIAL_HOVER =
  'flex shrink-0 items-center justify-center rounded-md p-1 transition-all duration-150 ease-out hover:bg-black/5'

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

export default function TopStatusBar({ onAboutMe }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-[9999] box-border flex h-[28px] min-h-[28px] max-h-[28px] flex-nowrap items-center justify-between border-b border-gray-200 px-2 font-sans sm:px-3"
      style={{
        backgroundColor: 'rgba(235, 232, 226, 0.96)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      }}
    >
      {/* ── Left cluster (sparkle anchor — macOS Apple position) ── */}
      <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-0.5 text-[13px] font-medium leading-none text-neutral-900">
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
        <button
          type="button"
          onClick={onAboutMe}
          className={`font-normal ${INTERACTIVE_PILL}`}
        >
          About Me
        </button>
      </div>

      {/* ── Right cluster ── */}
      <div className="flex shrink-0 flex-nowrap items-center gap-0.5 text-neutral-900">

        {/* Social links */}
        {SOCIAL_LINKS.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={SOCIAL_HOVER}
          >
            <img src={icon} alt={label} className="h-[16px] w-[16px] block" draggable={false} />
          </a>
        ))}

        {/* Divider */}
        <span className="mx-1 h-3 w-px shrink-0 bg-neutral-400/50" aria-hidden />

        {/* Wi-Fi */}
        <span className="sr-only">Wi-Fi</span>
        <span className={`flex items-center ${STATIC_CLUSTER}`}>
          <img src={IcWifi} alt="" aria-hidden className="h-[14px] w-[14px] block" draggable={false} />
        </span>

        {/* Clock */}
        <time
          dateTime={now.toISOString()}
          className={`shrink-0 whitespace-nowrap text-[12px] font-medium tabular-nums leading-none tracking-tight text-neutral-900 sm:text-[13px] ${STATIC_CLUSTER}`}
        >
          {formatMenuBarClock(now)}
        </time>
      </div>
    </header>
  )
}
