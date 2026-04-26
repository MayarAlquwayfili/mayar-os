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
 * Stickers for 2-column portrait grid — `seam: true` centers on the gutter (translateX -50%).
 */
const STICKER_LAYOUT = [
  { top: '4%', left: '6%', size: 50, rotate: -16, z: 28 },
  { top: '8%', left: '50%', size: 56, rotate: 6, z: 38, seam: true },
  { top: '18%', left: '48%', size: 48, rotate: -10, z: 40, seam: true },
  { top: '12%', right: '4%', size: 44, rotate: 14, z: 26 },
  { top: '32%', left: '2%', size: 42, rotate: 8, z: 30 },
  { top: '38%', left: '50%', size: 54, rotate: -12, z: 42, seam: true },
  { top: '48%', left: '50%', size: 46, rotate: 18, z: 40, seam: true },
  { top: '52%', right: '6%', size: 40, rotate: -6, z: 28 },
  { top: '62%', left: '8%', size: 52, rotate: 11, z: 32 },
  { top: '68%', left: '50%', size: 44, rotate: -14, z: 38, seam: true },
  { top: '72%', left: '50%', size: 50, rotate: 9, z: 41, seam: true },
  { top: '78%', right: '8%', size: 38, rotate: -20, z: 30 },
  { top: '88%', left: '12%', size: 46, rotate: 15, z: 28 },
  { top: '22%', right: '12%', size: 36, rotate: -8, z: 24 },
  { top: '56%', right: '14%', size: 42, rotate: 12, z: 26 },
  { top: '28%', left: '50%', size: 34, rotate: 20, z: 35, seam: true },
  { top: '92%', left: '50%', size: 48, rotate: -11, z: 36, seam: true },
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
              Before we cut a single label, we ran a survey with{' '}
              <span className="font-semibold text-gray-800">81 respondents</span> to learn where people sat
              on the spectrum from{' '}
              <span className="font-semibold" style={{ color: PLUM }}>
                passive experience
              </span>{' '}
              (watching someone else make the drink) to showing up as{' '}
              <span className="font-semibold" style={{ color: MATCHA }}>
                creators
              </span>{' '}
              (measuring, mixing, and signing their own bottle). The numbers didn’t whisper—they pointed at
              a workshop-shaped gap in how beverage ideas are usually pitched.
            </p>

            <div
              className="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 px-6 py-5 sm:flex-row sm:items-stretch sm:justify-center sm:gap-6"
              role="group"
              aria-label="Key survey results"
            >
              <div className="flex flex-1 flex-col items-center justify-center border-b border-gray-200/80 pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
                <p
                  className="text-[34px] font-black tabular-nums leading-none sm:text-[40px]"
                  style={{ color: PLUM }}
                >
                  77%
                </p>
                <p className="mt-2 text-[13px] font-medium leading-snug text-gray-600">
                  chose a hands-on, make-your-own session over a passive tasting or demo-only format
                </p>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center pt-1 sm:pt-0">
                <p
                  className="text-[34px] font-black tabular-nums leading-none sm:text-[40px]"
                  style={{ color: MATCHA }}
                >
                  67%
                </p>
                <p className="mt-2 text-[13px] font-medium leading-snug text-gray-600">
                  said they’d rather leave with something they personally assembled than a pre-made sample
                </p>
              </div>
            </div>

            <p>
              BrewCha became the physical expression of that data: fewer rows of chairs, more stations,
              prompts that assume you’re the one in charge. The live prototype wasn’t a mood board—it was
              the moment we asked whether the story still held when ink, syrup, and ice were in guests’
              hands instead of ours.
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

      {/* ── 2. Portrait grid + watermark + stickers ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="relative mx-auto max-w-4xl">
          {/* Watermark */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none"
            aria-hidden
          >
            <span
              className="block bg-gradient-to-br from-neutral-300/25 via-[#6B3FA0]/[0.07] to-neutral-300/20 bg-clip-text text-center text-[clamp(3rem,14vw,8rem)] font-black leading-none tracking-tight text-transparent"
            >
              BREWCHA
            </span>
          </div>

          {/* 2-column portrait grid: left spans 2 rows; right stacks pic02 + pic03 */}
          <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="col-start-1 row-start-1 row-span-2 flex min-h-0">
              <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-gray-100 shadow-md">
                <img
                  src={Pic01}
                  alt="BrewCha workshop — portrait"
                  className="h-full w-full min-h-[280px] object-cover object-center sm:min-h-[360px]"
                  draggable={false}
                />
              </div>
            </div>
            <div className="col-start-2 row-start-1 overflow-hidden rounded-2xl border border-gray-100 shadow-md">
              <img
                src={Pic02}
                alt="BrewCha workshop — detail"
                className="aspect-[3/4] w-full object-cover sm:aspect-[2/3]"
                draggable={false}
              />
            </div>
            <div className="col-start-2 row-start-2 overflow-hidden rounded-2xl border border-gray-100 shadow-md">
              <img
                src={Pic03}
                alt="BrewCha workshop — detail"
                className="aspect-[3/4] w-full object-cover sm:aspect-[2/3]"
                draggable={false}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[25] overflow-visible" aria-hidden>
            {STICKER_LAYOUT.map((place, i) => {
              const src = STICKER_ASSETS[i]
              const rot = place.rotate
              const style = {
                top: place.top,
                width: place.size,
                height: 'auto',
                zIndex: place.z,
              }
              if (place.left != null) {
                style.left = place.left
                style.transform = place.seam
                  ? `translateX(-50%) rotate(${rot}deg)`
                  : `rotate(${rot}deg)`
              } else if (place.right != null) {
                style.right = place.right
                style.transform = `rotate(${rot}deg)`
              } else {
                style.transform = `rotate(${rot}deg)`
              }

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
