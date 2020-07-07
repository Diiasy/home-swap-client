import React, { Component } from 'react';
import axios from 'axios';
import AddReview from '../components/AddReview';
import { getUser } from '../utils/auth';
import uid from 'uid';




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
                <div className="row d-flex justify-content-center text-center m-3">
                    <div className="col-10">
                        <h4 className="my-2">Reviews</h4>
                    </div>
                    <div className="col-10 d-flex justify-content-center d-flex flex-column">
                    {
                        this.state.reviews.map((review)=>
                                <div className="text-wrap list-text m-2" key={uid()}>
                                    <p>{review.content}</p>
                                    <h6><span className="font-weight-bold">Reviewed by: </span>{review.reviewer.name} <span className="font-weight-bold">Score: </span>{review.score}</h6>
                                    <hr/>
                            </div>
                        )
                    }

                    </div>
                    <div className="col-8">
                        {addReview}
                    </div>

                </div>

            )
    }
}
