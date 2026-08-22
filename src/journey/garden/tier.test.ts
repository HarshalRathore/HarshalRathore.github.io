import { describe, expect, it } from 'vitest'
import { detectTier, gardenBodyCount } from './tier'

describe('quality tier detection', () => {
  it('caps low-end devices', () => {
    expect(detectTier({ dpr: 3, cores: 4, memoryGB: 4 })).toBe('low')
    expect(detectTier({ cores: 2, memoryGB: 8, dpr: 1 })).toBe('low')
    expect(gardenBodyCount('low')).toBeLessThan(gardenBodyCount('high'))
  })
  it('keeps capable devices high', () => {
    expect(detectTier({ dpr: 1, cores: 16, memoryGB: 16 })).toBe('high')
    expect(detectTier({ dpr: 1, cores: 8, memoryGB: 8 })).toBe('mid')
  })
})
