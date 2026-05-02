import { useState, useCallback } from 'react'

function DesktopIcon({ className }) {
  return (
    <svg
      className={className}
      width="72"
      height="72"
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
  const iconColor = dark ? 'text-[#ACDEE7]' : 'text-[#82ADB5]'
  const titleColor = dark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
  const bodyColor = dark ? 'text-[#F9F9F7]/70' : 'text-[#23262D]/70'

  return (
    <div
      className={`flex h-screen w-full flex-col items-center justify-center px-10 text-center font-sans antialiased ${bg}`}
    >
      <DesktopIcon className={`mb-8 shrink-0 ${iconColor}`} />
      <h1 className={`max-w-md text-[22px] font-semibold leading-snug tracking-tight sm:text-[24px] ${titleColor}`}>
        Best Experienced on Desktop
      </h1>
      <p className={`mt-4 max-w-md text-[15px] leading-relaxed ${bodyColor}`}>
        To explore the full interactive interface and project details, please visit Mayar OS from a laptop or PC.
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-8 min-h-[44px] rounded-lg bg-[#FEF0BC] px-6 py-2.5 text-[15px] font-medium text-[#23262D] transition-opacity hover:opacity-90 active:opacity-100"
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}
