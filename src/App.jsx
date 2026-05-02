import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react'
import FolderIcon from './assets/Folder.svg'
import AppIconMoheetik from './assets/Moheetik/AppIconMoheetik.svg'
import AppIconRECLAB from './assets/RECLAB/AppIconRECLAB.svg'
import MockupRECLABLab from './assets/RECLAB/MockupLab.svg'
import MockupRECLABWinCollection from './assets/RECLAB/MockupWinCollection.svg'
import RECLABPopup from './assets/RECLAB/RECLAB_POPUP.svg'
// RECLAB_POPUP02.svg — drop this file into src/assets/RECLAB/ to activate the second popup
import RECLABButton from './assets/RECLAB/RECLAB_BUTTON.svg'
import MockupMoheetik01 from './assets/Moheetik/MockupMoheetik01.svg'
import MockupMoheetik02 from './assets/Moheetik/MockupMoheetik02.svg'
import MockupMoheetik03 from './assets/Moheetik/MockupMoheetik03.svg'
import Dock from './components/Dock'
import TopStatusBar from './components/TopStatusBar'
import BrewchaContent from './components/BrewchaContent'
import CreativeLabFolderContent from './components/CreativeLabFolderContent'
import SideBFolderContent from './components/SideBFolderContent'
import CashResearchContent from './components/CashResearchContent'
import SideBAlbumContent from './components/SideBAlbumContent'
import ImagePreviewContent from './components/ImagePreviewContent'
import HowToWorkContent from './components/HowToWorkContent'
import QaffatekContent from './components/QaffatekContent'
import DraggableDesktopItem from './components/DraggableDesktopItem'
import AdminFolderCursorTip from './components/AdminFolderCursorTip'
import AdminNotifications from './components/AdminNotifications'
import IdentityNameSticker from './components/IdentityNameSticker'
import MobileEmptyState from './components/MobileEmptyState'
import NotionFolderIcon from './assets/Admin/Notion_Folder.svg'
import V60FolderIcon from './assets/Admin/V60_Folder.svg'
import FigmaFolderIcon from './assets/Admin/Figma_Folder.svg'
import { useWindowManager } from './hooks/useWindowManager'
import { MOHEETIK_TOOLS, RECLAB_TOOLS, DESKTOP_FOLDERS } from './constants/projects'
import { windowChrome, contentTokens } from './utils/windowContentTheme'

const MENU_BAR_PX = 28
// Dock: bottom-4 (16px) + py-2 (16px) + icon (54px) + dot gap + dot = ~96px clearance
const DOCK_SAFE_PX = 96

/** Post-admin-flow desktop items — share selection state with standard folders. */
const DESKTOP_ITEM_FRAME_BASE =
  'box-border flex w-[132px] flex-col items-center gap-2 rounded-xl border p-3 text-center outline-none'
/** Applied only while idle — omit during drag so left/top are not transition-animated. */
const DESKTOP_ITEM_FRAME_IDLE_TRANSITION = 'transition-all duration-200'

function desktopItemSelectionClass(isSelected) {
  return isSelected
    ? 'border-[#FEF0BC]/45 bg-[#FEF0BC]/35 hover:bg-[#FEF0BC]/40'
    : 'border-transparent bg-transparent hover:border-transparent hover:bg-[#FEF0BC]/40'
}
const EDGE_PX = 10
const MIN_W = 500
const MIN_H = 400
/** Qaffatek — wide stage for sticky mockup + narrative columns. */
const MIN_W_QAFFATEK = 1400
const MIN_H_QAFFATEK = 750
/** RECLAB — larger layout floor so rich media grids don’t collapse. */
const MIN_W_RECLAB = 900
const MIN_H_RECLAB = 700

function minWindowSizeForTitle(title) {
  if (title === 'Qaffatek') return { w: MIN_W_QAFFATEK, h: MIN_H_QAFFATEK }
  if (title === 'RECLAB') return { w: MIN_W_RECLAB, h: MIN_H_RECLAB }
  return { w: MIN_W, h: MIN_H }
}

const RESIZE_CURSORS = {
  n: 'ns-resize',
  s: 'ns-resize',
  e: 'ew-resize',
  w: 'ew-resize',
  ne: 'nesw-resize',
  sw: 'nesw-resize',
  nw: 'nwse-resize',
  se: 'nwse-resize',
}

function getResizeZone(clientX, clientY, rect) {
  const x = clientX - rect.left
  const y = clientY - rect.top
  const w = rect.width
  const h = rect.height
  const onN = y < EDGE_PX
  const onS = y > h - EDGE_PX
  const onW = x < EDGE_PX
  const onE = x > w - EDGE_PX
  if (onN && onW) return 'nw'
  if (onN && onE) return 'ne'
  if (onS && onW) return 'sw'
  if (onS && onE) return 'se'
  if (onN) return 'n'
  if (onS) return 's'
  if (onW) return 'w'
  if (onE) return 'e'
  return null
}


const BODY_CLS    = 'text-[13.5px] leading-[1.8] tracking-[0.01em] text-gray-700'
const META_KEY_CLS = 'text-[10px] font-medium uppercase tracking-[0.09em] text-gray-400 mb-1'
const META_VAL_CLS = 'text-[13px] font-medium text-gray-900'

