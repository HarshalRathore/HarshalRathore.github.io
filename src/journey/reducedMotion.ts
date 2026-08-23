/**
 * Reduced-motion helpers (#15).
 *
 * `snapDuration` is THE seam between the OS `prefers-reduced-motion` setting
 * and every animated transition in the journey: pass the nominal tween length,
 * get 0 back when motion is reduced — callers treat 0 as "jump to target".
 */

/** Nominal palette-transition tween (sky dome + scene lights), milliseconds. */
export const PALETTE_TWEEN_MS = 240

/**
 * Duration a transition should take.
 * reduced=true → 0 (complete instantly, skip the tween); otherwise passthrough.
 */
export function snapDuration(ms: number, reduced: boolean): number {
  return reduced ? 0 : ms
}

/**
 * Pure chase step: move `current` toward `target` so that a full-range
 * (0→1) transition finishes in ~tweenMs regardless of frame rate.
 * tweenMs <= 0 snaps straight to the target (reduced-motion path).
 */
export function chaseToward(current: number, target: number, dtMs: number, tweenMs: number): number {
  if (tweenMs <= 0) return target
  const step = (Math.max(0, dtMs) / tweenMs) * 1 /* full light-stage range is [0,1] */
  if (target > current) return Math.min(target, current + step)
  return Math.max(target, current - step)
}
