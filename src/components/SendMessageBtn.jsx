import React, { Component } from 'react';
import axios from 'axios';

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(e) {
        e.preventDefault();
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/conversation/create/${this.props.match.params.id}`,
            withCredentials: true,
            method: 'POST'
        })
        .then(response => {
            this.props.history.push(`/conversations/${response.data}`);
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    render() {
        return(
        <div className="send-message">
            <button onClick={this.sendMessage}>Send message</button>
        </div>
        )
    }
    }

    export default Conversation;