function MoheetikSplitContent({ uiTheme = 'light' }) {
  const T = contentTokens(uiTheme)
  return (
    <div
      className={`pointer-events-auto h-full overflow-y-auto text-left font-sans ${T.surface} ${T.text} ${T.scrollRoot} ${T.contentProse}`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 py-8 sm:px-8 md:px-10">

        {/* ── Identity ───────────────────────────────────────── */}
        <header className="flex items-center gap-5 pb-6 mb-8 border-b border-gray-100">
          <img
            src={AppIconMoheetik}
            alt="Moheetik app icon"
            className="h-16 w-16 rounded-[14px] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold tracking-tight text-gray-900">Moheetik | محيطك</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${T.pillDefault}`}
              >
                MVP
              </span>
            </div>
            <p className="mt-0.5 text-[13px] font-medium text-gray-500">
              Accessibility &amp; Navigation
            </p>
          </div>
        </header>

        {/* ── Overview Grid ──────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 pb-8 mb-10 border-b border-gray-100">
          <div>
            <p className={META_KEY_CLS}>Timeline</p>
            <p className={META_VAL_CLS}>Nov 4 – Dec 16, 2025</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>My Role</p>
            <p className={META_VAL_CLS}>Lead iOS Developer &amp; UI/UX Designer</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>Project Type</p>
            <p className={META_VAL_CLS}>iOS App (Apple Dev Academy)</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>Tools</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {MOHEETIK_TOOLS.map((t) => (
                <span
                  key={t}
                  className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${T.pillDefault}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 01. The Challenge — text left, mockup right ─────── */}
        <section className="py-10 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-6 md:gap-[6%]">
          <div className="min-w-0">
            <p className={META_KEY_CLS + ' mb-3'}>01 — The Challenge</p>
            <h2 className="text-[24px] font-bold leading-tight tracking-tight text-gray-900 mb-4">
              GPS gets you to the building.<br />
              <span className="text-gray-400">It won&apos;t find the door handle.</span>
            </h2>
            <p className={BODY_CLS}>
              Arriving at an address is just the start of the real challenge. GPS
              can lead you to a building, but it won&apos;t find the door handle or
              the entrance. This is a critical blind spot where technology fails. In
              our research, 27% of respondents identified mobility as the sector most
              in need of a breakthrough. We built Moheetik to bridge this gap, taking
              over the moment the GPS says &lsquo;You have arrived,&rsquo; and guiding
              the user until the app confirms: &lsquo;Target reached.&rsquo;
            </p>
          </div>
          <div className="min-w-0">
            <img
              src={MockupMoheetik01}
              alt="App loading state and object list"
              className="w-full h-auto object-contain drop-shadow-none"
            />
          </div>
        </section>

        {/* ── 02. The Solution — mockup left, text right ──────── */}
        <section className="py-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] items-center gap-6 md:gap-[6%]">
          <div className="min-w-0">
            <img
              src={MockupMoheetik02}
              alt="Real-time detection grid"
              className="w-full h-auto object-contain drop-shadow-none"
            />
          </div>
          <div className="min-w-0">
            <p className={META_KEY_CLS + ' mb-3'}>02 — The Solution</p>
            <h2 className="text-[24px] font-bold leading-tight tracking-tight text-gray-900 mb-4">
              Magic Tap. Haptic zones.<br />Arabic voice. Custom Core&nbsp;ML.
            </h2>
            <p className={BODY_CLS}>
              During usability testing, we realized we were designing for an
              experience we didn&apos;t fully understand. Since a tester advised us
              to practice VoiceOver, I haven&apos;t opened the app without it. To make
              navigation seamless, we integrated the{' '}
              <strong className="font-semibold text-gray-900">Magic Tap</strong> gesture
              for instant scanning and a 3-meter haptic zone where vibrations intensify
              as you get closer to the target. Our research also highlighted a major
              exclusion: the lack of localized accessibility tools that support Arabic.
              We broke this barrier by integrating real-time{' '}
              <strong className="font-semibold text-gray-900">Arabic voice guidance</strong>{' '}
              to ensure the experience felt native and intuitive. Furthermore, because
              standard YOLO models lacked critical navigation objects like doors and
              stairs, we supplemented them by custom-training our own{' '}
              <strong className="font-semibold text-gray-900">Core ML model</strong>{' '}
              (MoheetikModel) from scratch.
            </p>
          </div>
        </section>

        {/* ── 03. The Impact — text left, mockup right ────────── */}
        <section className="py-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-6 md:gap-[6%]">
          <div className="min-w-0">
            <p className={META_KEY_CLS + ' mb-3'}>03 — The Impact</p>
            <h2 className="text-[24px] font-bold leading-tight tracking-tight text-gray-900 mb-4">
              From the Academy stage<br />
              <span className="text-gray-400">to real independence.</span>
            </h2>
            <p className={BODY_CLS}>
              Our journey wasn&apos;t just about code. We were selected to showcase at
              the Apple Developer Academy. Presenting Moheetik at the Authority for
              Persons with Disabilities (APD) and seeing users find a bottle or a chair
              independently proved our impact. We started with doors and stairs, but our
              vision is to expand to every daily essential, ensuring that &lsquo;arriving&rsquo;
              is never the end of the journey.
            </p>
          </div>
          <div className="min-w-0">
            <img
              src={MockupMoheetik03}
              alt="Target reached and voice confirmation"
              className="w-full h-auto object-contain drop-shadow-none"
            />
          </div>
        </section>

      </div>
    </div>
  )
}

function RECLABContent({ uiTheme = 'light' }) {
  const scrollRef = useRef(null)
  const sec2Ref   = useRef(null)  // S02 text (right) — BUTTON bell
  const sec3Ref   = useRef(null)  // S03 text (left)  — POPUP bell
  const sec4Ref   = useRef(null)  // S04 text (right) — Lab→WC blend

  // Bell-curve progress for floating icons (0=entering, 0.5=centred, 1=exiting)
  const [sec2RP, setSec2RP] = useState(0)
  const [sec3RP, setSec3RP] = useState(0)
  // Directional section-scroll progress for mockup blend (0=entered, 1=fully past)
  const [labToWCP, setLabToWCP] = useState(0)

  // readProgress: 0 = entering from bottom, 0.5 = centred, 1 = exiting from top
  const readProgress = useCallback((ref) => {
    const container = scrollRef.current
    const el = ref.current
    if (!container || !el) return 0
    const cRect = container.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    const elCenter = eRect.top + eRect.height / 2 - cRect.top
    return Math.min(1, Math.max(0, 1 - elCenter / cRect.height))
  }, [])

  // sectionVisible: starts the moment the section's TOP enters the viewport from below.
  // Returns 0 at first pixel of visibility, rising to 1 as the section scrolls upward.
  const sectionVisible = useCallback((ref) => {
    const container = scrollRef.current
    const el = ref.current
    if (!container || !el) return 0
    const cRect = container.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    // (cRect.bottom - eRect.top): 0 when section top == viewport bottom, positive as it scrolls up
    return Math.min(1, Math.max(0, (cRect.bottom - eRect.top) / cRect.height))
  }, [])

  const handleScroll = useCallback(() => {
    setSec2RP(readProgress(sec2Ref))
    setSec3RP(readProgress(sec3Ref))
    // 0.3 dead-zone: transition waits until 30% of S04 is visible, then ×8 makes it fast.
    const sec4Progress = Math.max(0, sectionVisible(sec4Ref) - 0.3)
    setLabToWCP(Math.min(1, sec4Progress * 8))
  }, [readProgress, sectionVisible])

  // ── Mockup: Lab is static through S02 & S03, blends to WC early in S04 ──
  const labOpacity = 1 - labToWCP
  const wcOpacity  = labToWCP

  // ── Bell-curve icons ─────────────────────────────────────────────────────
  // bell(p) = sin(p·π): 0 at entry, 1 at centre, 0 at exit
  const bell    = (p) => Math.pow(Math.sin(p * Math.PI), 6)
  const floatTY = (p) => (0.5 - p) * 72   // ±36 px cinematic drift

  // BUTTON strictly tracks S02 only
  const btnOpacity = bell(sec2RP)
  const btnTY      = floatTY(sec2RP)

  // Single POPUP tracks S03
  const popOpacity = bell(sec3RP)
  const popTY      = floatTY(sec3RP)

  const T = contentTokens(uiTheme)

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`pointer-events-auto h-full overflow-y-auto text-left font-sans ${T.surface} ${T.text} ${T.scrollRoot} ${T.contentProse}`}
    >

      {/* ── Header + Overview ─────────────────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 md:px-10 pt-8 pb-6">
        <header className="flex items-center gap-5 pb-6 mb-8 border-b border-gray-100">
          <img src={AppIconRECLAB} alt="RECLAB app icon" className="h-16 w-16 rounded-[14px] shadow-sm" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold tracking-tight text-gray-900">RECLAB</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${T.pillDefault}`}
              >
                MVP
              </span>
            </div>
            <p className="mt-0.5 text-[13px] font-medium text-gray-500">Lifestyle &amp; Productivity</p>
          </div>
        </header>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 pb-8 border-b border-gray-100">
          <div>
            <p className={META_KEY_CLS}>Timeline</p>
            <p className={META_VAL_CLS}>01/2026 – Present</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>My Role</p>
            <p className={META_VAL_CLS}>iOS Developer &amp; UI/UX Designer</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>Project Type</p>
            <p className={META_VAL_CLS}>Personal Project</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>Tools</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {RECLAB_TOOLS.map((t) => (
                <span
                  key={t}
                  className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${T.pillDefault}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 01. The Challenge — full-width dramatic prologue ─────────── */}
      <div className="w-full max-w-[820px] mx-auto px-6 sm:px-8 py-24 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-6">
          01 — The Challenge
        </p>
        <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight leading-[1.2] text-gray-900 mb-8">
          &lsquo;What are your hobbies?&rsquo;<br />
          <span className="text-gray-400 font-normal">
            For a Multipotentialite, this is a trick question.
          </span>
        </h2>
        <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-gray-600 mb-8">
          Being a &lsquo;Hobby Collector&rsquo; is about the constant thrill of discovery.
          But once that initial curiosity is satisfied, the spark often disappears. Without a
          system to capture the journey, these experiments quickly vanish into a graveyard of
          abandoned hobbies.
        </p>
        <div className="space-y-3 my-10 max-w-[560px] border-l-2 border-gray-200 pl-6 text-left">
          <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-gray-500 italic">
            &ldquo;I joke that I only have one hobby, which is that I am a hobby collector.&rdquo;
          </p>
          <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-gray-500 italic">
            &ldquo;I&apos;m rich in experience, but I have nothing to show for it.&rdquo;
          </p>
          <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-gray-500 italic">
            &ldquo;Mastery isn&apos;t the point; gaining exposure is.&rdquo;
          </p>
        </div>
        <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-gray-600 mb-6">
          Current productivity apps are built to track &lsquo;finishing.&rsquo; They treat tasks
          like chores to be checked off instead of experiments to be celebrated. This gap makes
          even a small win — perfecting a new matcha recipe, folding 100 paper stars — feel like
          it never happened. Without a record, these achievements simply fade away.
        </p>
        <p className="text-[16px] leading-[1.8] tracking-[0.01em] font-semibold text-gray-900">
          Every &lsquo;Day 1&rsquo; deserves more than a checkmark. It needs a Record.
        </p>
      </div>

      {/* ── Main Stage — sticky phone + 3 alternating text sections ─────
           Desktop grid: [1fr] [400px phone] [1fr]
           Phone: col 2, rows 1-3, md:sticky top-0 h-screen.

           S02  col 3 (RIGHT)  MockupLab (static)   BUTTON 280px LEFT gutter
           S03  col 1 (LEFT)   MockupLab (static)   POPUP 300px RIGHT gutter
           S04  col 3 (RIGHT)  Lab → WC (done by 50% scroll)  —              ── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px_1fr] gap-x-10 items-start">

          {/* ══ STICKY PHONE — col 2, rows 1-3 ══════════════════════════ */}
          <div
            className="md:col-start-2 md:row-start-1 md:row-end-4 md:sticky top-0
                       flex items-center justify-center h-screen"
            style={{ zIndex: 10 }}
          >
            <div className="relative w-full max-w-[400px]">

              {/* MockupLab — static through S02 + S03, fades as S04 scrolls */}
              <img
                src={MockupRECLABLab}
                alt="RECLAB Lab screen"
                className="w-full h-auto object-contain"
                style={{ opacity: labOpacity }}
              />
              {/* MockupWinCollection — fades in across S04 */}
              <img
                src={MockupRECLABWinCollection}
                alt="RECLAB Win Collection"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ opacity: wcOpacity }}
              />

              {/* RECLAB_BUTTON — 280px, LEFT gutter, tied strictly to S02 */}
              <img
                src={RECLABButton}
                alt="RECLAB record button"
                style={{
                  position: 'absolute',
                  right: 'calc(100% + 36px)',
                  top: '50%',
                  width: '280px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))',
                  opacity: btnOpacity,
                  transform: `translateY(calc(-50% + ${btnTY}px))`,
                  pointerEvents: 'none',
                }}
              />

              {/* RECLAB_POPUP — 300px, RIGHT gutter, tied strictly to S03 */}
              <img
                src={RECLABPopup}
                alt="RECLAB randomizer popup"
                style={{
                  position: 'absolute',
                  left: 'calc(100% + 36px)',
                  top: '50%',
                  width: '300px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))',
                  opacity: popOpacity,
                  transform: `translateY(calc(-50% + ${popTY}px))`,
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* ══ S02 — col 3 (RIGHT), row 1 ═══════════════════════════════
               Phone: MockupLab (static). RECLAB_BUTTON LEFT gutter.      */}
          <section
            ref={sec2Ref}
            className="md:col-start-3 md:row-start-1 flex items-center py-16 min-h-[85vh]"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
                02 — The Solution
              </p>
              <h2 className="text-[28px] font-bold leading-[1.2] tracking-tight text-gray-900 mb-6">
                Don&apos;t just do it.<br />
                <span className="text-gray-400 font-normal">Hit REC.</span>
              </h2>
              <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-gray-600">
                RECLAB is a space designed for the Hobby Collector. Inspired by movie scientists
                recording experiments on old-school tapes, the app treats every curiosity as an
                experiment — replacing the pressure of mastering a skill with the joy of simply
                trying it.
              </p>
            </div>
          </section>

          {/* ══ S03 — col 1 (LEFT), row 2 ════════════════════════════════
               Phone: MockupLab (static). Single POPUP RIGHT gutter.       */}
          <section
            ref={sec3Ref}
            className="md:col-start-1 md:row-start-2 flex items-center py-16 min-h-[85vh]"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
                03 — The Randomizer
              </p>
              <h2 className="text-[28px] font-bold leading-[1.2] tracking-tight text-gray-900 mb-6">
                Too many options?<br />
                <span className="text-gray-400 font-normal">Let the Randomizer decide.</span>
              </h2>
              <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-gray-600">
                To solve Decision Paralysis, the &lsquo;Randomizer&rsquo; spins through the list
                of experiments to pick the next move. It turns an overwhelming list of choices
                into a fun, low-pressure start to a new adventure — making sure no small win ever
                fades away.
              </p>
            </div>
          </section>

          {/* ══ S04 — col 3 (RIGHT), row 3 ════════════════════════════════
               Phone: Lab → WinCollection blends as this section scrolls.  */}
          <section
            ref={sec4Ref}
            className="md:col-start-3 md:row-start-3 flex items-center py-16 min-h-[85vh]"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
                04 — The Impact
              </p>
              <h2 className="text-[28px] font-bold leading-[1.2] tracking-tight text-gray-900 mb-6">
                Success isn&apos;t about the finish line.
              </h2>
              <p className="text-[15px] leading-[1.9] tracking-[0.01em] text-gray-600 mb-6">
                RECLAB started as a challenge to digitize my &lsquo;Summer List&rsquo; — a
                collection I make every summer of random things I want to try just because.
                Building this app was one of the most enjoyable challenges I&apos;ve taken on.
                The next step is to get RECLAB into the hands of other Hobby Collectors, and see
                how they interact with the Lab — from the moment they hit REC to start a journey,
                to the moment they save it as a Win.
              </p>
              <p className="text-[16px] leading-[1.8] tracking-[0.01em] font-semibold text-gray-900">
                Ensuring that every &lsquo;just trying&rsquo; is a win worth a record.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

function CVContent({ uiTheme = 'light' }) {
  const T = contentTokens(uiTheme)
  const bulletDot = T.contentAccentBulletBefore
  const cvPdfHref = useMemo(
    () => `${import.meta.env.BASE_URL}assets/MayarAlquwayfili.pdf?v=${Date.now()}`,
    [],
  )
  return (
    <div
      className={`h-full overflow-y-auto font-sans ${T.surface} ${T.text} ${T.scrollRootThin} ${T.contentProse}`}
    >
      {/* Centered content column — expands with the window, overflow-safe */}
      <div className="mx-auto w-full max-w-[820px] min-w-0 overflow-x-hidden break-words px-8 pb-12 pt-10 sm:px-10 md:px-14 lg:px-16">

        {/* ── Header ── */}
        <header className="mb-6 pb-5">
          <h1 className="text-[20px] font-bold tracking-tight text-gray-900 sm:text-[23px] md:text-[26px]">
            Mayar Alquwayfili
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
            Riyadh&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="mailto:mf.alquwayfili@gmail.com" className="text-gray-500 transition-colors hover:text-gray-800 hover:underline underline-offset-2">mf.alquwayfili@gmail.com</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;054767478&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="https://github.com/MayarAlquwayfili" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-gray-800 hover:underline underline-offset-2">GitHub</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="https://www.linkedin.com/in/mayar-alquwayfili/" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-gray-800 hover:underline underline-offset-2">LinkedIn</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="https://www.behance.net/mayaralquway" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-gray-800 hover:underline underline-offset-2">Behance</a>
          </p>
        </header>

        {/* ── Profile ── */}
        <Section title="Profile">
          <p className="text-[13.5px] leading-7 text-gray-700">
            Economics senior &amp; Apple Developer Academy student. Bridging the gap between
            business strategy, UI/UX design, and iOS development to build highly impactful
            digital products.
          </p>
        </Section>

        {/* ── Apple Developer Academy (separate from university education) ── */}
        <Section title="Apple Developer Academy">
          <CVEntry
            bulletBeforeAccent={bulletDot}
            title="Apple Developer Academy at TUWAIQ"
            meta="Education Scholarship"
            date="2025 – Present"
          />
        </Section>

        {/* ── Education ── */}
        <Section title="Education">
          <CVEntry
            bulletBeforeAccent={bulletDot}
            title="Princess Nourah Bint Abdulrahman University"
            meta="Bachelor's degree, Economics"
            date="2022 – Present"
          />
        </Section>

        {/* ── Projects ── */}
        <Section title="Projects">
          <CVEntry
            bulletBeforeAccent={bulletDot}
            title="RECLAB App — Personal Project"
            meta="iOS Developer & Product Designer"
            date="Jan 2026 – Present"
            bullets={[
              'Developed an iOS personal-logging app for multipotentialites to document and track diverse experiments.',
              'Designed a clean, native card-based UI in Figma, turning the initial concept into a fully functional application.',
            ]}
          />
          <CVEntry
            bulletBeforeAccent={bulletDot}
            title="Qaffatek — Apple Developer Academy"
            titleHref="https://apps.apple.com/sa/app/%D9%82%D9%81%D8%B7%D8%AA%D9%83/id6757811186"
            meta="iOS Developer & Product Designer"
            date="Sep 2025 – Mar 2026"
            bullets={[
              'Launched an iOS game to the App Store, transforming a traditional paper game into a digital experience.',
              'Built with SwiftUI and MVVM architecture, implementing improvements based on beta user feedback.',
              'Designed a Figma interface for instant role assignment and focus on real-world interaction.',
            ]}
          />
          <CVEntry
            bulletBeforeAccent={bulletDot}
            title="Moheetik App — Apple Developer Academy"
            meta="Lead iOS Developer & UI/UX Designer"
            date="Nov 2025 – Jan 2026"
            bullets={[
              'Developed an assistive app for visually impaired users using real-time Arabic audio and haptic feedback.',
              'Engineered a custom Core ML model to detect doors and stairs, surpassing standard model limitations.',
              'Showcased the functional MVP at the Authority for People with Disability (APD) to validate the solution with users.',
            ]}
          />
          <CVEntry
            bulletBeforeAccent={bulletDot}
            title="Brewcha Studio — Entrepreneurship Project"
            meta="Product Manager & Designer"
            date="Sep 2025 – Nov 2025"
            bullets={[
              'Led the end-to-end development of a DIY beverage workshop, managing the strategic vision and final report coordination.',
              'Designed brand identity and Figma prototypes for packaging, stickers, and cards.',
              'Executed a live prototype workshop, directing team roles and operations to validate the business model through user feedback.',
            ]}
          />
          <CVEntry
            bulletBeforeAccent={bulletDot}
            title="Digital Payments Impact on Korean SMEs — Research"
            meta="Independent Researcher"
            date="Sep 2025 – Nov 2025"
            bullets={[
              'Analyzed 10 years of Korean macroeconomic data using R to measure SME survival rates.',
              'Developed Multiple Linear Regression and EFA models to evaluate financial trends.',
              'Identified that a hybrid payment ecosystem significantly reduces operational risks for small businesses during economic crises.',
            ]}
          />
        </Section>

        {/* ── Certifications ── */}
        <Section title="Certifications">
          <ul className="space-y-2 text-[13px] text-gray-700">
            <li className="flex items-baseline justify-between gap-4 leading-relaxed">
              <span>UX Design Virtual Work Experience (Foodics × Misk)</span>
              <span className="shrink-0 text-gray-400">Oct 2025</span>
            </li>
            <li className="flex items-baseline justify-between gap-4 leading-relaxed">
              <span>Introduction to Securities &amp; Investment (CME-1), CISI</span>
              <span className="shrink-0 text-gray-400">Aug 2025</span>
            </li>
            <li className="flex items-baseline justify-between gap-4 leading-relaxed">
              <a
                href="https://www.udacity.com/certificate/e/8f9e5572-e489-11ef-b41c-ab762a8ad8e8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline hover:text-gray-900 transition-colors"
              >
                BSF Intro to Financial Sustainability, Udacity
              </a>
              <span className="shrink-0 text-gray-400">Feb 2025</span>
            </li>
            <li className="flex items-baseline justify-between gap-4 leading-relaxed">
              <span>Data Fundamentals, IBM</span>
              <span className="shrink-0 text-gray-400">Oct 2024</span>
            </li>
          </ul>
        </Section>

        {/* ── Skills ── */}
        <Section title="Skills">
          <div className="space-y-2.5 text-[13px] leading-relaxed text-gray-700">
            {[
              ['Technical', 'Swift, SwiftUI, Core ML, MVVM Architecture, API, Git/GitHub, iOS Accessibility (VoiceOver, Dynamic Type), Cursor (AI-Assisted Development), TestFlight, App Store Connect.'],
              ['Design',    'Figma (Auto Layout, Components), Design Systems, Apple Human Interface Guidelines (HIG), User Flows, User Research (Interviews & Usability Testing), Developer Handoff, Inclusive Design.'],
              ['Product',   'Agile (Scrum), Design Thinking, Product Development (End-to-End), Business Analysis (BMC, MVP Strategy), Market & Competitive Analysis, Data Analysis & Visualization.'],
            ].map(([cat, items]) => (
              <p key={cat}>
                <span className="font-semibold text-gray-900">{cat}:&nbsp;</span>{items}
              </p>
            ))}
          </div>
        </Section>

        {/* ── Download button ── */}
        <div className="mt-10 flex justify-start border-t border-gray-100 pt-7">
          <a
            href={cvPdfHref}
            download="MayarAlquwayfili.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-gray-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>

      </div>
    </div>
  )
}

/* ── Resume sub-components ─────────────────────────────────────────────────── */

function Section({ title, children }) {
  return (
    <section className="mb-8 border-t border-gray-100 pt-6 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.13em] text-gray-400">
        {title}
      </h2>
      {children}
    </section>
  )
}

function CVEntry({ title, titleHref, meta, date, bullets, bulletBeforeAccent }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-baseline justify-between gap-4">
        {/* Title — optionally a link */}
        {titleHref ? (
          <a
            href={titleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-1.5 text-[13.5px] font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            {title}
            {/* external link icon */}
            <svg
              className="mb-[-1px] h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ) : (
          <p className="text-[13.5px] font-semibold text-gray-900">{title}</p>
        )}
        <span className="shrink-0 text-[12px] text-gray-400">{date}</span>
      </div>

      {/* Role / type — italic, lighter gray */}
      {meta && (
        <p className="mt-0.5 text-[12.5px] italic text-gray-400">{meta}</p>
      )}

      {/* Bullets */}
      {bullets && bullets.length > 0 && (
        <ul className="mt-2.5 space-y-1.5 pl-4">
          {bullets.map((b) => (
            <li
              key={b}
              className={`relative text-[13px] leading-7 text-gray-700
                         before:absolute before:left-[-13px] before:top-[0.65em]
                         before:h-[5px] before:w-[5px] before:rounded-full
                         ${bulletBeforeAccent ?? 'before:bg-gray-300'} before:content-['']`}
            >
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Per-title window presets: { w, h, centered }
const WINDOW_PRESETS = {
  'How to Work with Me': { w: 440, h: 560, centered: true },
  Lab: { w: 440, h: 400, centered: true },
  Qaffatek: { w: 1400, h: 750, centered: true },
  RECLAB: { w: 900, h: 750, centered: true },
  'cash-obsolete-research': { w: 1080, h: 800, centered: true },
  'Side B': { w: 960, h: 640, centered: true },
  SIDE_B_ALBUM: { w: 720, h: 520, centered: true },
  IMAGE_PREVIEW: { w: 820, h: 680, centered: true },
  NOTION_SLIDER: { w: 800, h: 620, centered: true },
}

function MacWindow({
  id: _id,
  title,
  zIndex,
  initialX,
  initialY,
  onClose,
  onMinimize,
  onFocus,
  openOrFocusWindow,
  variant = 'default',
  sideBAlbumKey,
  imagePreview,
  uiTheme = 'light',
}) {
  const chrome = windowChrome(uiTheme)

  const preset =
    variant === 'side-b-album'
      ? WINDOW_PRESETS.SIDE_B_ALBUM ?? {}
      : variant === 'image-preview'
        ? WINDOW_PRESETS.IMAGE_PREVIEW ?? {}
        : // TODO: REMOVE OR REUSE — notion-slider windows are disabled; keep branch for stale window records only.
          variant === 'notion-slider'
          ? WINDOW_PRESETS.NOTION_SLIDER ?? {}
          : WINDOW_PRESETS[title] ?? {}
  const { w: minW, h: minH } = minWindowSizeForTitle(title)
  const defaultW = preset.w ?? 700
  const defaultH = preset.h ?? 500
  const initialW = Math.max(minW, defaultW)
  const initialH = Math.max(minH, defaultH)

  const [position, setPosition] = useState(() => {
    if (preset.centered) {
      return {
        x: Math.max(0, Math.round((window.innerWidth  - initialW) / 2)),
        y: Math.max(28, Math.round((window.innerHeight - initialH) / 2)),
      }
    }
    return { x: initialX ?? 60, y: initialY ?? 48 }
  })
  const [size, setSize] = useState({ w: initialW, h: initialH })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [hoverZone, setHoverZone] = useState(null)

  const restoredRef = useRef({
    position: { x: 0, y: 0 },
    size: { w: initialW, h: initialH },
  })
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const resizeRef = useRef(null)

  const windowRef = useRef(null)

  const syncHoverZone = useCallback((e) => {
    if (!windowRef.current || isMaximized || isDragging || isResizing) {
      setHoverZone(null)
      return
    }
    const rect = windowRef.current.getBoundingClientRect()
    const z = getResizeZone(e.clientX, e.clientY, rect)
    setHoverZone(z)
  }, [isMaximized, isDragging, isResizing])

  useEffect(() => {
    if (!isDragging) return
    const onMouseMove = (e) => {
      const el = windowRef.current
      if (!el) return
      const w = el.offsetWidth
      const h = el.offsetHeight
      const maxX = Math.max(0, window.innerWidth - w)
      const maxY = Math.max(MENU_BAR_PX, window.innerHeight - h - DOCK_SAFE_PX)
      let nx = e.clientX - dragOffsetRef.current.x
      let ny = e.clientY - dragOffsetRef.current.y
      setPosition({
        x: Math.max(0, Math.min(nx, maxX)),
        y: Math.max(MENU_BAR_PX, Math.min(ny, maxY)),
      })
    }
    const onMouseUp = () => setIsDragging(false)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging])

  useEffect(() => {
    if (!isResizing || !resizeRef.current) return
    const { zone, startX, startY, startW, startH, startLeft, startTop } =
      resizeRef.current

    const onMouseMove = (e) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      let newW = startW
      let newH = startH
      let newL = startLeft
      let newT = startTop

      if (zone.includes('e')) newW = Math.max(minW, startW + dx)
      if (zone.includes('s')) newH = Math.max(minH, startH + dy)
      if (zone.includes('w')) {
        const propW = Math.max(minW, startW - dx)
        newL = startLeft + (startW - propW)
        newW = propW
      }
      if (zone.includes('n')) {
        const propH = Math.max(minH, startH - dy)
        newT = startTop + (startH - propH)
        newH = propH
      }
      if (newL < 0) {
        newW += newL
        newL = 0
      }
      if (newT < MENU_BAR_PX) {
        newH += newT - MENU_BAR_PX
        newT = MENU_BAR_PX
      }
      if (newL + newW > window.innerWidth) newW = window.innerWidth - newL
      if (newT + newH > window.innerHeight - DOCK_SAFE_PX) newH = window.innerHeight - DOCK_SAFE_PX - newT

      newW = Math.max(minW, newW)
      newH = Math.max(minH, newH)

      setPosition({ x: newL, y: newT })
      setSize({ w: newW, h: newH })
    }

    const onMouseUp = () => {
      setIsResizing(false)
      resizeRef.current = null
      setHoverZone(null)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isResizing, minW, minH])

  const onTitleBarMouseDown = (e) => {
    onFocus?.()
    if (e.button !== 0 || isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    const el = windowRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setIsDragging(true)
  }

  const onShellMouseDown = (e) => {
    onFocus?.()
    if (e.button !== 0 || isMaximized) return
    if (e.target.closest('[data-titlebar]')) return
    const el = windowRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const zone = getResizeZone(e.clientX, e.clientY, rect)
    if (!zone) return
    e.preventDefault()
    e.stopPropagation()
    resizeRef.current = {
      zone,
      startX: e.clientX,
      startY: e.clientY,
      startW: rect.width,
      startH: rect.height,
      startLeft: rect.left,
      startTop: rect.top,
    }
    setIsResizing(true)
  }

  const toggleMaximize = () => {
    if (isMaximized) {
      const { position: p, size: s } = restoredRef.current
      setPosition(p)
      setSize({ w: Math.max(minW, s.w), h: Math.max(minH, s.h) })
      setIsMaximized(false)
    } else {
      restoredRef.current = {
        position: { ...position },
        size: { ...size },
      }
      setPosition({ x: 0, y: MENU_BAR_PX })
      setSize({
        w: window.innerWidth,
        h: window.innerHeight - MENU_BAR_PX,
      })
      setIsMaximized(true)
      setHoverZone(null)
    }
  }

  const shellCursor =
    !isMaximized && hoverZone && !isDragging && !isResizing
      ? RESIZE_CURSORS[hoverZone]
      : undefined

  const windowStyle = isMaximized
    ? {
        left: 0,
        top: MENU_BAR_PX,
        width: '100vw',
        height: `calc(100vh - ${MENU_BAR_PX}px)`,
        zIndex,
      }
    : {
        left: position.x,
        top: position.y,
        width: size.w,
        height: size.h,
        cursor: shellCursor,
        zIndex,
      }

  return (
    <div
      ref={windowRef}
      className={`fixed flex flex-col overflow-hidden font-sans ${chrome.shell} ${
        isMaximized ? 'rounded-none border-t-0' : 'rounded-xl'
      }`}
      style={windowStyle}
      role="dialog"
      aria-labelledby="mac-window-title"
      aria-modal="true"
      onMouseMove={syncHoverZone}
      onMouseLeave={() => !isResizing && setHoverZone(null)}
      onMouseDown={onShellMouseDown}
    >
      <div
        data-titlebar
        className={`relative flex h-11 shrink-0 select-none items-center px-4 ${chrome.titleBar} ${
          isMaximized
            ? 'cursor-default'
            : isDragging
            ? 'cursor-grabbing'
            : 'cursor-grab active:cursor-grabbing'
        }`}
        style={shellCursor ? { cursor: shellCursor } : undefined}
        onMouseDown={onTitleBarMouseDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[7px]">
          <button
            type="button"
            aria-label="Close window"
            className="h-3 w-3 cursor-pointer rounded-full bg-[#ff5f56] transition-opacity hover:opacity-80"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onClose}
          />
          <button
            type="button"
            aria-label="Minimize window"
            className={`h-3 w-3 rounded-full bg-[#ffbd2e] transition-opacity ${
              onMinimize ? 'cursor-pointer hover:opacity-80' : 'cursor-default opacity-90'
            }`}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => onMinimize?.()}
            disabled={!onMinimize}
          />
          <button
            type="button"
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
            className="h-3 w-3 cursor-pointer rounded-full bg-[#27c93f] transition-opacity hover:opacity-80"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={toggleMaximize}
          />
        </div>

        {/* Title intentionally omitted — shown in sidebar */}
      </div>

      <div
        className={`min-h-0 flex-1 overflow-hidden ${
          variant === 'image-preview' ? chrome.bodyImagePreview : chrome.body
        }`}
      >
        {variant === 'image-preview' && imagePreview ? (
          <ImagePreviewContent {...imagePreview} uiTheme={uiTheme} />
        ) : variant === 'side-b-album' && sideBAlbumKey ? (
          <SideBAlbumContent
            uiTheme={uiTheme}
            projectKey={sideBAlbumKey}
            onOpenPreview={(item) =>
              openOrFocusWindow({
                id: `side-b-preview-${sideBAlbumKey}-${item.id}`,
                title: item.caption ?? 'Preview',
                variant: 'image-preview',
                imagePreview: {
                  caption: item.caption,
                  placeholder: item.placeholder,
                  src: item.src,
                  alt: item.caption,
                },
              })
            }
          />
        ) : title === 'Moheetik' ? (
          <MoheetikSplitContent uiTheme={uiTheme} />
        ) : title === 'RECLAB' ? (
          <RECLABContent uiTheme={uiTheme} />
        ) : title === 'Qaffatek' ? (
          <QaffatekContent uiTheme={uiTheme} />
        ) : title === 'Lab' ? (
          <CreativeLabFolderContent uiTheme={uiTheme} onOpenProject={openOrFocusWindow} />
        ) : title === 'cash-obsolete-research' ? (
          <CashResearchContent uiTheme={uiTheme} />
        ) : title === 'Side B' ? (
          <SideBFolderContent uiTheme={uiTheme} />
        ) : title === 'Brewcha' ? (
          <BrewchaContent uiTheme={uiTheme} />
        ) : title === 'Preview — Mayar_CV.pdf' ? (
          <CVContent uiTheme={uiTheme} />
        ) : variant === 'notion-slider' ? (
          <>
            {/* TODO: REMOVE OR REUSE — was <NotionSliderContent />; Notion folder is static (no window). */}
          </>
        ) : title === 'How to Work with Me' ? (
          <HowToWorkContent uiTheme={uiTheme} />
        ) : (
          <div
            className={`p-6 text-sm ${uiTheme === 'dark' ? 'text-[#F9F9F7]/75' : 'text-gray-600'}`}
          >
            <p className={`font-medium ${uiTheme === 'dark' ? 'text-[#F9F9F7]' : 'text-gray-800'}`}>
              {title}
            </p>
          </div>
        )}
      </div>

      {/* SE corner resize handle — above in-window content (e.g. z-20 media) so it always receives pointer events */}
      {!isMaximized && (
        <div
          aria-hidden
          className="pointer-events-auto absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
          style={{ zIndex: 30 }}
          onMouseDown={(e) => {
            onFocus?.()
            if (e.button !== 0) return
            e.preventDefault()
            e.stopPropagation()
            const rect = windowRef.current.getBoundingClientRect()
            resizeRef.current = {
              zone: 'se',
              startX: e.clientX,
              startY: e.clientY,
              startW: rect.width,
              startH: rect.height,
              startLeft: rect.left,
              startTop: rect.top,
            }
            setIsResizing(true)
          }}
        />
      )}
    </div>
  )
}

function DraggableFolder({
  id,
  title,
  icon,
  subtitle,
  cursorTipLabel,
  initialX,
  initialY,
  isSelected,
  onSelect,
  onDoubleClick,
  onPositionChange,
  uiTheme = 'light',
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isDragging, setIsDragging] = useState(false)

  const rootRef = useRef(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const lastPositionRef = useRef({ x: initialX, y: initialY })
  const [propsAnchor, setPropsAnchor] = useState({ x: initialX, y: initialY })
  if (propsAnchor.x !== initialX || propsAnchor.y !== initialY) {
    setPropsAnchor({ x: initialX, y: initialY })
    setPosition({ x: initialX, y: initialY })
  }

  useLayoutEffect(() => {
    lastPositionRef.current = position
  }, [position])

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e) => {
      const el = rootRef.current
      if (!el) return
      const parent = el.parentElement
      if (!parent) return

      const pr = parent.getBoundingClientRect()
      const itemW = el.offsetWidth
      const itemH = el.offsetHeight
      const off = dragOffsetRef.current

      let nx = e.clientX - pr.left - off.x
      let ny = e.clientY - pr.top - off.y

      const maxX = Math.max(0, window.innerWidth - pr.left - itemW)
      const maxY = Math.max(0, pr.height - itemH)

      const newPos = {
        x: Math.max(0, Math.min(nx, maxX)),
        y: Math.max(0, Math.min(ny, maxY)),
      }
      lastPositionRef.current = newPos
      setPosition(newPos)
    }

    const onMouseUp = () => {
      setIsDragging(false)
      onPositionChange?.(lastPositionRef.current)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging, onPositionChange])

  const onMouseDown = (e) => {
    if (e.button !== 0) return
    e.stopPropagation()
    onSelect()

    const el = rootRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const off = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    dragOffsetRef.current = off
    setIsDragging(true)
  }

  const onClick = (e) => {
    e.stopPropagation()
  }

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    onDoubleClick()
  }

  const titleColor =
    isSelected ? 'text-[#23262D]' : uiTheme === 'dark' ? 'text-[#F9F9F7]' : 'text-[#23262D]'
  const subColor = isSelected
    ? 'text-[#23262D]/80'
    : uiTheme === 'dark'
      ? 'text-[#F9F9F7]/70'
      : 'text-[#23262D]/70'

  return (
    <AdminFolderCursorTip
      ref={rootRef}
      label={cursorTipLabel}
      uiTheme={uiTheme}
      aria-label={`Folder ${id}: ${title}`}
      wrapperClassName={`absolute ${DESKTOP_ITEM_FRAME_BASE} ${
        !isDragging ? DESKTOP_ITEM_FRAME_IDLE_TRANSITION : ''
      } cursor-grab select-none active:cursor-grabbing ${desktopItemSelectionClass(
        isSelected,
      )}`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="box-border flex h-[72px] w-[72px] shrink-0 items-center justify-center p-1">
        <img
          src={icon ?? FolderIcon}
          className="h-16 w-16 shrink-0"
          alt=""
          draggable={false}
        />
      </div>

      <div className="flex min-h-0 w-full flex-col items-center justify-center px-0.5 text-center">
        <span
          className={`line-clamp-2 w-full break-words text-[12px] font-medium leading-tight tracking-wide ${titleColor}`}
        >
          {title}
        </span>
        {subtitle ? (
          <span className={`mt-0.5 w-full break-words text-[11px] leading-snug ${subColor}`}>
            {subtitle}
          </span>
        ) : null}
      </div>
    </AdminFolderCursorTip>
  )
}

/** Random spawn for first-time visitors; folder ~132×128px, respects menu + dock. */
function randomFolderPosInBounds() {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const FOLDER_W = 132
  const FOLDER_H = 128
  const MARGIN = 16
  const minX = MARGIN
  const maxX = Math.max(minX, vw - FOLDER_W - MARGIN)
  const minY = MENU_BAR_PX + MARGIN
  const maxY = Math.max(minY, vh - DOCK_SAFE_PX - FOLDER_H - MARGIN)
  const x = minX + Math.floor(Math.random() * (maxX - minX + 1))
  const y = minY + Math.floor(Math.random() * (maxY - minY + 1))
  return { x, y }
}

const LS_KEY = 'mayaros-folder-positions'
const LS_UI_THEME = 'mayaros-ui-theme'

function loadLayout() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw == null) return null
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : null
  } catch {
    return null
  }
}

function defaultAdminNotionPos() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200
  return { x: Math.max(16, w - 140), y: 96 }
}

function defaultAdminV60Pos() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200
  return { x: Math.max(16, w - 140), y: 240 }
}

function defaultAdminFigmaPos() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200
  return { x: Math.max(16, w - 140), y: 384 }
}

function defaultIdentityStickerPos() {
  return { x: 24, y: MENU_BAR_PX + 16 }
}

function getInitialFolderPositions() {
  const saved = loadLayout()
  const result = {}
  const hasFolderData =
    saved &&
    DESKTOP_FOLDERS.some(
      (f) =>
        saved[f.id] &&
        typeof saved[f.id].x === 'number' &&
        typeof saved[f.id].y === 'number',
    )

  if (!hasFolderData) {
    DESKTOP_FOLDERS.forEach((f) => {
      result[f.id] = saved?.[f.id] ?? randomFolderPosInBounds()
    })
    try {
      const cur = saved && typeof saved === 'object' ? { ...saved } : {}
      DESKTOP_FOLDERS.forEach((f) => {
        cur[f.id] = result[f.id]
      })
      localStorage.setItem(LS_KEY, JSON.stringify(cur))
    } catch {
      /* skip persist if storage unavailable */
    }
    return result
  }
  DESKTOP_FOLDERS.forEach((f) => {
    result[f.id] = saved[f.id] ?? { x: f.x, y: f.y }
  })
  return result
}

function getInitialAdminLayout() {
  const saved = loadLayout()
  return {
    notion: saved?.['admin-notion'] ?? defaultAdminNotionPos(),
    v60: saved?.['admin-v60'] ?? defaultAdminV60Pos(),
    figma: saved?.['admin-figma'] ?? defaultAdminFigmaPos(),
    identitySticker: saved?.['identity-sticker'] ?? defaultIdentityStickerPos(),
  }
}

function formatNotifBody(body) {
  const parts = String(body).split(/(Admin)/g)
  return parts.map((part, idx) => <span key={idx}>{part}</span>)
}

function loadPersistedUiTheme() {
  try {
    const t = localStorage.getItem(LS_UI_THEME)
    if (t === 'dark' || t === 'light') return t
  } catch {
    /* ignore */
  }
  return 'light'
}

export default function App() {
  const [uiTheme, setUiTheme] = useState(() =>
    typeof window !== 'undefined' ? loadPersistedUiTheme() : 'light',
  )
  const [selectedDesktopItemId, setSelectedDesktopItemId] = useState(null)
  const { openWindows, openOrFocusWindow, bringToFront, minimizeWindow, closeWindow } =
    useWindowManager()
  const [folderPositions, setFolderPositions] = useState(() => getInitialFolderPositions())
  const [adminLayout, setAdminLayout] = useState(() => getInitialAdminLayout())

  // ─── Admin login flow ─────────────────────────────────────────────────────
  // TODO: UNCOMMENT FOR PRODUCTION
  // const [adminFlow, setAdminFlow] = useState(() => loadPersistedAdminFlow()) // idle → triggering_notifications → waiting_accept → loading → accepted
  const [adminFlow, setAdminFlow] = useState('idle') // idle → triggering_notifications → waiting_accept → loading → accepted
  const [adminNotifs, setAdminNotifs] = useState([])
  const timeoutsRef = useRef([])

  const clearAdminTimers = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t))
    timeoutsRef.current = []
  }, [])

  useEffect(() => {
    return () => clearAdminTimers()
  }, [clearAdminTimers])

  useEffect(() => {
    if (adminFlow !== 'triggering_notifications') return

    clearAdminTimers()

    const push = (notif) => {
      setAdminNotifs((prev) => [
        ...prev,
        {
          id: notif.id,
          header: notif.header,
          body: notif.body,
          isActionable: !!notif.isActionable,
        },
      ])
    }

    queueMicrotask(() => {
      setAdminNotifs([
        {
          id: 'n1',
          header: 'System',
          body: 'Admin: Mayar logged in.',
        },
      ])

      timeoutsRef.current.push(
        setTimeout(() => {
          push({
            id: 'n2',
            header: 'System',
            body: 'Welcome to my OS.',
          })
        }, 1000),
      )

      timeoutsRef.current.push(
        setTimeout(() => {
          push({
            id: 'n3',
            header: 'Screen Sharing',
            body: 'Admin (Mayar) would like to share "Admin_Desktop" with you.',
            isActionable: true,
          })
          setAdminFlow('waiting_accept')
        }, 2500),
      )
    })
  }, [adminFlow, clearAdminTimers])

  useEffect(() => {
    if (adminFlow !== 'accepted') return
    const t = setTimeout(() => setAdminNotifs([]), 350)
    return () => clearTimeout(t)
  }, [adminFlow])

  // TODO: UNCOMMENT FOR PRODUCTION
  // useEffect(() => {
  //   try {
  //     if (adminFlow === 'accepted') {
  //       // TODO: UNCOMMENT FOR PRODUCTION
  //       // localStorage.setItem(LS_ADMIN_STATUS, 'accepted')
  //     }
  //   } catch {
  //     /* ignore */
  //   }
  // }, [adminFlow])

  const persistLayoutPatch = useCallback((patch) => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      const cur = raw ? JSON.parse(raw) : {}
      Object.assign(cur, patch)
      localStorage.setItem(LS_KEY, JSON.stringify(cur))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LS_UI_THEME, uiTheme)
    } catch {
      /* ignore */
    }
  }, [uiTheme])

  const toggleUiTheme = useCallback(() => {
    setUiTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const handleFolderPositionChange = useCallback(
    (id, pos) => {
      setFolderPositions((p) => ({ ...p, [id]: pos }))
      persistLayoutPatch({ [id]: pos })
    },
    [persistLayoutPatch],
  )

  const handleAdminNotionPos = useCallback(
    (pos) => {
      setAdminLayout((a) => ({ ...a, notion: pos }))
      persistLayoutPatch({ 'admin-notion': pos })
    },
    [persistLayoutPatch],
  )

  const handleAdminV60Pos = useCallback(
    (pos) => {
      setAdminLayout((a) => ({ ...a, v60: pos }))
      persistLayoutPatch({ 'admin-v60': pos })
    },
    [persistLayoutPatch],
  )

  const handleAdminFigmaPos = useCallback(
    (pos) => {
      setAdminLayout((a) => ({ ...a, figma: pos }))
      persistLayoutPatch({ 'admin-figma': pos })
    },
    [persistLayoutPatch],
  )

  const handleIdentityStickerPos = useCallback(
    (pos) => {
      setAdminLayout((a) => ({ ...a, identitySticker: pos }))
      persistLayoutPatch({ 'identity-sticker': pos })
    },
    [persistLayoutPatch],
  )

  if (isMobile) {
    return <MobileEmptyState uiTheme={uiTheme} />
  }

  return (
    <div
      className={`fixed inset-0 min-h-0 w-full overflow-hidden font-sans antialiased ${
        uiTheme === 'dark' ? 'bg-[#23262D] text-[#F9F9F7]' : 'bg-[#F9F9F7] text-[#23262D]'
      }`}
    >
      <TopStatusBar theme={uiTheme} onToggleTheme={toggleUiTheme} />

      <main
        className="absolute inset-x-0 bottom-0 top-7 z-0 overflow-hidden"
        onClick={() => setSelectedDesktopItemId(null)}
      >
        <DraggableDesktopItem
          initialX={adminLayout.identitySticker.x}
          initialY={adminLayout.identitySticker.y}
          onPositionChange={handleIdentityStickerPos}
          onCleanClick={
            adminFlow === 'idle' ? () => setAdminFlow('triggering_notifications') : undefined
          }
          onInteract={() => setSelectedDesktopItemId(null)}
          className="z-[1] cursor-pointer active:cursor-grabbing"
          draggingClassName="cursor-grabbing"
        >
          <div
            role="button"
            tabIndex={0}
            aria-label="Name tag: Mayar Alquwayfili. Click to verify identity and open the workspace invitation."
            onKeyDown={(e) => {
              if (e.key !== 'Enter' && e.key !== ' ') return
              e.preventDefault()
              if (adminFlow !== 'idle') return
              setAdminFlow('triggering_notifications')
            }}
          >
            <IdentityNameSticker uiTheme={uiTheme} />
          </div>
        </DraggableDesktopItem>

        {adminFlow === 'accepted' && (
          <>
            <DraggableDesktopItem
              initialX={adminLayout.notion.x}
              initialY={adminLayout.notion.y}
              onPositionChange={handleAdminNotionPos}
              className="z-[1] cursor-grab active:cursor-grabbing"
              draggingClassName="cursor-grabbing"
            >
              <AdminFolderCursorTip label="it's all documented." uiTheme={uiTheme}>
                <div
                  className={`${DESKTOP_ITEM_FRAME_BASE} ${DESKTOP_ITEM_FRAME_IDLE_TRANSITION} border-transparent bg-transparent`}
                  role="presentation"
                  onDoubleClick={(e) => e.stopPropagation()}
                >
                  <div className="box-border flex h-[72px] w-[72px] shrink-0 items-center justify-center p-1">
                    <img
                      src={NotionFolderIcon}
                      alt=""
                      draggable={false}
                      className="h-16 w-16 shrink-0 object-contain"
                    />
                  </div>
                  <div className="flex min-h-[36px] w-full flex-col items-center justify-center px-0.5 text-center">
                    <span
                      className={`line-clamp-2 w-full break-words text-[12px] font-medium leading-tight tracking-wide ${
                        uiTheme === 'dark' ? 'text-[#F9F9F7]' : 'text-[#23262D]'
                      }`}
                    >
                      Notion
                    </span>
                  </div>
                </div>
              </AdminFolderCursorTip>
            </DraggableDesktopItem>

            <DraggableDesktopItem
              initialX={adminLayout.v60.x}
              initialY={adminLayout.v60.y}
              onPositionChange={handleAdminV60Pos}
              className="z-[1] cursor-grab active:cursor-grabbing"
              draggingClassName="cursor-grabbing"
            >
              <AdminFolderCursorTip label="trust the process." uiTheme={uiTheme}>
                <div
                  className={`${DESKTOP_ITEM_FRAME_BASE} ${DESKTOP_ITEM_FRAME_IDLE_TRANSITION} border-transparent bg-transparent`}
                  role="presentation"
                  onDoubleClick={(e) => e.stopPropagation()}
                >
                  <div className="box-border flex h-[72px] w-[72px] shrink-0 items-center justify-center p-1">
                    <img
                      src={V60FolderIcon}
                      alt=""
                      draggable={false}
                      className="h-16 w-16 shrink-0 object-contain"
                    />
                  </div>
                  <div className="flex min-h-[36px] w-full flex-col items-center justify-center px-0.5 text-center">
                    <span
                      className={`line-clamp-2 w-full break-words text-[12px] font-medium leading-tight tracking-wide ${
                        uiTheme === 'dark' ? 'text-[#F9F9F7]' : 'text-[#23262D]'
                      }`}
                    >
                      Coffee
                    </span>
                  </div>
                </div>
              </AdminFolderCursorTip>
            </DraggableDesktopItem>

            <DraggableDesktopItem
              initialX={adminLayout.figma.x}
              initialY={adminLayout.figma.y}
              onPositionChange={handleAdminFigmaPos}
              className="z-[1] cursor-grab active:cursor-grabbing"
              draggingClassName="cursor-grabbing"
            >
              <AdminFolderCursorTip label="pixel-perfect." uiTheme={uiTheme}>
                <div
                  className={`${DESKTOP_ITEM_FRAME_BASE} ${DESKTOP_ITEM_FRAME_IDLE_TRANSITION} border-transparent bg-transparent`}
                  role="presentation"
                  onDoubleClick={(e) => e.stopPropagation()}
                >
                  <div className="box-border flex h-[72px] w-[72px] shrink-0 items-center justify-center p-1">
                    <img
                      src={FigmaFolderIcon}
                      alt=""
                      draggable={false}
                      className="h-16 w-16 shrink-0 object-contain"
                    />
                  </div>
                  <div className="flex min-h-[36px] w-full flex-col items-center justify-center px-0.5 text-center">
                    <span
                      className={`line-clamp-2 w-full break-words text-[12px] font-medium leading-tight tracking-wide ${
                        uiTheme === 'dark' ? 'text-[#F9F9F7]' : 'text-[#23262D]'
                      }`}
                    >
                      Figma
                    </span>
                  </div>
                </div>
              </AdminFolderCursorTip>
            </DraggableDesktopItem>
          </>
        )}

        {DESKTOP_FOLDERS.map((folder) => (
          <DraggableFolder
            key={folder.id}
            id={folder.id}
            title={folder.title}
            icon={folder.icon}
            subtitle={folder.subtitle}
            cursorTipLabel={folder.cursorTipLabel}
            initialX={folderPositions[folder.id]?.x ?? folder.x}
            initialY={folderPositions[folder.id]?.y ?? folder.y}
            isSelected={selectedDesktopItemId === folder.id}
            onSelect={() => setSelectedDesktopItemId(folder.id)}
            onDoubleClick={() => openOrFocusWindow(folder.windowTitle ?? folder.title)}
            onPositionChange={(pos) => handleFolderPositionChange(folder.id, pos)}
            uiTheme={uiTheme}
          />
        ))}
        {openWindows
          .filter((w) => !w.minimized)
          .map((win) => (
            <MacWindow
              key={win.id}
              id={win.id}
              title={win.title}
              zIndex={win.zIndex}
              initialX={win.initialX}
              initialY={win.initialY}
              variant={win.variant}
              sideBAlbumKey={win.sideBAlbumKey}
              imagePreview={win.imagePreview}
              uiTheme={uiTheme}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => bringToFront(win.id)}
              openOrFocusWindow={openOrFocusWindow}
            />
          ))}
      </main>

      <AdminNotifications
        uiTheme={uiTheme}
        items={adminNotifs}
        adminFlow={adminFlow}
        formatBody={formatNotifBody}
        onAccept={() => {
          if (adminFlow !== 'waiting_accept') return
          setAdminFlow('loading')
          clearAdminTimers()
          const t = setTimeout(() => {
            setAdminFlow('accepted')
            // After Accept SFX + loading beat: open Manual only for this explicit session completion (not on refresh).
            requestAnimationFrame(() => {
              openOrFocusWindow('How to Work with Me')
            })
          }, 2000)
          timeoutsRef.current.push(t)
        }}
      />

      <Dock uiTheme={uiTheme} openWindows={openWindows} onOpen={openOrFocusWindow} />
    </div>
  )
}
