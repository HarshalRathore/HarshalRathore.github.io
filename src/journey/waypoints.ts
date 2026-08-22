import { WAYPOINT_COUNT } from './store'

export type Vec3 = [number, number, number]

export const WAYPOINT_POS: Vec3[] = Array.from({ length: WAYPOINT_COUNT }, (_, i) => [
  Math.sin(i * 1.1) * 14,
  i * 2.2,
  -Math.cos(i * 1.1) * 14,
])
