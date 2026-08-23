import { Suspense, lazy, useCallback, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import CameraRig from './journey/CameraRig'
import Sky from './journey/Sky'
import Islands from './journey/Islands'
import { WAYPOINTS, nextWaypointFrom, prevWaypointFrom, useJourneyStore } from './journey/store'
import { useScrollProgress } from './journey/hooks'
import ScrollHint from './journey/ScrollHint'
import ProjectOverlay from './journey/ProjectOverlay'
import Dusty from './journey/dusty/Dusty'
import SoundToggle from './journey/sound/SoundToggle'
import Preloader from './journey/preloader/Preloader'
import Crystals from './journey/secrets/Crystals'
import AdaptivePerf from './journey/perf/AdaptivePerf'
import PortraitReframe from './journey/perf/PortraitReframe'
import QualityMenu from './journey/perf/QualityMenu'
import Konami from './journey/secrets/Konami'
import SecretsHud, { ToastHost } from './journey/secrets/SecretsHud'

const GardenLazy = lazy(() => import('./journey/garden/Garden'))
// Fx is lazy: the postprocessing effect framework (~70 KB gzip) must not ride
// in the entry chunk — it's only needed once the first frame renders anyway.
const FxLazy = lazy(() => import('./journey/fx/FX').then((m) => ({ default: m.Fx })))

function GardenMount({ active }: { active: boolean }) {
  return active ? (
    <Suspense fallback={null}>
      <GardenLazy />
    </Suspense>
  ) : null
}

function jumpTo(w: number, smooth: boolean) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo({ top: ((w - 0.5) / WAYPOINTS.length) * max, behavior: smooth ? 'smooth' : 'auto' })
}

export default function App() {
  useScrollProgress()
  // remove the zero-JS boot shell the moment React takes over
  if (typeof document !== 'undefined') document.getElementById('boot')?.remove()
  const [created, setCreated] = useState(false)
  const activeWaypoint = useJourneyStore((s) => s.activeWaypoint)
  const reducedMotion = useJourneyStore((s) => s.reducedMotion)
  const gardenActive = useJourneyStore((s) => s.gardenActive)

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
      <Preloader done={created} />
      <div aria-hidden className="pointer-events-none h-[700vh]" />
      <div
        className="fixed inset-0 z-0 outline-none focus-visible:ring-2 focus-visible:ring-ember"
        tabIndex={0}
        aria-label="Career Archipelago journey"
        onKeyDown={onKeyDown}
      >
        <Canvas
          camera={{ fov: 55, position: [0, 0, 0] }}
          gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
          onCreated={() => setCreated(true)}
        >
          <Sky />
          <CameraRig />
          <Islands />
          <GardenMount active={gardenActive} />
          <Dusty />
          <Crystals />
          <AdaptivePerf />
          <PortraitReframe />
          <Suspense fallback={null}>
            <FxLazy />
          </Suspense>
        </Canvas>
      </div>
      <header className="fixed left-4 top-4 z-10 rounded-full px-4 py-2 font-display text-xl backdrop-blur-sm border border-white/15" style={{ color: 'var(--hud-ink)', background: 'var(--hud-scrim)' }}>Harshal Rathore</header>
      <nav className="fixed bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full px-5 py-2 font-body text-sm backdrop-blur-sm border border-white/15" style={{ color: 'var(--hud-ink)', background: 'var(--hud-scrim)' }}>
        {String(activeWaypoint).padStart(2, '0')} — {WAYPOINTS[activeWaypoint - 1]}
      </nav>
      {activeWaypoint === 6 && (
        <div className="fixed bottom-20 left-1/2 z-10 flex -translate-x-1/2 flex-wrap justify-center gap-2 px-4">
          {[
            ['Linked Lists', '/writing/linked-lists/'],
            ['Git for Beginners', '/writing/git-for-beginners/'],
            ['Linux SHELL Guide', '/writing/linux-shell-guide/'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="rounded-full border border-white/15 bg-black/40 px-4 py-2 font-body text-sm text-neutral-100 backdrop-blur hover:border-ember">
              {label} ↗
            </a>
          ))}
        </div>
      )}
      <ScrollHint />
      <ProjectOverlay />
      <Konami />
      <SecretsHud />
      <ToastHost />
      <QualityMenu />
      <SoundToggle />
    </div>
  )
}
