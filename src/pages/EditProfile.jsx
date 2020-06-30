import React, { Component } from 'react';
import axios from 'axios';
import { getUser } from '../utils/auth';
import qs from 'qs';

class EditProfile extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    state = {
        user: getUser(),
        error: null
    }

    handleChange(e) {
        let user = {...this.state.user};
        user[e.target.name] = e.target.value;
        this.setState({user});
    }

    editProfile(e) {
        e.preventDefault();
        debugger
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}/edit`,
            data: qs.stringify(this.state.user),
            withCredentials: true,
            method: "POST"
        })
        .then(() => {
            this.props.editProfile();
            this.props.history.push(`/user/profile/${this.props.match.params.id}`);
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return(
            <div className="new-beer">
                <form className="container">
                    <div className="form-group">
                        <label for="firstname">Name</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="name" value={this.state.user.name} placeholder="First name" />
                    </div>
                    <div className="form-group">
                        <label for="lastname">Home name</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="homeName" value={this.state.user.homeName} placeholder="Home name" />
                    </div>
                    <div className="form-group">
                        <label for="email">Home description</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="homeDescription" value={this.state.user.city} placeholder="Home description" />
                    </div>
                    <div className="form-group">
                        <label for="email">City</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="city" value={this.state.user.city} placeholder="City" />
                    </div>
                    
                    <button onClick={this.editProfile} type="submit">Submit</button>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}

export default EditProfile;