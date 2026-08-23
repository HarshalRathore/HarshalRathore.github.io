import { useEffect, useState } from 'react'
import { useJourneyStore } from './store'

const EMAIL = 'harshalrathore2014@gmail.com'

/**
 * Contact CTA stack (#16, Q25): email primary with click-to-copy, social row,
 * résumé PDF download. Renders only at the final waypoint (Lighthouse).
 * PII rules: no phone, no location, X omitted pending user verification.
 */
export default function ContactCta() {
  const activeWaypoint = useJourneyStore((s) => s.activeWaypoint)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  if (activeWaypoint !== 7) return null

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  const pill =
    'rounded-full border border-white/15 bg-black/60 backdrop-blur font-body text-sm'

  return (
    <div className="fixed bottom-20 left-1/2 z-10 -translate-x-1/2 px-3 text-center">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={copyEmail}
          aria-label={`Copy email address ${EMAIL}`}
          className={`${pill} px-4 py-2 font-medium`}
          style={{ color: '#E8A05C', borderColor: 'rgba(232,160,92,.55)' }}
        >
          {copied ? '✓ copied to clipboard' : `✉ ${EMAIL}`}
        </button>
        <a
          href={`mailto:${EMAIL}`}
          aria-label={`Email ${EMAIL}`}
          className={`${pill} px-3.5 py-2`}
          style={{ color: '#E7E3DC' }}
        >
          write to me ↗
        </a>
        <a
          href="https://github.com/harshalrathore"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className={`${pill} px-3.5 py-2`}
          style={{ color: '#E7E3DC' }}
        >
          GitHub ↗
        </a>
        <a
          href="https://www.linkedin.com/in/harshal-rathore/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className={`${pill} px-3.5 py-2`}
          style={{ color: '#E7E3DC' }}
        >
          LinkedIn ↗
        </a>
        <a
          href="./resume/Harshal-Rathore-Resume.pdf"
          download
          aria-label="Download résumé PDF"
          className={`${pill} border-ember px-3.5 py-2 font-medium`}
          style={{ color: '#E8A05C' }}
        >
          ⤓ résumé.pdf
        </a>
      </div>
    </div>
  )
}
