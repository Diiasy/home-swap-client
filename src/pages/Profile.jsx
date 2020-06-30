import React, { Component } from 'react';
import Default from '../layouts/Default';
import axios from 'axios';
import { Link, Route } from 'react-router-dom'; 
import ProfileCard from '../components/ProfileCard';
import EditProfile from './EditProfile';
import { getUser } from '../utils/auth'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.profileUpdate = this.profileUpdate.bind(this);
    }

    state = {
        user: null,
        form: false,
        error: null
    }

    currentUser = getUser();

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}`)
        .then(response => {
            let user = response.data;
            this.setState({user});
        })
        .catch (error => {
            this.setState({error});
        })
    }

    toggleForm(){
        this.setState({
            form: !this.state.form
        });
    }

    profileUpdate(response){
        debugger
        this.toggleForm();
        let user = response;
        this.setState({
            user
        });
    }

    render() {
        {
            if(this.state.user === null) return <h1>Loading...</h1>;
            if (this.currentUser._id === this.props.match.params.id) {
                return(
                    <Default>
                        <ProfileCard currentProfile = {this.state.user}/>
                        <Link to={`/user/profile/${this.props.match.params.id}/edit`} onClick={this.toggleForm}>Edit profile</Link>
                        {this.state.form && <Route path={`/user/profile/:id/edit`} render={(props) => <EditProfile {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
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