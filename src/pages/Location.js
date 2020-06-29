import React, { Component } from 'react';
import axios from "axios";


export default class Location extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.returnLocation = this.returnLocation.bind(this);
    }

    state = {
        location: null
    }

    handleChange(e){
        this.setState({
            location: e.target.value
        });
    }

    returnLocation(e){
        e.preventDefault();
        axios.get(`${process.env.REACT_APP_BASE_URL}/locations/geocoding/${this.state.location}`)
            .then((response)=> {
                console.log(response.data.message);
            })
            .catch((err) => {
                this.setState({
                    err
                });
            });
    }
    
    render() {
        return (
            <div>
                <div className="container text-left">
                    <div className="row">
                        <div className="col-md-12 col-lg-6 offset-lg-3 my-3">
                            <form onSubmit={this.returnLocation} className="p-3">

                                <div className="form-group">
                                    <label className="form-label" for="Name">Address</label>
                                    <input type="text"  className="form-control form-box" name="address" onChange={this.handleChange}/>
                                </div>
                                
                                <button className="btn btn-info" type="submit">Add New</button>
                            </form>
                            {
                                this.state.error && <p>{this.state.error}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}