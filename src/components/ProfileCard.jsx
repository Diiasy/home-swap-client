import React, { Component } from 'react';
import axios from 'axios';

class ProfileCard extends Component {
    render() {
        return(
            <div>
                <h1>Home details</h1>
                <p><strong>Home name: </strong>{this.props.currentProfile.homeName}</p>
                <p><strong>Home location: </strong>{this.props.currentProfile.city}</p>
                <p><strong>Description: </strong>{this.props.currentProfile.homeDescription}</p>
                <p><strong>Owner: </strong>{this.props.currentProfile.name}</p>
            </div>
        )
    }
}

export default ProfileCard;