import React, { Component } from 'react';
import '../layouts/Profile.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

class ProfileCard extends Component {
    render() {
        let pictures = this.props.user.pictures;
        return(
            <div  className="row justify-content-between m-3">
            
                <div className="col-md-10 col-lg-4 my-2">
                    <h2>Home details</h2>
                    <p><strong>Home name: </strong>{this.props.user.homeName}</p>
                    <p><strong>Home location: </strong>{this.props.user.city}</p>
                    <p><strong>Description: </strong>{this.props.user.homeDescription}</p>
                    <p><strong>Owner: </strong>{this.props.user.name}</p>
                </div>

                <div className="col-md-10 col-lg-7 m-2 carousel">
                    <Carousel>
                        {
                            pictures && pictures.map(picture =>
                                <Carousel.Item  key={picture._id}>
                                    <img className="d-block w-100" src={picture.path} alt={picture.name} />
                                </Carousel.Item>
                            )
                        }
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default ProfileCard;

