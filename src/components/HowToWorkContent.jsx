import { memo, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { contentTokens } from '../utils/windowContentTheme'
import { sortManualTasks } from '../constants/manualTasks'

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

const ManualTaskRow = memo(function ManualTaskRow({
  item,
  accentHex,
  titleActive,
  captionActive,
  mutedDone,
  onToggle,
}) {
  return (
    <motion.li className="flex min-w-0 w-full shrink-0 items-start gap-3" variants={listItem}>
      <button
        type="button"
        aria-label={item.done ? 'Mark as incomplete' : 'Mark as complete'}
        onClick={() => onToggle(item.id)}
        className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors duration-150"
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

      <div className="min-w-0 flex-1 shrink">
        <p
          className="min-w-0 text-[13px] font-semibold leading-snug tracking-tight transition-colors duration-150"
          style={{
            color: item.done ? mutedDone : titleActive,
            textDecoration: item.done ? 'line-through' : 'none',
            textDecorationColor: mutedDone,
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
          }}
        >
          {item.title}
        </p>
        <p
          className="mt-1 min-w-0 text-[12px] font-normal leading-relaxed transition-colors duration-150"
          style={{
            color: item.done ? mutedDone : captionActive,
            textDecoration: item.done ? 'line-through' : 'none',
            textDecorationColor: mutedDone,
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
          }}
        >
          {item.caption}
        </p>
      </div>
    </motion.li>
  )
})

function HowToWorkContent({ uiTheme = 'light', items, onSetItems }) {
  const T = contentTokens(uiTheme)
  const accentHex = T.contentAccentHex
  const titleActive = uiTheme === 'dark' ? '#F9F9F7' : '#1c1c1e'
  const captionActive = uiTheme === 'dark' ? 'rgba(249,249,247,0.72)' : '#636366'
  const mutedDone = uiTheme === 'dark' ? 'rgba(249,249,247,0.42)' : '#aeaeb2'
  const subtitleMuted = uiTheme === 'dark' ? 'rgba(249,249,247,0.55)' : '#8e8e93'

  const sortedItems = useMemo(() => sortManualTasks(items), [items])

  const toggle = useCallback(
    (id) => {
      onSetItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
      )
    },
    [onSetItems],
  )

  const remaining = useMemo(() => items.filter((i) => !i.done).length, [items])

  return (
    <div
      className={`flex h-full min-h-0 w-full min-w-0 flex-col overflow-x-hidden overflow-y-auto font-sans ${T.surface} ${T.text} ${T.scrollRootThin} ${T.contentProse}`}
    >
      <div className="flex w-full min-w-0 max-w-full flex-col gap-5 p-6">
        <motion.div
          className="min-w-0 shrink-0"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="min-w-0 text-[18px] font-bold leading-tight tracking-tight"
            style={{ color: accentHex }}
          >
            How to Work with Me
          </h1>
          <p className="mt-1 min-w-0 text-[12px] leading-snug" style={{ color: subtitleMuted }}>
            {remaining === 0 ? 'All caught up! ' : `${remaining} items`}
          </p>
        </motion.div>

        <motion.ul
          className="flex min-w-0 w-full max-w-full flex-col gap-4"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          {sortedItems.map((item) => (
            <ManualTaskRow
              key={item.id}
              item={item}
              accentHex={accentHex}
              titleActive={titleActive}
              captionActive={captionActive}
              mutedDone={mutedDone}
              onToggle={toggle}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  )
}

export default memo(HowToWorkContent)
