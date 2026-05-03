import { AnimatePresence, motion } from 'framer-motion'

const SPARKLE_PATH =
  'M9.51172 19.0039C9.87305 19.0039 10.166 18.7402 10.2246 18.3496C11.0645 11.8457 11.9824 10.918 18.3398 10.2148C18.7402 10.1758 19.0234 9.88281 19.0234 9.50195C19.0234 9.12109 18.7402 8.82812 18.3398 8.7793C11.9824 8.08594 11.0645 7.1582 10.2246 0.644531C10.166 0.253906 9.87305 0 9.51172 0C9.15039 0 8.85742 0.253906 8.79883 0.644531C7.95898 7.1582 7.04102 8.08594 0.683594 8.7793C0.283203 8.82812 0 9.12109 0 9.50195C0 9.88281 0.283203 10.1758 0.683594 10.2148C7.04102 11.0547 7.90039 11.8555 8.79883 18.3496C8.85742 18.7402 9.15039 19.0039 9.51172 19.0039Z'

/** Desktop: below TopStatusBar (`top-7`). Mobile: full viewport (`inset-0`). */
export default function OfflineOverlay({ visible = false, uiTheme = 'light', fullBleed = false }) {
  const isDark = uiTheme === 'dark'
  const ink = '#23262D'
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
          className={`pointer-events-auto fixed z-[9000] flex flex-col items-center justify-center gap-5 bg-white/10 px-8 text-center backdrop-blur-md ${
            fullBleed ? 'inset-0' : 'left-0 right-0 top-7 bottom-0'
          }`}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-sm flex-col items-center gap-4"
          >
            <svg
              className="h-20 w-20 shrink-0"
              viewBox="0 0 19.3848 19.0137"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path fill={isDark ? '#F9F9F7' : ink} d={SPARKLE_PATH} />
            </svg>
            <h2
              id="offline-overlay-title"
              className={`text-[18px] font-semibold leading-snug tracking-tight sm:text-[20px] ${titleCls}`}
            >
              No Connection
            </h2>
            <p id="offline-overlay-desc" className={`text-[14px] font-normal leading-relaxed ${bodyCls}`}>
              Mayar OS requires an internet connection to sync your workspace.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
