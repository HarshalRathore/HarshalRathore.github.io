import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useJourneyStore } from '../store'
import { ladderStep, selectTier, tierDprCap } from './ladder'

/**
 * Issue #14 part A — adaptive DPR ladder driven from inside the render loop.
 *
 * PERF-A-001 contract:
 *  - ring buffer of the last 60 frame times; avg of the most recent ~30
 *  - step down one rung when avg > 22 ms sustained ≥ 3 s (hotMs)
 *  - recover one rung after ≥ 5 s stable < 14 ms (coolMs)
 *  - DPR never exceeds the selected capability tier's cap (tierDprCap)
 *  - a manual qualityPref ('high'|'mid'|'low') bypasses the ladder entirely
 *
 * Telemetry for orchestrator verification (PART B gates read these):
 *   window.__fps, window.__dpr, window.__drawCalls
 */

declare global {
  interface Window {
    __fps?: number
    __dpr?: number
    __drawCalls?: number
  }
}

/** store preset → ladder tier. 'laptop' behaves like a mid machine, mobile presets clamp low. */
function presetToLadderTier(preset: string): 'low' | 'mid' | 'high' {
  if (preset === 'mobile-std' || preset === 'mobile-low') return 'low'
  if (preset === 'laptop') return 'mid'
  return selectTier(
    typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? 4 : 4,
    typeof navigator !== 'undefined' ? (navigator as { deviceMemory?: number }).deviceMemory ?? 8 : 8,
    typeof window !== 'undefined' ? window.devicePixelRatio : 2,
  )
}

const RING_LEN = 60
const AVG_WINDOW = 30

export default function AdaptivePerf() {
  const gl = useThree((s) => s.gl)
  const timesRef = useRef<Float32Array>(new Float32Array(RING_LEN))
  const countRef = useRef(0)
  const headRef = useRef(0)
  const lastRef = useRef<number | null>(null)
  const hotRef = useRef(0)
  const coolRef = useRef(0)
  const accRef = useRef(0)
  const teleAccRef = useRef(0)

  const curRungRef = useRef(0)
  const appliedDprRef = useRef(1)

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime
    const dt = Number.isFinite(delta) && delta > 0 ? delta : 1 / 60
    const ms = dt * 1000

    // --- ring buffer + rolling average -----------------------------------
    const times = timesRef.current
    times[headRef.current] = ms
    headRef.current = (headRef.current + 1) % RING_LEN
    if (countRef.current < RING_LEN) countRef.current += 1
    const windowLen = Math.min(AVG_WINDOW, countRef.current)
    let sum = 0
    for (let i = 0; i < windowLen; i++) sum += times[i]!
    const avgMs = sum / windowLen

    // --- hot/cool timers --------------------------------------------------
    if (avgMs > 22) {
      hotRef.current += ms
      coolRef.current = 0
    } else if (avgMs < 14) {
      coolRef.current += ms
      hotRef.current = 0
    } else {
      hotRef.current = 0
      coolRef.current = 0
    }

    void now
    void lastRef

    // --- decide at ~2 Hz ----------------------------------------------------
    accRef.current += ms
    if (accRef.current >= 500) {
      accRef.current -= 500
      const w = window as unknown as { __dpr?: number }
      const pref = useJourneyStore.getState().qualityPref
      let wantDpr: number
      if (pref !== 'auto') {
        // manual override — ladder skipped entirely, DPR locked to the pref's cap
        wantDpr = tierDprCap(pref)
      } else {
        const preset = useJourneyStore.getState().qualityTier
        const cap = tierDprCap(presetToLadderTier(preset))
        const res = ladderStep(curRungRef.current, avgMs, hotRef.current, coolRef.current, cap)
        curRungRef.current = res.rungIdx
        wantDpr = res.dpr
      }
      if (Math.abs(wantDpr - appliedDprRef.current) > 1e-6) {
        appliedDprRef.current = wantDpr
        gl.setPixelRatio(wantDpr)
        useJourneyStore.getState().setQualityDpr(wantDpr)
        w.__dpr = wantDpr
      }
    }

    // --- telemetry at ~1 Hz -----------------------------------------------
    teleAccRef.current += ms
    if (teleAccRef.current >= 1000) {
      teleAccRef.current = 0
      ;(window as unknown as { __fps?: number }).__fps = Math.round(1000 / avgMs)
      ;(window as unknown as { __drawCalls?: number }).__drawCalls = gl.info.render.calls
    }
  })

  // keep telemetry honest when a manual override is active from first frame
  useEffect(() => {
    const w = window as unknown as { __dpr?: number }
    const pref = useJourneyStore.getState().qualityPref
    if (pref !== 'auto') {
      const dpr = tierDprCap(pref)
      appliedDprRef.current = dpr
      gl.setPixelRatio(dpr)
      useJourneyStore.getState().setQualityDpr(dpr)
      w.__dpr = dpr
    }
  }, [gl])

  return null
}
