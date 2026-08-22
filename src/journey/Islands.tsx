import HeroIsland from './HeroIsland'
import JourneyLights from './JourneyLights'
import { WAYPOINT_POS } from './waypoints'
import { ISLAND_VARIANTS } from './islands/variants'

export default function Islands() {
  return (
    <>
      <HeroIsland />
      {WAYPOINT_POS.slice(1).map((pos, i) => {
        const Variant: React.ComponentType = ISLAND_VARIANTS[i] ?? (() => null)
        return (
          <group key={i} position={[pos[0], pos[1], pos[2]]}>
            <Variant />
          </group>
        )
      })}
      <JourneyLights />
    </>
  )
}
