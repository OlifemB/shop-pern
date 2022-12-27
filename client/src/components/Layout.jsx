import React from 'react';
import NavBar from "./NavBar";

const Layout = ({children}) => {
    return (
        <div className={'app'}>
            <NavBar/>
            {children}
        </div>
    );
};

export default Layout;