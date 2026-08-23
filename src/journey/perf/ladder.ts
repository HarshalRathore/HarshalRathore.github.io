/**
 * Issue #14 part A — capability-tier selection + adaptive DPR ladder (PURE logic).
 *
 * Ladder contract:
 *  - step DOWN one rung when avg frame time > 22 ms sustained for >= 3 s (hotMs)
 *  - recover ONE rung after >= 5 s stable under 14 ms (coolMs)
 *  - never apply a DPR above the selected tier's cap
 * Kept dependency-free so it unit-tests in the node vitest environment.
 */

export const DPR_LADDER = [1.0, 0.75, 0.6, 0.45] as const

export function selectTier(cores: number, memoryGB: number, dpr: number): 'low' | 'mid' | 'high' {
  if (cores <= 4 || memoryGB <= 4 || dpr > 2.5) return 'low'
  if (cores <= 8 && memoryGB <= 8) return 'mid'
  return 'high'
}

export function tierDprCap(tier: 'low' | 'mid' | 'high'): number {
  return tier === 'high' ? 2 : tier === 'mid' ? 1.5 : 1
}

// step down when avg frame >22ms sustained; recover one rung after 5s stable <14ms; never exceed cap
export function ladderStep(
  rungIdx: number,
  avgMs: number,
  hotMs: number,
  coolMs: number,
  cap: number,
): { rungIdx: number; dpr: number } {
  let r = rungIdx
  if (avgMs > 22 && hotMs >= 3000) r = Math.min(DPR_LADDER.length - 1, r + 1)
  else if (avgMs < 14 && coolMs >= 5000 && r > 0) r = r - 1
  const want = DPR_LADDER[r]!
  const dpr = Math.min(want, cap)
  return { rungIdx: r, dpr }
}
