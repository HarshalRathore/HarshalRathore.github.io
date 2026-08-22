import { describe, it, expect } from 'vitest'
import { paletteAtStage, rgbCss } from './palettes'
describe('day-night palette rig', () => {
  it('anchors pure palettes at stages 0 / 0.5 / 1 (SKY-C-001)', () => {
    const a = paletteAtStage(0); expect(rgbCss(a.zenith)).toBe('rgb(111, 164, 201)')
    const b = paletteAtStage(0.5); expect(rgbCss(b.ink)).toBe('rgb(33, 29, 46)')
    const c = paletteAtStage(1); expect(rgbCss(c.zenith)).toBe('rgb(15, 31, 66)')
  })
  it('interpolates monotonically per channel', () => {
    let prev = paletteAtStage(0)
    for (let s = 0.05; s <= 1.0001; s += 0.05) {
      const cur = paletteAtStage(Math.min(s, 1))
      expect(cur.zenith[0]).toBeLessThanOrEqual(prev.zenith[0] + 1e-9)
      prev = cur
    }
  })
  it('clamps out-of-range stages', () => {
    expect(paletteAtStage(-3).ink).toEqual(paletteAtStage(0).ink)
    expect(paletteAtStage(7).ink).toEqual(paletteAtStage(1).ink)
  })
})
