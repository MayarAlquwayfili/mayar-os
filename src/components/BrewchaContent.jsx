import BrewchaFav from "../assets/Brewcha/Brewcha's_fav.svg"
import Pic01 from '../assets/Brewcha/Brewcha_pic01.jpg'
import Pic02 from '../assets/Brewcha/Brewcha_pic02.jpg'
import Pic03 from '../assets/Brewcha/Brewcha_pic03.jpg'
import S01 from '../assets/Brewcha/Stickers/Brewcha_01.svg'
import S02 from '../assets/Brewcha/Stickers/Brewcha_02.svg'
import S03 from '../assets/Brewcha/Stickers/Brewcha_03.svg'
import S04 from '../assets/Brewcha/Stickers/Brewcha_04.svg'
import S05 from '../assets/Brewcha/Stickers/Brewcha_05.svg'
import S06 from '../assets/Brewcha/Stickers/Brewcha_06.svg'
import S07 from '../assets/Brewcha/Stickers/Brewcha_07.svg'
import S08 from '../assets/Brewcha/Stickers/Brewcha_08.svg'
import S09 from '../assets/Brewcha/Stickers/Brewcha_09.svg'
import S10 from '../assets/Brewcha/Stickers/Brewcha_10.svg'
import S11 from '../assets/Brewcha/Stickers/Brewcha_11.svg'
import S12 from '../assets/Brewcha/Stickers/Brewcha_12.svg'
import S13 from '../assets/Brewcha/Stickers/Brewcha_13.svg'
import S14 from '../assets/Brewcha/Stickers/Brewcha_14.svg'
import S15 from '../assets/Brewcha/Stickers/Brewcha_15.svg'
import S16 from '../assets/Brewcha/Stickers/Brewcha_16.svg'

const MATCHA = '#10B981'
const PLUM = '#6B3FA0'
const COFFEE = '#5C4033'

const STICKER_ASSETS = [
  S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15, S16, BrewchaFav,
]

const META = [
  { label: 'Timeline', value: '09/2025 – 11/2025' },
  { label: 'Type', value: 'Entrepreneurship' },
  { label: 'Category', value: 'Interactive Beverage Workshop' },
  { label: 'Role', value: 'Product Manager & Designer' },
]

const BODY =
  'text-[15px] leading-[1.8] tracking-[0.01em] text-gray-600 text-center'

/**
 * Curated scatter: overlap corners (z-30) vs whitespace (z-[12]).
 * Positions are % of the gallery stage (hero + duo row).
 */
const STICKER_LAYOUT = [
  { top: '6%', left: '2%', size: 56, rotate: -14, z: 30 },
  { top: '4%', left: '42%', size: 48, rotate: 8, z: 12 },
  { top: '10%', right: '-2%', size: 62, rotate: 18, z: 30 },
  { top: '28%', left: '-3%', size: 44, rotate: -6, z: 12 },
  { top: '34%', right: '8%', size: 52, rotate: -11, z: 30 },
  { top: '48%', left: '6%', size: 40, rotate: 22, z: 30 },
  { top: '52%', left: '48%', size: 50, rotate: -4, z: 12 },
  { top: '58%', right: '4%', size: 46, rotate: 14, z: 12 },
  { top: '72%', left: '-4%', size: 54, rotate: -20, z: 30 },
  { top: '78%', left: '22%', size: 38, rotate: 6, z: 12 },
  { top: '76%', left: '52%', size: 48, rotate: -9, z: 30 },
  { top: '82%', right: '12%', size: 42, rotate: 16, z: 12 },
  { top: '88%', left: '8%', size: 36, rotate: -12, z: 12 },
  { top: '62%', left: '30%', size: 34, rotate: 10, z: 12 },
  { top: '18%', right: '18%', size: 40, rotate: -7, z: 12 },
  { top: '40%', left: '18%', size: 44, rotate: 19, z: 12 },
  { top: '92%', right: '2%', size: 50, rotate: -15, z: 30 },
]

