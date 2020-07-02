import React, { Component } from 'react';

class ProfileCard extends Component {
    render() {
        let pictures = this.props.currentProfile.pictures;
        return(
            <div>
                <h1>Home details</h1>
                <p><strong>Home name: </strong>{this.props.currentProfile.homeName}</p>
                <p><strong>Home location: </strong>{this.props.currentProfile.city}</p>
                <p><strong>Description: </strong>{this.props.currentProfile.homeDescription}</p>
                <p><strong>Owner: </strong>{this.props.currentProfile.name}</p>
                {
                    pictures.map(picture => <img key={picture._id} src={picture.path} alt={picture.name}/>)
                }
            </div>
        )
    }
}

export default ProfileCard;