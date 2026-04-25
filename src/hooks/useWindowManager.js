import { useState, useRef, useCallback } from 'react'

/**
 * Manages the open-window stack: open/focus, bring-to-front, and close.
 *
 * Z-index layout:
 *   Desktop icons  →  z-0
 *   Windows        →  200 – 4999  (capped so they never exceed the dock)
 *   Dock           →  5000
 *   Menu bar       →  9999
 */
const Z_START = 200
const Z_MAX   = 4999   // must stay below dock (5000) and menu bar (9999)

export function useWindowManager() {
  const [openWindows, setOpenWindows] = useState([])
  const zCounterRef = useRef(Z_START)

  const nextZ = () => {
    zCounterRef.current = zCounterRef.current >= Z_MAX ? Z_START + 1 : zCounterRef.current + 1
    return zCounterRef.current
  }

  /** Open a new window or bring an existing one to the front. */
  const openOrFocusWindow = useCallback((title) => {
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.id === title)
      const newZ = nextZ()
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /** Promote an already-open window to the top of the z-stack. */
  const bringToFront = useCallback((id) => {
    setOpenWindows((prev) => {
      const newZ = nextZ()
      return prev.map((w) => w.id === id ? { ...w, zIndex: newZ } : w)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /** Remove a window from the stack entirely. */
  const closeWindow = useCallback((id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  return { openWindows, openOrFocusWindow, bringToFront, closeWindow }
}

export default useWindowManager
