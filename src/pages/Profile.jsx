import React, { Component } from 'react';
import Default from '../layouts/Default';
import axios from 'axios';
import { Link, Route } from 'react-router-dom'; 
import ProfileCard from '../components/ProfileCard';
import EditProfile from './EditProfile';
import { getUser } from '../utils/auth';
import Available from '../components/AddDates';
import RemoveDates from '../components/RemoveDates';
import Calendar from '../components/Calendar';




class Profile extends Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.profileUpdate = this.profileUpdate.bind(this);
        this.toggleEditCalendar = this.toggleEditCalendar.bind(this);
        this.toggleRemoveDates = this.toggleRemoveDates.bind(this);
    }

    state = {
        user: null,
        form: false,
        error: null,
        editCalendar: false,
        removeDates: false
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

    toggleRemoveDates(){
        this.setState({
            removeDates: !this.state.removeDates
        });
    }

    profileUpdate(response){
        let user = response;
        this.setState({
            user,
            form: false,
            editCalendar: false,
            removeDates: false
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
                    <Link to={`/user/profile/${this.props.match.params.id}/available`} onClick={this.toggleEditCalendar}>Provide Availability</Link>
                    {this.state.editCalendar && <Route path={`/user/profile/:id/available`} render={(props) => <Available {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                    <Link to={`/user/profile/${this.props.match.params.id}/removeavailability`} onClick={this.toggleRemoveDates}>Remove Availability</Link>
                    {this.state.removeDates && <Route path={`/user/profile/:id/removeavailability`} render={(props) => <RemoveDates {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                </Default>
            )
        } else {
            return(
                <Default>
                    <ProfileCard currentProfile = {this.props.match.params.id}/>
                    <Calendar user={this.state.user}/>


                </Default>
            )
        }
    }

}

export default Profile;