import { useState, useEffect, useRef, useCallback } from 'react'
import FolderIcon from './assets/Folder.svg'
import AppIconMoheetik from './assets/AppIconMoheetik.svg'
import AppIconQaffatek from './assets/AppIconQaffatek.svg'
import AppIconRECLAB from './assets/AppIconRECLAB.svg'
import IcAppleLogo from './assets/Ic_apple.logo.svg'
import MockupMoheetik01 from './assets/MockupMoheetik01.svg'
import MockupMoheetik02 from './assets/MockupMoheetik02.svg'
import MockupMoheetik03 from './assets/MockupMoheetik03.svg'
import Dock from './components/Dock'
import TopStatusBar from './components/TopStatusBar'
import { useWindowManager } from './hooks/useWindowManager'
import { MOHEETIK_TOOLS, RECLAB_TOOLS, QAFFATEK_TOOLS, DESKTOP_FOLDERS } from './constants/projects'

const MENU_BAR_PX = 28
const EDGE_PX = 10
const MIN_W = 380
const MIN_H = 320

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
const SECTION_H2   = 'mb-4 text-[15px] font-semibold tracking-tight text-gray-900'

function MoheetikSplitContent() {
  return (
    <div
      className="h-full overflow-y-auto bg-white font-sans
                 [&::-webkit-scrollbar]:w-1.5
                 [&::-webkit-scrollbar-track]:bg-transparent
                 [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 py-8 sm:px-8 md:px-10">

        {/* ── Identity ───────────────────────────────────────── */}
        <header className="flex items-center gap-4 pb-6 mb-8 border-b border-gray-100">
          <img
            src={AppIconMoheetik}
            alt="Moheetik app icon"
            className="h-16 w-16 rounded-[14px] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold tracking-tight text-gray-900">Moheetik</h1>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
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
                  className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
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

function RECLABContent() {
  return (
    <div
      className="h-full overflow-y-auto bg-white font-sans
                 [&::-webkit-scrollbar]:w-1.5
                 [&::-webkit-scrollbar-track]:bg-transparent
                 [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 py-8 sm:px-8 md:px-10">

        {/* ── Identity ───────────────────────────────────────── */}
        <header className="flex items-center gap-4 pb-6 mb-8 border-b border-gray-100">
          <img
            src={AppIconRECLAB}
            alt="RECLAB app icon"
            className="h-16 w-16 rounded-[14px] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold tracking-tight text-gray-900">RECLAB</h1>
              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                WIP
              </span>
            </div>
            <p className="mt-0.5 text-[13px] font-medium text-gray-500">
              Lifestyle &amp; Productivity
            </p>
          </div>
        </header>

        {/* ── Overview Grid ──────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 pb-8 mb-10 border-b border-gray-100">
          <div>
            <p className={META_KEY_CLS}>Timeline</p>
            <p className={META_VAL_CLS}>Jan – Mar 2026</p>
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
                  className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description ────────────────────────────────────── */}
        <section className="py-10">
          <p className={META_KEY_CLS + ' mb-3'}>About the Project</p>
          <h2 className="text-[24px] font-bold leading-tight tracking-tight text-gray-900 mb-4">
            Built for people who refuse<br />
            <span className="text-gray-400">to be just one thing.</span>
          </h2>
          <p className={BODY_CLS}>
            Most productivity tools are built for specialists — one goal, one
            path, one identity. RECLAB is built for{' '}
            <strong className="font-semibold text-gray-900">multipotentialites</strong>:
            people who carry multiple passions, projects, and pursuits at once.
            It&apos;s a platform designed to let you track, gamify, and celebrate
            your diverse learning journeys — whether that&apos;s code, design,
            music, or anything in between. Every interest gets its own lab.
            Every milestone gets its own moment. The goal is to make the chaos
            of curiosity feel like{' '}
            <strong className="font-semibold text-gray-900">intentional progress</strong>.
          </p>
        </section>

      </div>
    </div>
  )
}

function QaffatekContent() {
  return (
    <div
      className="h-full overflow-y-auto bg-white font-sans
                 [&::-webkit-scrollbar]:w-1.5
                 [&::-webkit-scrollbar-track]:bg-transparent
                 [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 py-8 sm:px-8 md:px-10">

        {/* ── Identity ───────────────────────────────────────── */}
        <header className="flex items-center gap-4 pb-6 mb-8 border-b border-gray-100">
          <img
            src={AppIconQaffatek}
            alt="Qaffatek app icon"
            className="h-16 w-16 rounded-[14px] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold tracking-tight text-gray-900">Qaffatek</h1>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Live
              </span>
            </div>
            <p className="mt-0.5 text-[13px] font-medium text-gray-500">
              Family Game
            </p>
          </div>
        </header>

        {/* ── Overview Grid ──────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 pb-8 mb-10 border-b border-gray-100">
          <div>
            <p className={META_KEY_CLS}>Timeline</p>
            <p className={META_VAL_CLS}>Sep 2025 – Mar 2026</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>My Role</p>
            <p className={META_VAL_CLS}>iOS Developer &amp; Product Designer</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>Project Type</p>
            <p className={META_VAL_CLS}>iOS App (Apple Dev Academy)</p>
          </div>
          <div>
            <p className={META_KEY_CLS}>Tools</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {QAFFATEK_TOOLS.map((t) => (
                <span
                  key={t}
                  className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description ────────────────────────────────────── */}
        <section className="py-10">
          <p className={META_KEY_CLS + ' mb-3'}>About the Project</p>
          <h2 className="text-[24px] font-bold leading-tight tracking-tight text-gray-900 mb-4">
            A traditional Saudi game,<br />
            <span className="text-gray-400">reimagined for the iPhone.</span>
          </h2>
          <p className={BODY_CLS}>
            Qaffatek is a digital revival of{' '}
            <strong className="font-semibold text-gray-900">Gamzah</strong>, the
            classic Saudi social game built on quick reflexes and shared laughter.
            The original game is deceptively simple — players react to a trigger
            and the slowest hand loses — but the real magic is in the energy it
            creates around a table. Our goal was to capture that same electric
            social tension and translate it faithfully to a native iOS experience.
            Designed for families and friend groups, Qaffatek brings the{' '}
            <strong className="font-semibold text-gray-900">speed, the stakes, and the chaos</strong>{' '}
            of the original while making it accessible anywhere, any time.
          </p>

          {/* ── App Store Button ─────────────────────────────── */}
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-8 bg-black text-white px-5 py-3 rounded-xl transition-all duration-200 hover:scale-105 select-none"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}
          >
            <img
              src={IcAppleLogo}
              alt=""
              aria-hidden
              className="w-[18px] h-auto invert"
            />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-normal text-white/80 tracking-wide">
                Download on the
              </span>
              <span className="text-[17px] font-semibold tracking-tight mt-0.5">
                App Store
              </span>
            </div>
          </a>
        </section>

      </div>
    </div>
  )
}

function CVContent() {
  return (
    /* Outer: fills the window, white bg, scrollable, thin custom scrollbar */
    <div
      className="h-full overflow-y-auto bg-white font-sans
                 [&::-webkit-scrollbar]:w-1.5
                 [&::-webkit-scrollbar-track]:bg-transparent
                 [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-gray-200"
    >
      {/* Centered content column — expands with the window, overflow-safe */}
      <div className="mx-auto w-full max-w-[820px] min-w-0 overflow-x-hidden break-words px-8 pb-12 pt-10 sm:px-10 md:px-14 lg:px-16">

        {/* ── Header ── */}
        <header className="mb-8 border-b border-gray-200 pb-7">
          <h1 className="text-[20px] font-bold tracking-tight text-gray-900 sm:text-[23px] md:text-[26px]">
            Mayar Alquwayfili
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
            Riyadh&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="mailto:mf.alquwayfili@gmail.com" className="hover:text-gray-800 transition-colors">mf.alquwayfili@gmail.com</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;054767478&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="https://www.linkedin.com/in/mayar-alquwayfili/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">LinkedIn</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="https://www.behance.net/mayaralquway" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">Behance</a>
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

        {/* ── Education ── */}
        <Section title="Education">
          <CVEntry
            title="Apple Developer Academy at TUWAIQ"
            meta="Education Scholarship"
            date="2025 – Present"
          />
          <CVEntry
            title="Princess Nourah Bint Abdulrahman University"
            meta="Bachelor's degree, Economics"
            date="2022 – Present"
          />
        </Section>

        {/* ── Projects ── */}
        <Section title="Projects">
          <CVEntry
            title="RECLAB App — Personal Project"
            meta="iOS Developer & Product Designer"
            date="Jan 2026 – Present"
            bullets={[
              'Developed an iOS personal-logging app for multipotentialites to document and track diverse experiments.',
              'Designed a clean, native card-based UI in Figma, turning the initial concept into a fully functional application.',
            ]}
          />
          <CVEntry
            title="Qaffatek — Apple Developer Academy"
            titleHref="https://apps.apple.com/sa/app/%D9%82%D9%81%D8%B7%D8%AA%D9%83/id6479574301"
            meta="iOS Developer & Product Designer"
            date="Sep 2025 – Mar 2026"
            bullets={[
              'Launched an iOS game to the App Store, transforming a traditional paper game into a digital experience.',
              'Built with SwiftUI and MVVM architecture, implementing improvements based on beta user feedback.',
              'Designed a Figma interface for instant role assignment and focus on real-world interaction.',
            ]}
          />
          <CVEntry
            title="Moheetik App — Apple Developer Academy"
            meta="Lead iOS Developer & UI/UX Designer"
            date="Nov 2025 – Jan 2026"
            bullets={[
              'Developed an assistive app for visually impaired users using real-time Arabic audio and haptic feedback.',
              'Engineered a custom Core ML model to detect doors and stairs, surpassing standard model limitations.',
              'Validated the MVP with the Authority for People with Disability (APD).',
            ]}
          />
          <CVEntry
            title="Brewcha Studio — Entrepreneurship Project"
            meta="Product Manager & Designer"
            date="Sep 2025 – Nov 2025"
            bullets={[
              'Led end-to-end development of a DIY beverage workshop and managed strategic vision.',
              'Designed brand identity and Figma prototypes for packaging, stickers, and cards.',
              'Executed a live prototype workshop to validate the business model through feedback.',
            ]}
          />
          <CVEntry
            title="Digital Payments Impact on Korean SMEs — Research"
            meta="Independent Researcher"
            date="Sep 2025 – Nov 2025"
            bullets={[
              'Analyzed 10 years of Korean macroeconomic data using R to measure SME survival rates.',
              'Developed Multiple Linear Regression and EFA models to evaluate financial trends.',
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
              ['Technical', 'Swift, SwiftUI, Core ML, MVVM, API, Git/GitHub, iOS Accessibility, TestFlight'],
              ['Design',    'Figma (Auto Layout), Design Systems, Apple HIG, User Research, Inclusive Design'],
              ['Product',   'Agile (Scrum), Design Thinking, BMC, MVP Strategy, Market Analysis'],
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
            href="/Mayar_Alquwayfili.pdf"
            download="Mayar_Alquwayfili.pdf"
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

function CVEntry({ title, titleHref, meta, date, bullets }) {
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
              className="relative text-[13px] leading-7 text-gray-700
                         before:absolute before:left-[-13px] before:top-[0.65em]
                         before:h-[5px] before:w-[5px] before:rounded-full
                         before:bg-gray-300 before:content-['']"
            >
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function MacWindow({ id, title, zIndex, initialX, initialY, onClose, onFocus }) {
  const defaultW = 700
  const defaultH = 500

  const [position, setPosition] = useState({
    x: initialX ?? 60,
    y: initialY ?? 48,
  })
  const [size, setSize] = useState({ w: defaultW, h: defaultH })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [hoverZone, setHoverZone] = useState(null)

  const restoredRef = useRef({
    position: { x: 0, y: 0 },
    size: { w: defaultW, h: defaultH },
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
      const maxY = Math.max(0, window.innerHeight - h)
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

      if (zone.includes('e')) newW = Math.max(MIN_W, startW + dx)
      if (zone.includes('s')) newH = Math.max(MIN_H, startH + dy)
      if (zone.includes('w')) {
        const propW = Math.max(MIN_W, startW - dx)
        newL = startLeft + (startW - propW)
        newW = propW
      }
      if (zone.includes('n')) {
        const propH = Math.max(MIN_H, startH - dy)
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
      if (newT + newH > window.innerHeight) newH = window.innerHeight - newT

      newW = Math.max(MIN_W, newW)
      newH = Math.max(MIN_H, newH)

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
  }, [isResizing])

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
      setSize(s)
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
      className={`fixed flex flex-col overflow-hidden border border-black/10 bg-white font-sans shadow-2xl ${
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
        className={`relative flex h-11 shrink-0 select-none items-center border-b border-black/[0.06] bg-white px-4 ${
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
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" aria-hidden />
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

      <div className="min-h-0 flex-1 overflow-hidden bg-white">
        {title === 'Moheetik' ? (
          <MoheetikSplitContent />
        ) : title === 'RECLAB' ? (
          <RECLABContent />
        ) : title === 'Qaffatek' ? (
          <QaffatekContent />
        ) : title === 'Preview — Mayar_CV.pdf' ? (
          <CVContent />
        ) : (
          <div className="p-6 text-sm text-gray-600">
            <p className="font-medium text-gray-800">{title}</p>
            <p className="mt-2">No additional content for this folder.</p>
          </div>
        )}
      </div>

      {/* SE corner resize handle — sits above scrollbar layer */}
      {!isMaximized && (
        <div
          aria-hidden
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          style={{ zIndex: 10 }}
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
  initialX,
  initialY,
  isSelected,
  onSelect,
  onDoubleClick,
  onPositionChange,
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isDragging, setIsDragging] = useState(false)

  const rootRef = useRef(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const lastPositionRef = useRef({ x: initialX, y: initialY })

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e) => {
      const el = rootRef.current
      if (!el) return
      const parent = el.parentElement
      if (!parent) return

      const pr = parent.getBoundingClientRect()
      const fr = el.getBoundingClientRect()
      const off = dragOffsetRef.current

      let nx = e.clientX - pr.left - off.x
      let ny = e.clientY - pr.top - off.y

      const maxX = Math.max(0, pr.width - fr.width)
      const maxY = Math.max(0, pr.height - fr.height)

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

  return (
    <div
      ref={rootRef}
      aria-label={`Folder ${id}: ${title}`}
      className="absolute flex w-[88px] cursor-grab flex-col items-center gap-1 select-none active:cursor-grabbing"
      style={{ left: position.x, top: position.y }}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className={`box-border flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-md p-1 ${
          isSelected ? 'bg-black/20' : 'bg-transparent'
        }`}
      >
        <img
          src={icon ?? FolderIcon}
          className="h-16 w-16 shrink-0"
          alt=""
          draggable={false}
        />
      </div>

      <div className="flex min-h-[36px] w-full flex-col items-center justify-center px-1 py-0.5 text-center">
        <span
          className={`line-clamp-1 text-[12px] font-medium leading-tight tracking-wide ${
            isSelected
              ? 'font-semibold text-amber-900'
              : 'text-gray-800'
          }`}
        >
          {title}
        </span>
        <span
          className={`line-clamp-1 text-[11px] leading-tight ${
            isSelected ? 'font-medium text-amber-800' : 'text-gray-600'
          }`}
        >
          {subtitle ?? '2 items'}
        </span>
      </div>
    </div>
  )
}

const LS_KEY = 'mayaros-folder-positions'

function initFolderPositions() {
  try {
    const saved = localStorage.getItem(LS_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      const result = {}
      DESKTOP_FOLDERS.forEach((f) => {
        result[f.id] = parsed[f.id] ?? { x: f.x, y: f.y }
      })
      return result
    }
  } catch {}
  // First load — persist random positions so they survive refreshes
  const defaults = {}
  DESKTOP_FOLDERS.forEach((f) => { defaults[f.id] = { x: f.x, y: f.y } })
  try { localStorage.setItem(LS_KEY, JSON.stringify(defaults)) } catch {}
  return defaults
}

export default function App() {
  const [selectedFolderId, setSelectedFolderId] = useState(null)
  const { openWindows, openOrFocusWindow, bringToFront, closeWindow } = useWindowManager()
  const [folderPositions] = useState(initFolderPositions)

  const handleFolderPositionChange = useCallback((id, pos) => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      const current = raw ? JSON.parse(raw) : {}
      current[id] = pos
      localStorage.setItem(LS_KEY, JSON.stringify(current))
    } catch {}
  }, [])

  return (
    <div className="fixed inset-0 min-h-0 w-full overflow-hidden bg-[#f8f6f0] font-sans antialiased">
      <TopStatusBar />

      <main
        className="absolute inset-x-0 bottom-0 top-7 z-0 overflow-hidden"
        onClick={() => setSelectedFolderId(null)}
      >
        {DESKTOP_FOLDERS.map((folder) => (
          <DraggableFolder
            key={folder.id}
            id={folder.id}
            title={folder.title}
            icon={folder.icon}
            subtitle={folder.subtitle}
            initialX={folderPositions[folder.id]?.x ?? folder.x}
            initialY={folderPositions[folder.id]?.y ?? folder.y}
            isSelected={selectedFolderId === folder.id}
            onSelect={() => setSelectedFolderId(folder.id)}
            onDoubleClick={() => openOrFocusWindow(folder.windowTitle ?? folder.title)}
            onPositionChange={(pos) => handleFolderPositionChange(folder.id, pos)}
          />
        ))}
        {openWindows.map((win) => (
          <MacWindow
            key={win.id}
            id={win.id}
            title={win.title}
            zIndex={win.zIndex}
            initialX={win.initialX}
            initialY={win.initialY}
            onClose={() => closeWindow(win.id)}
            onFocus={() => bringToFront(win.id)}
          />
        ))}
      </main>

      <Dock openWindows={openWindows} onOpen={openOrFocusWindow} />
    </div>
  )
}
