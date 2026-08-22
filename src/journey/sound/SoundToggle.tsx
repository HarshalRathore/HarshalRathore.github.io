import { useEffect, useRef, useState } from 'react'
import { useJourneyStore } from '../store'
import { load, save } from './soundPrefs'

/**
 * Corner sound toggle. SND-H-001: silent by default, zero autoplay risk —
 * Audio objects are only ever constructed inside a user click handler.
 * Note: a restored `on` pref shows the ON state but stays silent until the
 * user interacts once (browser autoplay policy makes this unavoidable).
 */
export default function SoundToggle() {
  const [enabled, setEnabled] = useState(() => load())
  const windRef = useRef<HTMLAudioElement | null>(null)
  const armedRef = useRef(false)

  const start = () => {
    if (armedRef.current) return
    const w = window as { __soundArmed?: boolean; __soundPlayErrors?: number }
    const wind = new Audio('audio/wind.ogg')
    wind.loop = true
    wind.volume = 0.25
    void wind
      .play()
      .then(() => {
        w.__soundArmed = true
      })
      .catch(() => {
        w.__soundPlayErrors = (w.__soundPlayErrors ?? 0) + 1
      })
    windRef.current = wind
    armedRef.current = true
  }

  const stop = () => {
    windRef.current?.pause()
    windRef.current = null
    armedRef.current = false
  }

  const onToggle = () => {
    const next = !enabled
    setEnabled(next)
    save(next)
    if (next) start()
    else stop()
  }

  // wayfarer's chime whenever the waypoint changes (while sound is armed)
  const activeWaypoint = useJourneyStore((s) => s.activeWaypoint)
  const prevWp = useRef<number | null>(null)
  useEffect(() => {
    if (!armedRef.current) {
      prevWp.current = null
      return
    }
    if (prevWp.current !== null && prevWp.current !== activeWaypoint) {
      const chime = new Audio('audio/chime.ogg')
      chime.volume = 0.4
      void chime.play().catch(() => {})
    }
    prevWp.current = activeWaypoint
  }, [activeWaypoint])

  useEffect(() => () => stop(), [])

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className={`fixed bottom-4 right-4 z-20 rounded-full border px-4 py-2 font-body text-sm backdrop-blur transition-colors ${
        enabled
          ? 'border-ember text-[#E8A05C] bg-black/40'
          : 'border-white/15 text-neutral-200 bg-black/40 hover:border-white/30'
      }`}
      style={enabled ? undefined : { color: 'var(--hud-ink)' }}
    >
      {enabled ? '◉ sound on' : '○ sound off'}
    </button>
  )
}
