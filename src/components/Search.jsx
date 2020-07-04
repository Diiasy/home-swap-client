import React, { Component } from 'react';

export default class Search extends Component {

    searchProperties(e){
        let searchTerm = e.target.value;
        if (searchTerm.length === 0){
            return this.setState({filteredBeers: this.state.beers})
        }
        axios({
            url:`${process.env.REACT_APP_BASE_URL}/user/search?q=${searchTerm}`,
            method: "GET",
            withCredentials: true
        })
        .then(response => {
            this.setState({filteredBeers: response.data});
        });
    }

    render() {
        return (
            <div>
                <input
                type="text"
                className="input search-bar"
                placeholder="Search"
                name="search"
                onChange={this.searchProperties}
                />  
            </div>
        )
    }
}
