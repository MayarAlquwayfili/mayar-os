import { useState, useEffect, useRef, useCallback } from 'react'
import FolderIcon from './assets/Folder.svg'
import IcWifi from './assets/Ic_wifi.svg'
import AppIconMoheetik from './assets/AppIconMoheetik.svg'
import MockupMoheetik01 from './assets/MockupMoheetik01.svg'
import MockupMoheetik02 from './assets/MockupMoheetik02.svg'
import MockupMoheetik03 from './assets/MockupMoheetik03.svg'

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

function formatClock(d) {
  const w = d.toLocaleDateString('en-US', { weekday: 'short' })
  const day = d.getDate()
  const m = d.toLocaleDateString('en-US', { month: 'short' })
  const t = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${w} ${day} ${m}\u00A0${t}`
}

const BODY_CLS    = 'text-[13.5px] leading-[1.8] tracking-[0.01em] text-gray-700'
const META_KEY_CLS = 'text-[10px] font-medium uppercase tracking-[0.09em] text-gray-400 mb-1'
const META_VAL_CLS = 'text-[13px] font-medium text-gray-900'
const SECTION_H2   = 'mb-4 text-[15px] font-semibold tracking-tight text-gray-900'

const TOOLS = ['SwiftUI', 'CoreML', 'ARKit', 'Figma', 'Cursor (AI)']

function MoheetikSplitContent() {
  return (
    <div
      className="h-full overflow-y-auto bg-white font-sans
                 [&::-webkit-scrollbar]:w-1.5
                 [&::-webkit-scrollbar-track]:bg-transparent
                 [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 py-8 md:px-[5%]">

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
              {TOOLS.map((t) => (
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
            : `cursor-grab active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : ''}`
        }`}
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
  initialX,
  initialY,
  isSelected,
  onSelect,
  onDoubleClick,
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isDragging, setIsDragging] = useState(false)

  const rootRef = useRef(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })

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

      setPosition({
        x: Math.max(0, Math.min(nx, maxX)),
        y: Math.max(0, Math.min(ny, maxY)),
      })
    }

    const onMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging])

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
          src={FolderIcon}
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
          2 items
        </span>
      </div>
    </div>
  )
}

function randomFolderPos() {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const desktop = vh - MENU_BAR_PX
  const x = Math.max(20, Math.floor(Math.random() * vw * 0.72))
  const y = Math.max(20, Math.floor(Math.random() * desktop * 0.72))
  return { x, y }
}

const initialFolders = [
  { id: 1, title: 'Moheetik', ...randomFolderPos() },
  { id: 2, title: 'Folder #02', ...randomFolderPos() },
]

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [selectedFolderId, setSelectedFolderId] = useState(null)
  const [openWindows, setOpenWindows] = useState([])
  const zCounterRef = useRef(200)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const openOrFocusWindow = useCallback((title) => {
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.id === title)
      const newZ = ++zCounterRef.current
      if (existing) {
        return prev.map((w) => w.id === title ? { ...w, zIndex: newZ } : w)
      }
      const idx = prev.length
      return [
        ...prev,
        {
          id: title,
          title,
          zIndex: newZ,
          initialX: 60 + idx * 24,
          initialY: 48 + idx * 24,
        },
      ]
    })
  }, [])

  const bringToFront = useCallback((id) => {
    setOpenWindows((prev) => {
      const newZ = ++zCounterRef.current
      return prev.map((w) => w.id === id ? { ...w, zIndex: newZ } : w)
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  return (
    <div className="fixed inset-0 min-h-0 w-full overflow-hidden bg-[#f8f6f0] font-sans antialiased">
      <header
        className="fixed top-0 w-full flex h-7 items-center justify-between bg-[#E8E4D9] px-4 text-[13px] font-semibold font-sans tracking-wide text-gray-900"
        style={{ zIndex: 9999 }}
      >
        <div className="flex items-center gap-4">
          <span aria-hidden>✦</span>
          <span className="font-bold">Mayar</span>
          <span>About Me</span>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={IcWifi}
            className="w-4 h-4 opacity-80"
            alt="Wi-Fi"
          />
          <time
            dateTime={now.toISOString()}
            className="text-[13px] font-semibold text-black/90 tracking-tight tabular-nums"
          >
            {formatClock(now)}
          </time>
        </div>
      </header>

      <main
        className="absolute inset-x-0 bottom-0 top-7 z-0 overflow-hidden"
        onClick={() => setSelectedFolderId(null)}
      >
        {initialFolders.map((folder) => (
          <DraggableFolder
            key={folder.id}
            id={folder.id}
            title={folder.title}
            initialX={folder.x}
            initialY={folder.y}
            isSelected={selectedFolderId === folder.id}
            onSelect={() => setSelectedFolderId(folder.id)}
            onDoubleClick={() => openOrFocusWindow(folder.title)}
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
    </div>
  )
}
