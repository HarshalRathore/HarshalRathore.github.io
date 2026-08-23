import { describe, it, expect } from 'vitest'
import { PROJECTS } from '../content/projects'
import { snapDuration, chaseToward, PALETTE_TWEEN_MS } from './reducedMotion'
import { useJourneyStore } from './store'

// Issue #15 — accessibility sweep, pure-logic preconditions.

describe('a11y #15: keyboard overlay mapping preconditions', () => {
  it('exposes at least six projects (keys 1–6)', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(6)
  })

  it('gives every project a unique id', () => {
    const ids = PROJECTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('keeps the digit→project map total and unique', () => {
    // mirrors App.tsx Digit1..Digit6 handling
    const mapped = PROJECTS.slice(0, 6)
    expect(mapped.length).toBe(6)
    expect(new Set(mapped.map((p) => p.id)).size).toBe(6)
  })
})

describe('a11y #15: reduced-motion snap helper', () => {
  it('zeroes duration under reduced motion', () => {
    expect(snapDuration(240, true)).toBe(0)
  })

  it('passes nominal durations through otherwise', () => {
    expect(snapDuration(0, false)).toBe(0)
    expect(snapDuration(PALETTE_TWEEN_MS, false)).toBe(PALETTE_TWEEN_MS)
  })

  it('chaseToward snaps instantly when tweenMs is 0 (reduced-motion path)', () => {
    expect(chaseToward(0.2, 1, 16.7, snapDuration(PALETTE_TWEEN_MS, true))).toBe(1)
    expect(chaseToward(0.8, 0, 16.7, 0)).toBe(0)
  })

  it('chaseToward converges on target and never overshoots when tweening', () => {
    let v = 0
    for (let i = 0; i < 10000 && v !== 1; i++) v = chaseToward(v, 1, 16.7, PALETTE_TWEEN_MS)
    expect(v).toBe(1)
    expect(chaseToward(0.9, 0.5, 16.7, 240)).toBeLessThan(0.9)
    expect(chaseToward(0.9, 0.5, 16.7, 240)).toBeGreaterThanOrEqual(0.5)
  })

  it('defaults the store reducedMotion flag to false', () => {
    expect(useJourneyStore.getState().reducedMotion).toBe(false)
  })
})
