import { describe, it, expect } from 'vitest'
import { KONAMI, konamiProgress, CRYSTAL_DELTAS, CRYSTAL_WAYPOINTS, crystalCount, crystalPosition } from './logic'
import { WAYPOINT_POS } from '../waypoints'

describe('konamiProgress (longest-suffix automaton)', () => {
  it('empty sequence → 0', () => {
    expect(konamiProgress([])).toBe(0)
  })

  it('single ArrowUp → 1', () => {
    expect(konamiProgress(['ArrowUp'])).toBe(1)
  })

  it('full Konami sequence → 10', () => {
    expect(konamiProgress([...KONAMI])).toBe(10)
  })

  it('bogus key after partial progress resets appropriately', () => {
    expect(konamiProgress(['ArrowUp', 'ArrowUp', 'ArrowLeft'])).toBe(0)
  })

  it('double-full sequence still reads 10 (suffix semantics)', () => {
    const double = [...KONAMI, ...KONAMI]
    expect(konamiProgress(double)).toBe(10)
  })

  it('partial suffix survives noise: up up down down left + junk + up → 1', () => {
    expect(konamiProgress([...KONAMI.slice(0, 5), 'x', 'ArrowUp'])).toBe(1)
  })
})

describe('crystal data invariants', () => {
  it('CRYSTAL_DELTAS has exactly 5 entries of [dx, dz] pairs', () => {
    expect(CRYSTAL_DELTAS).toHaveLength(5)
    for (const d of CRYSTAL_DELTAS) expect(d).toHaveLength(2)
  })

  it('CRYSTAL_WAYPOINTS has 5 indices within 0..6', () => {
    expect(CRYSTAL_WAYPOINTS).toHaveLength(5)
    for (const w of CRYSTAL_WAYPOINTS) {
      expect(w).toBeGreaterThanOrEqual(0)
      expect(w).toBeLessThanOrEqual(6)
    }
  })

  it('crystalCount dedupes ids', () => {
    expect(crystalCount(['a', 'a', 'b', 'c', 'c'])).toBe(3)
    expect(crystalCount([])).toBe(0)
  })

  it('crystalPosition offsets its waypoint anchor by the delta at y+1.9', () => {
    const pos = crystalPosition(0, WAYPOINT_POS)
    const base = WAYPOINT_POS[0]!
    const [dx, dz] = CRYSTAL_DELTAS[0]!
    expect(pos).toEqual([base[0] + dx, base[1] + 1.9, base[2] + dz])
  })
})
