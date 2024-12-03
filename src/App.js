import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageScrollTop from './components/pageToTop/PageScrollTop'
import Company from "./pages/Company";
import NGS from "./covisart/NGS";
import Simulator from "./covisart/Simulator";
import Contact from "./elements/contact/Contact";
// Import Css Here 
import './assets/scss/style.scss';

const App = () => {
    return (
        <Router>
            <PageScrollTop>
                <Routes>
                    <Route path={`${process.env.PUBLIC_URL + "/ngs"}`} element={<NGS />} />
                    <Route path={`${process.env.PUBLIC_URL + "/simulator"}`} element={<Simulator />} />
                    <Route path={`${process.env.PUBLIC_URL + "/"}`} element={<Company />} />
                    <Route path={`${process.env.PUBLIC_URL + "/contact"}`} element={<Contact />} />
                </Routes>
            </PageScrollTop>
        </Router>
    )
}
export default App
