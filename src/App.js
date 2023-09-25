import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageScrollTop from './components/pageToTop/PageScrollTop'

// Pages import Here 
import Splash from "./pages/Splash";
import HomeDefault from "./pages/HomeDefault";
import BusinessConsulting2 from "./pages/BusinessConsulting2";
import Corporate from "./pages/Corporate";
import Business from "./pages/Business";
import DigitalAgency from "./pages/DigitalAgency";
import Finance from "./pages/Finance";
import Company from "./pages/Company";
import Marketing from "./pages/Marketing";
import TravelAgency from "./pages/TravelAgency";
import Consulting from "./pages/Consulting";
import SeoAgency from "./pages/SeoAgency";
import PersonalPortfolio from "./pages/PersonalPortfolio";
import EventConference from "./pages/EventConference";
import CreativePortfolio from "./pages/CreativePortfolio";
import Freelancer from "./pages/Freelancer";
import InternationalConsulting from "./pages/InternationalConsulting";
import Startup from "./pages/Startup";
import WebAgency from "./pages/WebAgency";


import CategoryList from "./pages/CategoryList";
import TagList from "./pages/TagList";
import Author from "./pages/Author";
import AboutUs from "./pages/AboutUs";

import NGS from "./pages/NGS";
// Elements import Here 

import Elements from "./elements/elements/Elements";
import Button from "./elements/button/Button";
import Service from "./elements/service/Service";
import CounterUp from "./elements/counterup/CounterUp";
import Progressbar from "./elements/progressbar/Progressbar";

import Portfolio from "./elements/portfolio/Portfolio";
import portfolioThreeColumn from "./elements/portfolio/PortfolioThreeColumn";
import PortfolioFullWidth from "./elements/portfolio/PortfolioFullWidth";
import PortfolioGrid from "./elements/portfolio/PortfolioGrid";
import PortfolioBoxLayout from "./elements/portfolio/PortfolioBoxLayout";
import PortfolioDetails from "./pages/PortfolioDetails";
import Social from "./elements/social/Social";
import Team from "./elements/team/Team";
import Timeline from "./elements/timeline/Timeline";
import Testimonial from "./elements/testimonial/Testimonial";
import RnAccordion from "./elements/accordion/RnAccordion";
import Tab from "./elements/tab/Tab";
import Pricing from "./elements/pricing/Pricing";
import Split from "./elements/split/Split";
import CalltoAction from "./elements/calltoaction/CalltoAction";
import Video from "./elements/video/Video";
import Gallery from "./elements/gallery/Gallery";
import Contact from "./elements/contact/Contact";
import Brand from "./elements/brand/Brand";
import AdvanceTab from "./elements/advancetab/AdvanceTab";
import AdvancePricing from "./elements/advancePricing/AdvancePricing";


import BlogGridView from "./components/blog/BlogGridView";
import BlogListView from "./components/blog/BlogListView";
import BlogGridSidebar from "./components/blog/BlogGridSidebar";
import BlogListSidebar from "./components/blog/BlogListSidebar";
import BlogDetails from "./pages/BlogDetails";
import Error from "./pages/Error";


// Import Css Here 
import './assets/scss/style.scss';


