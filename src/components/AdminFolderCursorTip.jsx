import { forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { accentTokens } from '../utils/windowContentTheme'

const CURSOR_GAP_PX = 8

/** Cursor-follow tooltip pill classes for the active uiTheme (accent differs Light/Dark). */
export function cursorTipPillClass(uiTheme = 'light') {
  const A = accentTokens(uiTheme)
  return [
    'inline-flex max-w-[min(280px,calc(100vw-48px))] items-center rounded-full border px-4 py-1.5 text-left text-[11px] font-medium leading-snug',
    A.pillBorder,
    A.pillBg,
    A.textOnAccent,
  ].join(' ')
}

/**
 * Text-only pill that follows the pointer; no arrow. Parent hit area uses cursor-none.
 * Optional `wrapperClassName` overrides the default 132px folder frame (e.g. identity sticker).
 */
const DEFAULT_WRAPPER = 'block w-[132px] cursor-none select-none'

const AdminFolderCursorTip = forwardRef(function AdminFolderCursorTip(
  {
    label,
    children,
    wrapperClassName,
    uiTheme = 'light',
    style,
    onMouseMove: onMouseMoveProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  },
  ref,
) {
  const [tip, setTip] = useState({ show: false, x: 0, y: 0 })

  const onMove = (e) => {
    setTip({ show: true, x: e.clientX, y: e.clientY })
    onMouseMoveProp?.(e)
  }

  const onLeave = (e) => {
    setTip((t) => ({ ...t, show: false }))
    onMouseLeaveProp?.(e)
  }

  return (
    <>
      <div
        ref={ref}
        className={wrapperClassName ?? DEFAULT_WRAPPER}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...rest}
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
            <span className={cursorTipPillClass(uiTheme)}>{label}</span>
          </div>,
          document.body,
        )}
    </>
  )
})

AdminFolderCursorTip.displayName = 'AdminFolderCursorTip'

export default AdminFolderCursorTip
