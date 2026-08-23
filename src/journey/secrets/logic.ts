import type { Vec3 } from '../waypoints'

/**
 * Secrets logic (issue #13, contract EGG-C-001): pure functions only —
 * no React, no DOM, no store access. Everything here is unit-testable.
 */

export const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'] as const

/** Longest suffix of `seq` that matches a prefix of KONAMI (standard automaton step). */
export function konamiProgress(seq: readonly string[]): number {
  for (let len = Math.min(seq.length, KONAMI.length); len > 0; len--) {
    let ok = true
    for (let i = 0; i < len; i++) {
      if (seq[seq.length - len + i] !== KONAMI[i]) {
        ok = false
        break
      }
    }
    if (ok) return len
  }
  return 0
}

export const CRYSTAL_DELTAS: [number, number][] = [
  [1.8, -0.5],
  [-2.0, 0.8],
  [0.5, 1.7],
  [-1.2, -1.5],
  [2.2, 0.3],
]

/** Waypoint index (0-based) each crystal hides beside: hero, monument, peaks, grove, lighthouse */
export const CRYSTAL_WAYPOINTS = [0, 2, 4, 5, 6] as const

export function crystalCount(ids: readonly string[]): number {
  return new Set(ids).size
}

/** World position of crystal i: its waypoint anchor lifted ~2 units into the air. */
export function crystalPosition(i: number, waypointPos: readonly Vec3[]): Vec3 {
  const base = waypointPos[i]!
  const [dx, dz] = CRYSTAL_DELTAS[i]!
  return [base[0] + dx, base[1] + 1.9, base[2] + dz]
}
