import { describe, it, expect } from 'vitest'
import { dustyBehavior } from './behavior'

describe('dusty behavior resolver', () => {
  it('garden curiosity wins over night', () => {
    expect(dustyBehavior({ stageNight: true, gardenActive: true, activeWaypoint: 3 })).toBe('curious')
  })
  it('naps at night', () => {
    expect(dustyBehavior({ stageNight: false, gardenActive: false, activeWaypoint: 1 })).toBe('follow')
    expect(dustyBehavior({ stageNight: true, gardenActive: false, activeWaypoint: 1 })).toBe('nap')
  })
  it('hovers in the writing grove', () => {
    expect(dustyBehavior({ stageNight: false, gardenActive: false, activeWaypoint: 6 })).toBe('grove')
  })
  it('never naps in its home grove, even at night', () => {
    expect(dustyBehavior({ stageNight: true, gardenActive: false, activeWaypoint: 6 })).toBe('grove')
  })
})
