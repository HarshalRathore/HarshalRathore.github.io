// Pure reducer module for issue #12 preloader progress.
// Milestone-driven honest progress — never timers-as-fake-progress.
// PRE-C-001: weighted monotonic progress. PRE-H-001: stall guard via rotating lines.

export interface ProgressInput {
  htmlMounted: boolean
  interactive: boolean
  complete: boolean
  firstFrame: boolean
  managerFraction: number | null
}

/** Milestones: HTML mounted 5 -> interactive 55 -> load 85 -> first rendered frame 100. */
export function targetPercent(i: ProgressInput): number {
  let t = i.htmlMounted ? 5 : 0
  if (i.interactive) t = 55
  if (i.complete) t = Math.max(t, 85)
  if (i.managerFraction !== null && i.interactive) t = Math.max(t, 55 + Math.floor(i.managerFraction * 30))
  if (i.firstFrame) return 100
  return Math.min(t, 99)
}

/**
 * Exponential ease toward target. Displayed value NEVER decreases (running max),
 * never overshoots, and only ever reaches 100 when target is 100 (real completion).
 */
export function easeStep(current: number, target: number, deltaSeconds: number): number {
  const next = current + (target - current) * (1 - Math.pow(0.88, deltaSeconds * 60))
  return Math.max(current, Math.min(next, target === 100 ? 100 : 99))
}

export const WHIMSY_LINES = [
  'CONJURING GRAVITY…',
  'TEACHING DUSTY TO FLOAT…',
  'CALIBRATING SUNSETS…',
  'COUNTING GRAINS OF SAND…',
  'WARMING THE EMBER…',
  'FOLDING THE HORIZON…',
] as const

/** Rotating status line every 2.5s — structural stall guard (visible change >= every 5s). */
export function whimsyLine(elapsedMs: number): string {
  const idx = Math.floor(elapsedMs / 2500) % WHIMSY_LINES.length
  return WHIMSY_LINES[idx] ?? WHIMSY_LINES[0]!
}

export interface LoadingManagerLike {
  onProgress: ((url: string, loaded: number, total: number) => void) | null
}

/**
 * Future-proof weighting hook: maps a THREE.DefaultLoadingManager-style manager's
 * item progress into an extra virtual milestone between M_INTERACTIVE (55) and
 * M_COMPLETE (85), so GLBs (#19) automatically claim progress share later.
 * If zero items ever load through it, it contributes nothing (honest).
 * Returns an unbind function.
 */
export function bindLoadingManager(
  manager: LoadingManagerLike,
  onFraction: (fraction: number | null) => void,
): () => void {
  const handler = (url: string, loaded: number, total: number) => {
    void url
    if (!Number.isFinite(total) || total <= 0) {
      onFraction(null)
      return
    }
    if (loaded >= total) {
      onFraction(null)
      return
    }
    onFraction(Math.min(0.999, loaded / total))
  }
  manager.onProgress = handler
  return () => {
    if (manager.onProgress === handler) manager.onProgress = null
  }
}
