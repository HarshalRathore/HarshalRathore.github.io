import { useEffect, useRef } from 'react'
import { useJourneyStore } from '../store'
import { KONAMI, konamiProgress } from './logic'
import { playIfArmed } from '../sound/soundBus'

/**
 * Konami-code listener (issue #13): ↑↑↓↓←→←→ba toggles the reversible
 * forced-night palette. Headless component — renders nothing.
 * EGG-C-001 restraint contract: one of exactly TWO secrets in the app.
 */
export default function Konami() {
  const seqRef = useRef<string[]>([])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seqRef.current.push(e.key)
      if (seqRef.current.length > 16) seqRef.current = seqRef.current.slice(-16)
      if (konamiProgress(seqRef.current) === KONAMI.length) {
        useJourneyStore.getState().toggleKonami()
        playIfArmed('audio/ui-tick.ogg', 0.35)
        seqRef.current = []
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return null
}
