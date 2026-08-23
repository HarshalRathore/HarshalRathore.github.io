import { useEffect } from 'react'
import { useJourneyStore } from '../store'

/**
 * Secrets HUD (issue #13): crystal counter pill (bottom-left) + toast host.
 * Toast auto-clears after 2400ms; keyed by toast.id so back-to-back events
 * re-trigger the timer and the aria-live announcement.
 */
export default function SecretsHud() {
  const count = useJourneyStore((s) => s.crystalsFound.length)
  const allFound = count === 5
  return (
    <div
      className="fixed bottom-4 left-4 z-10 rounded-full border border-white/15 px-4 py-2 font-body text-xs backdrop-blur-sm"
      style={{ color: 'var(--hud-ink)', background: 'var(--hud-scrim)' }}
      aria-label={`Crystals found ${count} of 5`}
    >
      <span className={allFound ? 'text-[#E8A05C]' : undefined}>✦ {count} / 5</span>
    </div>
  )
}

export function ToastHost() {
  const toast = useJourneyStore((s) => s.toast)
  const clearToast = useJourneyStore((s) => s.clearToast)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(clearToast, 2400)
    return () => clearTimeout(t)
  }, [toast, clearToast])

  if (!toast) return null
  return (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="fixed left-1/2 top-6 z-30 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-5 py-2 font-body text-sm text-neutral-100 backdrop-blur"
    >
      {toast.msg}
    </div>
  )
}
