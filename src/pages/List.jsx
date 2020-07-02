import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Default from '../layouts/Default';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        users: null
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile`, {withCredentials: true})
        .then(response => {
            let users = response.data;
            this.setState({users});
        })
        .catch (error => {
            this.setState({error});
        });
    }


    render() {
        if(this.state.users === null) return <h1>Loading...</h1>;
        return(
            <Default>
                {
                this.state.users.map(user => 
                    <Link to={`/user/profile/${user._id}`}>
                        <p>{user.homeName}</p>
                    </Link>
                )
                }
            </Default>
        )
        
    }
}

export default Profile;