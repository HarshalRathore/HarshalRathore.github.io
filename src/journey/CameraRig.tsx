import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useJourneyStore } from './store'
import { WAYPOINT_POS } from './waypoints'
import { usePointerParallax, parallaxOffset } from './hooks'

const _island = new THREE.Vector3()
const _offset = new THREE.Vector3()
const _camTarget = new THREE.Vector3()

export default function CameraRig() {
  const smooth = useRef(new THREE.Vector3(...WAYPOINT_POS[0]!))
  const { camera } = useThree()
  const parallax = usePointerParallax()

  useFrame((_, delta) => {
    const { activeWaypoint, reducedMotion } = useJourneyStore.getState()
    const dest = WAYPOINT_POS[activeWaypoint - 1]!
    _island.set(dest[0], dest[1], dest[2])
    // Frame the island: stand off radially outward from journey axis + elevated,
    // always looking AT the island so every waypoint reads in frame.
    _offset.set(dest[0], 0, dest[2])
    if (_offset.lengthSq() < 0.001) _offset.set(1, 0, 0)
    _offset.normalize().multiplyScalar(9)
    _offset.y += 3
    _camTarget.copy(_island).add(_offset)

    const p = parallaxOffset(parallax.current.x, parallax.current.y, reducedMotion)
    if (reducedMotion) {
      smooth.current.copy(_camTarget)
    } else {
      const t = 1 - Math.pow(0.001, delta)
      smooth.current.lerp(_camTarget, t)
    }
    camera.position.set(
      smooth.current.x + p.x * 2,
      smooth.current.y + p.y * 2,
      smooth.current.z,
    )
    camera.lookAt(_island.x, _island.y, _island.z)
  })

  return null
}
