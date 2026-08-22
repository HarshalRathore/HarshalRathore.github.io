import { describe, it, expect } from 'vitest'
import { FX_STACK } from './FX'

describe('fx stack composition (FX-C-001)', () => {
  it('is exactly ACES + grain + vignette', () => {
    expect(FX_STACK).toHaveLength(3)
    expect(FX_STACK).toContain('ACES')
    expect(FX_STACK).toContain('grain')
    expect(FX_STACK).toContain('vignette')
  })
  it('contains zero bloom on any tier (retired, not a switch)', () => {
    const joined = FX_STACK.join(' ').toLowerCase()
    expect(joined).not.toContain('bloom')
  })
})
