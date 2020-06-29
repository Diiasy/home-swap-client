import React, { Component } from "react";
import Default from '../layouts/Default';
import { logout } from "../utils/auth";

class Logout extends Component {
    componentDidMount(){
        logout()
        .then(() => {
            this.props.history.push("/")
        })        
        .catch (error => {
            this.setState({error});
        })
    }

    render() {
        return (
            <Default>
                <h1>Logging out!</h1>
            </Default>
        )
    }
}

export default Logout;