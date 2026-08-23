let armed = false

/**
 * Tiny sound bus: SoundToggle arms/disarms it from real user clicks
 * (autoplay-policy safe), and any module can fire one-shot clips through it.
 */
export function setSoundArmed(v: boolean): void {
  armed = v
}

export function isSoundArmed(): boolean {
  return armed
}

export function playIfArmed(file: string, volume: number): void {
  if (!armed) return
  const a = new Audio(file)
  a.volume = volume
  void a.play().catch(() => {})
}
