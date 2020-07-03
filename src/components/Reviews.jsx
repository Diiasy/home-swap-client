import React, { Component } from 'react';
import axios from 'axios';
import AddReview from '../components/AddReview';
import { getUser } from '../utils/auth';

export default class Reviews extends Component {
    constructor() {
        super();
        this.reviewUpdate = this.reviewUpdate.bind(this);
    }

    state = {
        reviews: [],
    }

    currentUser = getUser();


    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.user._id}/reviews`, {withCredentials: true})
        .then(response => {
            let reviews = response.data;
            this.setState({reviews});
        })
        .catch (error => {
            this.setState({error});
        });
    }

    reviewUpdate(response){
        let reviews = [...this.state.reviews];
        reviews.push(response[0]);
        this.setState({
            reviews
        });
    }

    render() {
        if(this.state.reviews === null ) return <h1>No reviews for this user.</h1>;
        let addReview;
        if (this.currentUser._id !== this.props.user._id) {
            addReview = <AddReview userId = {this.props.user._id} reviewUpdate={this.reviewUpdate} />
            
        }
            return(
                <div>
                    <h4>Reviews</h4>
                    {
                        this.state.reviews.map((review)=>
                            <div className="d-flex justify-content-center">
                                <div className="col-9 text-wrap list-text">
                                    <p className="mb-2">{review.content}</p>
                                    <h6><span className="font-weight-bold">Reviewed by: </span>{review.reviewer.name} <span className="font-weight-bold">Score: </span>{review.score}</h6>
                                </div>
                            </div>
                        )
                    }
                    {addReview}

                </div>
            )
    }
}
