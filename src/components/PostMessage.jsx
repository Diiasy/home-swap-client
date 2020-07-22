import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

class Conversation extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    state = {
        message: {},
        error: null
    }

    handleChange(e) {
        let message = { ...this.state.message };
        message[e.target.name] = e.target.value;
        this.setState({ message });
    }

    postMessage(e) {
        e.preventDefault();
        document.getElementById("post-message").reset();
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/message/create/${this.props.convId}`,
            data: qs.stringify(this.state.message),
            withCredentials: true,
            method: "POST"
        })
        .then(response => {
            let message = response.data[0];
            this.props.postMessage(message);
            this.props.history.push(`/conversations/${this.props.convId}`);
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    render() {
        return(
        <div className="post-message">
            <form onSubmit={this.postMessage} id="post-message">
                <div className="form-group">
                    <textarea className="form-control" onChange={this.handleChange} name="message" placeholder="Your message"/>
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
        )
    }
}

export default Conversation;