const App = () => {
    return (
        <Router>
            <PageScrollTop>
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL + "/ngs"}`} element={<NGS/>} />
                    <Route path={`${process.env.PUBLIC_URL + "/"}`} element={<Company/>} />
                    <Route path={`${process.env.PUBLIC_URL + "/business-consulting"}`} element={HomeDefault} />
                    <Route path={`${process.env.PUBLIC_URL + "/business-consulting-2"}`} element={BusinessConsulting2} />
                    <Route path={`${process.env.PUBLIC_URL + "/corporate"}`} element={Corporate} />
                    <Route path={`${process.env.PUBLIC_URL + "/business"}`} element={Business} />
                    <Route path={`${process.env.PUBLIC_URL + "/digital-agency"}`} element={DigitalAgency} />
                    <Route path={`${process.env.PUBLIC_URL + "/finance"}`} element={Finance} />
                    <Route path={`${process.env.PUBLIC_URL + "/company"}`} element={Company} />
                    <Route path={`${process.env.PUBLIC_URL + "/marketing"}`} element={Marketing} />
                    <Route path={`${process.env.PUBLIC_URL + "/travel-agency"}`} element={TravelAgency} />
                    <Route path={`${process.env.PUBLIC_URL + "/consulting"}`} element={Consulting} />
                    <Route path={`${process.env.PUBLIC_URL + "/seo-agency"}`} element={SeoAgency} />
                    <Route path={`${process.env.PUBLIC_URL + "/personal-portfolio"}`} element={PersonalPortfolio} />
                    <Route path={`${process.env.PUBLIC_URL + "/event-conference"}`} element={EventConference} />
                    <Route path={`${process.env.PUBLIC_URL + "/creative-portfolio"}`} element={CreativePortfolio} />
                    <Route path={`${process.env.PUBLIC_URL + "/freelancer"}`} element={Freelancer} />
                    <Route path={`${process.env.PUBLIC_URL + "/international-consulting"}`} element={InternationalConsulting} />
                    <Route path={`${process.env.PUBLIC_URL + "/startup"}`} element={Startup} />
                    <Route path={`${process.env.PUBLIC_URL + "/web-agency"}`} element={WebAgency} />

                    {/* Blog Part  */}
                    <Route path={`${process.env.PUBLIC_URL + "/blog-grid"}`} element={BlogGridView} />
                    <Route path={`${process.env.PUBLIC_URL + "/blog-list-view"}`} element={BlogListView} />
                    <Route path={`${process.env.PUBLIC_URL + "/blog-grid-sidebar"}`} element={BlogGridSidebar} />
                    <Route path={`${process.env.PUBLIC_URL + "/blog-list-sidebar"}`} element={BlogListSidebar} />
                    <Route path={`${process.env.PUBLIC_URL + "/blog-details/:id"}`} element={BlogDetails} />
                    <Route path={`${process.env.PUBLIC_URL + "/category/:slug"}`} element={CategoryList} />
                    <Route path={`${process.env.PUBLIC_URL + "/archive/:slug"}`} element={Author} />
                    <Route path={`${process.env.PUBLIC_URL + "/tag/:slug"}`} element={TagList} />

                    <Route path={`${process.env.PUBLIC_URL + "/elements"}`} element={Elements} />
                    <Route path={`${process.env.PUBLIC_URL + "/button"}`} element={Button} />
                    <Route path={`${process.env.PUBLIC_URL + "/service"}`} element={Service} />
                    <Route path={`${process.env.PUBLIC_URL + "/counter"}`} element={CounterUp} />
                    <Route path={`${process.env.PUBLIC_URL + "/progressbar"}`} element={Progressbar} />
                    <Route path={`${process.env.PUBLIC_URL + "/social-share"}`} element={Social} />
                    <Route path={`${process.env.PUBLIC_URL + "/team"}`} element={Team} />
                    <Route path={`${process.env.PUBLIC_URL + "/testimonial"}`} element={Testimonial} />
                    <Route path={`${process.env.PUBLIC_URL + "/timeline"}`} element={Timeline} />
                    <Route path={`${process.env.PUBLIC_URL + "/accordion"}`} element={RnAccordion} />
                    <Route path={`${process.env.PUBLIC_URL + "/tab"}`} element={Tab} />
                    <Route path={`${process.env.PUBLIC_URL + "/pricing"}`} element={Pricing} />
                    <Route path={`${process.env.PUBLIC_URL + "/split"}`} element={Split} />
                    <Route path={`${process.env.PUBLIC_URL + "/call-to-action"}`} element={CalltoAction} />
                    <Route path={`${process.env.PUBLIC_URL + "/video-popup"}`} element={Video} />
                    <Route path={`${process.env.PUBLIC_URL + "/gallery"}`} element={Gallery} />
                    <Route path={`${process.env.PUBLIC_URL + "/contact"}`} element={Contact} />
                    <Route path={`${process.env.PUBLIC_URL + "/brand"}`} element={Brand} />
                    <Route path={`${process.env.PUBLIC_URL + "/advance-tab"}`} element={AdvanceTab} />
                    <Route path={`${process.env.PUBLIC_URL + "/advance-pricing"}`} element={AdvancePricing} />
                    <Route path={`${process.env.PUBLIC_URL + "/about-us"}`} element={AboutUs} />

                    <Route path={`${process.env.PUBLIC_URL + "/error"}`} element={Error} />

                    <Route path={`${process.env.PUBLIC_URL + "/portfolio"}`} element={Portfolio} />
                    <Route path={`${process.env.PUBLIC_URL + "/portfolio-three-column"}`} element={portfolioThreeColumn} />
                    <Route path={`${process.env.PUBLIC_URL + "/portfolio-full-width"}`} element={PortfolioFullWidth} />
                    <Route path={`${process.env.PUBLIC_URL + "/portfolio-grid-layout"}`} element={PortfolioGrid} />
                    <Route path={`${process.env.PUBLIC_URL + "/portfolio-box-layout"}`} element={PortfolioBoxLayout} />
                    <Route path={`${process.env.PUBLIC_URL + "/portfolio-details/:id"}`} element={PortfolioDetails} />


                </Routes>
            </PageScrollTop>
        </Router>
    )
}


export default App
