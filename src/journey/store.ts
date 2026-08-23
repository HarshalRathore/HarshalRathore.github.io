import { create } from 'zustand'

/**
 * Journey Store — THE single logical seam of the app.
 * All narrative/gameplay logic lives here as pure functions of scrollProgress.
 * Camera rig, sky dome, islands, Dusty and the HUD are renderers of this state.
 * See docs/validation-contract.md slice JRN for behavioral assertions.
 */

export const WAYPOINT_COUNT = 7

export const WAYPOINTS = [
  'Arrival Shore',
  'Open Source Ridge',
  'Monument Valley',
  'Outpost',
  'Hackathon Peaks',
  'Writing Grove',
  'Lighthouse',
] as const

export type WaypointName = (typeof WAYPOINTS)[number]

/** Light-stage blend: 0 = Golden Hour (A), 0.5 = Dusk (B), 1 = Blue Hour (C) */
export type LightStage = number

export interface JourneyState {
  /** 0..1 normalized scroll position of the whole page */
  scrollProgress: number
  /** 1..7 active island */
  activeWaypoint: number
  /** 0..1 golden→dusk→blue blend derived from scrollProgress */
  lightStage: LightStage
  /** Gravity Garden proximity flag */
  gardenActive: boolean
  /** device quality tier preset (final selection logic lands in ticket #14) */
  qualityTier: 'high' | 'laptop' | 'mobile-std' | 'mobile-low'
  soundOn: boolean
  /** ids of the hidden crystals found so far (EGG-C-001, issue #13) */
  crystalsFound: string[]
  /** Konami-code forced-night override — reversible (EGG-K-001, issue #13) */
  konamiNight: boolean
  /** transient achievement toast; `id` lets the host re-trigger announcements */
  toast: { msg: string; id: number } | null
  reducedMotion: boolean
}

interface JourneyActions {
  setScrollProgress: (p: number) => void
  toggleSound: () => void
  foundCrystal: (id: string) => void
  toggleKonami: () => void
  clearToast: () => void
}

/**
 * Pure mapping: progress → waypoint. Monotonic; never regresses for increasing input.
 * JRN-C-001: waypoints [0,.16,.33,.5,.66,.83,1] → islands [1..7].
 */
export function waypointFromProgress(p: number): number {
  const clamped = Math.min(1, Math.max(0, p))
  return Math.min(WAYPOINT_COUNT, Math.floor(clamped * WAYPOINT_COUNT) + 1)
}

/**
 * Pure mapping: progress → light stage. SKY-C-001 anchors:
 * p=0 → 0 (pure Golden), p=.5 → .5 (Dusk mix), p=1 → 1 (pure Blue).
 */
export function lightStageFromProgress(p: number): LightStage {
  return Math.min(1, Math.max(0, p))
}

export function isGardenActive(p: number): boolean {
  // Monument Valley spans waypoints 3–4; garden sits at its edge (~p .40–.55)
  return p >= 0.4 && p <= 0.55
}

export function nextWaypointFrom(n: number): number {
  return Math.min(WAYPOINT_COUNT, n + 1)
}

export function prevWaypointFrom(n: number): number {
  return Math.max(1, n - 1)
}

export const useJourneyStore = create<JourneyState & JourneyActions>((set) => ({
  scrollProgress: 0,
  activeWaypoint: 1,
  lightStage: 0,
  gardenActive: false,
  qualityTier: 'high',
  soundOn: false,
  crystalsFound: [],
  konamiNight: false,
  toast: null,
  reducedMotion: false,
  setScrollProgress: (p) =>
    set({
      scrollProgress: p,
      activeWaypoint: waypointFromProgress(p),
      lightStage: lightStageFromProgress(p),
      gardenActive: isGardenActive(p),
    }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  foundCrystal: (id) =>
    set((s) =>
      s.crystalsFound.includes(id)
        ? {}
        : {
            crystalsFound: [...s.crystalsFound, id],
            toast: { msg: `✦ crystal found · ${s.crystalsFound.length + 1} / 5`, id: Date.now() },
          },
    ),
  toggleKonami: () =>
    set((s) => ({
      konamiNight: !s.konamiNight,
      toast: { msg: s.konamiNight ? 'the sun returns' : 'ancient winds shift — night falls', id: Date.now() },
    })),
  clearToast: () => set({ toast: null }),
}))
