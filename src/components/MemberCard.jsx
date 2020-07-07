import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../layouts/MemberCard.css';
import '../layouts/List.css';

class MemberCard extends Component {

    render() {
        return(
            <div className="membercard col-md-12 col-lg-6">
                {this.props.user? 
                <>
                
                    <h1>Home Details</h1>
                    <div className="d-flex justify-content-center text-center flex-column">
                        <Link to={`/user/profile/${this.props.user._id}`} className="link-group d-flex justify-content-center flex-column member-card">
                            <p className="card-text"><strong>Home Name:</strong></p>
                            <p className="card-text member-hover">{this.props.user.homeName}</p>
                        </Link>
                    </div>
                    <div className="d-flex justify-content-center text-center flex-column">
                        <div className="card-body d-flex justify-content-center flex-column">
                            <p className="card-text"><strong>Home Location:</strong></p>
                            <p className="card-text">{this.props.user.city}</p>
                            <p className="card-text"><strong>Description:</strong></p>
                            <p className="card-text">{this.props.user.homeDescription}</p>
                            <p className="card-text"><strong>Owner:</strong></p>
                            <p className="card-text">{this.props.user.name}</p>

                        </div>

                    </div>

                </> :
                    <h1>Select Property</h1>
                }


            </div>
        )
    }
}
export default MemberCard;