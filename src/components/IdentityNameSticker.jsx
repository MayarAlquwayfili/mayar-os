import { motion } from 'framer-motion'

const ACCENT = '#544EAE'

const shadowXl =
  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'

/**
 * “Hello my name is” desk sticker — purple header, handwritten name on white.
 * Parent wraps this for drag + clean click to start the admin / workspace flow.
 */
export default function IdentityNameSticker() {
  return (
    <div className="group relative inline-block cursor-pointer">
      <motion.div
        className="w-[min(280px,72vw)] select-none overflow-hidden rounded-2xl shadow-lg"
        style={{ rotate: 3 }}
        whileHover={{ y: -4, boxShadow: shadowXl }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      >
        <div
          className="px-4 pb-2.5 pt-3.5 text-center"
          style={{ backgroundColor: ACCENT }}
        >
          <p className="text-[17px] font-bold uppercase leading-none tracking-[0.08em] text-white">
            HELLO
          </p>
          <p className="mt-1.5 text-[12px] font-medium lowercase leading-tight tracking-wide text-white/95">
            my name is
          </p>
        </div>
        <div className="bg-white px-4 py-4 text-center">
          <p
            className="text-[28px] font-semibold leading-snug text-gray-900 sm:text-[30px]"
            style={{ fontFamily: "'Caveat', 'Segoe Script', cursive" }}
          >
            Mayar Alquwayfili
          </p>
        </div>
      </motion.div>
      <span
        className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-black/10 bg-white/95 px-2 py-1 text-[10px] font-medium tracking-wide text-neutral-600 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100"
        role="tooltip"
      >
        Mayar ID
      </span>
    </div>
  )
}
