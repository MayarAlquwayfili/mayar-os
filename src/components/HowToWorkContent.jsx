import { useState, useCallback } from 'react'

const ITEMS = [
  { id: 'collab', label: 'Reach out for collaboration' },
  { id: 'side-b', label: "Check the 'Side B' for the process" },
  { id: 'coffee', label: 'Coffee is the primary fuel' },
  { id: 'multi', label: 'Respect the Multipotentialite flow' },
]

export default function HowToWorkContent() {
  const [done, setDone] = useState(() => new Set())

  const toggle = useCallback((id) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f2f2f7]">
      <header className="shrink-0 border-b border-black/[0.06] bg-white px-5 pb-5 pt-6">
        <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-gray-900">
          How to work with Mayar?
        </h1>
      </header>

      <ul className="min-h-0 flex-1 list-none overflow-y-auto px-2 py-3">
        {ITEMS.map((item) => {
          const checked = done.has(item.id)
          return (
            <li key={item.id} className="px-1">
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-black/[0.04] active:bg-black/[0.06]"
                onClick={() => toggle(item.id)}
              >
                <span
                  className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    checked
                      ? 'border-[#6B3FA0] bg-[#6B3FA0]'
                      : 'border-gray-300 bg-white'
                  }`}
                  aria-hidden
                >
                  {checked && (
                    <svg
                      className="h-2.5 w-2.5 text-white"
                      viewBox="0 0 12 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 5l3.5 3.5L11 1" />
                    </svg>
                  )}
                </span>
                <span
                  className={`pt-0.5 text-[15px] leading-snug ${
                    checked ? 'text-gray-400 line-through' : 'text-gray-900'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
