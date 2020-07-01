import React, { Component } from 'react';
import Default from '../layouts/Default';
import axios from 'axios';
import { Link, Route } from 'react-router-dom'; 
import ProfileCard from '../components/ProfileCard';
import EditProfile from './EditProfile';
import { getUser } from '../utils/auth';
import Available from '../components/Calendar';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.profileUpdate = this.profileUpdate.bind(this);
        this.toggleEditCalendar = this.toggleEditCalendar.bind(this);
    }

    state = {
        user: null,
        form: false,
        error: null,
        editCalendar: false
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
        });
    }

    toggleForm(){
        this.setState({
            form: !this.state.form,
        });
    }

    toggleEditCalendar(){
        this.setState({
            editCalendar: !this.state.editCalendar
        });
    }

    profileUpdate(response){
        let user = response;
        this.setState({
            user,
            form: false,
            editCalendar: false
        });
    }

    render() {

        if(this.state.user === null) return <h1>Loading...</h1>;
        if (this.currentUser._id === this.props.match.params.id) {
            return(
                <Default>
                    <ProfileCard currentProfile = {this.state.user}/>
                    <Link to={`/user/profile/${this.props.match.params.id}/edit`} onClick={this.toggleForm}>Edit profile</Link>
                    {this.state.form && <Route path={`/user/profile/:id/edit`} render={(props) => <EditProfile {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                    <Available currentProfile = {this.state.user}/>
                    <Link to={`/user/profile/${this.props.match.params.id}/available`} onClick={this.toggleEditCalendar}>Provide Availability</Link>
                    {this.state.editCalendar && <Route path={`/user/profile/:id/available`} render={(props) => <EditProfile {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
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

export default Profile;