import { useState } from 'react'
import { createPortal } from 'react-dom'

const CURSOR_GAP_PX = 8

/**
 * Sharp-edged opaque tooltip: left-pointing arrow + #6B3FA0 rectangle (not macOS pill).
 */
export default function AdminFolderCursorTip({ label, children }) {
  const [tip, setTip] = useState({ show: false, x: 0, y: 0 })

  const onMove = (e) => {
    setTip({ show: true, x: e.clientX, y: e.clientY })
  }
  const onLeave = () => setTip((t) => ({ ...t, show: false }))

  return (
    <>
      <div className="inline-block cursor-grab active:cursor-grabbing" onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </div>
      {tip.show &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-[9998] flex flex-row items-center rounded-none"
            style={{
              left: tip.x + CURSOR_GAP_PX,
              top: tip.y,
              transform: 'translateY(-50%)',
            }}
          >
            <span
              className="h-0 w-0 shrink-0 border-y-[7px] border-y-transparent border-r-[9px] border-r-[#6B3FA0]"
              aria-hidden
            />
            <span className="max-w-[min(280px,calc(100vw-48px))] bg-[#6B3FA0] px-3 py-2 text-left text-[11px] font-medium leading-snug text-white">
              {label}
            </span>
          </div>,
          document.body,
        )}
    </>
  )
}
