import React, { Component } from 'react';

class ProfileCard extends Component {
    render() {
        let pictures = this.props.currentProfile.pictures;
        return(
            <div>
                <h1>Home details</h1>
<<<<<<< HEAD
                <p><strong>Home name: </strong>{this.props.user.homeName}</p>
                <p><strong>Home location: </strong>{this.props.user.city}</p>
                <p><strong>Description: </strong>{this.props.user.homeDescription}</p>
                <p><strong>Owner: </strong>{this.props.user.name}</p>
=======
                <p><strong>Home name: </strong>{this.props.currentProfile.homeName}</p>
                <p><strong>Home location: </strong>{this.props.currentProfile.city}</p>
                <p><strong>Description: </strong>{this.props.currentProfile.homeDescription}</p>
                <p><strong>Owner: </strong>{this.props.currentProfile.name}</p>
                {
                    pictures && pictures.map(picture => <img key={picture._id} src={picture.path} alt={picture.name}/>)
                }
>>>>>>> 90894d34b40de3d30c1e5d92b490d1d6543f0e74
            </div>
        )
    }
}

export default ProfileCard;