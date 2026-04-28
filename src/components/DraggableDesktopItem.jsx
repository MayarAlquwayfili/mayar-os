import { useEffect, useRef, useState } from 'react'

const MOVE_THRESHOLD_PX = 6

/**
 * Absolutely positioned desktop item: drag to move; optional clean click if pointer up without meaningful move.
 */
export default function DraggableDesktopItem({
  initialX,
  initialY,
  onPositionChange,
  onCleanClick,
  onInteract,
  children,
  className = '',
  style,
  draggingClassName = '',
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [dragging, setDragging] = useState(false)
  const rootRef = useRef(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const lastPositionRef = useRef({ x: initialX, y: initialY })
  const movedRef = useRef(false)

  useEffect(() => {
    setPosition({ x: initialX, y: initialY })
    lastPositionRef.current = { x: initialX, y: initialY }
  }, [initialX, initialY])

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    e.stopPropagation()
    onInteract?.()
    const el = rootRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    const startX = e.clientX
    const startY = e.clientY
    movedRef.current = false

    setDragging(true)

    const onMove = (ev) => {
      const parent = el.parentElement
      if (!parent) return

      const dx = Math.abs(ev.clientX - startX)
      const dy = Math.abs(ev.clientY - startY)
      if (dx > MOVE_THRESHOLD_PX || dy > MOVE_THRESHOLD_PX) movedRef.current = true

      const pr = parent.getBoundingClientRect()
      const itemW = el.offsetWidth
      const itemH = el.offsetHeight
      const off = dragOffsetRef.current

      let nx = ev.clientX - pr.left - off.x
      let ny = ev.clientY - pr.top - off.y

      // Clamp X so the item can reach the viewport’s right edge (parent may not fill full innerWidth).
      const maxX = Math.max(0, window.innerWidth - pr.left - itemW)
      const maxY = Math.max(0, pr.height - itemH)

      const newPos = {
        x: Math.max(0, Math.min(nx, maxX)),
        y: Math.max(0, Math.min(ny, maxY)),
      }
      lastPositionRef.current = newPos
      setPosition(newPos)
    }

    const onUp = (ev) => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      setDragging(false)

      if (!movedRef.current) onCleanClick?.(ev)
      else onPositionChange?.(lastPositionRef.current)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  return (
    <div
      ref={rootRef}
      className={`absolute touch-none select-none ${dragging ? draggingClassName : ''} ${className}`}
      style={{ left: position.x, top: position.y, ...style }}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={onPointerDown}
    >
      {children}
    </div>
  )
}
