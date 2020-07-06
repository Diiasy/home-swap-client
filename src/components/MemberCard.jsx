import React, { Component } from 'react';
import '../components/MemberCard.css';
import {Link} from "react-router-dom";


class MemberCard extends Component {

    render() {
        return(
            <div className="membercard">
                {this.props.user? 
                <>
                    <h1>Home details</h1>
                    <Link to={`/user/profile/${this.props.user._id}`} className="link-group">
                        <p><strong>Home name: </strong>{this.props.user.homeName}</p>
                    </Link>
                    <p><strong>Home location: </strong>{this.props.user.city}</p>
                    <p><strong>Description: </strong>{this.props.user.homeDescription}</p>
                    <p><strong>Owner: </strong>{this.props.user.name}</p>
                </> :
                    <h1>Select a user</h1>
                }


            </div>
        )
    }
}
export default MemberCard;