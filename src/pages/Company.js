import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import HeaderOne from "../common/header/HeaderOne";
import FooterTwo from '../common/footer/FooterTwo';
import Copyright from '../common/footer/Copyright';

import ServiceOne from '../elements/service/ServiceOne';
import Separator from "../elements/separator/Separator";
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import ReactGA from "react-ga4";

class Company extends Component {
    render() {

        ReactGA.initialize("G-XTQCE7S8BR");
        ReactGA.send({ hitType: "pageview", page: "/products-and-solutions/new-generation-simulator/ngs-360-3/", title: "NGS-360-3 Axis Simulator" });
        
        ReactGA.gtag("event", "select_content", {
            content_type: "NGS-360-3",
            content_id: "NGS-360-3"
          });
          
        return (
            <main className="page-wrapper">
                {/* <HeaderOne btnStyle="btn-small round btn-icon" HeaderSTyle="header-transparent" /> */}

                {/* Start Slider Area  */}
                <div className="slider-area slider-style-1 bg-transparent height-750">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-7 col-xl-6 order-2 order-lg-1 mt_md--40 mt_sm--40">
                                <div className="inner text-start">
                                    <span className="subtitle"> NEXT GENERATION SIMULATOR</span>
                                    <h1 className="title theme-gradient display-one">NGS-360-3</h1>
                                    <ul className="list-icon">
                                        <li><span className="icon"><FiCheck /></span> Flight Simulation for jet and light helicopters.</li>
                                        <li><span className="icon"><FiCheck /></span> Examining the causes of Spatial Disorientation.</li>
                                        <li><span className="icon"><FiCheck /></span> Motion Ride for entertainment applications.</li>
                                        <li><span className="icon"><FiCheck /></span>Pilot spatial awareness and commercial aviation mishap prevention</li>
                                    </ul>
                                    <div className="button-group mt--40">
                                        <a id="purchase" className="btn-default btn-medium round btn-icon" href="/ngs">Pre-Order <i className="icon"><FiArrowRight /></i></a>
                                        <Link className="btn-default btn-medium btn-border round btn-icon" to="/contact">Contact Us <i className="icon"><FiArrowRight /></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-xl-6 order-1 order-lg-2">
                                <div className="">
                                    <img src="./images/about/NGS-360-3.png" alt="Banner Images" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Slider Area  */}

                {/* Start Service Area  */}
                <div className="service-area rn-section-gapBottom">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="content">
                                    <h3 className="title">NGS-360-3 MOTION SYSTEM THAT PROVEN IN PRACTICE.</h3>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <p className="mb--10">
                                    In motion simulation, COVISART offers electrically driven motion systems for today’s simulation market. The NGS-360-3 is designed for today’s middle payload range in the electric driven motion systems product line: 800 kg.
                                </p>
                                <div className="readmore-btn">
                                    <Link className="btn-read-more" to="#"><span>View More</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Service Area  */}


                <Separator />
                {/* Start Service Area  */}
                <div className="rn-service-area rn-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <SectionTitle
                                    textAlign="text-center"
                                    radiusRounded=""
                                    subtitle="What NGS can do for you"
                                    title="Technical capabilities."
                                    description="NEW GENERATION SIMULATOR (NGS) aims to take on a much wider set of problems, including examining the causes of disorientation and other medical and human-factors science related."
                                />
                            </div>
                        </div>

                        <ServiceOne
                            serviceStyle="service__style--1 icon-circle-style"
                            textAlign="text-center"
                        />
                    </div>
                </div>
                {/* End Service Area  */}
                <div className="slider-area slider-style-1 bg-transparent height-750">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-7 col-xl-6 order-2 order-lg-1 mt_md--40 mt_sm--40">
                                <div className="inner text-start">
                                    <h1 className="title theme-gradient display-one">Powered with AI</h1>
                                    <ul className="list-icon">
                                        <li><span className="icon"><FiCheck /></span> AI model controls servo motor that was equipped with absolute encoder.</li>
                                        <li><span className="icon"><FiCheck /></span> AI predicts next direction of movement.</li>
                                        <li><span className="icon"><FiCheck /></span> Has 30% advantage over classic motion control algorithms.</li>
                                        <li><span className="icon"><FiCheck /></span> Can be retrain over time with new dataset using Transfer learning techniques.</li>
                                    </ul>

                                </div>
                            </div>
                            <div className="col-lg-5 col-xl-6 order-1 order-lg-2">
                                <div className="">
                                    <img src="./images/about/NGS-360.png" alt="NGS-360" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterTwo />
                <Copyright />
            </main>
        )
    }
}
export default Company;
