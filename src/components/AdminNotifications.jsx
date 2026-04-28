import { motion, AnimatePresence } from 'framer-motion'

export default function AdminNotifications({ items, adminFlow, onAccept, formatBody }) {
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[8000] flex w-80 flex-col gap-3">
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
            className="pointer-events-auto w-80 border border-[#6B3FA0]/20 bg-[#f8f6f0] p-4"
          >
            <p className="text-[11px] font-normal uppercase tracking-[0.12em] text-[#6B3FA0]">{n.header}</p>
            <p className="mt-1.5 text-[13px] font-normal leading-snug text-gray-800">{formatBody(n.body)}</p>

            {n.isActionable && (
              <div className="mt-3">
                <button
                  type="button"
                  aria-busy={adminFlow === 'loading'}
                  aria-label={adminFlow === 'loading' ? 'Loading' : 'Accept'}
                  className={`inline-flex min-h-[38px] min-w-[5.5rem] items-center justify-center rounded-none px-4 py-2 text-sm font-medium ${
                    adminFlow === 'loading'
                      ? 'cursor-default bg-[#6B3FA0]/12 text-[#6B3FA0]'
                      : 'bg-[#6B3FA0] text-white hover:opacity-90'
                  }`}
                  onClick={onAccept}
                >
                  {adminFlow === 'loading' ? (
                    <span
                      className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-[#6B3FA0] border-t-transparent"
                      aria-hidden
                    />
                  ) : (
                    'Accept'
                  )}
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
