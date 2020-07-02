import React, { Component } from 'react';

class ProfileCard extends Component {
    render() {
        let pictures = this.props.user.pictures;
        return(
            <div>
                <h1>Home details</h1>
                <p><strong>Home name: </strong>{this.props.user.homeName}</p>
                <p><strong>Home location: </strong>{this.props.user.city}</p>
                <p><strong>Description: </strong>{this.props.user.homeDescription}</p>
                <p><strong>Owner: </strong>{this.props.user.name}</p>
                {
                    pictures && pictures.map(picture => <img key={picture._id} src={picture.path} alt={picture.name}/>)
                }
            </div>
        )
    }
}
export default ProfileCard;