/** Resolves `/sounds/<file>` under Vite `base` (e.g. `/mayar-os/`). */
export function publicSoundsUrl(file) {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}sounds/${encodeURIComponent(file)}`
}
