import React, { Component } from 'react';
import axios from 'axios';
import { removeUser } from '../utils/auth';

import '../layouts/deleteUser.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.deleteUserHandler = this.deleteUserHandler.bind(this);
        this.backtoProfile = this.backtoProfile.bind(this);
    }

    deleteUserHandler(){
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}/delete`, {withCredentials: true})
        .then(() => {
            removeUser();
            this.props.history.push(`/`);
        })
        .catch(err => {
            this.setState({
                error: err.response.data.message
            })
        })
    }

    backtoProfile(){
        this.props.profileUpdate();
        this.props.history.push(`/user/profile/${this.props.user._id}`);
    }

    render() {
        return(
            <div className="delete-confirmation">
                <p>Do you really want to delete your profile?</p>
                <button className="close-delete" onClick={this.backtoProfile}> No, I don't</button>
                <button className="delete-account" onClick={this.deleteUserHandler}>Yes, I don't want to swap homes anymore</button>
            </div>
        )
    }
}

export default Profile;