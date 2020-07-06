import React from 'react';
import Navbar from '../components/Navbar';

function Default(props) {
    return(
        <div>
            <Navbar />
            {props.children}
        </div>

    )
}

export default Default;