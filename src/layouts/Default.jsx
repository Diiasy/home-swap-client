import React from 'react';
import NavbarApp from '../components/Navbar';
import Footer from '../components/Footer';

import '../layouts/Style.css';



function Default(props) {
    return(
        <div>
            <NavbarApp />
            {props.children}
            <Footer />

        </div>

    )
}

export default Default;