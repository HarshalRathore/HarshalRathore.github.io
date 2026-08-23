import { describe, expect, it } from 'vitest'
import { DPR_LADDER, ladderStep, selectTier, tierDprCap } from './ladder'

describe('capability tier selection (#14 part A)', () => {
  // boundary semantics mirror the garden tier tests: <= counts as constrained
  it('selects low for constrained devices', () => {
    expect(selectTier(4, 8, 1)).toBe('low') // cores boundary
    expect(selectTier(8, 4, 1)).toBe('low') // memory boundary
    expect(selectTier(16, 16, 2.6)).toBe('low') // dpr boundary (> 2.5)
    expect(selectTier(2, 2, 3)).toBe('low')
  })

  it('selects mid for capable-but-not-high devices', () => {
    expect(selectTier(8, 8, 1)).toBe('mid') // both at boundary
    expect(selectTier(6, 8, 2.5)).toBe('mid') // dpr 2.5 is NOT > 2.5
  })

  it('selects high only for roomy devices', () => {
    expect(selectTier(16, 16, 1)).toBe('high')
    expect(selectTier(12, 8, 1)).toBe('high')
    expect(selectTier(8, 16, 1)).toBe('high') // cores ok but memory above 8
  })
})

describe('tier DPR caps (#14 part A)', () => {
  it('caps by tier', () => {
    expect(tierDprCap('high')).toBe(2)
    expect(tierDprCap('mid')).toBe(1.5)
    expect(tierDprCap('low')).toBe(1)
  })
})

describe('adaptive DPR ladder (#14 part A)', () => {
  it('stays put when avg is healthy regardless of timers', () => {
    expect(ladderStep(1, 18, 99999, 99999, 2)).toEqual({ rungIdx: 1, dpr: 0.75 })
    expect(ladderStep(0, 18, 0, 0, 2)).toEqual({ rungIdx: 0, dpr: 1 })
  })

  it('steps down only after avgMs > 22 AND hotMs >= 3000', () => {
    // hot but timer short
    expect(ladderStep(0, 25, 2999, 0, 2)).toEqual({ rungIdx: 0, dpr: 1 })
    // timer long but avg recovered
    expect(ladderStep(0, 20, 9999, 0, 2)).toEqual({ rungIdx: 0, dpr: 1 })
    // both conditions met → one rung down
    expect(ladderStep(0, 25, 3000, 0, 2)).toEqual({ rungIdx: 1, dpr: 0.75 })
    expect(ladderStep(1, 40, 6000, 0, 2)).toEqual({ rungIdx: 2, dpr: 0.6 })
  })

  it('recovers one rung only after avgMs < 14 AND coolMs >= 5000', () => {
    // cool but timer short
    expect(ladderStep(1, 13, 0, 4999, 2)).toEqual({ rungIdx: 1, dpr: 0.75 })
    // timer long but avg too slow
    expect(ladderStep(1, 15, 0, 9999, 2)).toEqual({ rungIdx: 1, dpr: 0.75 })
    // both met → one rung up, never two
    expect(ladderStep(1, 13, 0, 5000, 2)).toEqual({ rungIdx: 0, dpr: 1 })
  })

  it('never exceeds the tier cap (low tier caps at 1 even at rung 0)', () => {
    const res = ladderStep(0, 18, 0, 0, 1)
    expect(res.dpr).toBeLessThanOrEqual(1)
    expect(res.dpr).toBe(1)
    // mid-tier cap 1.5 trims nothing at rung 0 (want 1.0) but bounds recovery headroom
    expect(ladderStep(0, 18, 0, 0, 1.5).dpr).toBe(1)
  })

  it('clamps at the bottom rung', () => {
    const res = ladderStep(3, 30, 9999, 0, 2)
    expect(res.rungIdx).toBe(3)
    expect(res.dpr).toBe(DPR_LADDER[3])
  })
})
