import React, { useRef, useState, Suspense } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Stage, Grid, Html, useProgress, Environment, PresentationControls, Center } from '@react-three/drei'
import { ColorSelection } from './Selections/ColorSelection'
import { MotorSelection } from './Selections/MotorSelection'
import { motion } from 'framer-motion'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import Robot from './Robot'
import { Amber } from './models/Amber'
import { Model } from './models/NGS_GLT_V2'
import { Female } from './models/Female'

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}
const Product = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabCount = 4;

    return (
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                        <div className="row row--30 align-items-center">
                            <div className="col-lg-5" style={{ height: "100%" }}>
                            <Robot/>
                                {
                                    
                                    /*<motion.div
                                        key="title"
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        style={{ height: "100%" }}
                                        transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                                        <Canvas
                                            style={{ height: "750px", borderRadius: "5%" }}
                                            gl={{ antialias: true, logarithmicDepthBuffer: true }}
                                            shadows
                                            camera={{ position: [2, 0, -3], fov: 35 }}>
                                            <fog attach="fog" args={['black', 15, 21.5]} />
                                            <Stage
                                                intensity={0.5}
                                                environment="city"
                                                shadows={{ type: 'accumulative', bias: -0.001 }}
                                                adjustCamera>
                                                <Suspense fallback={<Loader />}>
                                                    <Center center><Female position={[3, 0, 0]} /> <Model /></Center>
                                                </Suspense>
                                            </Stage>
                                            <Grid
                                                renderOrder={-1}
                                                position={[0, 0, 0]}
                                                infiniteGrid
                                                cellSize={0.6}
                                                cellThickness={0.6}
                                                sectionSize={3.3}
                                                sectionThickness={1.0}
                                                sectionColor={[0.5, 0.5, 10]}
                                                fadeDistance={30}
                                                fadeStrength={3} />
                                            <OrbitControls
                                                autoRotate
                                                autoRotateSpeed={-1}
                                                enablePan={false}
                                                enableZoom={false}
                                                minPolarAngle={Math.PI / 2.1}
                                                maxPolarAngle={Math.PI / 2.1} />
                                            <EffectComposer disableNormalPass multisampling={8}>
                                                <Bloom luminanceThreshold={1} mipmapBlur />
                                            </EffectComposer>
                                            <Environment background preset="city" blur={0.8} />
                                        </Canvas>
                                    </motion.div>*/
                                }
                            </div>
                            <div className="col-lg-7 mt_md--40 mt_sm--40">
                                <div className="row mb--40">
                                    <div className="col-lg-12">
                                        <SectionTitle
                                            textAlign="text-center"
                                            radiusRounded=""
                                            subtitle="3D Configuration"
                                            title="Build your own NGS-360"
                                            description=""
                                        />
                                    </div>
                                </div>
                                <div className="rn-default-tab">
                                    <div className="tab-button-panel">
                                        <TabList className="tab-button">
                                            <Tab tabfor="0">
                                                <div className="rn-tab-button">
                                                    <button>Color</button>
                                                </div>
                                            </Tab>
                                            <Tab tabfor="1">
                                                <div className="rn-tab-button">
                                                    <button>Motor</button>
                                                </div>
                                            </Tab>
                                            <Tab tabfor="2">
                                                <div className="rn-tab-button">
                                                    <button>Mechanical</button>
                                                </div>
                                            </Tab>
                                            <Tab tabfor="3">
                                                <div className="rn-tab-button">
                                                    <button>Motors</button>
                                                </div>
                                            </Tab>
                                        </TabList>
                                    </div>

                                    <div className="tab-content-panel">
                                        <TabPanel tabid="0">
                                            <div className="rn-tab-content">
                                                <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                    <ColorSelection />
                                                    <div className="pricing-footer">
                                                        <a className="btn-default btn-border" onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}>Next</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel tabid="1">
                                            <div className="rn-tab-content">
                                                <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                    <MotorSelection />
                                                    <div className="pricing-footer">
                                                        <a className="btn-default btn-border" onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}>Next</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel tabid="2">
                                            <div className="rn-tab-content">
                                                <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                    <p>Ipsum lorem dolor sit amet consectetur, adipisicing elit. Quibusdam ipsa, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla exercitationem tempore corrupti! Nemo.</p>
                                                    <div className="pricing-footer">
                                                        <a className="btn-default btn-border" onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}>Next</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel tabid="3">
                                            <div className="rn-tab-content">
                                                <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                    <p>Exercitationem Ipsum lorem dolor sit amet consectetur, adipisicing elit. Quibusdam ipsa, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla  tempore corrupti! Nemo.</p>
                                                    <div className="pricing-footer">
                                                        <a className="btn-default btn-border" onClick={() => { }}>Finish</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}


export default Product
