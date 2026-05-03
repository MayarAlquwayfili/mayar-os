import { publicSoundsUrl } from './publicSoundsUrl'

const MOUNT_VOLUME = 0.5
const MOUNT_SOUND_FILE = 'Volume Mount.wav'

let mountAudio = null

function getMountAudio() {
  if (typeof window === 'undefined') return null
  if (!mountAudio) {
    mountAudio = new Audio(publicSoundsUrl(MOUNT_SOUND_FILE))
    mountAudio.preload = 'auto'
    mountAudio.volume = MOUNT_VOLUME
    try {
      mountAudio.load()
    } catch {
      /* ignore */
    }
  }
  return mountAudio
}

/** Warm decode/buffer on idle so Accept plays without first-hit latency. */
export function preloadDesktopMountSfx() {
  getMountAudio()
}

/** Single shared element — one mount sound per Accept (no per-play allocation). */
export function playDesktopDropSfx() {
  const a = getMountAudio()
  if (!a) return
  try {
    a.currentTime = 0
  } catch {
    /* ignore */
  }
  const p = a.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
}
