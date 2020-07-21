import React, { Component } from "react";
import Default from '../layouts/Default';
import { signup } from "../utils/auth";

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
            this.props.history.push(`/user/login`);
        })
        .catch(err => {
            this.setState({error: err.response.data.errorMessage});
        });
    }

    render() {
        return (
            <Default>
                <div class="container d-flex justify-content-center my-3">
                    <div class="col-8">
                        <form id="form" onSubmit={this.signUpUser}>
                            <h2 className="mb-4">Signup</h2>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input className="form-control" type="text" onChange={this.handleChange} name="username" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname">Name</label>
                                <input className="form-control" type="text" onChange={this.handleChange} name="name" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="text" onChange={this.handleChange} name="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">City</label>
                                <input className="form-control" type="text" onChange={this.handleChange} name="city" placeholder="City" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" onChange={this.handleChange} name="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" for="Name">Address</label>
                                <input type="text"  className="form-control form-box" name="address" onChange={this.handleChange} placeholder="Address and city"/>
                            </div>
                            
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
            </Default>
        )
    }
}

export default Signup;