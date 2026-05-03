import { AnimatePresence, motion } from 'framer-motion'

/** Full-viewport glass above the menu bar (higher z than TopStatusBar) for a lock-screen feel. */
export default function OfflineOverlay({ visible = false, uiTheme = 'light' }) {
  const isDark = uiTheme === 'dark'
  const titleCls = isDark ? 'text-[#F9F9F7]' : 'text-[#23262D]'
  const bodyCls = isDark ? 'text-[#F9F9F7]/75' : 'text-[#23262D]/75'

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="offline-overlay"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="offline-overlay-title"
          aria-describedby="offline-overlay-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto fixed inset-0 z-[10050] flex flex-col items-center justify-start bg-white/10 px-8 pb-8 pt-[min(22vh,6.5rem)] text-center backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-sm flex-col items-center gap-3"
          >
            <h2
              id="offline-overlay-title"
              className={`text-[18px] font-semibold leading-snug tracking-tight sm:text-[20px] ${titleCls}`}
            >
              No Connection
            </h2>
            <p id="offline-overlay-desc" className={`text-[14px] font-normal leading-relaxed ${bodyCls}`}>
              Mayar OS requires an internet connection.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
