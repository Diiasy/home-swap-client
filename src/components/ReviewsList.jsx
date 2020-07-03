import React, { Component } from 'react';
import axios from 'axios';
import AddReview from '../components/AddReview';

export default class Reviews extends Component {

    state = {
        reviews: [],
    }

    currentUser = getUser();


    componentDidMount(){
        debugger;
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.user._id}/reviews`)
        .then(response => {
            debugger
            let reviews = response.data;
            this.setState({reviews});
        })
        .catch (error => {
            this.setState({error});
        });
    }

    render() {
        if(this.state.reviews === null ) return <h1>No reviews for this user.</h1>;
        return (
            <div>
                <h4>Reviews</h4>
                {
                    this.state.reviews.map((review)=>
                        <div className="d-flex justify-content-center">
                            <div className="col-9 text-wrap list-text">
                                <p className="mb-2">{review.content}</p>
                                <h6><span className="font-weight-bold">Reviewed by: </span>{review.reviewer.name}<span className="font-weight-bold">Score: </span>{review.score}</h6>
                            </div>
                        </div>
                    )
                }
                {
                    if (this.currentUser._id === this.props.match.params.id) {
                        <AddReview user = {this.state.user} />
                    }

                }
            </div>
        )
    }
}
