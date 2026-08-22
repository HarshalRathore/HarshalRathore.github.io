import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import { WAYPOINT_POS } from '../waypoints'
import { debrisField, type DebrisSpec } from './debris'

const pos = WAYPOINT_POS[2]!
const COLORS = ['#a57b5b', '#8a7968', '#6d7f4f', '#96704f', '#7d7568']

const FIELD: DebrisSpec[] = debrisField(24, pos[0], pos[1], pos[2])

function Debris({ d, i }: { d: DebrisSpec; i: number }) {
  const color = COLORS[i % COLORS.length]
  if (d.shape === 'rock') {
    return (
      <RigidBody position={[d.x, d.y, d.z]} restitution={d.restitution} friction={0.8}>
        <mesh castShadow>
          <icosahedronGeometry args={[d.scale, 0]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      </RigidBody>
    )
  }
  if (d.shape === 'plank') {
    return (
      <RigidBody position={[d.x, d.y, d.z]} restitution={d.restitution}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.14, 0.42]} />
          <meshStandardMaterial color="#8a6f52" flatShading />
        </mesh>
      </RigidBody>
    )
  }
  return (
    <RigidBody position={[d.x, d.y, d.z]} restitution={d.restitution} friction={0.7}>
      <mesh castShadow>
        <boxGeometry args={[d.scale, d.scale, d.scale]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </RigidBody>
  )
}

export default function GravityGarden() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <group>
        {/* invisible arena floor so debris settles at island height */}
        <CuboidCollider args={[7, 0.3, 7]} position={[pos[0], pos[1] - 0.4, pos[2]]} />
        {FIELD.map((d, i) => (
          <Debris key={i} d={d} i={i} />
        ))}
      </group>
    </Physics>
  )
}
