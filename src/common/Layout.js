import React from 'react';
import HeaderOne from "./header/HeaderOne";
import HeaderTopNews from "./header/HeaderTopNews";
import FooterTwo from "./footer/FooterTwo";
import Copyright from "./footer/Copyright";
//                < HeaderTopNews />
const Layout = ({ children }) => {
    return (
        <>

            <main className="page-wrapper">
                {
                    //<HeaderOne btnStyle="btn-small round btn-icon" HeaderSTyle="header-not-transparent" />
                }
                {children}
                <FooterTwo />
                <Copyright />
            </main>
        </>
    )
}
export default Layout;
