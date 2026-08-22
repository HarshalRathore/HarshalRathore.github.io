import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useJourneyStore } from './store'
import { WAYPOINT_POS } from './waypoints'
import { usePointerParallax, parallaxOffset } from './hooks'

export default function CameraRig() {
  const target = useRef(new THREE.Vector3(...WAYPOINT_POS[0]!))
  const { camera } = useThree()
  const parallax = usePointerParallax()

  useFrame((_, delta) => {
    const { activeWaypoint, reducedMotion } = useJourneyStore.getState()
    const dest = WAYPOINT_POS[activeWaypoint - 1]!
    const p = parallaxOffset(parallax.current.x, parallax.current.y, reducedMotion)

    if (reducedMotion) {
      target.current.set(dest[0], dest[1], dest[2])
    } else {
      const t = 1 - Math.pow(0.001, delta) // ~1s eased approach
      target.current.lerp(new THREE.Vector3(dest[0], dest[1], dest[2]), t)
    }

    camera.position.set(target.current.x + p.x * 2, target.current.y + p.y * 2, target.current.z)
    camera.lookAt(target.current.x, target.current.y, target.current.z - 5)
  })

  return null
}
