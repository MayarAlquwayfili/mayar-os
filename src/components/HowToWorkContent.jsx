import { useState } from 'react'
import { motion } from 'framer-motion'

// Identical accent + checklist markup as `AboutMeContent` / `ABOUT_ACCENT` in App.jsx (#544EAE).
const WORK_ACCENT = '#544EAE'

const INITIAL_ITEMS = [
  { id: 1, text: 'Reach out for collaboration', done: false },
  { id: 2, text: "Check the 'Side B' for the process", done: false },
  { id: 3, text: 'Coffee is the primary fuel', done: false },
  { id: 4, text: 'Respect the Multipotentialite flow', done: false },
]

const LS_WORK_GUIDE_CHECKLIST = 'mayaros-work-guide-checklist'

function loadSavedChecklist() {
  try {
    // TODO: UNCOMMENT FOR PRODUCTION
    // const raw = localStorage.getItem(LS_WORK_GUIDE_CHECKLIST)
    // TODO: UNCOMMENT FOR PRODUCTION
    // if (raw == null) return null
    // TODO: UNCOMMENT FOR PRODUCTION
    // const parsed = JSON.parse(raw)
    // TODO: UNCOMMENT FOR PRODUCTION
    // if (!Array.isArray(parsed)) return null
    // TODO: UNCOMMENT FOR PRODUCTION
    // const doneById = new Map(
    //   parsed
    //     .filter((row) => row && typeof row.id === 'number' && typeof row.done === 'boolean')
    //     .map((row) => [row.id, row.done]),
    // )
    // TODO: UNCOMMENT FOR PRODUCTION
    // return INITIAL_ITEMS.map((i) => ({
    //   ...i,
    //   done: Boolean(doneById.get(i.id)),
    // }))
    return null
  } catch {
    return null
  }
}

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

export default function HowToWorkContent() {
  // TODO: UNCOMMENT FOR PRODUCTION
  // const [items, setItems] = useState(() => loadSavedChecklist() ?? INITIAL_ITEMS.map((i) => ({ ...i })))
  const [items, setItems] = useState(() => INITIAL_ITEMS.map((i) => ({ ...i })))

  const toggle = (id) =>
    setItems((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
      try {
        // TODO: UNCOMMENT FOR PRODUCTION
        // localStorage.setItem(
        //   LS_WORK_GUIDE_CHECKLIST,
        //   JSON.stringify(next.map(({ id: itemId, done }) => ({ id: itemId, done }))),
        // )
      } catch {
        /* ignore */
      }
      return next
    })

  return (
    <div className="flex h-full w-full flex-col items-start justify-start overflow-y-auto
                    bg-white font-sans
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-200">
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
            style={{ color: WORK_ACCENT }}
          >
            How to work with Mayar?
          </h1>
          <p className="mt-0.5 text-[12px]" style={{ color: '#8e8e93' }}>
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
          {items.map((item) => (
            <motion.li
              key={item.id}
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
                  borderColor: WORK_ACCENT,
                  backgroundColor: item.done ? WORK_ACCENT : 'transparent',
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

              {/* Item text — wraps naturally, never breaks layout */}
              <p
                className="min-w-0 flex-1 text-[13px] leading-[1.6] transition-all duration-150"
                style={{
                  color: item.done ? '#aeaeb2' : '#1c1c1e',
                  textDecoration: item.done ? 'line-through' : 'none',
                  textDecorationColor: '#aeaeb2',
                  overflowWrap: 'break-word',
                }}
              >
                {item.text}
              </p>
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </div>
  )
}
