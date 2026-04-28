import { useState } from 'react'
import { createPortal } from 'react-dom'

const CURSOR_GAP_PX = 8

/**
 * Pill tooltip: left-pointing arrow + opaque #6B3FA0 rounded-full label (vertically centered).
 */
export default function AdminFolderCursorTip({ label, children }) {
  const [tip, setTip] = useState({ show: false, x: 0, y: 0 })

  const onMove = (e) => {
    setTip({ show: true, x: e.clientX, y: e.clientY })
  }
  const onLeave = () => setTip((t) => ({ ...t, show: false }))

  return (
    <>
      <div
        className="block w-[132px] cursor-grab select-none active:cursor-grabbing"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </div>
      {tip.show &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-[9998] flex flex-row items-center"
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
            <span className="inline-flex max-w-[min(280px,calc(100vw-48px))] items-center rounded-full bg-[#6B3FA0] px-4 py-1.5 text-left text-[11px] font-medium leading-snug text-white">
              {label}
            </span>
          </div>,
          document.body,
        )}
    </>
  )
}
