import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, Grid, OrbitControls, Html, useProgress } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Ngs_GLT } from './models/NGS_GLT'
import { Model } from './models/ForWeb'
import { state } from './store'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{Math.round(progress)} % loaded</Html>
}
export default function Simulator() {
  /*const { ruler, animate } = useControls({ "ruler": false, "animate": false })
  state.animate = animate
  state.ruler = ruler*/

  return (
    <div>
      <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/covisart/ngs/grey.webp)`}}></div>

      <Canvas
        style={{ height: "100vh" }}
        frameloop="demand"
        camera={{ fov: 70 }}>
        <Suspense>
          <Stage intensity={0.5} environment="city" adjustCamera={false} >
            {
              //<Model/> 
            }           
            {
             <Ngs_GLT url="/covisart/models/NGS_GLT_V2-transformed.glb" />
            }
          </Stage>
        </Suspense>
        <Grid
          renderOrder={-1}
          position={[0, -2, 0]}
          infiniteGrid
          cellSize={0.4}
          cellThickness={0.6}
          cellColor={[1, 1, 1]}
          sectionSize={1}
          sectionThickness={1.5}
          sectionColor={[1, 1, 1]}
          fadeDistance={60}
          fadeStrength={10} />

        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={-0.4}
          enableZoom={true}
          makeDefault
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2} />

        <ambientLight position={[0, 2, 5]} />
        <ambientLight position={[-5, 2, 0]} />
        <ambientLight position={[0, 2, -5]} />
        <ambientLight position={[5, 2, 0]} />

      </Canvas>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <button
          className="share btn-default btn-border"
          style={{ background: 'rgb(255 127 0 / 39%)' }}
          onClick={() => (state.animate = !state.animate)}>
          Animation
        </button>
      </div>
    </div>
  )
}