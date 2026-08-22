import { describe, it, expect } from 'vitest'
import { PROJECTS } from './projects'
describe('project content module (OVL-C-001/E-001)', () => {
  it('exposes exactly six projects with identical schema and no imagery', () => {
    expect(PROJECTS).toHaveLength(6)
    for (const p of PROJECTS) {
      expect(Object.keys(p).sort()).toEqual(['id','island','link','metrics','outcome','problem','stack','tagline','title'])
      expect(p.problem.length).toBeGreaterThan(0)
      expect(p.metrics.length).toBeGreaterThan(0)
      expect(JSON.stringify(p).toLowerCase()).not.toMatch(/\.(png|jpe?g|webp|gif)/)
    }
  })
  it('keeps Repeato in solo-owner voice, never client/employment framing', () => {
    const r = JSON.stringify(PROJECTS.find((p) => p.id === 'repeato')).toLowerCase()
    expect(r).toContain('solo')
    expect(r).not.toContain('client')
    expect(r).not.toContain('tcs')
  })
  it('links only to the two GitHub flagships', () => {
    for (const p of PROJECTS) {
      if (p.link) expect(p.link.url).toMatch(/^https:\/\/github\.com\/harshalrathore\//)
    }
  })
})