export default function BrewchaContent() {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-white font-sans text-neutral-900 antialiased">
      {/* ── 1. Identity header + narrative ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <h1 className="text-[36px] font-bold leading-tight tracking-tight" style={{ color: COFFEE }}>
              BrewCha Overview
            </h1>
            <span className="hidden sm:inline text-[32px] font-light text-gray-300" aria-hidden>
              |
            </span>
            <p className="text-[32px] font-medium text-gray-400">Status: Live Prototype</p>
          </div>

          <div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-y-10">
            {META.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                  {label}
                </p>
                <p className="text-[13px] font-medium leading-snug text-gray-800 md:text-[14px]">{value}</p>
              </div>
            ))}
          </div>

          <div className={`space-y-6 ${BODY}`}>
            <p>
              We fielded a structured survey with{' '}
              <span className="font-semibold text-gray-800">81 respondents</span> to stress-test demand
              before the live prototype. A majority said they would rather join a small, hands-on beverage
              session than watch a passive demo; open responses repeatedly asked for customization,
              visible ingredients, and a takeaway they could photograph and share. Those signals set the
              bar for how much participation the workshop had to deliver—not just taste, but ownership.
            </p>
            <p>
              BrewCha was designed as the answer: a shift from{' '}
              <span className="font-semibold" style={{ color: PLUM }}>
                passive experience
              </span>{' '}
              toward guests as{' '}
              <span className="font-semibold" style={{ color: MATCHA }}>
                creators
              </span>
              —measuring, brewing, labeling, and leaving with a finished bottle. Survey themes mapped
              directly to the run-of-show: clearer instructions for first-timers, optional “challenge”
              cards for confident makers, and sticker moments that turned the table into a collage of
              personal marks. The live prototype became the validation layer on top of those 81 voices.
            </p>
            <p>
              In the room, the same contrasts we saw in the data appeared in behavior: people who expected
              to observe ended up leading pours for their group; others used the sticker bar to “sign”
              their blend like a release poster. The narrative we wrote from the survey held—when guests
              feel like owners, the product story writes itself.
            </p>
          </div>
        </div>

        {/* Bridge: intro → gallery */}
        <div className="mx-auto mt-16 flex max-w-[800px] flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">Scroll for more</p>
          <span
            className="inline-flex animate-bounce text-gray-400"
            style={{ animationDuration: '2.2s' }}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </section>

      {/* ── 2. Curated gallery + watermark + sticker explosion ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="relative mx-auto max-w-5xl">
          {/* Watermark — large, behind the grid */}
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2 select-none"
            aria-hidden
          >
            <span
              className="block bg-gradient-to-br from-neutral-300/25 via-[#6B3FA0]/[0.07] to-neutral-300/20 bg-clip-text text-center text-[clamp(3.5rem,16vw,10.5rem)] font-black leading-none tracking-tight text-transparent"
            >
              BREWCHA
            </span>
          </div>

          {/* Photo grid */}
          <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/[0.04]">
              <img
                src={Pic01}
                alt="BrewCha workshop — hero"
                className="aspect-[21/10] w-full object-cover sm:aspect-[2.2/1]"
                draggable={false}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.04]">
              <img
                src={Pic02}
                alt="BrewCha workshop — detail"
                className="aspect-[4/3] w-full object-cover"
                draggable={false}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.04]">
              <img
                src={Pic03}
                alt="BrewCha workshop — detail"
                className="aspect-[4/3] w-full object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* Stickers — fill gaps, overlap corners */}
          <div className="pointer-events-none absolute inset-0 z-[25] overflow-visible" aria-hidden>
            {STICKER_LAYOUT.map((place, i) => {
              const src = STICKER_ASSETS[i]
              const style = {
                top: place.top,
                width: place.size,
                height: 'auto',
                transform: `rotate(${place.rotate}deg)`,
                zIndex: place.z,
              }
              if (place.left != null) style.left = place.left
              if (place.right != null) style.right = place.right

              return (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  draggable={false}
                  className="absolute select-none drop-shadow-md"
                  style={style}
                />
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
