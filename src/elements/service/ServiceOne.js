import React from 'react';
import { FiActivity, FiCast, FiMap } from "react-icons/fi";
import {Link} from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

const ServiceList = [
    {
        icon: <FiActivity />,
        title: 'Awarded Invention',
        description: 'Covisart NGS-360-3 was awarded with IFIA Best National Invention Medal by International Federation of Inventors Associations.'
    },
    {
        icon: <FiCast />,
        title: 'Design & Service',
        description: 'Full moduler design. NGS uses commons parts on many compartments. It provides short production time and increase quality of service support'
    },
    {
        icon: <FiMap />,
        title: 'Easy Integration',
        description: 'With advanced software and CosimSDK, integrated with more than 10 simulation softwares and CosimSDK support many populer programming language.'
    },
]

const ServiceOne = ({textAlign, serviceStyle}) => {
    return (
        <div className="row row--15 service-wrapper">
              {ServiceList.map( (val , i) => (
                <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                    <ScrollAnimation 
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}>
                        <div className={`service ${serviceStyle} ${textAlign}`}>
                            <div className="icon">
                                {val.icon}
                            </div>
                            <div className="content">
                                <h4 className="title w-600"><Link to="#service" dangerouslySetInnerHTML={{__html: val.title}}></Link></h4>
                                <p className="description b1 color-gray mb--0" dangerouslySetInnerHTML={{__html: val.description}}></p>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            ))}
        </div>
    )
}
export default ServiceOne;