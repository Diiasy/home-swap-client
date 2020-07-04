import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Default from '../layouts/Default';

class List extends Component {
    constructor(props) {
        super(props);
        this.searchProperties = this.searchProperties.bind(this);
    }

    state = {
        users: null,
        filteredUsers: null
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile`, {withCredentials: true})
        .then(response => {
            this.setState({users: response.data, filteredUsers: response.data});
        })
        .catch (error => {
            this.setState({error});
        });
    }

    searchProperties(e){
        debugger
        let searchTerm = e.target.value;
        if (searchTerm.length === 0){
            return this.setState({filteredUsers: this.state.users})
        }
        axios({
            url:`${process.env.REACT_APP_BASE_URL}/user/search?q=${searchTerm}`,
            method: "GET",
            withCredentials: true
        })
        .then(response => {
            if (response.data.length === 0){
                return;
            } else {
                this.setState({filteredUsers: response.data});
            }
        });
    }


    render() {
        if(this.state.users === null) return <h1>Loading...</h1>;
        return(
            <Default>
                <div className="container">
                    <div className="row">
                        <input
                            type="text"
                            className="form-control m-4 form-box"
                            placeholder="Search properties"
                            onChange={this.searchProperties}
                        />

                    </div>
                    <div className="row">
                    {
                        this.state.filteredUsers.map(user =>
                            <div class="col">
                                <Link to={`/user/profile/${user._id}`}>
                                    <p>{user.homeName}</p>
                                </Link>
                            </div>
                        )
                    }
                    </div>
                </div> 

            </Default>
        )
        
    }
}

export default List;