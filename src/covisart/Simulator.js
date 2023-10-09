import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Stage, Grid, OrbitControls, Html, MeshDistortMaterial, MeshDiscardMaterial, useProgress } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Model } from './models/NGS_GLT_V2'
import { Ngs_GLT } from './models/NGS_GLT'
import { useControls } from 'leva'
import { state } from './store'
import { Effects } from './Effects'
function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}
export default function Simulator() {
  const { ruler } = useControls({ "ruler": false })
  state.ruler = ruler
  return (
    <Canvas
      style={{ height: "100vh" }}
      gl={{ logarithmicDepthBuffer: true }}
      shadows
      frameloop="demand">
      <fog attach="fog" args={['black', 15, 21.5]} />
      <Suspense fallback={<Loader />}>
        <Stage intensity={0.5} environment="city" adjustCamera={true} >
          <Kamdo url="/covisart/models/NGS_GLT_V2-transformed.glb" />
        </Stage>
      </Suspense>
      <Grid
        renderOrder={-1}
        position={[0, -0.95, 0]}
        infiniteGrid
        cellSize={0.4}
        cellThickness={0.6}
        cellColor={[1, 1, 1]}
        sectionSize={4}
        sectionThickness={1.5}
        sectionColor={[1, 1, 1]}
        fadeDistance={30}
        fadeStrength={10} />
      <OrbitControls autoRotate={true} autoRotateSpeed={-0.2} enableZoom={false} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
      <ambientLight position={[0, 2, 5]} />
      <ambientLight position={[-5, 2, 0]} />
      <ambientLight position={[0, 2, -5]} />
      <ambientLight position={[5, 2, 0]} />
      <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={0.2} mipmapBlur luminanceSmoothing={0} intensity={1.0} />
      </EffectComposer>
    </Canvas>
  )
}

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.0 s2wt_kamdo_industrial_divinities.glb --transform --simplify
Author: Hansalex (https://sketchfab.com/Hansalex)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/s2wt-kamdo-industrial-divinities-f503b70ac05e49a38c81100d71599a1b
Title: S2WT "Kamdo" (Industrial Divinities)
*/

function Kamdo({ url, ...props }) {
  const head = useRef()
  const { nodes, materials } = useGLTF('/s2wt_kamdo_industrial_divinities-transformed.glb')

  return (
    <group {...props}>
      <group ref={head}>
        <mesh castShadow geometry={nodes.stripe001.geometry}>
          <MeshDiscardMaterial />
        </mesh>
      </group>
      <Ngs_GLT url={url} position={[0.155, 3, 0]} />
      {
        //<Female position={[2.5, 0, 0]}/>
      }
    </group>
  )
}

useGLTF.preload('/s2wt_kamdo_industrial_divinities-transformed.glb')