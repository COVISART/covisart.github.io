import React, { useState } from 'react';
import { Space, Table, notification, Row } from 'antd';
import { PhoneOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import ReactCountryDropdown from "react-country-dropdown";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import { AccessorySelection } from './Selections/AccessorySelection'
import { PayloadSelection } from './Selections/PayloadSelection'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { Order, PingAPI} from './system/OrderRequest';
import ReactGA from "react-ga4";

import StaticImageSimulator from './StaticImageSimulator';

const Product = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [api, contextHolder] = notification.useNotification();
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
    const openNotification = (placement) => {
        api.open({
            message: 'We got your order.',
            description:
                'Dear ' + state.name + ', we got your order.  Our sales team will contact with you for further operation. Thanks for your interest our NGS-360 family motion platform.',
            duration: 0,
            icon: <PhoneOutlined style={{ color: 'green' }} />
        });
    };

    const handleSubmit = event => {
        event.preventDefault(); // 👈️ prevent page refresh
        PingAPI();
        Order(state);
        //LocalOrder(state);
        openNotification('bottomRight')

        ReactGA.gtag("event", "purchase", {
            transaction_id: "T_12345",
            value: 75000,
            tax: 0,
            shipping: 4200,
            currency: "USD",
            coupon: "PreOrder",
            items: [
                {
                    item_id: "SKU_2110",
                    item_name: "NGS-360-3 Motion Simulator",
                    affiliation: "Covisart Online Store",
                    coupon: "PreOrder",
                    discount: 1.15,
                    index: 0,
                    item_brand: "COVISART",
                    item_category: "Simulator",
                    item_list_id: "related_products",
                    item_list_name: "Related Products",
                    item_variant: "green",
                    location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
                    price: 75000,
                    quantity: 1
                }]
        });
    };
    return (
        <div className="row">
            {contextHolder}
            <div className="col-lg-12">
                <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                    <div className="row row--30 align-items-center">
                        <div className="col-lg-6 mt_md--40 mt_sm--40">
                            <div style={{ position: "relative" }}>
                                <StaticImageSimulator />
                            </div>
                        </div>
                        <div className="col-lg-6 mt_md--40 mt_sm--40" >
                            <div className="row mb--40 title_message">
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

                                {!state.ordered
                                    ? (
                                        <div>
                                            <div className="tab-button-panel">
                                                <TabList className="tab-button">
                                                    {
                                                        /*
                                                            <Tab tabfor="0">
                                                                <div className="rn-tab-button">
                                                                    <button>Color</button>
                                                                </div>
                                                            </Tab> 
                                                        */
                                                    }
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
                                                    {
                                                        /*<Tab tabfor="3">
                                                        <div className="rn-tab-button">
                                                            <button>Motors</button>
                                                        </div>
                                                    </Tab>*/
                                                    }
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
                                                {
                                                    /*
                                                    <TabPanel tabid="0">
                                                        <div className="rn-tab-content">
                                                            <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                                <p>NGS-360-3 Motion Platform has <a style={{ color: 'yellow' }}>3</a> different color available. All colors are matte and powder painted</p>
                                                                <ColorSelection />
                                                                <div className="pricing-footer">
                                                                    <a className="btn-default btn-border" onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}>Next</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>
                                                    */
                                                }
                                                <TabPanel tabid="1">
                                                    <div className="rn-tab-content">
                                                        <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                            <p>Unit of measurement  <a style={{ color: 'red' }}>Kg</a>. It can be changed after later for an extra fee.</p>
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
                                                            {
                                                                //<p>You can only add one accessory on same time, there are <a style={{ color: 'red' }}>2</a> accessories available.</p>
                                                            }
                                                            <div style={{ justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", display: "flex" }}>
                                                                <AccessorySelection />
                                                            </div>

                                                            <div className="pricing-footer">
                                                                <a className="btn-default btn-border" onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}>Next</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                                {
                                                    /*<TabPanel tabid="3">
                                                        <div className="rn-tab-content">
                                                            <div className="inner" style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", display: "flex" }}>
                                                                <p>Required motors applied with pre configured payload selection. If you want more motor power, please <a style={{ color: 'red' }} href='https://covisart.com.tr/contacts/' target='_blank'>contact</a> with us. </p>
                                                                <div className="pricing-footer">
                                                                    <a className="btn-default btn-border" onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}>Finish</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>*/
                                                }
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
                                                                    <input
                                                                        required
                                                                        id="name"
                                                                        type='text'
                                                                        placeholder="Name"
                                                                        onInput={(e) => { console.log(e.currentTarget.value) }}
                                                                        onChange={(e) => { state.name = e.currentTarget.value; console.log(e.currentTarget.value) }} />

                                                                    <input
                                                                        required
                                                                        id="phone"
                                                                        type='text'
                                                                        placeholder="Phone"
                                                                        onChange={(e) => { state.phone = e.currentTarget.value }}
                                                                        onSubmit={(e) => { }} />

                                                                    <input
                                                                        required
                                                                        id="email"
                                                                        type='email'
                                                                        placeholder="E-mail"
                                                                        onChange={(e) => { state.email = e.currentTarget.value }} />
                                                                    <textarea
                                                                        required
                                                                        id="message"
                                                                        type='text'
                                                                        placeholder="Message"
                                                                        onChange={(e) => { state.message = e.currentTarget.value }} />

                                                                    <Row style={{ justifyContent: "flex-start", alignItems: "center", flexDirection: "row", display: "flex", }}>
                                                                        <div style={{ padding: "3%" }}>Select Country:</div>
                                                                        <ReactCountryDropdown onSelect={(e) => { state.country = e.name; }} defaultCountry='TR' />
                                                                    </Row>

                                                                    <button className="btn-default btn-border" type="submit" value="Order">Pre-Order</button >
                                                                </Space>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            </div>
                                        </div>

                                    )
                                    : (
                                        <div id="purchased" style={{ justifyContent: 'center', alignItems: "center", flexDirection: "row", display: "flex", }}>
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default Product
