import { Physics, RigidBody, CuboidCollider, type RapierRigidBody } from '@react-three/rapier'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { WAYPOINT_POS } from '../waypoints'
import { debrisField, type DebrisSpec } from './debris'
import { detectTier, gardenBodyCount } from './tier'

const pos = WAYPOINT_POS[2]!
const COLORS = ['#a57b5b', '#8a7968', '#6d7f4f', '#96704f', '#7d7568']

const GRAB_GAIN = 12 // per-second velocity gain toward the grab target
const MAX_DRAG_SPEED = 30
const MAX_THROW_SPEED = 25

interface GrabState {
  body: RapierRigidBody
  planeZ: number
}

// scratch vectors (avoid per-frame allocation)
const _ndc = new THREE.Vector3()
const _dir = new THREE.Vector3()
const _target = new THREE.Vector3()
const _delta = new THREE.Vector3()

function clampLen(v: THREE.Vector3, max: number): THREE.Vector3 {
  const len = v.length()
  return len > max ? v.multiplyScalar(max / len) : v
}

function Debris({
  d,
  i,
  registerBody,
  onGrab,
}: {
  d: DebrisSpec
  i: number
  registerBody: (i: number, b: RapierRigidBody | null) => void
  onGrab: (e: ThreeEvent<PointerEvent>, body: RapierRigidBody | null) => void
}) {
  const color = COLORS[i % COLORS.length]
  const bodyRef = useRef<RapierRigidBody | null>(null)
  const register = useCallback(
    (b: RapierRigidBody | null) => {
      bodyRef.current = b
      registerBody(i, b)
    },
    [i, registerBody],
  )
  const handleDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      onGrab(e, bodyRef.current)
    },
    [onGrab],
  )
  if (d.shape === 'rock') {
    return (
      <RigidBody ref={register} position={[d.x, d.y, d.z]} restitution={d.restitution} friction={0.8}>
        <mesh castShadow onPointerDown={handleDown}>
          <icosahedronGeometry args={[d.scale * 1.4, 0]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      </RigidBody>
    )
  }
  if (d.shape === 'plank') {
    return (
      <RigidBody ref={register} position={[d.x, d.y, d.z]} restitution={d.restitution}>
        <mesh castShadow onPointerDown={handleDown}>
          <boxGeometry args={[1.54, 0.196, 0.588]} />
          <meshStandardMaterial color="#8a6f52" flatShading />
        </mesh>
      </RigidBody>
    )
  }
  return (
    <RigidBody ref={register} position={[d.x, d.y, d.z]} restitution={d.restitution} friction={0.7}>
      <mesh castShadow onPointerDown={handleDown}>
        <boxGeometry args={[d.scale * 1.4, d.scale * 1.4, d.scale * 1.4]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </RigidBody>
  )
}

export default function GravityGarden() {
  const grabbed = useRef<GrabState | null>(null)
  const api = useRef<Map<number, RapierRigidBody | null>>(new Map())
  const camera = useThree((s) => s.camera)
  const gl = useThree((s) => s.gl)
  const pointer = useThree((s) => s.pointer)

  const tier = useMemo(() => detectTier(), [])
  const FIELD: DebrisSpec[] = useMemo(
    () => debrisField(gardenBodyCount(tier), pos[0], pos[1], pos[2]),
    [tier],
  )

  const registerBody = useCallback((i: number, b: RapierRigidBody | null) => {
    if (b) api.current.set(i, b)
    else api.current.delete(i)
  }, [])

  const handleGrab = useCallback(
    (e: ThreeEvent<PointerEvent>, body: RapierRigidBody | null) => {
      e.stopPropagation()
      if (!body) return
      grabbed.current = { body, planeZ: e.point.distanceTo(camera.position) }
      document.body.style.cursor = 'grabbing'
      // touch-action must be none'd on every element the browser computes
      // gestures against — App.tsx wraps the canvas in a fixed div that sits
      // atop it, so canvas-only toggling lets pointercancel kill touch grabs.
      const els = [gl.domElement, gl.domElement.parentElement, document.body]
      els.forEach((el) => {
        if (el) el.style.touchAction = 'none'
      })
    },
    [camera, gl],
  )

  // release: window-level so drags ending off-mesh still throw naturally
  useEffect(() => {
    const release = () => {
      const g = grabbed.current
      if (!g) return
      const lv = g.body.linvel()
      const v = clampLen(new THREE.Vector3(lv.x, lv.y, lv.z), MAX_THROW_SPEED)
      g.body.setLinvel(v, true)
      grabbed.current = null
      document.body.style.cursor = ''
      // '' restores stylesheet/default on every gesture-relevant element
      const els = [gl.domElement, gl.domElement.parentElement, document.body]
      els.forEach((el) => {
        if (el) el.style.touchAction = ''
      })
    }
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    return () => {
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
  }, [gl])

  useFrame(() => {
    const g = grabbed.current
    if (!g) return
    // unproject current pointer onto the sphere at the recorded grab distance
    _ndc.set(pointer.x, pointer.y, 0.5).unproject(camera)
    _dir.copy(_ndc).sub(camera.position).normalize()
    _target.copy(camera.position).addScaledVector(_dir, g.planeZ)
    const t = g.body.translation()
    _delta.set(_target.x - t.x, _target.y - t.y, _target.z - t.z).multiplyScalar(GRAB_GAIN)
    const v = clampLen(_delta, MAX_DRAG_SPEED)
    g.body.setLinvel({ x: v.x, y: v.y, z: v.z }, true)
    // gentle tumble while dragged: grab-FOLLOW-TUMBLE-collide
    g.body.setAngvel({ x: v.z * 0.6, y: 0, z: -v.x * 0.6 }, true)
  })

  return (
    <Physics gravity={[0, -9.81, 0]}>
      <group>
        {/* invisible arena floor so debris settles at island height */}
        <CuboidCollider args={[7, 0.3, 7]} position={[pos[0], pos[1] - 0.4, pos[2]]} />
        {FIELD.map((d, i) => (
          <Debris key={i} d={d} i={i} registerBody={registerBody} onGrab={handleGrab} />
        ))}
        {/* ember glow for debris visibility */}
        <pointLight intensity={4} distance={8} color="#E8A05C" position={[pos[0] + 2, pos[1] + 2.5, pos[2]]} />
      </group>
    </Physics>
  )
}
