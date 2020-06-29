import React, { Component } from 'react';
import Default from '../layouts/Default';
import { getUser } from '../utils/auth';

class ProfileCard extends Component {
    user = getUser();

    render() {
        return(
            <div>
                <h1>Home details</h1>
                <p><strong>Home name: </strong>{this.user.homeName}</p>
                <p><strong>Home location: </strong>{this.user.city}</p>
                <p><strong>Description: </strong>{this.user.homeDescription}</p>
                <p><strong>Owner: </strong>{this.user.name}</p>
            </div>
        )
    }
}

export default ProfileCard;