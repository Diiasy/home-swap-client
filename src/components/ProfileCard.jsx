import React, { Component } from 'react';
import axios from 'axios';

class ProfileCard extends Component {
    state = {
        user: {}
    }

    componentDidMount() {
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/profile`,
            method: "GET",
            withCredentials: true
            })
        .then(response => {
            let users = response.data;
            let user = users.find((profile) => profile._id === this.props.currentProfile);
            return this.setState({user});
        })
        .catch((error)=>{
            return error;
        });
    }

    render() {
        return(
            <div>
                <h1>Home details</h1>
                <p><strong>Home name: </strong>{this.state.user.homeName}</p>
                <p><strong>Home location: </strong>{this.state.user.city}</p>
                <p><strong>Description: </strong>{this.state.user.homeDescription}</p>
                <p><strong>Owner: </strong>{this.state.user.name}</p>
            </div>
        )
    }
}

export default ProfileCard;