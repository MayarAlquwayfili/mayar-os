const DROP_VOLUME = 0.45

function soundsUrl(file) {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}sounds/${file}`
}

/** One shot per call — used for staggered folder drops (new Audio each time). */
export function playDesktopDropSfx() {
  if (typeof window === 'undefined') return
  const a = new Audio(soundsUrl('drop.wav'))
  a.volume = DROP_VOLUME
  try {
    a.load()
  } catch {
    /* ignore */
  }
  try {
    a.currentTime = 0
  } catch {
    /* ignore */
  }
  const p = a.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
}
