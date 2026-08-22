import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { load, save } from './soundPrefs'

const store = new Map<string, string>()

describe('sound prefs (SND persistence)', () => {
  beforeEach(() => {
    store.clear()
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => void store.set(k, v),
      },
    })
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })
  it('defaults to false when nothing saved', () => {
    expect(load()).toBe(false)
  })
  it('round-trips an enabled choice', () => {
    save(true)
    expect(load()).toBe(true)
    save(false)
    expect(load()).toBe(false)
  })
  it('treats garbage as false', () => {
    store.set('dusty-sound', '{not json')
    expect(load()).toBe(false)
    store.set('dusty-sound', '"yes"')
    expect(load()).toBe(false)
  })
})
