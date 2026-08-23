import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useJourneyStore } from '../store'
import { WAYPOINT_POS } from '../waypoints'
import { CRYSTAL_WAYPOINTS, crystalPosition } from './logic'
import { playIfArmed } from '../sound/soundBus'

/**
 * Five hidden crystals scattered across the archipelago (issue #13).
 * EGG-C-001 restraint contract: this is one of exactly TWO secrets in the
 * app (crystals + Konami night). Do not add more.
 */

declare global {
  interface Window {
    __crystalTargets?: [number, number][]
    __crystalsFound?: number
  }
}

const _v = new THREE.Vector3()

export default function Crystals() {
  const crystalsFound = useJourneyStore((s) => s.crystalsFound)
  const foundCrystal = useJourneyStore((s) => s.foundCrystal)
  const { size, camera } = useThree()
  const spinRefs = useRef<(THREE.Group | null)[]>([])
  const foundSet = useMemo(() => new Set(crystalsFound), [crystalsFound])
  const foundCount = crystalsFound.length

  const positions = useMemo(
    () => CRYSTAL_WAYPOINTS.map((_, i) => crystalPosition(i, WAYPOINT_POS)),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for (let i = 0; i < positions.length; i++) {
      const g = spinRefs.current[i]
      if (!g) continue
      if (foundSet.has(`crystal-${i}`)) continue
      g.rotation.y += 0.8 * 0.016
      g.position.y = positions[i]![1] + Math.sin(t * 1.3 + i) * 0.08
    }
    // orchestrator telemetry: screen coords of each visible/unfound crystal
    const targets: [number, number][] = []
    for (let i = 0; i < positions.length; i++) {
      if (foundSet.has(`crystal-${i}`)) continue
      _v.set(positions[i]![0], positions[i]![1], positions[i]![2]).project(camera)
      targets.push([( _v.x * 0.5 + 0.5 ) * size.width, ( -_v.y * 0.5 + 0.5 ) * size.height])
    }
    window.__crystalTargets = targets
    window.__crystalsFound = foundCount
  })

  return (
    <>
      {positions.map((pos, i) => {
        const id = `crystal-${i}`
        if (foundSet.has(id)) return null
        return (
          <group
            key={id}
            ref={(g) => {
              spinRefs.current[i] = g
            }}
            position={pos}
          >
            <mesh
              onClick={(e) => {
                e.stopPropagation()
                if (foundSet.has(id)) return
                foundCrystal(id)
                playIfArmed('audio/chime.ogg', 0.4)
                if (foundCount === 4) playIfArmed('audio/achieve.ogg', 0.45)
              }}
            >
              <octahedronGeometry args={[0.26, 0]} />
              <meshStandardMaterial color="#E8A05C" emissive="#E8A05C" emissiveIntensity={0.75} flatShading />
            </mesh>
          </group>
        )
      })}
    </>
  )
}
