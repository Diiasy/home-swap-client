import React, { Component } from "react";
import Default from '../layouts/Default';
import { login } from "../utils/auth";

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
            this.props.history.push(`/`)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Default>
                <div className="login">
                    <form className="container">
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input className="form-control" type="text" onChange={this.handleChange} name="username" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input className="form-control" type="password" onChange={this.handleChange} name="password" placeholder="Password" />
                        </div>
                        
                        <button onClick={this.loginUser} type="submit">Submit</button>
                    </form>
                </div>
            </Default>
        )
    }
}

export default Login;