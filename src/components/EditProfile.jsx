import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import axios from 'axios';
import qs from 'qs';
import EditProfilePictures from './EditProfilePictures'

class EditProfile extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.addPictureHandler = this.addPictureHandler.bind(this);
        this.deletePicturesHandler = this.deletePicturesHandler.bind(this);
    }

    state = {
        user: {},
        error: null
    }

    componentDidMount() {
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}`,
            withCredentials: true,
            method: 'GET'
        })
        .then(response => {
            let user = response.data;
            this.setState({ user });
        })
        .catch(error => {
            this.setState({ error });
        })
    }

    handleChange(e) {
        let user = { ...this.state.user };
        user[e.target.name] = e.target.value;
        this.setState({ user });
    }
   
    editProfile(e) {
        e.preventDefault();
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}/edit`,
            data: qs.stringify(this.state.user),
            withCredentials: true,
            method: "POST"
        })
        .then(response => {
            this.props.profileUpdate(response.data);
            this.props.history.push(`/user/profile/${response.data._id}`);
        })
        .catch(error => {
            this.setState({ error });
        })
    }

    addPictureHandler(uploadedPicture) {
        let userCopy = JSON.parse(JSON.stringify(this.state.user));
        userCopy.pictures.push(uploadedPicture)
        this.setState({
            user: userCopy
        })
    }

    deletePicturesHandler(pictureId){
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}/edit/delete/${pictureId}`,
            withCredentials: true,
            method: 'GET'
        })
        .then(response => {
            let userCopy = JSON.parse(JSON.stringify(this.state.user));
            let indexN;
            userCopy.pictures.forEach((picture, index) => {if(picture._id === pictureId) indexN = index});
            userCopy.pictures.splice(indexN, 1);
            this.setState({ user: userCopy })
        })
        .catch(error => {
            this.setState({ error });
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.editProfile}  className="container">
                    <div className="form-group">
                        <label htmlFor="firstname">Name</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="name" value={this.state.user.name} placeholder="First name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Home name</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="homeName" value={this.state.user.homeName} placeholder="Home name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Home description</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="homeDescription" value={this.state.user.homeDescription} placeholder="Home description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">City</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="city" value={this.state.user.city} placeholder="City" />
                    </div>
                </form>
                {<Route path={`/user/profile/:id/edit`} render={() => <EditProfilePictures addPicture={this.addPictureHandler} deletePictures={this.deletePicturesHandler} user = {this.state.user} />} />}
                {this.state.error && <p>{this.state.error}</p>}
                <button onClick={this.editProfile}>Submit</button>
            </div>
        )
    }
}

export default EditProfile;