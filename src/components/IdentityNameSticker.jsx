const ACCENT = '#544EAE'

/**
 * “Hello my name is” desk sticker — purple header, handwritten name on white.
 */
export default function IdentityNameSticker() {
  return (
    <div
      className="w-[min(280px,72vw)] select-none overflow-hidden rounded-2xl shadow-lg"
      style={{ transform: 'rotate(3deg)' }}
      role="img"
      aria-label="Name tag: Hello, my name is Mayar Alquwayfili"
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
    </div>
  )
}
