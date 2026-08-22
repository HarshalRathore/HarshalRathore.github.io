export function load(): boolean {
  try {
    if (typeof window === 'undefined') return false
    const raw = window.localStorage.getItem('dusty-sound')
    if (!raw) return false
    return JSON.parse(raw) === true
  } catch {
    return false
  }
}

export function save(enabled: boolean): void {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('dusty-sound', JSON.stringify(enabled))
  } catch {
    /* storage unavailable — pref simply won't persist */
  }
}
