export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
export interface GrassBlade { x: number; z: number; rot: number; scale: number }
/** Deterministic scatter of grass blade transforms inside a disc. HERO-C-001 tested. */
export function grassScatter(count: number, radius: number, seed = 42): GrassBlade[] {
  const rnd = mulberry32(seed)
  const out: GrassBlade[] = []
  for (let i = 0; i < count; i++) {
    const ang = rnd() * Math.PI * 2
    const r = Math.sqrt(rnd()) * radius
    out.push({ x: Math.cos(ang) * r, z: Math.sin(ang) * r, rot: rnd() * Math.PI, scale: 0.6 + rnd() * 0.8 })
  }
  return out
}
