import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playNotificationSfx, getNotificationSfx } from '../utils/notificationSfx'
import { accentTokens } from '../utils/windowContentTheme'

export default function AdminNotifications({
  uiTheme = 'light',
  items,
  adminFlow,
  onAccept,
  formatBody,
}) {
  const seenIdsRef = useRef(new Set())
  const dark = uiTheme === 'dark'
  const A = accentTokens(uiTheme)

  const cardClassName = [
    'pointer-events-auto w-80 rounded-2xl border px-5 py-5',
    dark
      ? 'border-white/10 bg-[#2E3137] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.55)]'
      : 'border-black/[0.08] bg-[#F9F9F7] shadow-lg shadow-black/[0.08]',
    A.ringAccentTop,
  ].join(' ')

  const headerMuted = dark ? 'text-[#F9F9F7]/55' : 'text-gray-500'
  const bodyText = dark ? 'text-[#F9F9F7]' : 'text-[#23262D]'

  useEffect(() => {
    // Preload on first mount (zero-latency feel).
    getNotificationSfx()
  }, [])

  useEffect(() => {
    // Play for each newly-added notification card.
    const seen = seenIdsRef.current
    let newCount = 0
    for (const n of items) {
      if (!seen.has(n.id)) {
        seen.add(n.id)
        newCount += 1
      }
    }
    for (let k = 0; k < newCount; k += 1) playNotificationSfx()
  }, [items])

  return (
    <div className="pointer-events-none fixed right-4 top-14 z-[8000] flex w-80 flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {items.map((n) => (
          <motion.div
            key={n.id}
            layout
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              x: { type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.28, ease: 'easeOut' },
              layout: { duration: 0.2 },
            }}
            className={cardClassName}
          >
            <p className={`text-[12px] font-normal uppercase tracking-[0.12em] ${headerMuted}`}>
              {n.header}
            </p>
            <p className={`mt-2 text-[14px] font-normal leading-relaxed ${bodyText}`}>
              {formatBody(n.body)}
            </p>

            {n.isActionable && (
              <div className="mt-4">
                <button
                  type="button"
                  aria-busy={adminFlow === 'loading'}
                  aria-label={adminFlow === 'loading' ? 'Loading' : 'Accept'}
                  className={`inline-flex min-h-[40px] items-center rounded-lg py-2.5 text-sm font-medium transition-opacity ${
                    adminFlow === 'loading'
                      ? `w-full cursor-default justify-start pl-0 pr-5 ${A.btnTint} ${
                          dark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
                        }`
                      : `min-w-[6.5rem] justify-center px-5 ${A.btnSolid} ${A.textOnAccent} hover:opacity-90 active:opacity-100`
                  }`}
                  onClick={() => {
                    playNotificationSfx()
                    onAccept?.()
                  }}
                >
                  {adminFlow === 'loading' ? (
                    <span
                      className={`h-5 w-5 shrink-0 animate-spin rounded-full border-2 ${
                        dark ? 'border-[#F9F9F7]/35' : 'border-[#23262D]/35'
                      } ${A.spinnerRingAccent}`}
                      aria-hidden
                    />
                  ) : (
                    'Accept'
                  )}
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
