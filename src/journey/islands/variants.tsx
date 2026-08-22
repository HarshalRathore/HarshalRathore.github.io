import { useMemo } from 'react'
import { grassScatter } from '../hero'

const R = 4.2

function Base({ children, tint }: { children?: React.ReactNode; tint: string }) {
  return (
    <group>
      <mesh position={[0, -6, 0]}>
        <coneGeometry args={[R, 12, 7]} />
        <meshStandardMaterial color={tint} flatShading />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[R, R * 0.92, 0.9, 9]} />
        <meshStandardMaterial color="#6d7f4f" flatShading />
      </mesh>
      {children}
    </group>
  )
}

/** wp2 Open Source Ridge — twin monoliths */
export function OssRidge() {
  return (
    <Base tint="#7d7568">
      <mesh position={[-1.4, 2.4, 0]}><boxGeometry args={[1.1, 4.8, 1.1]} /><meshStandardMaterial color="#4f5a63" flatShading /></mesh>
      <mesh position={[1.4, 3.1, 0.2]}><boxGeometry args={[1.1, 6.2, 1.1]} /><meshStandardMaterial color="#42525e" flatShading /></mesh>
      <mesh position={[-1.4, 5.05, 0]}><icosahedronGeometry args={[0.18, 0]} /><meshStandardMaterial color="#E8A05C" emissive="#E8A05C" emissiveIntensity={0.6} /></mesh>
      <mesh position={[1.4, 6.45, 0.2]}><icosahedronGeometry args={[0.18, 0]} /><meshStandardMaterial color="#E8A05C" emissive="#E8A05C" emissiveIntensity={0.6} /></mesh>
    </Base>
  )
}

/** wp3 Monument Valley — tiered mesa */
export function MonumentValley() {
  return (
    <Base tint="#9a6b4f">
      <mesh position={[0, 1.4, 0]}><cylinderGeometry args={[3.1, 3.4, 1.1, 8]} /><meshStandardMaterial color="#a57b5b" flatShading /></mesh>
      <mesh position={[0, 2.5, 0]}><cylinderGeometry args={[2.1, 2.4, 1.0, 8]} /><meshStandardMaterial color="#96704f" flatShading /></mesh>
      <mesh position={[0, 3.5, 0]}><cylinderGeometry args={[1.2, 1.5, 0.9, 8]} /><meshStandardMaterial color="#8a6547" flatShading /></mesh>
      <mesh position={[0, 4.15, 0]}><icosahedronGeometry args={[0.22, 0]} /><meshStandardMaterial color="#E8A05C" emissive="#E8A05C" emissiveIntensity={0.6} /></mesh>
    </Base>
  )
}

/** wp4 Outpost — hut + mast */
export function Outpost() {
  return (
    <Base tint="#77706a">
      <mesh position={[-1.2, 1.15, 0.6]}><boxGeometry args={[2.2, 1.5, 1.8]} /><meshStandardMaterial color="#8a6f52" flatShading /></mesh>
      <mesh position={[-1.2, 2.35, 0.6]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[1.7, 1.0, 4]} /><meshStandardMaterial color="#5d4a36" flatShading /></mesh>
      <mesh position={[1.6, 2.2, -0.4]}><cylinderGeometry args={[0.07, 0.09, 3.6, 6]} /><meshStandardMaterial color="#55504a" flatShading /></mesh>
      <mesh position={[2.0, 3.6, -0.4]}><boxGeometry args={[0.7, 0.42, 0.03]} /><meshStandardMaterial color="#E8A05C" emissive="#E8A05C" emissiveIntensity={0.45} /></mesh>
    </Base>
  )
}

/** wp5 Hackathon Peaks — three ascending spires */
export function HackathonPeaks() {
  return (
    <Base tint="#6f7a72">
      <mesh position={[-2.0, 1.7, -0.5]}><coneGeometry args={[1.0, 3.6, 5]} /><meshStandardMaterial color="#5d685f" flatShading /></mesh>
      <mesh position={[0.2, 2.7, 0.3]}><coneGeometry args={[1.15, 5.2, 5]} /><meshStandardMaterial color="#54606f" flatShading /></mesh>
      <mesh position={[2.2, 3.6, -0.2]}><coneGeometry args={[0.95, 6.4, 5]} /><meshStandardMaterial color="#49566b" flatShading /></mesh>
      <mesh position={[2.2, 7.0, -0.2]}><icosahedronGeometry args={[0.2, 0]} /><meshStandardMaterial color="#E8A05C" emissive="#E8A05C" emissiveIntensity={0.65} /></mesh>
    </Base>
  )
}

/** wp6 Writing Grove — tree cluster on scattered positions */
export function WritingGrove() {
  const trees = useMemo(() => grassScatter(7, R - 1.1, 99), [])
  return (
    <Base tint="#6a7a5a">
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0.4, t.z]} scale={t.scale * 1.4}>
          <mesh position={[0, 0.7, 0]}><cylinderGeometry args={[0.09, 0.13, 1.4, 6]} /><meshStandardMaterial color="#5d4a36" flatShading /></mesh>
          <mesh position={[0, 1.9, 0]}><coneGeometry args={[0.85, 1.9, 7]} /><meshStandardMaterial color="#4f7042" flatShading /></mesh>
        </group>
      ))}
    </Base>
  )
}

/** wp7 Lighthouse — tower + beacon */
export function Lighthouse() {
  return (
    <Base tint="#6b7280">
      <mesh position={[0, 2.6, 0]}><cylinderGeometry args={[0.62, 0.95, 5.2, 10]} /><meshStandardMaterial color="#cfc6b8" flatShading /></mesh>
      <mesh position={[0, 4.4, 0]}><cylinderGeometry args={[0.64, 0.64, 0.5, 10]} /><meshStandardMaterial color="#a4443c" flatShading /></mesh>
      <mesh position={[0, 5.55, 0]}><icosahedronGeometry args={[0.34, 0]} /><meshStandardMaterial color="#E8A05C" emissive="#E8A05C" emissiveIntensity={1.1} /></mesh>
      <pointLight position={[0, 5.55, 0]} color="#FFD9A0" intensity={14} distance={26} />
    </Base>
  )
}

export const ISLAND_VARIANTS = [OssRidge, MonumentValley, Outpost, HackathonPeaks, WritingGrove, Lighthouse] as const
