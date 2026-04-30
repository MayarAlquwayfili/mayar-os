import { useState } from 'react'
import { createPortal } from 'react-dom'

const CURSOR_GAP_PX = 8

/**
 * Text-only pill that follows the pointer; no arrow. Parent hit area uses cursor-none.
 * Optional `wrapperClassName` overrides the default 132px folder frame (e.g. identity sticker).
 */
const DEFAULT_WRAPPER =
  'block w-[132px] cursor-none select-none'

export default function AdminFolderCursorTip({ label, children, wrapperClassName }) {
  const [tip, setTip] = useState({ show: false, x: 0, y: 0 })

  const onMove = (e) => {
    setTip({ show: true, x: e.clientX, y: e.clientY })
  }
  const onLeave = () => setTip((t) => ({ ...t, show: false }))

  return (
    <>
      <div
        className={wrapperClassName ?? DEFAULT_WRAPPER}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </div>
      {tip.show &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-[9998]"
            style={{
              left: tip.x + CURSOR_GAP_PX,
              top: tip.y,
              transform: 'translateY(-50%)',
            }}
          >
            <span className="inline-flex max-w-[min(280px,calc(100vw-48px))] items-center rounded-full bg-[#6B3FA0] px-4 py-1.5 text-left text-[11px] font-medium leading-snug text-white">
              {label}
            </span>
          </div>,
          document.body,
        )}
    </>
  )
}
