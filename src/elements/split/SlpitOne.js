import React from 'react';
import ScrollAnimation from "react-animate-on-scroll";


const SlpitOne = () => {
    return (
            <div className="rn-splite-style">
                <div className="split-wrapper">
                        <div className="row no-gutters radius-10 align-items-center">
                            <div className="col-lg-12 col-xl-6 col-12">
                                <div className="thumbnail image-left-content">
                                    <img src="./images/split/Covisart-NGS-360-3-AI-1536x864.png" alt="split Images" />
                                </div>
                            </div>
                            <div className="col-lg-12 col-xl-6 col-12">
                                <div className="split-inner">
                                    <ScrollAnimation 
                                    animateIn="fadeInUp"
                                    animateOut="fadeInOut"
                                    animateOnce={true}>
                                        <h4 className="title">What is AI Powered Simulator?</h4>
                                    </ScrollAnimation>
                                    <ScrollAnimation 
                                    animateIn="fadeInUp"
                                    animateOut="fadeInOut"
                                    animateOnce={true}>
                                    <p className="description">This simulator was equipped with AI model trained with 1000 hours working time data. 
                                    It decrease response time of motion control system.</p>
                                    </ScrollAnimation>

                                    
                                    <ScrollAnimation 
                                    animateIn="fadeInUp"
                                    animateOut="fadeInOut"
                                    animateOnce={true}>
                                        <ul className="split-list">
                                            <li>- AI model controls servo motor that was equipped with absolute encoder</li>
                                            <li>- AI predicts next direction of movement</li>
                                            <li>- Has 30% advantage over classic motion control algorithms</li>
                                            <li>- Can be retrain over time with new dataset using Transfer learning techniques</li>
                                        </ul>
                                    </ScrollAnimation>
                                    <ScrollAnimation 
                                    animateIn="fadeInUp"
                                    animateOut="fadeInOut"
                                    animateOnce={true}>
                                        <div className="view-more-button mt--35">
                                            <a className="btn-default" href="/contact">Contact With Us</a>
                                        </div>
                                    </ScrollAnimation>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SlpitOne
