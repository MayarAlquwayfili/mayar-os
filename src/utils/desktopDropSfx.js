/** Workspace folder “drop” after Accept (see onAccept in App). */
const DROP_VOLUME = 0.45

let audioSingleton = null

function soundsUrl(file) {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}sounds/${file}`
}

export function playDesktopDropSfx() {
  if (typeof window === 'undefined') return
  if (!audioSingleton) {
    const a = new Audio(soundsUrl('drop.wav'))
    a.preload = 'auto'
    a.volume = DROP_VOLUME
    try {
      a.load()
    } catch {
      /* ignore */
    }
    audioSingleton = a
  }
  try {
    audioSingleton.currentTime = 0
  } catch {
    /* ignore */
  }
  const p = audioSingleton.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
}
