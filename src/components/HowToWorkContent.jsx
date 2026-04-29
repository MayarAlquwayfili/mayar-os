import { useState } from 'react'
import { motion } from 'framer-motion'

const WORK_ACCENT = '#544EAE'

const BENTO_DEFS = [
  {
    id: 1,
    headline: 'Collaborate',
    sub: 'Reach out for partnership, feedback, or a quick hello.',
    kind: 'collab',
  },
  {
    id: 2,
    headline: 'Side B',
    sub: "The full process lives there — peek before we ship.",
    kind: 'process',
  },
  {
    id: 3,
    headline: 'Fuel',
    sub: 'Coffee is the primary fuel.',
    kind: 'fuel',
    meterLabel: '100% Charged',
  },
  {
    id: 4,
    headline: 'Multipotentialite',
    sub: 'Respect the flow — depth and breadth both count.',
    kind: 'tag',
    tag: 'Scanner · Maker · Switcher',
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
    // return BENTO_DEFS.map((d) => ({
    //   ...d,
    //   done: Boolean(doneById.get(d.id)),
    // }))
    return null
  } catch {
    return null
  }
}

const gridContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
}

const gridItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
}

function IconCollab({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5h16M4 12h10M4 17.5h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function IconLayers({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 4 7l8 4 8-4-8-4Zm-8 10 8 4 8-4M4 17l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCoffee({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 9h11a3 3 0 0 1 0 6h-1M5 9v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9M5 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 11h1.2a1.8 1.8 0 0 1 0 3.6H18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconSpark({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function BentoCardShell({ children, done, onToggle, def }) {
  return (
    <motion.article
      variants={gridItem}
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-gray-50/90 p-4 shadow-sm transition-opacity duration-200 ${
        done ? 'border-gray-200/80 opacity-75' : 'border-gray-100'
      }`}
      style={{ boxShadow: done ? undefined : '0 1px 0 rgba(0,0,0,0.04)' }}
    >
      <button
        type="button"
        aria-label={done ? 'Mark card as unread' : 'Mark card as read'}
        onClick={() => onToggle(def.id)}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200/80 bg-white/90 text-[11px] font-semibold text-gray-500 shadow-sm transition-colors hover:bg-gray-50"
      >
        {done ? '↺' : '✓'}
      </button>
      {children}
    </motion.article>
  )
}

function CardBody({ def, done }) {
  const muted = done ? 'text-gray-400' : 'text-gray-500'
  const titleCls = done ? 'text-gray-400' : 'text-[#1c1c1e]'

  if (def.kind === 'collab') {
    return (
      <>
        <div className="mb-3 flex items-start justify-between gap-2 pr-8">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${WORK_ACCENT}18`, color: WORK_ACCENT }}
          >
            <IconCollab className="h-6 w-6" />
          </div>
          <span
            className="mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${WORK_ACCENT}14`, color: WORK_ACCENT }}
          >
            Open channel
          </span>
        </div>
        <h2 className={`text-[15px] font-bold leading-snug ${titleCls}`}>{def.headline}</h2>
        <p className={`mt-1.5 text-[12px] leading-relaxed ${muted}`}>{def.sub}</p>
      </>
    )
  }

  if (def.kind === 'process') {
    return (
      <>
        <div className="mb-3 flex items-center gap-3 pr-8">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100/90 text-amber-800"
          >
            <IconLayers className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-amber-500/90 transition-all"
                style={{ width: done ? '35%' : '72%' }}
              />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Process map · {done ? 'queued' : 'in motion'}
            </p>
          </div>
        </div>
        <h2 className={`text-[15px] font-bold leading-snug ${titleCls}`}>{def.headline}</h2>
        <p className={`mt-1.5 text-[12px] leading-relaxed ${muted}`}>{def.sub}</p>
      </>
    )
  }

  if (def.kind === 'fuel') {
    return (
      <>
        <div className="mb-3 flex items-center gap-3 pr-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3d2c29]/90 text-[#f5e6d3]">
            <IconCoffee className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className={`text-[11px] font-semibold ${done ? 'text-gray-400' : 'text-gray-700'}`}>
                {def.meterLabel}
              </span>
              <span className="text-[10px] font-bold text-emerald-600">●</span>
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
        <h2 className={`text-[15px] font-bold leading-snug ${titleCls}`}>{def.headline}</h2>
        <p className={`mt-1.5 text-[12px] leading-relaxed ${muted}`}>{def.sub}</p>
      </>
    )
  }

  if (def.kind === 'tag') {
    return (
      <>
        <div className="mb-3 flex flex-wrap items-center gap-2 pr-8">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${WORK_ACCENT}18`, color: WORK_ACCENT }}
          >
            <IconSpark className="h-6 w-6" />
          </div>
          <span
            className="inline-flex items-center rounded-lg border-2 border-dashed px-2.5 py-1 text-[11px] font-bold tracking-tight"
            style={{ borderColor: WORK_ACCENT, color: WORK_ACCENT }}
          >
            {def.tag}
          </span>
        </div>
        <h2 className={`text-[15px] font-bold leading-snug ${titleCls}`}>{def.headline}</h2>
        <p className={`mt-1.5 text-[12px] leading-relaxed ${muted}`}>{def.sub}</p>
      </>
    )
  }

  return null
}

export default function HowToWorkContent() {
  // TODO: UNCOMMENT FOR PRODUCTION
  // const [items, setItems] = useState(() => loadSavedChecklist() ?? BENTO_DEFS.map((d) => ({ ...d, done: false })))
  const [items, setItems] = useState(() => BENTO_DEFS.map((d) => ({ ...d, done: false })))

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

  const openCount = items.filter((i) => !i.done).length

  return (
    <div
      className="flex h-full w-full flex-col items-start justify-start overflow-y-auto bg-white font-sans
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-200"
    >
      <div className="w-full p-5 sm:p-6">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[18px] font-bold leading-tight tracking-tight" style={{ color: WORK_ACCENT }}>
            How to work with Mayar?
          </h1>
          <p className="mt-1 text-[12px]" style={{ color: '#8e8e93' }}>
            {openCount === 0 ? 'All cards acknowledged — nice.' : `${openCount} to skim`}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          variants={gridContainer}
          initial="hidden"
          animate="show"
        >
          {items.map((def) => (
            <BentoCardShell key={def.id} def={def} done={def.done} onToggle={toggle}>
              <CardBody def={def} done={def.done} />
            </BentoCardShell>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
