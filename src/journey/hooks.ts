import { useEffect, useRef } from 'react'
import { useJourneyStore } from './store'

export function useScrollProgress() {
  const setScrollProgress = useJourneyStore((s) => s.setScrollProgress)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(max > 0 ? window.scrollY / max : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [setScrollProgress])
}

export interface Parallax {
  x: number
  y: number
}

export function parallaxOffset(dx: number, dy: number, reduced: boolean): Parallax {
  if (reduced) return { x: 0, y: 0 }
  return { x: dx * 0.04, y: dy * 0.04 }
}

export function usePointerParallax() {
  const ref = useRef<Parallax>({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ref.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      }
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return ref
}
