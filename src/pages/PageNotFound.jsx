import React, { Component } from 'react';
import Default from '../layouts/Default';
import '../layouts/pagenotfound.css';

class PageNotFound extends Component {
    render() {
        return(
            <Default>
                <h2>Page not found</h2>
                <img  src="https://media.giphy.com/media/M28rUlcjueKUE/giphy.gif" alt="sad gif"/>
            </Default>
        )
    }
}

export default PageNotFound;