import { useState, useEffect } from 'react'

function WifiGlyph({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <path d="M12 20h.01" />
    </svg>
  )
}

function BatteryGlyph({ className }) {
  return (
    <svg
      className={className}
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

/**
 * macOS menu bar chrome: fixed 28px, flex space-between, glass background, system clock.
 */
export default function TopStatusBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-[100] box-border flex h-[28px] min-h-[28px] max-h-[28px] flex-nowrap items-center justify-between gap-6 px-4 backdrop-blur-[10px] sm:px-5"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        backgroundColor: 'rgba(235, 232, 226, 0.92)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      }}
    >
      {/* Left cluster — min 16px between labels */}
      <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-4 overflow-hidden text-[12px] font-medium leading-none text-neutral-900/90 antialiased sm:text-[13px] md:gap-5">
        <span className="shrink-0 whitespace-nowrap font-semibold tracking-[-0.01em]">
          Mayar
        </span>
        <span className="shrink-0 whitespace-nowrap font-normal tracking-[-0.01em]">
          About Me
        </span>
      </div>

      {/* Right cluster — icons and clock never touch */}
      <div className="flex shrink-0 flex-nowrap items-center gap-3 text-neutral-700 sm:gap-3.5">
        <span className="sr-only">Wi-Fi</span>
        <WifiGlyph className="h-3 w-3 shrink-0 opacity-[0.85]" />
        <span className="sr-only">Battery</span>
        <BatteryGlyph className="h-[11px] w-[17px] shrink-0 opacity-[0.85]" />
        <time
          dateTime={now.toISOString()}
          className="shrink-0 whitespace-nowrap pl-0.5 text-[12px] font-medium tabular-nums leading-none tracking-[-0.01em] text-neutral-900/90 sm:text-[13px]"
        >
          {formatMenuBarClock(now)}
        </time>
      </div>
    </header>
  )
}
