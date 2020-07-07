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
                
                    <h2>Home Details</h2>
                    <hr/>
                    <div className="d-flex justify-content-center text-center flex-column">
                        <Link to={`/user/profile/${this.props.user._id}`} className="link-group d-flex justify-content-center flex-column member-card">
                            <h4 className="card-text member-hover">{this.props.user.homeName}</h4>
                        </Link>
                    </div>
                    <div className="d-flex justify-content-center text-center flex-column">
                        <div className="card-body d-flex justify-content-center flex-column">
                            <p className="card-text"><strong>Home Location: </strong><span>{this.props.user.city}</span></p>
                            <p className="card-text"><strong>Description:</strong></p>
                            <p className="card-text">{this.props.user.homeDescription}</p>
                            <p className="card-text"><strong>Owner: </strong><span>{this.props.user.name}</span></p>
                        </div>

                    </div>
                    <hr/>
                </> :
                    <h2>Select Property</h2>
                }
            </div>
        )
    }
}
export default MemberCard;