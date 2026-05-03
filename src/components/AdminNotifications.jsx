import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playNotificationSfx, getNotificationSfx } from '../utils/notificationSfx'

export default function AdminNotifications({ items, adminFlow, onAccept, formatBody }) {
  const seenIdsRef = useRef(new Set())

  const cardClassName = [
    'pointer-events-auto w-80 rounded-2xl border border-white/10 px-5 py-5',
    'bg-slate-950/40 backdrop-blur-2xl',
    'shadow-[0_24px_64px_-16px_rgba(0,0,0,0.45)]',
  ].join(' ')

  const headerMuted = 'text-white/50'
  const bodyText = 'text-white/95'

  useEffect(() => {
    getNotificationSfx()
  }, [])

  useEffect(() => {
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

  const isLoading = adminFlow === 'loading'

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[8000] flex w-80 flex-col gap-3">
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
                  disabled={isLoading}
                  aria-busy={isLoading}
                  aria-label={isLoading ? 'Loading' : 'Accept'}
                  className={[
                    'inline-flex min-h-[40px] w-full min-w-[6.5rem] items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all',
                    'border border-white/15 text-white',
                    isLoading
                      ? 'cursor-not-allowed bg-slate-900/80 animate-pulse opacity-95'
                      : 'bg-white/15 hover:bg-white/20 active:bg-white/10',
                  ].join(' ')}
                  onClick={() => {
                    if (isLoading) return
                    playNotificationSfx()
                    onAccept?.()
                  }}
                >
                  {isLoading ? (
                    <span
                      className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/25 border-t-white/90"
                      aria-hidden
                    />
                  ) : null}
                  Accept
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
