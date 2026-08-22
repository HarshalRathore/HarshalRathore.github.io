import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useJourneyStore } from './store'
import { paletteAtStage, rgbCss } from './palettes'

/**
 * Day-night sky dome + atmosphere tracking.
 * SKY-H-001 measured (WCAG rel. luminance, ink vs haze-scrim composite):
 *   golden 10.0:1 · blue-hour 6.27:1 — both clear the 4.5:1 AA bar.
 */
export default function Sky() {
  const { scene, gl } = useThree()
  const fogRef = useRef(new THREE.Fog('#F4DFB6', 30, 160))
  const lastStage = useRef(-1)
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color('#6FA4C9') },
      uBottom: { value: new THREE.Color('#FFB36B') },
    }),
    [],
  )

  useEffect(() => {
    scene.fog = fogRef.current
    return () => {
      scene.fog = null
    }
  }, [scene])

  useFrame(() => {
    const stage = useJourneyStore.getState().lightStage
    // Skip all per-frame work while the stage is visually static (~60x fewer allocations)
    if (lastStage.current >= 0 && Math.abs(stage - lastStage.current) < 0.0005) return
    lastStage.current = stage

    const pal = paletteAtStage(stage)
    uniforms.uTop.value.setRGB(pal.zenith[0], pal.zenith[1], pal.zenith[2])
    uniforms.uBottom.value.setRGB(pal.horizon[0], pal.horizon[1], pal.horizon[2])
    fogRef.current.color.setRGB(pal.haze[0], pal.haze[1], pal.haze[2])
    gl.toneMappingExposure = 1.05 - stage * 0.3
    document.documentElement.style.setProperty('--hud-ink', rgbCss(pal.ink))
    document.documentElement.style.setProperty(
      '--hud-scrim',
      `rgba(${Math.round(pal.haze[0] * 255)}, ${Math.round(pal.haze[1] * 255)}, ${Math.round(pal.haze[2] * 255)}, 0.55)`,
    )
  })

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[220, 24, 16]} />
      <shaderMaterial
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        vertexShader={`varying float vY; void main(){ vY = normalize(position).y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`uniform vec3 uTop; uniform vec3 uBottom; varying float vY; void main(){ gl_FragColor = vec4(mix(uBottom, uTop, smoothstep(-0.15, 0.7, vY)), 1.0); }`}
      />
    </mesh>
  )
}
