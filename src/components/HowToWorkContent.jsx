import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { contentTokens } from '../utils/windowContentTheme'
import { sortManualTasks } from '../constants/manualTasks'

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HowToWorkContent({ uiTheme = 'light', items, onSetItems }) {
  const T = contentTokens(uiTheme)
  const accentHex = T.contentAccentHex
  const titleActive = uiTheme === 'dark' ? '#F9F9F7' : '#1c1c1e'
  const captionActive = uiTheme === 'dark' ? 'rgba(249,249,247,0.72)' : '#636366'
  const mutedDone = uiTheme === 'dark' ? 'rgba(249,249,247,0.42)' : '#aeaeb2'
  const subtitleMuted = uiTheme === 'dark' ? 'rgba(249,249,247,0.55)' : '#8e8e93'

  const sortedItems = useMemo(() => sortManualTasks(items), [items])

  const toggle = (id) =>
    onSetItems((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
      try {
        // TODO: UNCOMMENT FOR PRODUCTION
        // localStorage.setItem(
        //   'mayaros-work-guide-checklist',
        //   JSON.stringify(next.map(({ id: itemId, done }) => ({ id: itemId, done }))),
        // )
      } catch {
        /* ignore */
      }
      return next
    })

  return (
    <div
      className={`flex h-full w-full flex-col items-start justify-start overflow-y-auto font-sans ${T.surface} ${T.text} ${T.scrollRootThin} ${T.contentProse}`}
    >
      <div className="w-full p-6">

        {/* ── Title + subtitle ────────────────────────────────────── */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-[18px] font-bold leading-tight tracking-tight"
            style={{ color: accentHex }}
          >
            How to Work with Me
          </h1>
          <p className="mt-0.5 text-[12px]" style={{ color: subtitleMuted }}>
            {items.filter((i) => !i.done).length === 0
              ? 'All caught up! '
              : `${items.filter((i) => !i.done).length} items`}
          </p>
        </motion.div>

        {/* ── Checklist ───────────────────────────────────────────── */}
        <motion.ul
          className="flex w-full flex-col items-start"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          {sortedItems.map((item) => (
            <motion.li
              key={item.id}
              layout
              className="flex w-full items-start gap-3 py-2"
              variants={listItem}
            >
              {/* Circle checkbox — 16 px, aligned to text cap-height */}
              <button
                type="button"
                aria-label={item.done ? 'Mark as incomplete' : 'Mark as complete'}
                onClick={() => toggle(item.id)}
                className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center
                           rounded-full border-[1.5px] transition-all duration-150"
                style={{
                  borderColor: accentHex,
                  backgroundColor: item.done ? accentHex : 'transparent',
                }}
              >
                {item.done && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
                    <path
                      d="M1 3L3 5.5L7 1"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p
                  className="text-[13px] font-bold leading-snug transition-all duration-150"
                  style={{
                    color: item.done ? mutedDone : titleActive,
                    textDecoration: item.done ? 'line-through' : 'none',
                    textDecorationColor: mutedDone,
                    overflowWrap: 'break-word',
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-0.5 text-[12px] font-normal leading-relaxed transition-all duration-150"
                  style={{
                    color: item.done ? mutedDone : captionActive,
                    textDecoration: item.done ? 'line-through' : 'none',
                    textDecorationColor: mutedDone,
                    overflowWrap: 'break-word',
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </div>
  )
}
