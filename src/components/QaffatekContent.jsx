import { useState, useRef, useCallback, useLayoutEffect } from 'react'
import AppIconQaffatek from '../assets/AppIconQaffatek.svg'
import QaffatekLogo   from '../assets/Qaffatek/LOGO.svg'
import MockupQsecret  from '../assets/Qaffatek/MockupQsecret.svg'
import MockupWeld     from '../assets/Qaffatek/MockupWeld.svg'
import MockupBint     from '../assets/Qaffatek/MockupBint.svg'
import MockupAjouz    from '../assets/Qaffatek/MockupAjouz.svg'
import MockupTime     from '../assets/Qaffatek/MockupTime.svg'

import { contentTokens } from '../utils/windowContentTheme'

const Q_PURPLE = '#7B3FF2'
const Q_ORANGE = '#FF6B2B'
const Q_GREEN  = '#10B981'

const META_KEY = 'text-[10px] font-medium uppercase tracking-[0.09em] text-gray-400 mb-1'
const META_VAL = 'text-[13px] font-medium text-gray-900'

const BODY_CLS = 'text-[15px] leading-[1.8] tracking-[0.01em] text-gray-600'

const TOOLS = [
  'Swift',
  'SwiftUI',
  'AVFoundation',
  'Xcode',
  'Figma',
  'App Store Connect',
  'TestFlight',
]

