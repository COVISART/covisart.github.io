import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import { ColorSelection } from './Selections/ColorSelection'
import { AccessorySelection } from './Selections/AccessorySelection'
import { PayloadSelection } from './Selections/PayloadSelection'
import { useSnapshot } from 'valtio'
import Simulator from './Simulator'
import { state } from './store'
import Configuration from './Configuration'

const Product = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabCount = 5;
    const snap = useSnapshot(state)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        }
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            value: 32,
        },
        {
            key: '2',
            name: 'Jim Green',
            value: 42,
        },
        {
            key: '3',
            name: 'Joe Black',
            value: 32,
        },
    ];
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
                                        <Tab tabfor="4">
                                            <div>
                                                <div className="rn-tab-button">
                                                    <button>Result</button>
                                                </div>
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
                                                <PayloadSelection />
                                                <div className="pricing-footer">
                                                    <a className="btn-default btn-border" onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}>Next</a>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabid="2">
                                        <div className="rn-tab-content">
                                            <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                <p>You can only add one accessory on same time, there are <a style={{ color:'red'}}>2</a> accessories available.</p>
                                                <div style={{ justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", display: "flex" }}>
                                                    <AccessorySelection/>
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
                                                <p>Required motors applied with pre configured payload selection. If you want more motor power, please <a style={{ color:'red'}} href='https://covisart.com.tr/contacts/' target='_blank'>contact</a> with us. </p>
                                                <div className="pricing-footer">
                                                    <a className="btn-default btn-border" onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}>Finish</a>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel tabid="4">
                                        <div className="rn-tab-content">
                                            <Table columns={columns} dataSource={
                                                [
                                                    {
                                                        key: '1',
                                                        name: 'Color',
                                                        value: snap.color
                                                    },
                                                    {
                                                        key: '2',
                                                        name: 'Payload',
                                                        value: snap.size
                                                    },
                                                    {
                                                        key: '3',
                                                        name: 'Accessory',
                                                        value: snap.accessory
                                                    },
                                                ]
                                            } pagination={false} />


                                            <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                <div className="pricing-footer">
                                                    <a className="btn-default btn-border" onClick={() => { }}>Order</a>
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
