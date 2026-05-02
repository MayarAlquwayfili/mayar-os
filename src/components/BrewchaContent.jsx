import BrewchaFav from "../assets/Brewcha/Brewcha's_fav.svg"
import Pic01 from '../assets/Brewcha/Brewcha_pic01.jpg'
import Pic02 from '../assets/Brewcha/Brewcha_pic02.jpg'
import Pic03 from '../assets/Brewcha/Brewcha_pic03.jpg'
import S01 from '../assets/Brewcha/Stickers/Brewcha_01.svg'
import S02 from '../assets/Brewcha/Stickers/Brewcha_02.svg'
import S03 from '../assets/Brewcha/Stickers/Brewcha_03.svg'
import S05 from '../assets/Brewcha/Stickers/Brewcha_05.svg'
import S11 from '../assets/Brewcha/Stickers/Brewcha_11.svg'
import { contentTokens } from '../utils/windowContentTheme'

const CALLOUT_STICKERS = [S01, S02, S03, S05, S11, BrewchaFav]

const META = [
  { label: 'Timeline', value: '09/2025 – 11/2025' },
  { label: 'Project Type', value: 'Entrepreneurship Project (Academic)' },
  { label: 'Category', value: 'Interactive Beverage Workshop' },
  { label: 'Role', value: 'Product Manager & Designer' },
]

const META_KEY = 'text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400 mb-1'
const META_VAL = 'text-[13px] font-medium text-gray-900'

const BODY = 'text-[15px] leading-[1.8] tracking-[0.01em] text-gray-600 text-center'

const CALLOUT_LAYOUT = [
  { top: '-12px', left: '-26px', size: 72, rotate: -10, opacity: 0.95 },
  { top: '18px', right: '-34px', size: 76, rotate: 14, opacity: 0.9 },
  { top: '168px', left: '-38px', size: 68, rotate: 8, opacity: 0.88 },
  { top: '236px', right: '-26px', size: 70, rotate: -12, opacity: 0.9 },
  { bottom: '-18px', left: '18%', size: 74, rotate: 11, opacity: 0.92 },
]

export default function BrewchaContent({ uiTheme = 'light' }) {
  const T = contentTokens(uiTheme)
  const watermarkVia =
    uiTheme === 'dark' ? 'via-[#ACDEE7]/[0.12]' : 'via-[#82ADB5]/[0.12]'
  return (
    <div
      className={`h-full overflow-y-auto overflow-x-hidden font-sans antialiased ${T.surface} ${T.text} ${T.scrollRoot} ${T.contentProse}`}
    >
      {/* ── 1. Identity header + narrative ── */}
      <section className="px-6 pt-8 pb-24 sm:px-10">
        <div className="mx-auto max-w-[1200px]">
          {/* Header + pill */}
          <div className="flex flex-wrap items-center justify-start gap-3 text-left">
            <h1 className="text-[36px] font-bold leading-tight tracking-tight text-gray-900">
              BrewCha
            </h1>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold ${T.pillDefault}`}
            >
              Live Prototype
            </span>
          </div>

          <div className="border-b border-gray-100 pb-8" />

          {/* Metadata grid */}
          <div className="pt-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-left md:grid-cols-4 md:gap-y-10">
              {META.map(({ label, value }) => (
                <div key={label}>
                  <p className={META_KEY}>{label}</p>
                  <p className={META_VAL}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b border-gray-100 pt-8" />

          {/* Narrative (centered) */}
          <div className="pt-10">
            <div className={`relative mx-auto max-w-[800px] space-y-6 ${BODY}`}>
            {/* Subtle sticker callouts (no grid overlap) */}
            <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
              {CALLOUT_LAYOUT.map((p, i) => {
                const src = CALLOUT_STICKERS[i]
                const style = {
                  width: p.size,
                  height: 'auto',
                  transform: `rotate(${p.rotate}deg)`,
                  opacity: p.opacity,
                }
                if (p.top != null) style.top = p.top
                if (p.bottom != null) style.bottom = p.bottom
                if (p.left != null) style.left = p.left
                if (p.right != null) style.right = p.right
                return (
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt=""
                    draggable={false}
                    className="absolute -z-[1] select-none"
                    style={style}
                  />
                )
              })}
            </div>
            <p>
              We all love a good coffee or matcha run. For many, a quick grab-and-go from a traditional café is exactly what they need. However, our research showed that this passive experience leaves out a specific group: the creators who love the process just as much as the product.
            </p>
            <p>
              We surveyed 81 respondents; 77% felt that current cafe experiences have become repetitive, and 67% expressed a strong interest in building their own drinks from scratch.
            </p>
            <p>
              Instead of opening just another cafe, we created Brewcha Studio an interactive beverage workshop. To test and validate this concept with real users, we executed a live prototype.
            </p>
            <p>
              The journey begins at a touchscreen interface. To prevent decision fatigue, I designed UI features like "Brewcha’s Favorite" tags to guide users as they build their custom recipes. Once the prep is done, the fun starts. Customers head to the Sticker Bar to customize their cups.
            </p>
            <p>
              Next, they move to their assigned station. We provide them with everything they need: an apron, a kit of pre-portioned ingredients, specialized tools, and an instruction card. Finally, it's time for them to enjoy their creation and capture the perfect photo to share. By empowering the customer to be the creator, we turned a simple drink into a memorable, shareable experience.
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Compact portrait grid + watermark + margin stickers (gallery only) ── */}
      <section className="relative overflow-x-visible py-16 px-4 sm:px-8">
        <div className="relative mx-auto max-w-3xl overflow-visible">
          {/* Watermark */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none"
            aria-hidden
          >
            <span
              className={`block bg-gradient-to-br from-neutral-300/25 ${watermarkVia} to-neutral-300/20 bg-clip-text text-center text-[clamp(2.5rem,11vw,6.5rem)] font-black leading-none tracking-tight text-transparent`}
            >
              BREWCHA
            </span>
          </div>

          {/* Fixed-height grid: pic01 full-height left; pic02 + pic03 stacked right */}
          <div
            className="relative z-10 grid h-[min(46vh,400px)] grid-cols-2 grid-rows-2 gap-2 sm:h-[min(150vh,600px)] sm:gap-3"
          >
            <div className="col-start-1 row-start-1 row-span-2 min-h-0">
              <div className="h-full min-h-0 overflow-hidden rounded-2xl border border-gray-100 shadow-md">
                <img
                  src={Pic02}
                  alt="BrewCha workshop — portrait"
                  className="h-full w-full object-cover object-center"
                  draggable={false}
                />
              </div>
            </div>
            <div className="col-start-2 row-start-1 min-h-0 overflow-hidden rounded-2xl border border-gray-100 shadow-md">
              <img
                src={Pic03}
                alt="BrewCha workshop — detail"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            <div className="col-start-2 row-start-2 min-h-0 overflow-hidden rounded-2xl border border-gray-100 shadow-md">
              <img
                src={Pic01}
                alt="BrewCha workshop — detail"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
