import { mulberry32 } from '../hero'

export interface DebrisSpec {
  x: number
  y: number
  z: number
  shape: 'rock' | 'plank' | 'cube'
  scale: number
  restitution: number
}

export function debrisField(count: number, cx: number, cy: number, cz: number, seed = 100): DebrisSpec[] {
  const rnd = mulberry32(seed)
  const shapes = ['rock', 'plank', 'cube'] as const
  const out: DebrisSpec[] = []
  for (let i = 0; i < count; i++) {
    out.push({
      x: cx + (rnd() - 0.5) * 10,
      y: cy + 3 + rnd() * 4,
      z: cz + (rnd() - 0.5) * 10,
      shape: shapes[Math.floor(rnd() * 3)] ?? 'cube',
      scale: 0.32 + rnd() * 0.25,
      restitution: 0.3 + rnd() * 0.25,
    })
  }
  return out
}
