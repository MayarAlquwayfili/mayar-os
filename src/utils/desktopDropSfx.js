const MOUNT_VOLUME = 0.5
const MOUNT_SOUND_FILE = 'Volume Mount.wav'

function soundsUrl(file) {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}sounds/${encodeURIComponent(file)}`
}

/** One shot per call — staggered with each desktop folder “mount” on Accept. */
export function playDesktopDropSfx() {
  if (typeof window === 'undefined') return
  const a = new Audio(soundsUrl(MOUNT_SOUND_FILE))
  a.volume = MOUNT_VOLUME
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
