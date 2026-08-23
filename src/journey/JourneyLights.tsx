import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useJourneyStore } from './store'

const WARM_SUN = new THREE.Color('#FFF3E0')
const MOON_COOL = new THREE.Color('#A9C9E8')
const _c = new THREE.Color()

export default function JourneyLights() {
  const ambRef = useRef<THREE.AmbientLight>(null)
  const dirRef = useRef<THREE.DirectionalLight>(null)
  const lastStage = useRef(-1)

  useFrame(() => {
    // Konami night override (#13): forced full-night while konamiNight is on
    const stage = useJourneyStore.getState().konamiNight ? 1 : useJourneyStore.getState().lightStage
    if (lastStage.current >= 0 && Math.abs(stage - lastStage.current) < 0.0005) return
    lastStage.current = stage
    if (!ambRef.current || !dirRef.current) return
    // reduced-motion (#15): stage is a pure function of scroll — lerp below
    // is positional, not temporal, so transitions stay instantaneous.
    _c.copy(WARM_SUN).lerp(MOON_COOL, stage)
    dirRef.current.color.copy(_c)
    ambRef.current.intensity = 0.7 + (0.22 - 0.7) * stage
    dirRef.current.intensity = 1.2 + (0.15 - 1.2) * stage
  })

  return (
    <>
      <ambientLight ref={ambRef} intensity={0.7} />
      <directionalLight ref={dirRef} position={[5, 10, 5]} intensity={1.2} />
    </>
  )
}
