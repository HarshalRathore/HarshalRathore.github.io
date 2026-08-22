import { describe, it, expect } from 'vitest'
import { grassScatter } from './hero'
describe('hero foliage scatter', () => {
  it('produces exactly count blades inside the disc (HERO-C-001)', () => {
    const blades = grassScatter(420, 3.8)
    expect(blades).toHaveLength(420)
    for (const b of blades) expect(Math.hypot(b.x, b.z)).toBeLessThanOrEqual(3.8 + 1e-9)
  })
  it('is deterministic for a given seed', () => {
    expect(grassScatter(50, 2, 7)).toEqual(grassScatter(50, 2, 7))
  })
})
