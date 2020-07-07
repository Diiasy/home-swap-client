import React, { Component } from 'react';
import qs from 'qs';
import axios from 'axios';

export default class AddReview extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addReview = this.addReview.bind(this);
    }

    state = {
        review:  {},
        error: null
    }

    componentDidMount(){
        let review = {...this.state.review};
        review[`profile_id`] = this.props.userId;
        this.setState({review});
    }

    handleChange(e) {
        let review = {...this.state.review};
        review[e.target.name] = e.target.value;
        this.setState({review});
    }

    addReview(e) {
        e.preventDefault();
        document.getElementById("review").reset();
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/review/create`,
            data: qs.stringify(this.state.review),
            withCredentials: true,
            method: "POST"
        })
        .then(response => {
            this.props.reviewUpdate(response.data);
            this.props.history.push(`/user/profile/${this.props._id}/reviews`);
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    render() {
        return (
            <div className="row d-flex justify-content-center text-center m-3">
                <form className="col-10 p-2" id="review">
                    <div className="form-group">
                        <label htmlFor="review">Review</label>
                        <textarea className="form-control" onChange={this.handleChange} name="content" placeholder="Leave a review"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="score">Score</label>
                        <input type="range" name="score" className="form-control-range range" min="1" max="10" onChange={this.handleChange} />
                    </div>
                    <button onClick={this.addReview} type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
