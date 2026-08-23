import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { WAYPOINT_POS } from './waypoints'
import { useJourneyStore } from './store'
import { grassScatter } from './hero'

const GRASS_COUNT = 420
const PLATEAU_R = 4.2

export default function HeroIsland() {
  const group = useRef<THREE.Group>(null)
  const pos = WAYPOINT_POS[0]!
  const grass = useMemo(() => grassScatter(GRASS_COUNT, PLATEAU_R - 0.4), [])
  useFrame((state) => {
    if (!group.current) return
    // gentle idle bob — cheap life signal; amplitude 0 under reduced-motion (#15)
    const amp = useJourneyStore.getState().reducedMotion ? 0 : 0.15
    group.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 0.6) * amp
  })
  return (
    <group ref={group} position={[pos[0], pos[1], pos[2]]}>
      {/* rock spire */}
      <mesh position={[0, -6, 0]}>
        <coneGeometry args={[PLATEAU_R, 12, 7]} />
        <meshStandardMaterial color="#8a7968" flatShading />
      </mesh>
      {/* plateau */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[PLATEAU_R, PLATEAU_R * 0.92, 0.9, 9]} />
        <meshStandardMaterial color="#6d7f4f" flatShading />
      </mesh>
      {/* instanced grass blades */}
      <InstancedGrass blades={grass} />
      {/* ember lantern — accent anchor */}
      <mesh position={[2.4, 0.85, 1.6]}>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#E8A05C" emissive="#E8A05C" emissiveIntensity={0.55} />
      </mesh>
      <pointLight position={[2.4, 1.3, 1.6]} color="#E8A05C" intensity={6} distance={9} />
    </group>
  )
}

function InstancedGrass({ blades }: { blades: ReturnType<typeof grassScatter> }) {
  const ref = useRef<THREE.InstancedMesh | null>(null)
  useMemo(() => {
    // matrices are set once on mount via callback ref below
  }, [blades])
  const setup = (m: THREE.InstancedMesh | null) => {
    if (!m) return
    const dummy = new THREE.Object3D()
    blades.forEach((b, i) => {
      dummy.position.set(b.x, 0.5, b.z)
      dummy.rotation.set(0, b.rot, 0)
      dummy.scale.set(b.scale, b.scale * 1.6, b.scale)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  }
  return (
    <instancedMesh ref={(n) => { ref.current = n; setup(n) }} args={[undefined, undefined, GRASS_COUNT]}>
      <coneGeometry args={[0.055, 0.75, 4]} />
      <meshStandardMaterial color="#7B9F17" flatShading />
    </instancedMesh>
  )
}
