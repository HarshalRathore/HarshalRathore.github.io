import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import type * as THREE from 'three'

/**
 * Issue #14 part A — portrait reframe (#14-PORTRAIT).
 * Narrow/portrait viewports widen the field of view ×1.3 (55° → 71.5°) so the
 * archipelago stays framed on tall screens; landscape keeps the authored 55°.
 */
export default function PortraitReframe() {
  const size = useThree((s) => s.size)
  const camera = useThree((s) => s.camera)

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera & { isPerspectiveCamera?: boolean }
    if (!cam.isPerspectiveCamera || cam.fov === undefined) return
    cam.fov = size.width < size.height ? 71.5 /* 55 × 1.3 */ : 55
    cam.updateProjectionMatrix()
  }, [size.width, size.height, camera])

  return null
}
