import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, wrapEffect } from '@react-three/postprocessing'
import { Effect } from 'postprocessing'
import * as THREE from 'three'

/** The exact post stack — contract FX-C-001. Bloom is retired, not a switch. */
export const FX_STACK = ['ACES', 'grain', 'vignette'] as const

const frag = /* glsl */ `
uniform float uTime;
uniform float uGrain;
uniform float uVignette;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec4 color = inputColor;
  // animated hash-noise grain — amplitude independent of resolution (FX-H-001)
  float g = hash(uv * vec2(1619.0, 911.0) + fract(uTime) * 41.7) - 0.5;
  color.rgb += g * uGrain;
  // smoothstep radial vignette
  vec2 c = uv - 0.5;
  float v = smoothstep(0.85, 0.25, length(c) * 1.35);
  color.rgb *= mix(1.0 - uVignette, 1.0, v);
  outputColor = color;
}
`

class GrainVignetteEffectImpl extends Effect {
  constructor() {
    super('GrainVignetteEffect', frag, {
      uniforms: new Map<string, THREE.Uniform>([
        ['uTime', new THREE.Uniform(0)],
        ['uGrain', new THREE.Uniform(0.055)],
        ['uVignette', new THREE.Uniform(0.35)],
      ]),
    })
  }
}

// wrapEffect's public types collapse to `never` for custom Effect subclasses
// (known friction); runtime behavior is the standard ref-forwarding path.
const GrainVignette = wrapEffect(
  GrainVignetteEffectImpl,
) as unknown as React.ForwardRefExoticComponent<
  React.RefAttributes<GrainVignetteEffectImpl>
>

export function Fx() {
  const ref = useRef<GrainVignetteEffectImpl | null>(null)
  useFrame((_, delta) => {
    const u = ref.current?.uniforms as Map<string, THREE.Uniform> | undefined
    const t = u?.get('uTime')
    if (t) t.value += delta
  })
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <GrainVignette ref={ref} />
    </EffectComposer>
  )
}
