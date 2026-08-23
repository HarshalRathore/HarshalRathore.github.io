import { useCallback, useEffect, useRef } from 'react'
import { PROJECTS } from '../content/projects'
import { useOverlayStore } from '../content/overlayStore'

export default function ProjectOverlay() {
  const activeId = useOverlayStore((s) => s.activeId)
  const close = useOverlayStore((s) => s.close)
  const closeRef = useRef<HTMLButtonElement>(null)
  // focus return-to-trigger (#15): element focused just before the dialog opened
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const closeAndRestore = useCallback(() => {
    const trigger = returnFocusRef.current
    close()
    // hand focus back to whatever opened the dialog (#15); guarded for exotic hosts
    ;(trigger as HTMLElement | null)?.focus?.()
  }, [close])

  useEffect(() => {
    if (!activeId) return
    // capture the trigger BEFORE focus moves into the dialog (#15)
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAndRestore() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeId, closeAndRestore])
  if (!activeId) return null
  const p = PROJECTS.find((x) => x.id === activeId)
  if (!p) return null
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={closeAndRestore}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        className="max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-neutral-950/95 p-8 font-body text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">{p.title}</h2>
            <p className="mt-1 text-sm text-neutral-400">{p.tagline}</p>
          </div>
          <button ref={closeRef} onClick={closeAndRestore} aria-label="Close project details" className="rounded-full border border-white/15 px-3 py-1 text-sm hover:bg-white/10">✕</button>
        </div>
        <p className="mt-5 leading-relaxed text-neutral-200">{p.problem}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-neutral-300">{s}</span>
          ))}
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <dd className="font-display text-2xl text-ember">{m.value}</dd>
              <dt className="mt-1 text-xs uppercase tracking-wide text-neutral-400">{m.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 leading-relaxed text-neutral-300">{p.outcome}</p>
        {p.link && (
          <a href={p.link.url} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-ember px-5 py-2 font-medium text-neutral-950 hover:brightness-110">
            {p.link.label} ↗
          </a>
        )}
      </div>
    </div>
  )
}
