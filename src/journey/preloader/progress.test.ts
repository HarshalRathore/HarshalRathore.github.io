import { describe, it, expect } from 'vitest'
import { targetPercent, easeStep, whimsyLine, WHIMSY_LINES, bindLoadingManager } from './progress'

const base = {
  htmlMounted: false,
  interactive: false,
  complete: false,
  firstFrame: false,
  managerFraction: null,
}

describe('targetPercent milestone ordering (PRE-C-001)', () => {
  it('nothing reached = 0', () => {
    expect(targetPercent(base)).toBe(0)
  })
  it('mounted-only = 5', () => {
    expect(targetPercent({ ...base, htmlMounted: true })).toBe(5)
  })
  it('+interactive = 55 (dominates mounted)', () => {
    expect(targetPercent({ ...base, htmlMounted: true, interactive: true })).toBe(55)
  })
  it('+complete = 85 (dominates interactive)', () => {
    expect(targetPercent({ ...base, htmlMounted: true, interactive: true, complete: true })).toBe(85)
  })
  it('firstFrame forces exactly 100 even if everything else is false', () => {
    expect(targetPercent({ ...base, firstFrame: true })).toBe(100)
    expect(targetPercent({ ...base, htmlMounted: true, interactive: true, complete: true, managerFraction: 0.9, firstFrame: true })).toBe(
      100,
    )
  })
})

describe('managerFraction weighting between interactive and complete', () => {
  it('raises target into [55..84] range when interactive (0.5 -> 70)', () => {
    expect(targetPercent({ ...base, interactive: true, managerFraction: 0.5 })).toBe(70)
  })
  it('fraction near 1 lands just below complete (84) so load still owns its share', () => {
    // binding clamps in-flight fractions to <= 0.999 -> floor(0.999*30)=29
    expect(targetPercent({ ...base, interactive: true, managerFraction: 0.999 })).toBe(84)
  })
  it('ignored when not interactive', () => {
    expect(targetPercent({ ...base, managerFraction: 0.5 })).toBe(0)
    expect(targetPercent({ ...base, htmlMounted: true, managerFraction: 0.99 })).toBe(5)
  })
  it('never exceeds complete milestone when complete also fired', () => {
    expect(targetPercent({ ...base, interactive: true, complete: true, managerFraction: 0.5 })).toBe(85)
  })
})

describe('honest cap without firstFrame', () => {
  it('target never exceeds 99 unless firstFrame fired', () => {
    for (let f = 0; f <= 1.0001; f += 0.05) {
      const t = targetPercent({ ...base, htmlMounted: true, interactive: true, complete: true, managerFraction: f })
      expect(t).toBeLessThanOrEqual(99)
    }
    expect(targetPercent({ ...base, htmlMounted: true, interactive: true, complete: true })).toBeLessThan(100)
  })
})

describe('easeStep monotonic eased display', () => {
  it('approaches target and never goes below current (running max)', () => {
    const v = easeStep(10, 85, 1 / 60)
    expect(v).toBeGreaterThan(10)
    expect(v).toBeLessThanOrEqual(85)
    // a step "toward" a lower target must NOT decrease
    const back = easeStep(v, 12, 1)
    expect(back).toBeGreaterThanOrEqual(v)
    expect(easeStep(98, 85, 1)).toBeGreaterThanOrEqual(98)
    expect(easeStep(10, 85, 5)).toBeGreaterThanOrEqual(10)
  })
  it('never overshoots the target', () => {
    expect(easeStep(90, 95, 60)).toBeLessThanOrEqual(95)
    expect(easeStep(0, 55, 600)).toBeLessThanOrEqual(55)
  })
  it('reaches 100 only when target is 100', () => {
    // long enough time that the exponential would converge past any finite bound
    expect(easeStep(50, 100, 600)).toBe(100)
    expect(easeStep(50, 99, 600)).toBeLessThanOrEqual(99)
    expect(easeStep(98, 85, 600)).toBeLessThanOrEqual(99)
  })
  it('delta of zero keeps value pinned at current', () => {
    expect(easeStep(42, 85, 0)).toBe(42)
  })
})

describe('whimsyLine rotation (structural stall guard)', () => {
  it('changes over time and stays within the known set', () => {
    const a = whimsyLine(0)
    const b = whimsyLine(2600)
    expect(a).not.toBe(b)
    expect(WHIMSY_LINES).toContain(a as never)
    expect(WHIMSY_LINES).toContain(b as never)
  })
  it('returns string type and wraps modulo the line count', () => {
    const s: string = whimsyLine(123456)
    expect(typeof s).toBe('string')
    expect(WHIMSY_LINES.length).toBeGreaterThanOrEqual(2)
    expect(s === whimsyLine(123456 + WHIMSY_LINES.length * 2500)).toBe(true)
  })
})

describe('bindLoadingManager future-proof hook (#19 GLBs)', () => {
  it('maps loaded/total to fraction while items are in flight', () => {
    let captured: number | null | undefined
    const manager = { onProgress: null as ((url: string, loaded: number, total: number) => void) | null }
    const unbind = bindLoadingManager(manager, (f) => {
      captured = f
    })
    manager.onProgress?.('model.glb', 3, 4)
    expect(captured).toBeCloseTo(0.75)
    unbind()
  })
  it('contributes nothing (null) once all items are done — honest progress', () => {
    let captured: number | null | undefined
    const manager = { onProgress: null as ((url: string, loaded: number, total: number) => void) | null }
    bindLoadingManager(manager, (f) => {
      captured = f
    })
    manager.onProgress?.('model.glb', 4, 4)
    expect(captured).toBeNull()
  })
})
