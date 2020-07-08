import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Default from '../layouts/Default';
import { getUser } from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.removeFromFavorite = this.removeFromFavorite.bind(this);
    }

    state = {
        favorites: [],
        error: null
    }

    currentUser = getUser();

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/favorite`, {withCredentials: true})
        .then(response => {
            let favorites = response.data;
            this.setState({favorites});
        })
        .catch(error => {
            this.setState({error});
        })
    }

    removeFromFavorite(indexN){
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/favorite/${this.state.favorites[indexN]._id}/removeFromFavorites`,
            method: 'POST',
            withCredentials: true
        })
        .then(response => {
            let favorites = response.data;
            this.setState({ favorites });
        })
        .catch(err => {
            this.setState({ error: err })
        })
    }

    render() {
        if(this.state.favorites.length === 0) return <Default>No favorites yet</Default>;
        return(
            <Default>
            <div className="container-fluid d-flex">
                <div className="row m-3">
                    {
                        this.state.favorites.map((favorite, index) =>
                            favorite.pictures.length > 0 &&
                            <div key={favorite._id} className="col-sm-12 col-md-6 col-xl-4 my-2 d-flex justify-content-around">
                                <div className="card">
                                    <Link to={`/user/profile/${favorite._id}`} className="user-card">
                                        <h5 className="card-title p-2">{favorite.homeName}</h5>
                                        <img src={favorite.pictures[0].path} className="card-img-top image-responsive" alt=""/>
                                    </Link>        
                                    <div className="card-body">
                                        <div className="row mr-3">
                                            <p className="card-text location col-10">{favorite.city}</p>
                                            <button type="submit" className="col-2 p-2" onClick = {()=>this.removeFromFavorite(index)}><FontAwesomeIcon icon={faTrash}/></button>
                                        </div>
                                        <p className="card-text description">{favorite.homeDescription}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            </Default>
        )
    }
}

export default Favorite;