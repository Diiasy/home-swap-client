import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom'; 
import { getUser } from '../utils/auth';
import Default from '../layouts/Default';
import EditProfile from '../components/EditProfile';
import ProfileCard from '../components/ProfileCard';
import Available from '../components/AddDates';
import RemoveDates from '../components/RemoveDates';
import Calendar from '../components/Calendar';
import Reviews from '../components/Reviews';
import SendMessageBtn from '../components/SendMessageBtn';
import AddFavorite from '../components/AddFavorite';
import DeleteUser from '../components/DeleteUser';
import '../layouts/loading.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.fetchUser = this.fetchUser.bind(this);
        this.toggleForms = this.toggleForms.bind(this);
        this.profileUpdate = this.profileUpdate.bind(this);
    }

    state = {
        user: null,
        form: false,
        error: null,
        editCalendar: false,
        removeDates: false,
        calendar: true,
        confirmationMessage: false
    }

    currentUser = getUser();

    componentDidMount(){
        this.fetchUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchUser();
        }
    }

    fetchUser(){
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
                    calendar: false,
                    confirmationMessage: false
                });
                break;
            case "addDates":
                this.setState({
                    form: false,
                    addDates: true,
                    removeDates: false,
                    calendar: false,
                    confirmationMessage: false
                });
                break;
            case "removeDates":
                this.setState({
                    form: false,
                    addDates: false,
                    removeDates: true,
                    calendar: false,
                    confirmationMessage: false
                });
                break;
            case "confirmationMessage":
                this.setState({
                    form: false,
                    addDates: false,
                    removeDates: false,
                    calendar: true,
                    confirmationMessage: true
                });
                break;
            default:
                this.setState({
                    form: false,
                    addDates: false,
                    removeDates: false,
                    calendar: true,
                    confirmationMessage: false
                });
        }
    }

    profileUpdate(response){
        this.fetchUser();        
        this.setState({
            form: false,
            addDates: false,
            removeDates: false,
            calendar: true,
            confirmationMessage: false
        });
    }

    render() {
        if(this.state.user === null) return <Default><div className="lds-ring col-12 d-flex justify-content-center mt-5"><div></div><div></div><div></div><div></div></div></Default>;
        if (this.currentUser._id === this.props.match.params.id) {
            return(
                <Default>
                    <div className="container-fluid">
                        <ProfileCard user = {this.state.user}/>
                        <div className="row justify-content-center m-3">
                            <div className="col-md-10 my-2">
                                <h4>Edit Profile & Availability</h4>
                            </div>

                            <div className="row justify-content-center m-3">
                                <div className="col-md-12 col-lg-8">
                                    {this.state.calendar && <Calendar user = {this.state.user} /> }
                                    {this.state.form && <Route path={`/user/profile/:id/edit`} render={(props) => <EditProfile {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                                    {this.state.addDates && <Route path={`/user/profile/:id/available`} render={(props) => <Available {...props} user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                                    {this.state.removeDates && <Route path={`/user/profile/:id/removeavailability`} render={(props) => <RemoveDates   user={this.state.user} profileUpdate={this.profileUpdate} />} />}
                                    {this.state.confirmationMessage && <Route path={`/user/profile/:id/delete`} render={(props) => <DeleteUser {...props} user={this.state.user} profileUpdate={this.profileUpdate}/>} />}
                                </div>
                                <div className="col-md-12 col-lg-4 d-flex flex-column align-items-center">
                                    <Link className="button profile-button" to={`/user/profile/${this.props.match.params.id}/edit`} onClick={() => this.toggleForms("form")}>Edit Profile</Link>
                                    <Link className="button profile-button" to={`/user/profile/${this.props.match.params.id}/available`} onClick={() => this.toggleForms("addDates")}>Provide Availability</Link>
                                    <Link className="button profile-button" to={`/user/profile/${this.props.match.params.id}/removeavailability`} onClick={() => this.toggleForms("removeDates")}>Remove Availability</Link>
                                    <Link className="button profile-button" to={`/user/profile/${this.props.match.params.id}/delete`} onClick={() => this.toggleForms("confirmationMessage")}>Delete your profile</Link>
                                </div>
                            </div>

                        </div>
                        <div className="row d-flex justify-content-center m-3">
                            <div className="col-md-10 my-2">
                                <Reviews user={this.state.user}  />
                            </div>
                        </div>
                    </div>
                </Default>
            )
        } else {
            return(
                <Default>
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-end mx-3">
                            <SendMessageBtn {...this.props} className="button" />
                            <AddFavorite {...this.props} className="button" />
                        </div>

                            <ProfileCard user = {this.state.user} />
                            <div className="row d-flex justify-content-center m-3">
                                <div className="col-md-10 my-2">
                                    <h4>Availability of Property</h4>
                                </div>
                                <div className="col-md-10 my-2 d-flex justify-content-center">
                                    <Calendar user = {this.state.user} />
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center m-3">
                                <div className="col-md-10 my-2">
                                    <Reviews user={this.state.user}  />
                                </div>
                            </div>
                    </div>
                </Default>
            )
        }
    }
}

export default Profile;