export default function QaffatekContent({ uiTheme = 'light' }) {
  const T = contentTokens(uiTheme)
  const scrollRef = useRef(null)

  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const dockMotionClass = reduceMotion
    ? 'transition-transform duration-200 ease-out'
    : 'transition-transform duration-[1500ms] ease-in-out'

  const mockupOpacityClass = reduceMotion
    ? 'transition-none'
    : 'transition-[opacity] duration-[520ms] ease-out'

  // ── Section refs (only sections that drive transitions / button need refs) ──
  const solutionRef = useRef(null) // 02. The Solution (starts sticky phone)
  const visualIdRef = useRef(null) // 02.1 Visual Identity (must fully hide phone)
  const bridgeRef   = useRef(null) // 03. The Bridge
  const weldRef     = useRef(null) // 04. The Weld
  const bintRef     = useRef(null) // 05. The Bint
  const ajouzRef    = useRef(null) // 06. The Ajouz
  const vibeRef     = useRef(null) // 07. The Vibe & Testing → drives Ajouz→Time
  const impactRef   = useRef(null) // 08. The Impact (in-grid, keep phone visible)

  // ── Scroll-driven state ──────────────────────────────────────────────────
  const [visualRP,       setVisualRP]       = useState(0) // read-progress for 02.1 (logo + phone suppression)
  const [phoneInP,       setPhoneInP]       = useState(0) // starts fading in at 02 (Solution)
  const [weldRP,         setWeldRP]         = useState(0)
  const [secretToWeldP,  setSecretToWeldP]  = useState(0)
  const [weldToBintP,    setWeldToBintP]    = useState(0)
  const [bintToAjouzP,   setBintToAjouzP]   = useState(0)
  const [ajouzToTimeP,   setAjouzToTimeP]   = useState(0)
  const [secretNarrativeFade, setSecretNarrativeFade] = useState(1)
  const [phoneEndFade,   setPhoneEndFade]   = useState(1)

  /** Scroll-derived lane / intersection state — updated in handleScroll, not read from refs during render. */
  const [visualEnterBlend, setVisualEnterBlend] = useState(0)
  const [ixVisual, setIxVisual] = useState(false)
  const [ixBridge, setIxBridge] = useState(false)
  const [ixImpact, setIxImpact] = useState(false)
  const [ixSolution, setIxSolution] = useState(false)
  const [solutionVisAmt, setSolutionVisAmt] = useState(0)

  // ── Helpers ──────────────────────────────────────────────────────────────

  // readProgress: 0 = entering from bottom, 0.5 = centred, 1 = exiting from top
  const readProgress = useCallback((ref) => {
    const c = scrollRef.current
    const el = ref.current
    if (!c || !el) return 0
    const cR = c.getBoundingClientRect()
    const eR = el.getBoundingClientRect()
    const elCenter = eR.top + eR.height / 2 - cR.top
    return Math.min(1, Math.max(0, 1 - elCenter / cR.height))
  }, [])

  // sectionVisible: 0 when section-top == viewport-bottom, rises as section scrolls up
  const sectionVisible = useCallback((ref) => {
    const c = scrollRef.current
    const el = ref.current
    if (!c || !el) return 0
    const cR = c.getBoundingClientRect()
    const eR = el.getBoundingClientRect()
    return Math.min(1, Math.max(0, (cR.bottom - eR.top) / cR.height))
  }, [])

  // isIntersecting: true if any part of the section is within the scroll viewport.
  // This avoids reverse-scroll glitches where sectionVisible() clamps to 1.
  const isIntersecting = useCallback((ref) => {
    const c = scrollRef.current
    const el = ref.current
    if (!c || !el) return false
    const cR = c.getBoundingClientRect()
    const eR = el.getBoundingClientRect()
    return eR.bottom > cR.top && eR.top < cR.bottom
  }, [])

  /** Smooth 0→1 curve (Apple-like crossfade driver, independent of CSS transition). */
  const smooth01 = (t) => {
    const x = Math.min(1, Math.max(0, t))
    return x * x * (3 - 2 * x)
  }

  /**
   * 0→1 as the section’s vertical center crosses `anchorFraction` of the scroll viewport (0 = top, 1 = bottom).
   * 0.5 = legacy center snap; higher = completes while the block is still lower on screen (earlier in the read).
   */
  const handoffProgress = useCallback((ref, anchorFraction) => {
    const c = scrollRef.current
    const el = ref?.current
    if (!c || !el) return 0
    const cR = c.getBoundingClientRect()
    const eR = el.getBoundingClientRect()
    const vAnchor = cR.top + cR.height * anchorFraction
    const eMid = (eR.top + eR.bottom) / 2
    const band = Math.max(48, cR.height * 0.038)
    const t = (vAnchor - eMid + band) / band
    return Math.min(1, Math.max(0, t))
  }, [])

  const handleScroll = useCallback(() => {
    setVisualRP(readProgress(visualIdRef))

    // Phone starts at 02 (Solution). (01 is standalone above the stage.)
    setPhoneInP(Math.min(1, Math.max(0, sectionVisible(solutionRef)) * 1.25))

    const wVis = sectionVisible(weldRef)
    setWeldRP(wVis)

    // Weld: full by lower-third read (anchor 2/3); Bint/Ajouz: viewport center; Vibe→Time: earlier than center.
    setSecretToWeldP(handoffProgress(weldRef, 2 / 3))
    setWeldToBintP(handoffProgress(bintRef, 0.5))
    setBintToAjouzP(handoffProgress(ajouzRef, 0.5))
    setAjouzToTimeP(handoffProgress(vibeRef, 0.68))

    // Secret: start fading as soon as 02 enters; graceful curve across ~40% of solution read-progress span.
    const solRP = readProgress(solutionRef)
    const solVis = sectionVisible(solutionRef)
    const pace01 = Math.min(
      1,
      Math.max(0, (solRP * 0.95 + solVis * 0.22) / 0.4),
    )
    setSecretNarrativeFade(1 - smooth01(pace01))

    const impactVis = sectionVisible(impactRef)
    const pef = 1 - Math.min(1, Math.max(0, (impactVis - 0.05) / 0.4))
    setPhoneEndFade(pef)

    setVisualEnterBlend(
      Math.min(1, Math.max(0, (sectionVisible(visualIdRef) - 0.02) * 1.25)),
    )
    setIxVisual(isIntersecting(visualIdRef))
    setIxBridge(isIntersecting(bridgeRef))
    setIxImpact(isIntersecting(impactRef))
    setIxSolution(isIntersecting(solutionRef))
    setSolutionVisAmt(sectionVisible(solutionRef))
  }, [readProgress, sectionVisible, isIntersecting, handoffProgress])

  useLayoutEffect(() => {
    handleScroll()
  }, [handleScroll])

  // ── Bell-curve for floating elements ────────────────────────────────────
  // bell(p) = sin(p·π)^6 : 0 at entry, peaks at centre, 0 at exit
  const bell    = (p) => Math.pow(Math.sin(p * Math.PI), 6)
  const floatTY = (p) => (0.5 - p) * 72   // ±36 px cinematic drift

  // Visual Identity section: logo follows a bell curve.
  const visualIdentityMask = 1 - bell(visualRP)

  const qsecretExitMask = 1 - visualEnterBlend

  // ── Mockup opacities (cascading cross-fade) ──────────────────────────────
  const secretOpacity =
    (1 - secretToWeldP) * phoneInP * qsecretExitMask * secretNarrativeFade * phoneEndFade
  const weldOpacity =
    (secretToWeldP * (1 - weldToBintP)) * phoneInP * visualIdentityMask * phoneEndFade
  const weldOpacityFinal = weldRP <= 0 ? 0 : weldOpacity
  const bintOpacity =
    (weldToBintP * (1 - bintToAjouzP)) * phoneInP * phoneEndFade
  const ajouzOpacity =
    (bintToAjouzP * (1 - ajouzToTimeP)) * phoneInP * phoneEndFade
  const timeOpacity = ajouzToTimeP * phoneInP * phoneEndFade

  const brandOpacity = bell(visualRP)
  const brandTY      = floatTY(visualRP)

  // ── STRICT LANES (state mirrors refs; updated in handleScroll) ───────────
  const phoneSuppressed =
    ixVisual || ixBridge || (ixImpact && phoneEndFade <= 0.02)
  const inSolutionLane = ixSolution && !phoneSuppressed
  const phoneDocked = solutionVisAmt > 0.1

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`h-full overflow-y-auto font-sans ${T.surface} ${T.text} ${T.scrollRoot} ${T.contentProse}`}
    >

      {/* ── Identity header + overview grid ───────────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 md:px-10 pt-8">
        <header className="flex items-center gap-5 pb-8 border-b border-gray-100">
          <img src={AppIconQaffatek} alt="Qaffatek app icon" className="h-16 w-16 rounded-[14px] shadow-sm" />
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[20px] font-bold tracking-tight text-gray-900">Qaffatek | قفطتك </h1>
              <a
                href="https://apps.apple.com/sa/app/%D9%82%D9%81%D8%B7%D8%AA%D9%83/id6757811186"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold transition-all duration-200 hover:scale-105 hover:opacity-95 active:scale-[0.99] select-none ${T.pillStatus}`}
              >
                <span
                  className={`h-2 w-2 shrink-0 animate-pulse rounded-full ${
                    uiTheme === 'dark' ? 'bg-[#ACDEE7]' : 'bg-[#82ADB5]'
                  }`}
                  aria-hidden
                />
                Live on App Store
              </a>
            </div>
            <p className="mt-0.5 text-[13px] font-medium text-gray-500">Family Game</p>
          </div>
        </header>

        <div className="space-y-6 pt-8 pb-8 border-b border-gray-100">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 md:grid-cols-4 md:gap-x-12 items-start">
            <div>
              <p className={META_KEY}>Timeline</p>
              <p className={META_VAL}>09/2025 – 03/2026</p>
            </div>
            <div>
              <p className={META_KEY}>My Role</p>
              <p className={META_VAL}>Apple Developer Academy | iOS Developer &amp; Product Designer</p>
            </div>
            <div>
              <p className={META_KEY}>Project Type</p>
              <p className={META_VAL}>iOS App (PNU · Apple Developer Academy)</p>
            </div>
            <div>
              <p className={META_KEY}>Tools</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {TOOLS.map((t) => (
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
      </div>

      {/* ══ 01. The Challenge — centered block (NO PHONE) ═══════════════════ */}
      <div className="w-full max-w-[800px] mx-auto px-6 sm:px-8 md:px-10 pt-8 pb-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
          01. The Challenge
        </p>
        <h2 className="font-bold leading-tight tracking-tight text-gray-900 mb-8">
          <span className="block text-[36px]">When the conversation dies,</span>
          <span className="block text-[32px] text-gray-400 font-normal">and we miss how we used to hang out back then.</span>
        </h2>
        <div className={BODY_CLS}>
          <p className="mb-6">
            Mayar created and originated Qaffatek as an iOS game from October 2025 onward, successfully digitizing a
            traditional regional paper game for iPhone. The interface was designed in Figma, and the game logic and
            gameplay were implemented in Swift (SwiftUI). We’ve all been there: the conversation dies, boredom kicks in,
            and suddenly everyone is staring at their phones just because there’s nothing else to do. It’s a moment that
            always made us miss how we used to hang out back then.
          </p>
          <p className="mb-6">Back in school, our breaks felt completely different. All we had was a pen, some paper, and a game everyone knows called "Ghamza." We would start by writing the roles of the Weld, Bint, and Ajouz on tiny scraps of paper, then spend the whole break trying to catch a wink or hide one. That’s the connection we miss, and we really wanted to bring back.</p>
          <p className="mb-6">We realized we weren't the only ones feeling this way; it’s a huge part of our culture. 70% of Saudi families still play traditional games during gatherings like Ramadan, and 60% of people believe these games are essential for strengthening family bonds.</p>
          <p className="mb-0">Our goal was to digitize that old-school paper game and make it work for today, building a digital bridge that transforms that nostalgia into a modern way to get people together again.</p>
        </div>
      </div>

      {/* ── Main Stage (starts at 02) — 3-column sticky grid ─────────────────
           Desktop: [1fr] [400px phone] [1fr]
           Phone sticky: col 2, rows 1-7 (starts at 02) ── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px_1fr] gap-x-10 items-start">

          {/* ══ STICKY PHONE — col 2, rows 1–7 (starts at 02) ═══════════════ */}
          <div
            className="md:col-start-2 md:row-start-1 md:row-end-8 md:sticky top-0
                       flex items-center justify-center h-screen"
            style={{ zIndex: 10 }}
          >
            <div
              className={
                'pointer-events-auto relative w-full max-w-[400px] will-change-transform ' +
                dockMotionClass +
                (phoneSuppressed ? ' !opacity-0 !invisible' : '') +
                (phoneDocked ? ' translate-y-0' : ' translate-y-full')
              }
              style={phoneSuppressed ? { visibility: 'hidden' } : undefined}
            >
              <img
                src={MockupQsecret}
                alt="Secret role assignment screen"
                className={
                  'pointer-events-auto h-auto w-full object-contain ' +
                  mockupOpacityClass +
                  (inSolutionLane ? '' : ' !opacity-0 !invisible')
                }
                style={
                  inSolutionLane
                    ? { opacity: secretOpacity }
                    : { opacity: 0, visibility: 'hidden' }
                }
              />

              <img
                src={MockupWeld}
                alt="The Weld role screen"
                className={
                  'pointer-events-auto absolute inset-0 h-full w-full object-contain ' +
                  mockupOpacityClass
                }
                style={{ opacity: weldOpacityFinal }}
              />

              <img
                src={MockupBint}
                alt="The Bint role screen"
                className={
                  'pointer-events-auto absolute inset-0 h-full w-full object-contain ' +
                  mockupOpacityClass
                }
                style={{ opacity: bintOpacity }}
              />

              <img
                src={MockupAjouz}
                alt="The Ajouz role screen"
                className={
                  'pointer-events-auto absolute inset-0 h-full w-full object-contain ' +
                  mockupOpacityClass
                }
                style={{ opacity: ajouzOpacity }}
              />

              <img
                src={MockupTime}
                alt="Time and vibe screen"
                className={
                  'pointer-events-auto absolute inset-0 h-full w-full object-contain ' +
                  mockupOpacityClass
                }
                style={{ opacity: timeOpacity }}
              />
            </div>
          </div>

          {/* ══ 02. Visual Identity (The Design) — logo + text (NO PHONE) ═════ */}
          {/* ══ 02. The Solution — RIGHT ══════════════════════════════════════ */}
          <section
            ref={solutionRef}
            className="md:col-start-3 md:row-start-1 flex items-center py-24 min-h-[85vh] relative z-20"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
                02. The Solution
              </p>
              <h2 className="font-bold leading-tight tracking-tight text-gray-900 mb-8">
                <span className="block text-[36px]">A hybrid experience.</span>
                <span className="block text-[32px] text-gray-400 font-normal">One screen. Many secrets.</span>
              </h2>
              <div className={BODY_CLS}>
                <p className="mb-0">
                  We didn’t want the phone to be the center of attention; instead, we wanted it to act as a "Game Master" that secretly assigns the roles. Once everyone knows their character and their mission, the phone is put away, and the real game begins.
                </p>
              </div>
            </div>
          </section>

          <div className="md:col-start-3 md:row-start-2 flex items-center justify-center py-24 min-h-[85vh] relative z-20">
            <div className="pointer-events-auto flex w-full items-center justify-center">
              <img
                src={QaffatekLogo}
                alt="Qaffatek brand mark"
                className="pointer-events-auto h-auto w-[150%] max-w-[500px] select-none"
                style={{
                  opacity: brandOpacity,
                  transform: `translateY(${brandTY}px)`,
                  willChange: 'transform, opacity',
                }}
                draggable={false}
              />
            </div>
          </div>
          <section
            ref={visualIdRef}
            className="md:col-start-1 md:row-start-2 flex items-center py-24 min-h-[85vh] relative z-20"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
                2.1 Visual Identity
              </p>
              <h2 className="font-bold leading-tight tracking-tight text-gray-900 mb-8">
                <span className="block text-[36px]">Rooted in Culture.</span>
                <span className="block text-[32px] text-gray-400 font-normal">from Bisht to Qamis.</span>
              </h2>
              <div className={BODY_CLS}>
                <p className="mb-0">We kept the visual identity rooted in our culture, making sure each character felt familiar. From the Bisht to the Qamis, these details weren't just for decoration; they were about making the whole experience feel authentic.</p>
              </div>
            </div>
          </section>

          {/* ══ 03. The Bridge ═══════════════════════════════════════════════ */}
          <section
            ref={bridgeRef}
            className="md:col-start-1 md:col-end-4 md:row-start-3 flex items-center justify-center py-24 min-h-[70vh] relative z-20"
          >
            <div className="w-full max-w-[720px] text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
                2.2 The Bridge
              </p>
              <h2 className="font-bold leading-tight tracking-tight text-gray-900 mb-0">
                <span className="block text-[36px]">To keep the game’s soul alive,</span>
                <span className="block text-[32px] text-gray-400 font-normal">we brought back the three iconic roles everyone knows.</span>
              </h2>
            </div>
          </section>

          {/* ══ 04. The Weld — RIGHT ════════════════════════════════════════ */}
          <section
            ref={weldRef}
            className="md:col-start-3 md:row-start-4 flex items-center py-24 min-h-[85vh] relative z-20"
          >
            <div className="min-w-0">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: Q_PURPLE }}
              >
                2.2.1 The Weld
              </p>
              <h2
                className="text-[56px] sm:text-[72px] font-black leading-[0.88] tracking-[-0.03em] mb-7"
                style={{ color: '#0f0a1e' }}
              >
                The<br />Weld.
              </h2>
              <p className={BODY_CLS}>
                The Weld: The secret suitor who has to wink at the girls without being caught. He’s the one controlling the tempo of the game, looking for that perfect split second to make his move.
              </p>
            </div>
          </section>

          {/* ══ 05. The Bint — LEFT ═════════════════════════════════════════ */}
          <section
            ref={bintRef}
            className="md:col-start-1 md:row-start-5 flex items-center py-24 min-h-[85vh] relative z-20"
          >
            <div className="min-w-0">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: Q_ORANGE }}
              >
               2.2.2 The Bint
              </p>
              <h2
                className="text-[56px] sm:text-[72px] font-black leading-[0.88] tracking-[-0.03em] mb-7"
                style={{ color: '#0f0a1e' }}
              >
                The<br />Bint.
              </h2>
              <p className={BODY_CLS}>
                The Bint: Who receives the wink and announces she’s "engaged."
              </p>
            </div>
          </section>

          {/* ══ 06. The Ajouz — RIGHT ═══════════════════════════════════════ */}
          <section
            ref={ajouzRef}
            className="md:col-start-3 md:row-start-6 flex items-center py-24 min-h-[85vh] relative z-20"
          >
            <div className="min-w-0">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ color: Q_GREEN }}
              >
              2.2.3 The Ajouz
              </p>
              <h2
                className="text-[56px] sm:text-[72px] font-black leading-[0.88] tracking-[-0.03em] mb-7"
                style={{ color: '#0f0a1e' }}
              >
                The<br />Ajouz.
              </h2>
              <p className={BODY_CLS}>
                The Ajouz: The protector who watches everyone to catch the Weld and shout "Qaftatk!"
              </p>
            </div>
          </section>

          {/* ══ 07. The Vibe & Testing — LEFT ═══════════════════════════════ */}
          <section
            ref={vibeRef}
            className="md:col-start-1 md:row-start-7 flex items-center py-24 min-h-[85vh] relative z-20"
          >
            <div className="min-w-0">
              <div className={BODY_CLS}>
                <p className="mb-6">To make sure we got the 'vibe' right, we ran extensive TestFlight sessions with beta testers. We didn't just stay behind our desks; we took the game to real gatherings, testing it with over 30 players. The feedback was incredible. Even in the beta version, we saw people playing multiple rounds in one sitting. Seeing that level of excitement from our testers was the spark we needed to take Qaftatk all the way to the App Store.</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ══ 08. The Impact — centered block (NO PHONE) ═══════════════════════ */}
      <section
        ref={impactRef}
        className="relative z-20 mx-auto w-full max-w-[800px] px-6 py-24 text-left sm:px-8 md:px-10"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
          03. The Impact
        </p>
        <h2 className="font-bold leading-tight tracking-tight text-gray-900 mb-8">
          <span className="block text-[36px]">Phones down,</span>
          <span className="block text-[32px] text-gray-400 font-normal">and the real game begins.</span>
        </h2>
        <div className={BODY_CLS}>
          <p className="mb-6">The most unforgettable moment for our team was receiving that first email: 'Your app, قفطتك, has been approved for distribution.' It was our very first launch on the App Store. It wasn't just a challenge anymore; it was a real product.</p>
          <p className="mb-6">Since its release, we’ve reached our first 100 players. But for us, the real win wasn’t the numbers! It was seeing the game do exactly what we hoped it would: getting people to put their phones aside and start looking at each other. We managed to take a favorite childhood memory and give it a permanent home in our modern gatherings. </p>
          <p className="mb-0">So the next time the conversation dies and boredom kicks in, the fun is just getting started.</p>
        </div>
      </section>
    </div>
  )
}
