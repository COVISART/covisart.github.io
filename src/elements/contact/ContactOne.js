import React from 'react';
import ContactForm from "./ContactForm";
import ReactGoogleMap from "./ReactGoogleMap";
import { FiHeadphones , FiMail , FiMapPin } from "react-icons/fi";
import { APIProvider } from "@vis.gl/react-google-maps";
import CompanyLocation from "../../covisart/map/map"
const ContactOne = () => {
    return (
        <>
            <div className="row row--15">
                <div className="col-lg-12">
                    <div className="rn-contact-address mt_dec--30">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="rn-address">
                                    <div className="icon">
                                        <FiHeadphones />
                                    </div>
                                    <div className="inner">
                                        <h4 className="title">Contact Phone Number</h4>
                                        <p><a href="tel:+90 505 068 9196">+90 505 068 9196</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="rn-address">
                                    <div className="icon">
                                        <FiMail />
                                    </div>
                                    <div className="inner">
                                        <h4 className="title">Our Email Address</h4>
                                        <p><a href="mailto:info@covisart.com">info@covisart.com</a></p>
                                        <p><a href="mailto:contact@covisart.com">support@covisart.com</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="rn-address">
                                    <div className="icon">
                                        <FiMapPin />
                                    </div>
                                    <div className="inner">
                                        <h4 className="title">Our Locations</h4>
                                        <p>Turkey. TEKNOPARK ANKARA TECHNOLOGY DEVELOPMENT ZONE, <br /> B BLOK OFIS 32</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt--40 row--15">
                <div className="col-lg-7">
                    <CompanyLocation />  
                </div>
                <div className="col-lg-5 mt_md--30 mt_sm--30">
                    <ContactForm formStyle="contact-form-1" />
                </div>
            </div>
            
        </>
    )
}
export default ContactOne;