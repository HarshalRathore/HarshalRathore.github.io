import { describe, it, expect } from 'vitest'
import { debrisField } from './debris'

describe('gravity garden debris field', () => {
  it('spawns exactly count bodies within the arena bounds', () => {
    const f = debrisField(24, 0, 4, 0)
    expect(f).toHaveLength(24)
    for (const d of f) {
      expect(Math.abs(d.x)).toBeLessThanOrEqual(5.001)
      expect(Math.abs(d.z)).toBeLessThanOrEqual(5.001)
      expect(d.y).toBeGreaterThanOrEqual(7 - 1e-9)
    }
  })

  it('is deterministic per seed', () => {
    // NOTE(#9): ticket draft compared centers (cy=4 vs cy=0), which can never
    // match since y = cy + 3 + rnd()*4. Determinism means same seed => same field.
    expect(debrisField(10, 0, 4, 0)).toEqual(debrisField(10, 0, 4, 0))
    expect(debrisField(10, 0, 4, 0)).not.toEqual(debrisField(10, 0, 4, 0, 7))
  })
})
