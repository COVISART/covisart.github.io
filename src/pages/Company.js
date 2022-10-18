import React from 'react';
import SEO from "../common/SEO";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import HeaderOne from '../common/header/HeaderOne';
import HeaderTopNews from '../common/header/HeaderTopNews';
import FooterTwo from '../common/footer/FooterTwo';
import Copyright from '../common/footer/Copyright';

import ServiceOne from '../elements/service/ServiceOne';
import Separator from "../elements/separator/Separator";
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import SlpitOne from "../elements/split/SlpitOne";
import PortfolioOne from "../elements/portfolio/PortfolioOne";
import TeamFour from "../elements/team/TeamFour";
import BrandTwo from "../elements/brand/BrandTwo";

//frame-image
const Company = () => {
    return (
        <>
            <SEO title="Homepage" />
            <main className="page-wrapper">
                <HeaderOne btnStyle="btn-small round btn-icon" HeaderSTyle="header-transparent" />
                {/* Start Slider Area  */}
                <div className="slider-area slider-style-1 bg-transparent height-750">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-7 col-xl-6 order-2 order-lg-1 mt_md--40 mt_sm--40">
                                <div className="inner text-start">
                                    <span className="subtitle"> NEXT GENERATION SIMULATOR</span>
                                    <h1 className="title theme-gradient display-one">NGS-360-3</h1>
                                    <ul className="list-icon">
                                        <li><span className="icon"><FiCheck /></span> Flight Simulation for jetd and light helicopters .</li>
                                        <li><span className="icon"><FiCheck /></span> Examining the causes of disorientation.</li>
                                        <li><span className="icon"><FiCheck /></span> Motion Ride for entertainment applications.</li>
                                    </ul>
                                    <div className="button-group mt--40">
                                        <a className="btn-default btn-medium round btn-icon" target="_blank" href="http://store.covisart.com.tr/">Purchase Now <i className="icon"><FiArrowRight /></i></a>
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

                <SlpitOne />

                <div className="rwt-portfolio-area rn-section-gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <SectionTitle
                                    textAlign="text-center"
                                    radiusRounded=""
                                    subtitle="Our Project"
                                    title="Why People Choose Us!"
                                    description=""
                                />
                            </div>
                        </div>
                        <PortfolioOne Column="col-lg-6 col-md-6 col-sm-12 col-12 mt--50 portfolio" />
                    </div>
                </div>

                <Separator />

                {/* Start Elements Area  */}
                <div className="rwt-team-area rn-section-gap">
                    <div className="wrapper plr--65">
                        <div className="row">
                            <div className="col-lg-12">
                                <SectionTitle
                                    textAlign="text-center"
                                    radiusRounded=""
                                    subtitle="Our Experts."
                                    title="Companies Team"
                                    description="There are many variations of passages of Lorem Ipsum available, <br /> but the majority have suffered alteration."
                                />
                            </div>
                        </div>
                        <TeamFour column="col-lg-6 col-xl-3 col-md-6 col-12 mt--30" teamStyle="team-style-three" />
                    </div>
                </div>
                {/* End Elements Area  */}

                {/* Start Brand Area  */}
                <div className="rwt-brand-area pb--80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h3 className="title">Our Awesome Customer Relation Build a <br /> Long Term Relationship.</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <BrandTwo brandStyle="brand-style-2" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Brand Area  */}
                <FooterTwo />
                <Copyright />
            </main>
        </>
    )
}
export default Company;
