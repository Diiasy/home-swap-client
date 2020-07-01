import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

class EditProfile extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    state = {
        user: {},
        error: null
    }

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

    handleChange(e) {
        let user = {...this.state.user};
        user[e.target.name] = e.target.value;
        this.setState({user});
    }

    editProfile(e) {
        e.preventDefault();
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}/edit`,
            data: qs.stringify(this.state.user),
            withCredentials: true,
            method: "POST"
        })
        .then(response=> {
            this.props.profileUpdate(response.data);
            this.props.history.push(`/user/profile/${response.data._id}`);
        })
        .catch(error => {
            this.setState({error});
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.editProfile}  className="container">
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
                        <input className="form-control" type="text" onChange={this.handleChange} name="homeDescription" value={this.state.user.homeDescription} placeholder="Home description" />
                    </div>
                    <div className="form-group">
                        <label for="email">City</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="city" value={this.state.user.city} placeholder="City" />
                    </div>
                    
                    <button type="submit">Submit</button>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}

export default EditProfile;