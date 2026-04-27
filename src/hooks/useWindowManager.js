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

  /**
   * Open or focus a window. Pass a string (legacy) or an object with at least `id`.
   * Extra fields (variant, sideBAlbumKey, imagePreview, …) are stored on the window record.
   */
  const openOrFocusWindow = useCallback((arg) => {
    const spec =
      typeof arg === 'string'
        ? { id: arg, title: arg, variant: 'default' }
        : {
            variant: 'default',
            ...arg,
            id: arg.id,
            title: arg.title ?? arg.id,
          }
    if (!spec.id) return

    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.id === spec.id)
      const newZ = nextZ()
      if (existing) {
        return prev.map((w) =>
          w.id === spec.id ? { ...w, ...spec, zIndex: newZ } : w
        )
      }
      const idx = prev.length
      return [
        ...prev,
        {
          ...spec,
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
