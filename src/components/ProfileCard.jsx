import React, { Component } from 'react';
import '../layouts/Card.css';


class ProfileCard extends Component {
    render() {
        let pictures = this.props.user.pictures;
        return(
            <div className="container-fluid">
                <div className="row justify-content-center my-3">
                    <div className="col-md-10 col-lg-4 my-2">
                        <h2>Home details</h2>
                        <p><strong>Home name: </strong>{this.props.user.homeName}</p>
                        <p><strong>Home location: </strong>{this.props.user.city}</p>
                        <p><strong>Description: </strong>{this.props.user.homeDescription}</p>
                        <p><strong>Owner: </strong>{this.props.user.name}</p>
                    </div>
                {/* </div>
                <div className="row justify-content-center my-3"> */}

                        {
                            pictures && pictures.map(picture => 
                            <div className="col-md-10 col-lg-4 my-2">
                                <img key={picture._id} src={picture.path} alt={picture.name} className="card-img-top"/>
                            </div>
                            )
                            
                        }
                    </div>
                </div>
        )
    }
}

export default ProfileCard;