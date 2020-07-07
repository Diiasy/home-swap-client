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
                <div className="container-fluid">
                <h2 className="mb-4">See you soon!</h2>
                </div>
            </Default>
        )
    }
}

export default Logout;