import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { accentTokens } from '../utils/windowContentTheme'
import { playNotificationSfx, getNotificationSfx } from '../utils/notificationSfx'

export default function AdminNotifications({ uiTheme = 'light', items, adminFlow, onAccept, formatBody }) {
  const seenIdsRef = useRef(new Set())
  const isDark = uiTheme === 'dark'
  const accent = accentTokens(uiTheme)

  const cardClassName = [
    'pointer-events-auto w-80 rounded-2xl border-[1.5px] bg-transparent px-5 py-5',
    isDark
      ? 'border-white/35 drop-shadow-[0_14px_40px_rgba(0,0,0,0.42)]'
      : 'border-[#23262D]/30 drop-shadow-[0_14px_36px_rgba(0,0,0,0.11)]',
  ].join(' ')

  const textLegibility = isDark
    ? '[text-shadow:0_1px_14px_rgba(0,0,0,0.92),0_0_1px_rgba(0,0,0,0.9)]'
    : '[text-shadow:0_1px_14px_rgba(255,255,255,0.95),0_0_1px_rgba(255,255,255,0.9)]'

  const headerMuted = isDark ? 'text-[#F9F9F7]/70' : 'text-[#23262D]/75'
  const bodyText = isDark ? 'text-[#F9F9F7]' : 'text-[#23262D]'

  /** Light: light label on #82ADB5 (reads with frosted glass). Dark: charcoal on #ACDEE7 per accentTokens. */
  const btnText = isDark ? accent.textOnAccent : 'text-white'
  const btnBase =
    `inline-flex min-h-[40px] w-full min-w-[6.5rem] items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all border border-transparent ${btnText}`
  const btnIdle = [accent.btnSolid, 'hover:brightness-110 active:brightness-95'].join(' ')

  const actionSlotClass =
    'pointer-events-auto flex min-h-[40px] w-full min-w-[6.5rem] shrink-0 items-center justify-center rounded-lg px-5 py-2.5'

  /** Same fill as Accept — spinner rings sit on solid tint so light-mode white isn’t lost on the wallpaper. */
  const loadingSlotClass = [
    actionSlotClass,
    isDark ? 'bg-[#ACDEE7]' : 'bg-[#82ADB5]',
  ].join(' ')

  const spinnerCls = [
    'box-border inline-block h-5 w-5 min-h-[20px] min-w-[20px] shrink-0 animate-spin rounded-full border-2 border-solid',
    isDark ? 'border-[#23262D]/35 border-t-[#23262D]' : 'border-white/45 border-t-white',
  ].join(' ')

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
            <p
              className={`text-[12px] font-normal uppercase tracking-[0.12em] ${headerMuted} ${textLegibility}`}
            >
              {n.header}
            </p>
            <p
              className={`mt-2 text-[14px] font-normal leading-relaxed ${bodyText} ${textLegibility}`}
            >
              {formatBody(n.body)}
            </p>

            {n.isActionable && (
              <div className="mt-4">
                {isLoading ? (
                  <div
                    className={loadingSlotClass}
                    role="status"
                    aria-live="polite"
                    aria-busy="true"
                    aria-label="Loading"
                  >
                    <span className={spinnerCls} aria-hidden />
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-label="Accept"
                    className={[btnBase, btnIdle, 'pointer-events-auto'].join(' ')}
                    onClick={() => {
                      playNotificationSfx()
                      onAccept?.()
                    }}
                  >
                    Accept
                  </button>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
