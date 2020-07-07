import React, { Component } from "react";
import Default from '../layouts/Default';
import { login, getUser } from "../utils/auth";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    state = {
        user: {
            username: "",
            password: ""
        },
        error: null
    }

    handleChange(e) {
        let user = {...this.state.user};
        user[e.target.name] = e.target.value;
        this.setState({user});
    }

    loginUser(e) {
        e.preventDefault();
        login(this.state.user)
        .then(() => {
            let userId = getUser();
            this.props.history.push(`/user/profile/${userId._id}`);
        })
        .catch(err => {
            this.setState({error: err.response.data.errorMessage});
        });
    }

    render() {
        return (
            <Default>
                <div className="container d-flex justify-content-center my-3">
                    <div className="col-8">
                        <div id="form">
                            <h2 className="mb-4">Login</h2>
                            <div className="form-group">
                                <label htmlFor="username">Username or email</label>
                                <input className="form-control" type="text" onChange={this.handleChange} name="usernameOrEmail" placeholder="Username or email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" onChange={this.handleChange} name="password" placeholder="Password" />
                            </div>
                            
                            <button onClick={this.loginUser} type="submit">Submit</button>
                        </div>
                    </div>
                    {this.state.error && <p>{this.state.error}</p>}
                </div>
            </Default>
        )
    }
}

export default Login;