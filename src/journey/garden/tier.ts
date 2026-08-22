export type QualityTier = 'low' | 'mid' | 'high'

export function detectTier(opts?: { dpr?: number; cores?: number; memoryGB?: number }): QualityTier {
  const dpr = opts?.dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio : 2)
  const cores = opts?.cores ?? (typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? 4 : 4)
  const memoryGB =
    opts?.memoryGB ?? (typeof navigator !== 'undefined' ? (navigator as { deviceMemory?: number }).deviceMemory ?? 8 : 8)
  if (cores <= 4 || memoryGB <= 4 || dpr > 2.5) return 'low'
  if (cores <= 8 && memoryGB <= 8) return 'mid'
  return 'high'
}

export function gardenBodyCount(tier: QualityTier): number {
  return tier === 'low' ? 12 : tier === 'mid' ? 18 : 24
}
