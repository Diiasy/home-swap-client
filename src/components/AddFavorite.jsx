import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.addToFavorite = this.addToFavorite.bind(this);
    }

    state = {
        favorites: [],
        error: null
    }

    addToFavorite() {
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/favorite/${this.props.match.params.id}/addToFavorites`,
            method: 'POST',
            withCredentials: true
        })
        .then(response => {
            let favorites = response.data;
            this.setState({favorites});
        })
        .catch(error => {
            this.setState({error});
        })
    }


    render() {
        return(
            // <div className="col m-2 d-flex justify-content-end">
                <button className="m-3"  onClick={this.addToFavorite}><FontAwesomeIcon icon={faStar}/></button>
            // </div>
        )
    }
}

export default Favorite;