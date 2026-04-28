import { useState } from 'react'
import { motion } from 'framer-motion'

// Mirrors About Me checklist (`AboutMeContent` in App.jsx) — same accent, typography, padding.
const WORK_ACCENT = '#544EAE'

const INITIAL_ITEMS = [
  { id: 1, text: 'Reach out for collaboration', done: false },
  { id: 2, text: "Check the 'Side B' for the process", done: false },
  { id: 3, text: 'Coffee is the primary fuel', done: false },
  { id: 4, text: 'Respect the Multipotentialite flow', done: false },
]

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
  const [items, setItems] = useState(() => INITIAL_ITEMS.map((i) => ({ ...i })))

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )

  const remaining = items.filter((i) => !i.done).length

  return (
    <div
      className="flex h-full w-full flex-col items-start justify-start overflow-y-auto
                    bg-white font-sans
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-200"
    >
      <div className="w-full p-6">
        {/* ── Title + subtitle (same as About Me) ───────────────────── */}
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
            {remaining === 0 ? 'All caught up! ' : `${remaining} items`}
          </p>
        </motion.div>

        {/* ── Checklist (same structure as About Me) ───────────────── */}
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
