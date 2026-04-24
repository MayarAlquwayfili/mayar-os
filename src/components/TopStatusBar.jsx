import { useState, useEffect } from 'react'
import IcWifi from '../assets/Ic_wifi.svg'
import IcGithub from '../assets/Ic_Github.svg'
import IcLinkedin from '../assets/Ic_linkedin.svg'
import IcBehance from '../assets/Ic_Behance.svg'

const SOCIAL_LINKS = [
  { href: 'https://github.com/MayarAlquwayfili',          icon: IcGithub,   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/mayar-alquwayfili/', icon: IcLinkedin, label: 'LinkedIn' },
  { href: 'https://www.behance.net/mayaralquway',           icon: IcBehance,  label: 'Behance'  },
]

function BatteryGlyph() {
  return (
    <svg
      className="h-[11px] w-[17px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <path d="M22 11v2" />
      <path d="M6 10v4" fill="currentColor" stroke="none" />
    </svg>
  )
}

function formatMenuBarClock(d) {
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'short' })
  const day = d.getDate()
  const month = d.toLocaleDateString('en-GB', { month: 'short' })
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${weekday} ${day} ${month} ${h}:${m}`
}

/* Shared hover pill style — gray tint, no movement */
const HOVER_PILL = 'rounded-md px-1.5 py-0.5 transition-colors duration-100 hover:bg-black/[0.06] cursor-default select-none'

export default function TopStatusBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 font-sans box-border flex h-[28px] min-h-[28px] max-h-[28px] flex-nowrap items-center justify-between px-2 sm:px-3"
      style={{
        zIndex: 9999,
        backgroundColor: 'rgba(235, 232, 226, 0.96)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      }}
    >
      {/* ── Left cluster ── */}
      <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-0.5 text-[13px] font-medium leading-none text-neutral-900">
        <span className={`font-semibold ${HOVER_PILL}`}>Mayar</span>
        <span className={`font-normal ${HOVER_PILL}`}>About Me</span>
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
            className="flex shrink-0 items-center justify-center rounded-md p-1 transition-colors duration-100 hover:bg-black/[0.06]"
          >
            <img src={icon} alt={label} className="h-[16px] w-[16px] block" draggable={false} />
          </a>
        ))}

        {/* Divider */}
        <span className="mx-1 h-3 w-px shrink-0 bg-neutral-400/50" aria-hidden />

        {/* Wi-Fi */}
        <span className="sr-only">Wi-Fi</span>
        <span className={HOVER_PILL + ' flex items-center'}>
          <img src={IcWifi} alt="" aria-hidden className="h-[14px] w-[14px] block" draggable={false} />
        </span>

        {/* Battery */}
        <span className="sr-only">Battery</span>
        <span className={HOVER_PILL + ' flex items-center'}>
          <BatteryGlyph />
        </span>

        {/* Clock */}
        <time
          dateTime={now.toISOString()}
          className={`shrink-0 whitespace-nowrap text-[12px] font-medium tabular-nums leading-none tracking-tight text-neutral-900 sm:text-[13px] ${HOVER_PILL}`}
        >
          {formatMenuBarClock(now)}
        </time>
      </div>
    </header>
  )
}
