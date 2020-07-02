import React, { Component } from 'react';
import { getUser } from "../utils/auth";
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
        user: {},
        error: null
    }


    currentUser = getUser();

    componentDidMount(){
        debugger;
        let review = {...this.state.review};
        review[`profile_id`] = this.props.user._id;
        review[`user_id`] = this.currentUser._id;
        this.setState({review});
    }

    handleChange(e) {
        let review = {...this.state.review};
        review[e.target.name] = e.target.value;
        this.setState({review});
    }

    addReview(e) {
        e.preventDefault();
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/review/create`,
            data: qs.stringify(this.state.review),
            withCredentials: true,
            method: "POST"
        })
        .then(response => {
            this.props.profileUpdate(response.data);
            this.props.history.push(`/user/profile/${response.data._id}`);
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    render() {
        if(this.state.review === null ) return <h1>Loading...</h1>;
        return (
            <div className="signup">
                <form className="container">
                    <div className="form-group">
                        <label for="content">Review</label>
                        <input className="form-control" type="text" onChange={this.handleChange} name="content" placeholder="content" />
                    </div>
                    <div className="form-group">
                        <label for="score">Score</label>
                        <input type="range" name="score" class="form-control-range range" min="1" max="10" onChange={this.handleChange} />
                        <output class="bubble"></output>                            
                    </div>
                    <button onClick={this.addReview} type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
