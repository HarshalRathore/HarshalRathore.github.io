import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { targetPercent, easeStep, whimsyLine, bindLoadingManager } from './progress'

interface PreloaderProps {
  done: boolean
}

/**
 * Issue #12 preloader overlay. Milestone-driven honest progress:
 * HTML mounted 5 -> interactive 55 -> window load 85 -> first rendered frame 100.
 * Displayed percent eases monotonically toward the highest reached milestone and
 * rounds DOWN, so 100% shows only on actual completion (first rendered frame).
 */
export default function Preloader({ done }: PreloaderProps) {
  const [displayed, setDisplayed] = useState(0)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [hidden, setHidden] = useState(false)
  const flagsRef = useRef({ htmlMounted: true, interactive: false, complete: false })
  const managerFractionRef = useRef<number | null>(null)
  const startRef = useRef(0)

  useEffect(() => {
    flagsRef.current.htmlMounted = true // React has mounted by the time effects run
    const doc = document
    if (doc.readyState === 'interactive' || doc.readyState === 'complete') {
      flagsRef.current.interactive = true
      if (doc.readyState === 'complete') flagsRef.current.complete = true
    }
    const onReadyState = () => {
      if (doc.readyState !== 'loading') flagsRef.current.interactive = true
    }
    const onLoad = () => {
      flagsRef.current.complete = true
    }
    doc.addEventListener('readystatechange', onReadyState)
    window.addEventListener('load', onLoad)
    const unbindManager = bindLoadingManager(THREE.DefaultLoadingManager, (f) => {
      managerFractionRef.current = f
    })

    startRef.current = performance.now()
    let raf = 0
    let last = startRef.current
    const tick = (now: number) => {
      const deltaSeconds = Math.min((now - last) / 1000, 0.25)
      last = now
      setElapsedMs(now - startRef.current)
      setDisplayed((prev) => {
        const target = targetPercent({
          htmlMounted: flagsRef.current.htmlMounted,
          interactive: flagsRef.current.interactive,
          complete: flagsRef.current.complete,
          firstFrame: false,
          managerFraction: managerFractionRef.current,
        })
        return easeStep(prev, Math.min(target, 99), deltaSeconds)
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      doc.removeEventListener('readystatechange', onReadyState)
      window.removeEventListener('load', onLoad)
      unbindManager()
    }
  }, [])

  useEffect(() => {
    if (!done) return
    // First frame rendered: snap the eased value to a real 100 via one final step.
    const id = window.setTimeout(() => setHidden(true), 700)
    return () => window.clearTimeout(id)
  }, [done])

  const shown = Math.floor(displayed)

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-auto fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-[600ms]"
      style={{
        backgroundColor: '#0A1122',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'auto',
        display: hidden ? 'none' : undefined,
      }}
      onTransitionEnd={() => {
        if (done) setHidden(true)
      }}
    >
      <h1
        className="font-display text-4xl sm:text-5xl"
        style={{ color: '#F3EDE2', letterSpacing: '0.18em' }}
      >
        HARSHAL RATHORE
      </h1>
      <p className="mt-6 font-mono text-lg" style={{ color: '#E8A05C' }}>
        {shown}%
      </p>
      <p
        className="mt-3 font-body text-xs uppercase"
        style={{ color: '#A8A29E', letterSpacing: '0.22em' }}
      >
        {whimsyLine(elapsedMs)}
      </p>
    </div>
  )
}
