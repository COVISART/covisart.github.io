import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import { ColorSelection } from './Selections/ColorSelection'
import { MotorSelection } from './Selections/MotorSelection'
import { useSnapshot } from 'valtio'
import Simulator from './Simulator'
import { state } from './store'
import Configuration from './Configuration'

const Product = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabCount = 4;
    const snap = useSnapshot(state)
    return (
        <div className="row">
            <div className="col-lg-12">
                <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                    <div className="row row--30 align-items-center">
                        <div className="col-lg-7" style={{ height: "100vh" }}>
                            <Configuration />
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
                                                <button>Payload</button>
                                            </div>
                                        </Tab>
                                        <Tab tabfor="2">
                                            <div className="rn-tab-button">
                                                <button>Accessory</button>
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
                                                <div style={{ justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", display: "flex" }}>
                                                    {
                                                        snap.cockpit
                                                            ? (
                                                                <div className="selectedBox" style={{ height: "20%", width: "20%", textAlign: "center" }} onClick={() => SetCockpitState(snap)}>
                                                                    <img style={{ borderRadius: "10%" }} src="./covisart/images/ngs/cockpit_icon.png" />
                                                                    <p>Glass Cockpit</p>
                                                                </div>
                                                            )
                                                            : (
                                                                <div className="box" style={{ height: "20%", width: "20%", textAlign: "center" }} onClick={() => SetCockpitState(snap)}>
                                                                    <img style={{ borderRadius: "10%" }} src="./covisart/images/ngs/cockpit_icon.png" />
                                                                    <p>Glass Cockpit</p>
                                                                </div>
                                                            )
                                                    }
                                                    {
                                                        snap.raceseat
                                                            ? (
                                                                <div className="selectedBox" style={{ height: "20%", width: "20%", textAlign: "center" }} onClick={() => SetRaceSeatState(snap)}>
                                                                    <img style={{ borderRadius: "10%" }} src="./covisart/images/ngs/RaceSeat_icon.png" />
                                                                    <p>Race Seat</p>
                                                                </div>
                                                            )
                                                            : (
                                                                <div className="box" style={{ height: "20%", width: "20%", textAlign: "center" }} onClick={() => SetRaceSeatState(snap)}>
                                                                    <img style={{ borderRadius: "10%" }} src="./covisart/images/ngs/RaceSeat_icon.png" />
                                                                    <p>Race Seat</p>
                                                                </div>
                                                            )
                                                    }
                                                </div>

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

function SetCockpitState(value) {
    state.cockpit = !value.cockpit
    state.raceseat = false
}
function SetRaceSeatState(value) {
    state.raceseat = !value.raceseat
    state.cockpit = false
}
export default Product
