import { describe, it, expect } from 'vitest'
import { paletteAtStage, rgbCss } from './palettes'
describe('day-night palette rig', () => {
  it('anchors pure palettes at stages 0 / 0.5 / 1 (SKY-C-001)', () => {
    const a = paletteAtStage(0); expect(rgbCss(a.zenith)).toBe('rgb(111, 164, 201)')
    const b = paletteAtStage(0.5); expect(rgbCss(b.ink)).toBe('rgb(33, 29, 46)')
    const c = paletteAtStage(1); expect(rgbCss(c.zenith)).toBe('rgb(15, 31, 66)')
  })
  it('is continuous across the golden/dusk segment seam (no color pops)', () => {
    const a = paletteAtStage(0.499)
    const b = paletteAtStage(0.501)
    for (const key of ['zenith', 'horizon', 'haze', 'rim', 'ink'] as const) {
      const av: number[] = a[key]
      const bv: number[] = b[key]
      for (let ch = 0; ch < 3; ch++) {
        expect(Math.abs((av[ch] ?? 0) - (bv[ch] ?? 0))).toBeLessThan(0.02)
      }
    }
  })
  it('clamps out-of-range stages', () => {
    expect(paletteAtStage(-3).ink).toEqual(paletteAtStage(0).ink)
    expect(paletteAtStage(7).ink).toEqual(paletteAtStage(1).ink)
  })
})
