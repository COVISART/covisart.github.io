import React from 'react'
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
const Copyright = () => {
    return (
        <div className="copyright-area copyright-style-one">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-7 col-sm-12 col-12">
                        <div className="copyright-left">
                            <ul className="ft-menu link-hover">
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms And Condition</a></li>
                                <li><a href="/contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 mt_sm--20">
                        <div className="copyright-center text-center">
                            <ul className="social-icon social-default icon-naked">
                                <li><Link to="https://facebook.com/covisart"><FiFacebook /></Link></li>
                                <li><Link to="https://twitter.com/covisart"><FiTwitter /></Link></li>
                                <li><Link to="https://instagram.com/covisart"><FiInstagram /></Link></li>
                                <li><Link to="https://www.linkedin.com/company/covisart"><FiLinkedin /></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-12 mt_md--20 mt_sm--20">
                        <div className="copyright-right text-center text-md-end">
                            <p className="copyright-text">Copyright All rights reserved © {new Date().getFullYear()} Covisart R&D Company</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Copyright;