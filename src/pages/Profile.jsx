import React, { Component } from 'react';
import Default from '../layouts/Default';
import { getUser } from '../utils/auth';
import { Link, Route } from 'react-router-dom'; 
import ProfileCard from '../components/ProfileCard';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
    }

    user = getUser();

    state = {
        form: false
    }

    toggleForm(){
        debugger
        this.setState({
            form: !this.state.form
        });
    }

    render() {
        {
           if (this.user._id === this.props.match.params.id) {
                return(
                    <Default>
                        <ProfileCard currentProfile = {this.props.match.params.id}/>
                        <Link to={`/user/profile/${this.props.match.params.id}/edit`} onClick={this.toggleForm}>Edit profile</Link>
                        {this.state.form && <Route path={`/user/profile/:id/edit`} render={(props) => <EditProfile {...props} editProfile={this.toggleForm} />} />}
                    </Default>
                )
            } else {
                return(
                    <Default>
                        <ProfileCard currentProfile = {this.props.match.params.id}/>
                    </Default>
                )
            }
        }
    }
}

export default Profile;