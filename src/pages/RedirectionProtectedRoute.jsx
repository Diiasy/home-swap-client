import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import Default from '../layouts/Default';
import '../layouts/pagenotfound.css';

class RedirectionProtectedRoute extends Component {
    render() {
        return(
            <Default>
                <h2>You cannot access this page yet.</h2>
                <img  src="https://media.giphy.com/media/M28rUlcjueKUE/giphy.gif" alt="sad gif"/>
                <div className="d-flex justify-content-center">
                    <Link to='/user/login'><p className="button">Login</p></Link>
                    <Link to='/user/signup'><p className="button">Sign up</p></Link>
                </div>
            </Default>
        )
    }
}

export default RedirectionProtectedRoute;