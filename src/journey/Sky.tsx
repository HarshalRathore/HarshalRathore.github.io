import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useJourneyStore } from './store'
import { paletteAtStage, rgbCss } from './palettes'
export default function Sky() {
  const { scene, gl } = useThree()
  const fogRef = useRef(new THREE.Fog('#F4DFB6', 30, 160))
  const uniforms = useMemo(() => ({
    uTop: { value: new THREE.Color('#6FA4C9') },
    uBottom: { value: new THREE.Color('#FFB36B') },
  }), [])
  useMemo(() => { scene.fog = fogRef.current }, [scene])
  useFrame(() => {
    const stage = useJourneyStore.getState().lightStage
    const pal = paletteAtStage(stage)
    uniforms.uTop.value.setRGB(pal.zenith[0], pal.zenith[1], pal.zenith[2])
    uniforms.uBottom.value.setRGB(pal.horizon[0], pal.horizon[1], pal.horizon[2])
    fogRef.current.color.setRGB(pal.haze[0], pal.haze[1], pal.horizon[2] === undefined ? pal.haze[2] : pal.haze[2])
    gl.toneMappingExposure = 1.05 - stage * 0.3
    document.documentElement.style.setProperty('--hud-ink', rgbCss(pal.ink))
    document.documentElement.style.setProperty('--hud-scrim', `rgba(${Math.round(pal.haze[0]*255)}, ${Math.round(pal.haze[1]*255)}, ${Math.round(pal.haze[2]*255)}, 0.55)`)
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
