import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useJourneyStore } from '../store'
import { DUSTY_PARAMS, dustyBehavior } from './behavior'

/**
 * Dusty — the Career Archipelago's cloud-spirit mascot.
 * DUST-C-001: 100% procedural (offscreen radial-gradient canvas textures) —
 * zero photographic / image-file assets. One shared soft-puff texture drives
 * the whole body cluster; a tighter one drives the eyes.
 */

/** Blue-hour zone of the same 0..1 light-stage blend Sky/JourneyLights consume. */
const NIGHT_STAGE = 0.75

function puffTexture(size: number, innerAlpha: number): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('2D canvas unavailable for Dusty puff texture')
  const r = size / 2
  const g = ctx.createRadialGradient(r, r, 0, r, r, r)
  g.addColorStop(0, `rgba(255, 255, 255, ${innerAlpha})`)
  g.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

const PUFFS: Array<{ pos: [number, number, number]; scale: number }> = [
  { pos: [-0.5, 0, 0], scale: 1.05 },
  { pos: [0.4, 0.15, -0.1], scale: 0.9 },
  { pos: [0, 0.32, 0.15], scale: 0.8 },
  { pos: [-0.2, -0.22, 0.1], scale: 0.75 },
  { pos: [0.55, -0.1, 0], scale: 0.7 },
  { pos: [-0.55, 0.18, -0.05], scale: 0.8 },
  { pos: [0.1, -0.05, -0.2], scale: 1.1 },
]

export default function Dusty() {
  const group = useRef<THREE.Group>(null)
  const eyeL = useRef<THREE.Sprite>(null)
  const eyeR = useRef<THREE.Sprite>(null)
  const { camera } = useThree()

  // Shared procedural textures, built once per mount (no external assets).
  const textures = useMemo(
    () => ({ body: puffTexture(128, 0.9), eyes: puffTexture(64, 0.98) }),
    [],
  )

  // Slight per-sprite warm-white variation around #F3EDE2 (±6%).
  const puffs = useMemo(
    () =>
      PUFFS.map((p) => {
        const tint = new THREE.Color('#F3EDE2').multiplyScalar(0.94 + Math.random() * 0.12)
        return { ...p, tint }
      }),
    [],
  )

  useEffect(() => {
    const probe = window as unknown as { __dustyPuffs?: number }
    probe.__dustyPuffs = 7
  }, [])

  const blinkRef = useRef({ next: 3, until: -1 })

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    const s = useJourneyStore.getState()
    const stageNight = s.lightStage >= NIGHT_STAGE
    const behavior = dustyBehavior({
      stageNight,
      gardenActive: s.gardenActive,
      activeWaypoint: s.activeWaypoint,
    })
    const probe = window as unknown as { __dustyBehavior?: string }
    probe.__dustyBehavior = behavior

    const params = DUSTY_PARAMS[behavior]
    const motionScale = s.reducedMotion ? 0.3 : 1
    const t = state.clock.elapsedTime
    const dt = Math.min(delta, 0.1)

    // Target: ahead of camera + lateral orbit sway + hover offset (+ nap drop).
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    const right = new THREE.Vector3().crossVectors(camera.up, forward).normalize()
    const target = new THREE.Vector3()
      .copy(camera.position)
      .addScaledVector(forward, 3)
      .addScaledVector(right, params.orbitRadius * Math.sin(t * 0.13))
    target.y -= 0.9
    if (behavior === 'nap') target.y -= 0.5

    // Frame-rate-independent follow lag.
    const k = 1 - Math.pow(1 - params.followLag, dt * 60)
    g.position.lerp(target, k)

    // Bob on y (offset, not accumulated) + breath pulsing on the whole group,
    // both damped under reduced motion.
    g.position.y += Math.sin(t * params.bobSpeed) * params.bobAmp * motionScale
    g.scale.setScalar(1 + params.breathAmp * motionScale * Math.sin(t * 1.1))

    // Eyes track eyeOpen; blink every 3–5s for ~120ms.
    let open = params.eyeOpen
    const blink = blinkRef.current
    if (blink.until > 0) {
      if (t < blink.until) open *= 0.1
      else blink.until = -1
    } else {
      blink.next -= dt
      if (blink.next <= 0) {
        blink.until = t + 0.12
        blink.next = 3 + Math.random() * 2
      }
    }
    if (eyeL.current) eyeL.current.scale.set(0.09, 0.09 * open, 1)
    if (eyeR.current) eyeR.current.scale.set(0.09, 0.09 * open, 1)

    // Billboard: copy camera orientation so the face stays visible through the orbit.
    g.quaternion.copy(camera.quaternion)
  })

  return (
    <group ref={group} position={[0, -1.5, -4]}>
      {puffs.map((p, i) => (
        <sprite key={i} position={p.pos} scale={[p.scale, p.scale, 1]} renderOrder={900}>
          <spriteMaterial map={textures.body} color={p.tint} transparent depthWrite={false} fog={false} />
        </sprite>
      ))}
      <sprite ref={eyeL} position={[-0.16, 0.08, 0.42]} scale={[0.09, 0.09, 1]} renderOrder={901}>
        <spriteMaterial map={textures.eyes} color="#20242E" transparent depthWrite={false} fog={false} opacity={0.95} />
      </sprite>
      <sprite ref={eyeR} position={[0.16, 0.08, 0.42]} scale={[0.09, 0.09, 1]} renderOrder={901}>
        <spriteMaterial map={textures.eyes} color="#20242E" transparent depthWrite={false} fog={false} opacity={0.95} />
      </sprite>
    </group>
  )
}
