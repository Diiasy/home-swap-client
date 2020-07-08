import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Default from '../layouts/Default';
import '../layouts/loading.css';
import '../layouts/List.css';

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
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/list`, {withCredentials: true})
        .then(response => {
            this.setState({users: response.data, filteredUsers: response.data});
        })
        .catch (error => {
            this.setState({error});
        });
    }

    searchProperties(e){
        let searchTerm = e.target.value;
        if (searchTerm.length === 0){
            return this.setState({filteredUsers: this.state.users})
        }
        axios({
            url:`${process.env.REACT_APP_BASE_URL}/user/search/location?q=${searchTerm}`,
            method: "GET",
            withCredentials: true
        })
        .then(response => {
            if (response.data.length === 0){
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
            } else {
                this.setState({filteredUsers: response.data});
            }
        })

    } 

    render() {
        if(this.state.users === null) return <Default><div className="lds-ring col-12 d-flex justify-content-center mt-5"><div></div><div></div><div></div><div></div></div></Default>;
            return(
                <Default>
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-end my-2">
                            <form className="form-inline mt-3 mr-4">
                                <input className ="form-control mr-sm-2" 
                                    type="text"
                                    aria-label="Search"
                                    placeholder="Search properties"
                                    onChange={this.searchProperties}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="container-fluid center-box">
                        <div className="row m-3">
                        {
                            this.state.filteredUsers.map(user =>
                                user.pictures.length > 0 &&
                                <div key={user._id} className="col-sm-12 col-md-6 col-xl-4 my-2 d-flex justify-content-around">
                                    <Link to={`/user/profile/${user._id}`} className="user-card">
                                        <div className="card">
                                            <h5 className="card-title p-2">{user.homeName}</h5>
                                            <img src={user.pictures[0].path} className="card-img-top image-responsive" alt=""/>
                                            <div className="card-body">
                                                <p className="card-text location">{user.city}</p>
                                                <p className="card-text description">{user.homeDescription}</p>
                                            </div>
                                        </div>
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


