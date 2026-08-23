import { useJourneyStore } from '../store'
import type { QualityPref } from '../store'

/**
 * Issue #14 part A — manual graphics-quality override menu.
 * Small pill top-right; click cycles auto → high → mid → low → auto.
 * The choice persists in localStorage ('quality-pref') via setQualityPref,
 * and 'high'|'mid'|'low' locks DPR to that tier's cap inside AdaptivePerf.
 */

const CYCLE: readonly QualityPref[] = ['auto', 'high', 'mid', 'low']

export default function QualityMenu() {
  const qualityPref = useJourneyStore((s) => s.qualityPref)
  const setQualityPref = useJourneyStore((s) => s.setQualityPref)

  return (
    <button
      type="button"
      onClick={() => setQualityPref(CYCLE[(CYCLE.indexOf(qualityPref) + 1) % CYCLE.length]!)}
      aria-label="Graphics quality"
      className="fixed right-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-4 py-2 font-body text-sm backdrop-blur"
      style={{ color: 'var(--hud-ink)', background: 'var(--hud-scrim)' }}
    >
      ⚙ {qualityPref}
    </button>
  )
}
