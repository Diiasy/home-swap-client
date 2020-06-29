import React from 'react';
import Navbar from '../components/Navbar';

function Default(props) {
    return(
        <div className="default">
            <Navbar />
            {props.children}
        </div>
    )
}

export default Default;