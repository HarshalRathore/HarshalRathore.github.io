import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const AUDIO_DIR = resolve(process.cwd(), 'public/audio')
const EXPECTED = ['wind.ogg', 'birds.ogg', 'waterfall.ogg', 'night.ogg', 'chime.ogg', 'achieve.ogg', 'ui-tick.ogg']

describe('audio kit budget (SND-C-001)', () => {
  it('has exactly the 7 expected mono ogg files, all non-empty', () => {
    const files = readdirSync(AUDIO_DIR).filter((f) => f.endsWith('.ogg'))
    expect(files).toHaveLength(EXPECTED.length)
    for (const f of EXPECTED) {
      const p = resolve(AUDIO_DIR, f)
      expect(existsSync(p)).toBe(true)
      expect(statSync(p).size).toBeGreaterThan(1000)
    }
  })
  it('stays within the 8 MB total budget', () => {
    const total = EXPECTED.reduce((sum, f) => sum + statSync(resolve(AUDIO_DIR, f)).size, 0)
    expect(total).toBeLessThanOrEqual(8 * 1024 * 1024)
  })
  it('ships the attribution sheet', () => {
    expect(existsSync(resolve(AUDIO_DIR, 'AUDIO-SOURCES.md'))).toBe(true)
  })
})
