export interface Palette { zenith: [number, number, number]; horizon: [number, number, number]; haze: [number, number, number]; rim: [number, number, number]; ink: [number, number, number] }
const hexToRgb = (h: string): [number, number, number] => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255]
const GOLDEN: Palette = { zenith: hexToRgb('#6FA4C9'), horizon: hexToRgb('#FFB36B'), haze: hexToRgb('#F4DFB6'), rim: hexToRgb('#FFC46B'), ink: hexToRgb('#2B2726') }
const DUSK: Palette = { zenith: hexToRgb('#3D4C8C'), horizon: hexToRgb('#EF9B5E'), haze: hexToRgb('#D8A6B2'), rim: hexToRgb('#FFC879'), ink: hexToRgb('#211D2E') }
const BLUE: Palette = { zenith: hexToRgb('#0F1F42'), horizon: hexToRgb('#5E8CB4'), haze: hexToRgb('#7FA0C4'), rim: hexToRgb('#A9C9E8'), ink: hexToRgb('#0A1122') }
const lerp3 = (a: [number,number,number], b: [number,number,number], t: number): [number,number,number] => [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]
export function paletteAtStage(t: number): Palette {
  const c = Math.min(1, Math.max(0, t))
  return c <= 0.5
    ? { zenith: lerp3(GOLDEN.zenith, DUSK.zenith, c*2), horizon: lerp3(GOLDEN.horizon, DUSK.horizon, c*2), haze: lerp3(GOLDEN.haze, DUSK.haze, c*2), rim: lerp3(GOLDEN.rim, DUSK.rim, c*2), ink: lerp3(GOLDEN.ink, DUSK.ink, c*2) }
    : { zenith: lerp3(DUSK.zenith, BLUE.zenith, (c-0.5)*2), horizon: lerp3(DUSK.horizon, BLUE.horizon, (c-0.5)*2), haze: lerp3(DUSK.haze, BLUE.haze, (c-0.5)*2), rim: lerp3(DUSK.rim, BLUE.rim, (c-0.5)*2), ink: lerp3(DUSK.ink, BLUE.ink, (c-0.5)*2) }
}
export function rgbCss(c: [number,number,number]): string { return `rgb(${Math.round(c[0]*255)}, ${Math.round(c[1]*255)}, ${Math.round(c[2]*255)})` }
