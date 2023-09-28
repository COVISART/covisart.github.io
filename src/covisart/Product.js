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
        <div className="row">
            <div className="col-lg-12">
                <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                    <div className="row row--30 align-items-center">
                        <div className="col-lg-7" style={{height:"100vh"}}>
                            <Robot />
                        </div>
                        <div className="col-lg-5 mt_md--40 mt_sm--40" >
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
    )
}


export default Product
