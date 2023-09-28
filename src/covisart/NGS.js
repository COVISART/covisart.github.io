import React, { Component } from 'react';
import SEO from "../common/SEO";
import Layout from "../common/Layout";
import BreadcrumbOne from "../elements/breadcrumb/BreadcrumbOne";
import SectionTitle from "../elements/sectionTitle/SectionTitle";
import PricingOne from "../elements/pricing/PricingOne";
import PricingTwo from "../elements/pricing/PricingTwo";
import PricingThree from "../elements/pricing/PricingThree";
import PricingFour from "../elements/pricing/PricingFour";
import PricingFive from "../elements/pricing/PricingFive";
import Separator from "../elements/separator/Separator";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import TabOne from "../elements/tab/TabOne";
import FooterTwo from '../common/footer/FooterTwo';
import Copyright from '../common/footer/Copyright';
import Product from "./Product"

class NGS extends Component {
    render() {
        return (
            <main className="page-wrapper">
                <div className="main-content">
                    {/* Start Elements Area  */}
                    <div className="rwt-tab-area">
                        <div className="wrapper plr--100 plr_md--15 plr_sm--15">
                            <Product />
                        </div>
                    </div>
                    {/* End Elements Area  */}
                    {/* Start Elements Area  */}

                    {/**
                     * 
                     * <div className="rwt-pricing-area rn-section-gap">
                        <div className="wrapper plr--100 plr_md--15 plr_sm--15">
                            <div className="row mb--40 mb_sm--0">
                                <div className="col-lg-12">
                                    <SectionTitle
                                        textAlign="text-center"
                                        radiusRounded=""
                                        subtitle="Pricing"
                                        title="NGS-360 Motion Platform Family"
                                        description=""
                                    />
                                </div>
                            </div>
                            <PricingFour />
                        </div>
                    </div>
                     */}
                    {/* End Elements Area  */}

                </div>
                <Copyright />
            </main>
        )
    }
}
export default NGS;