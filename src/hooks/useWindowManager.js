import { useState, useRef, useCallback } from 'react'

/**
 * Manages the open-window stack: open/focus, bring-to-front, and close.
 * Z-index starts at 200 so windows always sit above desktop icons (z-0)
 * but below the menu bar (z-9999) and dock (z-500).
 */
export function useWindowManager() {
  const [openWindows, setOpenWindows] = useState([])
  const zCounterRef = useRef(200)

  /** Open a new window or bring an existing one to the front. */
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

  /** Promote an already-open window to the top of the z-stack. */
  const bringToFront = useCallback((id) => {
    setOpenWindows((prev) => {
      const newZ = ++zCounterRef.current
      return prev.map((w) => w.id === id ? { ...w, zIndex: newZ } : w)
    })
  }, [])

  /** Remove a window from the stack entirely. */
  const closeWindow = useCallback((id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  return { openWindows, openOrFocusWindow, bringToFront, closeWindow }
}

export default useWindowManager
