import { WAYPOINT_POS } from './waypoints'
import HeroIsland from './HeroIsland'

const HUES = ['#c96f4a', '#d9a066', '#8a9a5b', '#6d8ea0', '#7d6ba0', '#a07d8a', '#e8a05c']

export default function Islands() {
  return (
    <>
      <HeroIsland />
      {WAYPOINT_POS.map((pos, i) => i === 0 ? null : (
        <mesh key={i} position={pos}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color={HUES[i % HUES.length]} />
        </mesh>
      ))}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
    </>
  )
}
