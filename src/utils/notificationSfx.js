const NOTIFICATION_VOLUME = 0.3

let audioSingleton = null

export function getNotificationSfx() {
  if (typeof window === 'undefined') return null
  if (audioSingleton) return audioSingleton

  const src = new URL('../assets/notification.mp3', import.meta.url).toString()
  const a = new Audio(src)
  a.preload = 'auto'
  a.volume = NOTIFICATION_VOLUME
  try {
    a.load()
  } catch {
    // ignore (some environments throw on load)
  }

  audioSingleton = a
  return audioSingleton
}

export function playNotificationSfx() {
  const a = getNotificationSfx()
  if (!a) return
  try {
    a.currentTime = 0
  } catch {
    /* ignore */
  }
  const p = a.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
}

