import { useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraRig from './journey/CameraRig'
import Islands from './journey/Islands'
import { WAYPOINTS, nextWaypointFrom, prevWaypointFrom, useJourneyStore } from './journey/store'
import { useScrollProgress } from './journey/hooks'

function jumpTo(w: number, smooth: boolean) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo({ top: ((w - 0.5) / WAYPOINTS.length) * max, behavior: smooth ? 'smooth' : 'auto' })
}

export default function App() {
  useScrollProgress()
  const activeWaypoint = useJourneyStore((s) => s.activeWaypoint)
  const reducedMotion = useJourneyStore((s) => s.reducedMotion)

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        jumpTo(nextWaypointFrom(useJourneyStore.getState().activeWaypoint), !useJourneyStore.getState().reducedMotion)
        e.preventDefault()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        jumpTo(prevWaypointFrom(useJourneyStore.getState().activeWaypoint), !useJourneyStore.getState().reducedMotion)
        e.preventDefault()
      } else if (e.key === 'Home') {
        jumpTo(1, !reducedMotion)
        e.preventDefault()
      } else if (e.key === 'End') {
        jumpTo(WAYPOINTS.length, !reducedMotion)
        e.preventDefault()
      }
    },
    [reducedMotion],
  )

  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none h-[700vh]" />
      <div
        className="fixed inset-0 z-0 outline-none focus-visible:ring-2 focus-visible:ring-ember"
        tabIndex={0}
        aria-label="Career Archipelago journey"
        onKeyDown={onKeyDown}
      >
        <Canvas camera={{ fov: 55, position: [0, 0, 0] }}>
          <CameraRig />
          <Islands />
        </Canvas>
      </div>
      <header className="fixed left-4 top-4 z-10 font-display text-xl text-neutral-100">Harshal Rathore</header>
      <nav className="fixed bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-5 py-2 font-body text-sm text-neutral-100 backdrop-blur">
        {String(activeWaypoint).padStart(2, '0')} — {WAYPOINTS[activeWaypoint - 1]}
      </nav>
    </div>
  )
}
