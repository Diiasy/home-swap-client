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
import AddReview from '../components/AddReview';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.toggleForms = this.toggleForms.bind(this);
        this.profileUpdate = this.profileUpdate.bind(this);
    }

    state = {
        user: null,
        form: false,
        error: null,
        editCalendar: false,
        removeDates: false,
        calendar: true
    }

    currentUser = getUser();

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}`, {withCredentials: true})
        .then(response => {
            let user = response.data;
            this.setState({user});
        })
        .catch (error => {
            this.setState({error});
        });
    }

    toggleForms(theForm){
        switch(theForm){
            case "form":
                this.setState({
                    form: true,
                    addDates: false,
                    removeDates: false,
                    calendar: false 
                });
                break;
            case "addDates":
                this.setState({
                    form: false,
                    addDates: true,
                    removeDates: false,
                    calendar: false 
                });
                break;
            case "removeDates":
                this.setState({
                    form: false,
                    addDates: false,
                    removeDates: true,
                    calendar: false 
                });
                break;
            default:
                this.setState({
                    form: false,
                    addDates: false,
                    removeDates: false,
                    calendar: true
                });
        }
    }

    profileUpdate(response){
        let user = response;
        this.setState({
            user,
            form: false,
            addDates: false,
            removeDates: false,
            calendar: true
        });
    }

    render() {
        if(this.state.user === null) return <h1>Loading...</h1>;
        if (this.currentUser._id === this.props.match.params.id) {
            return(
                <Default>
                    <ProfileCard user = {this.state.user}/>
                    <Link to={`/user/profile/${this.props.match.params.id}/edit`} onClick={() => this.toggleForms("form")}>Edit profile</Link>
                    <Link to={`/user/profile/${this.props.match.params.id}/removeavailability`} onClick={() => this.toggleForms("removeDates")}>Remove Availability</Link>
                    <Link to={`/user/profile/${this.props.match.params.id}/available`} onClick={() => this.toggleForms("addDates")}>Provide Availability</Link>
                    { this.state.calendar && <Calendar user = {this.state.user} /> }
                    {this.state.form && <Route path={`/user/profile/:id/edit`} render={(props) => <EditProfile {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                    {this.state.addDates && <Route path={`/user/profile/:id/available`} render={(props) => <Available {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                    {this.state.removeDates && <Route path={`/user/profile/:id/removeavailability`} render={(props) => <RemoveDates {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                </Default>
            )
        } else {
            return(
                <Default>
                    <ProfileCard user = {this.state.user} />
                    <Calendar user = {this.state.user}/>
                    <AddReview user={this.state.user} />

                </Default>
            )
        }
    }

}

export default Profile;