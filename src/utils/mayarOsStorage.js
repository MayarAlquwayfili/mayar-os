/**
 * Mayar OS persisted preferences (localStorage).
 * Dev: `window.__MAYAR_OS_DEV_RESET__()` clears keys and reloads (registered from App in DEV only).
 */
export const MAYAR_OS_STORAGE = {
  ONBOARDING: 'mayar-os-onboarding',
  MANUAL_TASKS: 'mayar-os-manual-tasks',
}

/** Value written when onboarding completes (Accept). */
export const ONBOARDING_ACCEPTED_VALUE = 'accepted'

export function isOnboardingAcceptedInStorage() {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(MAYAR_OS_STORAGE.ONBOARDING) === ONBOARDING_ACCEPTED_VALUE
  } catch {
    return false
  }
}

/** Initial adminFlow segment: only `accepted` is restored; everything else starts `idle`. */
export function loadPersistedAdminFlowSegment() {
  return isOnboardingAcceptedInStorage() ? 'accepted' : 'idle'
}

export function persistAdminFlow(adminFlow) {
  try {
    if (adminFlow === 'accepted') {
      localStorage.setItem(MAYAR_OS_STORAGE.ONBOARDING, ONBOARDING_ACCEPTED_VALUE)
    }
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * @param {Array<{ id: number, title: string, caption: string, done: boolean }>} initialTasks
 * @returns {typeof initialTasks | null}
 */
export function loadPersistedManualTasks(initialTasks) {
  try {
    const raw = localStorage.getItem(MAYAR_OS_STORAGE.MANUAL_TASKS)
    if (raw == null) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    const byId = new Map(parsed.map((x) => [x.id, Boolean(x.done)]))
    return initialTasks.map((t) => ({
      ...t,
      done: byId.has(t.id) ? byId.get(t.id) : t.done,
    }))
  } catch {
    return null
  }
}

export function persistManualTasks(tasks) {
  try {
    const payload = tasks.map(({ id, done }) => ({ id, done }))
    localStorage.setItem(MAYAR_OS_STORAGE.MANUAL_TASKS, JSON.stringify(payload))
  } catch {
    /* ignore */
  }
}

/** Clear onboarding + manual persistence (e.g. dev reset). */
export function clearMayarOsPersistedState() {
  try {
    localStorage.removeItem(MAYAR_OS_STORAGE.ONBOARDING)
    localStorage.removeItem(MAYAR_OS_STORAGE.MANUAL_TASKS)
  } catch {
    /* ignore */
  }
}
