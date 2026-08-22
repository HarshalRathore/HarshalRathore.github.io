export type DustyBehavior = 'follow' | 'curious' | 'nap' | 'grove'

export interface DustyInput {
  stageNight: boolean
  gardenActive: boolean
  activeWaypoint: number
}

/** Pure section→behavior resolver. Garden curiosity wins over night nap. */
export function dustyBehavior(i: DustyInput): DustyBehavior {
  if (i.gardenActive) return 'curious'
  if (i.stageNight) return 'nap'
  if (i.activeWaypoint === 6) return 'grove'
  return 'follow'
}

export interface DustyParams {
  followLag: number
  bobAmp: number
  bobSpeed: number
  eyeOpen: number
  orbitRadius: number
  breathAmp: number
}

export const DUSTY_PARAMS: Record<DustyBehavior, DustyParams> = {
  follow: { followLag: 0.04, bobAmp: 0.18, bobSpeed: 1.4, eyeOpen: 1, orbitRadius: 2.6, breathAmp: 0.03 },
  curious: { followLag: 0.09, bobAmp: 0.28, bobSpeed: 2.6, eyeOpen: 1.25, orbitRadius: 1.8, breathAmp: 0.05 },
  nap: { followLag: 0.02, bobAmp: 0.05, bobSpeed: 0.5, eyeOpen: 0, orbitRadius: 3.2, breathAmp: 0.015 },
  grove: { followLag: 0.03, bobAmp: 0.12, bobSpeed: 1.0, eyeOpen: 0.35, orbitRadius: 2.2, breathAmp: 0.025 },
}
