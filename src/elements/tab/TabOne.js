import React, { useRef, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SectionTitle from "../sectionTitle/SectionTitle";
import { Canvas, useFrame } from '@react-three/fiber'
import { Model } from './NGS_GLT'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Environment, Stars, Stage, Sky, RandomizedLight } from '@react-three/drei'
const TabOne = () => {

    return (
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <Tabs>
                        <div className="row row--30 align-items-center">
                            <div className="col-lg-5">
                                {/**<img className="radius-small" src='./images/about/NGS-360.png' alt="Corporate React Template" /> */}
                                <Canvas
                                    style={{
                                        height: "750px",
                                        backgroundColor: "#21272b",
                                        borderRadius: "50px"
                                    }}>


                                    <ambientLight intensity={0.25} />
                                    <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />
                                    <Stage adjustCamera intensity={0.5} shadows="contact" environment="city">
                                        <Model />
                                    </Stage>
                                    {
                                        /* <Sky distance={450000} sunPosition={[0, 1, -10]} inclination={1} azimuth={0.25} />
                                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */
                                    }
                                    <OrbitControls />


                                </Canvas>
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
                                            <Tab>
                                                <div className="rn-tab-button">
                                                    <button>Base</button>
                                                </div>
                                            </Tab>
                                            <Tab>
                                                <div className="rn-tab-button">
                                                    <button>Electronics</button>
                                                </div>
                                            </Tab>
                                            <Tab>
                                                <div className="rn-tab-button">
                                                    <button>Mechanical</button>
                                                </div>
                                            </Tab>
                                            <Tab>
                                                <div className="rn-tab-button">
                                                    <button>Motors</button>
                                                </div>
                                            </Tab>
                                        </TabList>
                                    </div>

                                    <div className="tab-content-panel">
                                        <TabPanel>
                                            <div className="rn-tab-content">
                                                <div className="inner">
                                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam ipsa, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla exercitationem tempore corrupti! Nemo.</p>

                                                    <p>Quibusdam ipsa, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla exercitationem tempore corrupti! Nemo.</p>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="rn-tab-content">
                                                <div className="inner">
                                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam ipsa, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla exercitationem tempore corrupti! Nemo.</p>

                                                    <p>Quibusdam ipsa, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla exercitationem tempore corrupti! Nemo.</p>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="rn-tab-content">
                                                <div className="inner">
                                                    <p>Ipsum lorem dolor sit amet consectetur, adipisicing elit. Quibusdam ipsa, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla exercitationem tempore corrupti! Nemo.</p>

                                                    <p>Ipsa Quibusdam, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla exercitationem tempore corrupti! Nemo.</p>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div className="rn-tab-content">
                                                <div className="inner">
                                                    <p>Exercitationem Ipsum lorem dolor sit amet consectetur, adipisicing elit. Quibusdam ipsa, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla  tempore corrupti! Nemo.</p>

                                                    <p>Ipsa Quibusdam, deleniti soluta minima minus asperiores doloribus enim vitae obcaecati fuga assumenda laudantium nemo odio provident nulla exercitationem tempore corrupti! Nemo.</p>
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
export default TabOne
