import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

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
            // <div className="col m-2 d-flex justify-content-end">
                <button className="m-3" onClick={this.sendMessage}><FontAwesomeIcon icon={faComments}/></button>
            // </div>

        )
    }
    }

    export default Conversation;