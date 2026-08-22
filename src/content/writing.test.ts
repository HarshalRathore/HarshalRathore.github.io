import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const routes = [
  ['linked-lists', 'Linked Lists'],
  ['git-for-beginners', 'Git for Beginners'],
  ['linux-shell-guide', 'Linux SHELL Guide'],
] as const

describe('writing routes (WRT-H-001 sources)', () => {
  it.each(routes)('public/writing/%s exists with real content', (slug) => {
    const f = resolve(process.cwd(), 'public/writing', slug, 'index.html')
    expect(existsSync(f)).toBe(true)
    const html = readFileSync(f, 'utf8')
    expect(html.length).toBeGreaterThan(2000)
    expect(html).toContain('/writing/')
    expect(html.toLowerCase()).not.toContain('<script src=')
  })
})
