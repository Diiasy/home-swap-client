import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import Default from '../layouts/Default';
import '../layouts/pagenotfound.css';

class PageNotFound extends Component {
    render() {
        return(
            <Default>
                <h2>Page not found</h2>
                <img  src="https://media.giphy.com/media/M28rUlcjueKUE/giphy.gif" alt="sad gif"/>
                <Link className="d-flex justify-content-center" to='/'><p className="button">Go back to home page</p></Link>
            </Default>
        )
    }
}

export default PageNotFound;