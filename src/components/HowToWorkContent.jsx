import { useState } from 'react'
import { motion } from 'framer-motion'
import { contentTokens } from '../utils/windowContentTheme'

const INITIAL_ITEMS = [
  {
    id: 1,
    title: 'Value-First Building',
    caption: 'Prioritizing real value and meaningful impact over just adding features.',
    done: false,
  },
  {
    id: 2,
    title: "The 'Why' Before the 'How'",
    caption: 'Solving the right problem is more important than just building a solution.',
    done: false,
  },
  {
    id: 3,
    title: 'Handoffs',
    caption: 'Providing organized, buildable designs because I write code as well.',
    done: false,
  },
  {
    id: 4,
    title: 'Feedback',
    caption: 'I listen to everyone, but I prioritize feedback that is logical and adds clear value.',
    done: false,
  },
  {
    id: 5,
    title: 'Execution Autonomy',
    caption: 'Give me the goal and the deadline, then trust me to handle the details.',
    done: false,
  },
  {
    id: 6,
    title: 'Powered by Challenges',
    caption:
      "I love turning 'impossible' into 'done'; the thrill of beating a challenge is what motivates me.",
    done: false,
  },
  {
    id: 7,
    title: 'Obsessive Detail',
    caption: 'From pixel-perfect UI to keeping every doc on Notion perfectly organized.',
    done: false,
  },
  {
    id: 8,
    title: 'Curiosity-Driven',
    caption: "I'm usually in the middle of learning something new just because I'm curious.",
    done: false,
  },
  {
    id: 9,
    title: 'Celebrating Wins',
    caption: 'I enjoy the process as much as the result.',
    done: false,
  },
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

export default function HowToWorkContent({ uiTheme = 'light' }) {
  const T = contentTokens(uiTheme)
  const accentHex = T.contentAccentHex
  const titleActive = uiTheme === 'dark' ? '#F9F9F7' : '#1c1c1e'
  const captionActive = uiTheme === 'dark' ? 'rgba(249,249,247,0.72)' : '#636366'
  const mutedDone = uiTheme === 'dark' ? 'rgba(249,249,247,0.42)' : '#aeaeb2'
  const subtitleMuted = uiTheme === 'dark' ? 'rgba(249,249,247,0.55)' : '#8e8e93'
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
