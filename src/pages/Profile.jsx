import React, { Component } from 'react';
import Default from '../layouts/Default';
import { getUser } from '../utils/auth';
// import { Link, Route } from 'react-router-dom'; 
import ProfileCard from '../components/ProfileCard';
// import EditProfile from './EditProfile';

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
        this.setState({
            form: !this.state.form
        });
    }

    render() {
        {
            if (this.user.id === this.props.match.params.id) {
                return(
                    <Default>
                        <ProfileCard />
                        {/* <Link to={`/user/profile/edit`} onClick={this.toggleForm}>Edit profile</Link> */}
                        {/* {this.state.form && <Route path="/user/profile/edit" render={(props) => <EditProfile {...props} editProfile={this.toggleForm} />} />} */}
                    </Default>
                )
            } else {
                return(
                    <Default>
                        <ProfileCard />
                    </Default>
                )
            }

        }
    }
}

export default Profile;