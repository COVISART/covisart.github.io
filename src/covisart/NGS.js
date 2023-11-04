import React, { Component } from 'react';
import Copyright from '../common/footer/Copyright';
import Product from "./Product"
import ReactGA from "react-ga4";
class NGS extends Component {

    render() {

        ReactGA.initialize("G-XTQCE7S8BR");
        ReactGA.send({ hitType: "pageview", page: "/products-and-solutions/new-generation-simulator/ngs-360-3/", title: "NGS-360-3 Axis Simulator" });
        
        ReactGA.gtag("event", "select_content", {
            content_type: "product",
            content_id: "NGS-360-3-v2"
          });

        /*ReactGA.gtag("event", "purchase", {
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
        });*/
        return (
            <main className="page-wrapper" >
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