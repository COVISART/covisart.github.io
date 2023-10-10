import React, { useState, useEffect } from 'react';
import { Grid, Input, Row, Space, Table, notification  } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import { ColorSelection } from './Selections/ColorSelection'
import { AccessorySelection } from './Selections/AccessorySelection'
import { PayloadSelection } from './Selections/PayloadSelection'
import { useSnapshot } from 'valtio'
import Simulator from './Simulator'
import { state } from './store'
import Configuration from './Configuration'
import ReactGA from "react-ga4";
import { uploadData } from './system/OrderRequest';

const firebaseConfig = {
    apiKey: "AIzaSyBRfVZpE4dKAjxq6zB7ja-H8Oo9TWaCiJg",
    authDomain: "ngs-server.firebaseapp.com",
    projectId: "ngs-server",
    storageBucket: "ngs-server.appspot.com",
    messagingSenderId: "1012345570821",
    appId: "1:1012345570821:web:58a5bc3258cf43da4fbe6c",
    measurementId: "G-4ZXME9T8HK"
};

const Product = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [api, contextHolder] = notification.useNotification();
    const tabCount = 5;
    ReactGA.initialize("G-XTQCE7S8BR");
    ReactGA.send({ hitType: "pageview", page: "/ngs", title: "NGS-360-3 Axis Simulator" });

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
    const openNotification = () => {
        api.open({
          message: 'We got your order.',
          description:
            'Dear ' + snap.name + ', we got your order, our sales team will contact with you for further operation. Thanks for your interest our NGS-360 family motion platform.',
          duration: 0,
        });
      };
    const handleSubmit = event => {
        event.preventDefault(); // 👈️ prevent page refresh

        uploadData(state)
        openNotification()
    };
    return (
        <div className="row">
            {contextHolder}
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
                                                <p>You can only add one accessory on same time, there are <a style={{ color: 'red' }}>2</a> accessories available.</p>
                                                <div style={{ justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", display: "flex" }}>
                                                    <AccessorySelection />
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
                                                <p>Required motors applied with pre configured payload selection. If you want more motor power, please <a style={{ color: 'red' }} href='https://covisart.com.tr/contacts/' target='_blank'>contact</a> with us. </p>
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
                                                <form style={{ display: 'flex', width: "100%" }}
                                                    onSubmit={handleSubmit}>
                                                    <Space direction="vertical" size="middle" style={{ display: 'flex', width: "100%" }}>
                                                        <input id="name" required type='text' placeholder="Name" onInput={(e)=>{console.log(e.currentTarget.value)}} onChange={(e) => { state.name = e.currentTarget.value; console.log(e.currentTarget.value) }} />
                                                        <input id="phone" required type='text' placeholder="Phone" onChange={(e) => { state.phone = e.currentTarget.value }} />
                                                        <input id="email" required type='email' placeholder="E-mail" onChange={(e) => { state.email = e.currentTarget.value }} />
                                                        <button className="btn-default btn-border" type="submit" value="Order">Order</button >
                                                    </Space>
                                                </form>
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
