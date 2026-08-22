import { describe, it, expect } from 'vitest'
import {
  waypointFromProgress,
  lightStageFromProgress,
  isGardenActive,
} from './store'

describe('Journey Store pure functions', () => {
  // JRN-C-001
  it('maps scroll fractions monotonically to waypoints 1→7', () => {
    const stops = [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1]
    expect(stops.map(waypointFromProgress)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('never regresses waypoint for increasing input', () => {
    let prev = 0
    for (let p = 0; p <= 1.0001; p += 0.001) {
      const w = waypointFromProgress(p)
      expect(w).toBeGreaterThanOrEqual(prev)
      prev = w
    }
  })

  it('clamps out-of-range progress safely', () => {
    expect(waypointFromProgress(-0.5)).toBe(1)
    expect(waypointFromProgress(42)).toBe(7)
  })

  // JRN-C-002 / SKY-C-001 anchors
  it('anchors the day-night blend at journey ends and middle', () => {
    expect(lightStageFromProgress(0)).toBeCloseTo(0)
    expect(lightStageFromProgress(0.5)).toBeCloseTo(0.5)
    expect(lightStageFromProgress(1)).toBeCloseTo(1)
  })

  // garden window
  it('activates Gravity Garden only inside Monument Valley edge band', () => {
    expect(isGardenActive(0.2)).toBe(false)
    expect(isGardenActive(0.45)).toBe(true)
    expect(isGardenActive(0.9)).toBe(false)
  })
})
