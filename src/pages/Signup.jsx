import React, { Component } from "react";
import Default from '../layouts/Default';
import { signup, getUser } from "../utils/auth";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.signUpUser = this.signUpUser.bind(this);
    }

    state = {
        user: {},
        error: null
    }


    handleChange(e) {
        let user = {...this.state.user};
        user[e.target.name] = e.target.value;
        this.setState({user});
    }

    signUpUser(e) {
        e.preventDefault();
        signup(this.state.user)
        .then(() => {
            let userId = getUser();
            this.props.history.push(`/user/profile/${userId._id}`);
        })
        .catch(error => {
            this.setState({error});
        });
    }

    render() {
        return (
            <Default>
                <div className="signup">
                    <form className="container">
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input className="form-control" type="text" onChange={this.handleChange} name="username" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label for="firstname">Name</label>
                            <input className="form-control" type="text" onChange={this.handleChange} name="name" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input className="form-control" type="text" onChange={this.handleChange} name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label for="email">City</label>
                            <input className="form-control" type="text" onChange={this.handleChange} name="city" placeholder="City" />
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input className="form-control" type="password" onChange={this.handleChange} name="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="Name">Address</label>
                            <input type="text"  className="form-control form-box" name="address" onChange={this.handleChange} placeholder="Address and city"/>
                        </div>
                        
                        <button onClick={this.signUpUser} type="submit">Submit</button>
                    </form>
                </div>
            </Default>
        )
    }
}

export default Signup;