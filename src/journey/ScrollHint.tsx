import { useEffect, useState } from 'react'
import { useJourneyStore } from './store'

export default function ScrollHint() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const unsub = useJourneyStore.subscribe((s) => {
      if (s.scrollProgress > 0.02 && !scrolled) setScrolled(true)
    })
    return unsub
  }, [scrolled])
  return (
    <div
      aria-hidden
      className={`fixed bottom-5 right-5 z-10 flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-neutral-100/80 transition-opacity duration-700 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
    >
      <span style={{ writingMode: 'vertical-rl' }}>scroll</span>
      <span className="animate-bounce">▾</span>
    </div>
  )
}
