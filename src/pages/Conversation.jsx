import React, { Component } from 'react';
import axios from 'axios';
import PostMessage from '../components/PostMessage';

class Conversation extends Component {
    constructor(props){
        super(props);
        this.transformDate = this.transformDate.bind(this);
        this.getTime = this.getTime.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    state = {
        messages: [],
        error: null
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/message/conversation/${this.props.match.params.conversationId}`, {withCredentials: true})
        .then(response => {
            let messages = response.data;
            this.setState({messages});
        })
        .catch(error => {
            this.setState({error});
        })
    }

    transformDate(dateString){
        let date = new Date(dateString);
        let formattedDate = date.toDateString();
        return formattedDate;
    }

    getTime(dateString){
        let date = new Date(dateString);
        let hours = date.getHours();
        (hours < 10) ? hours = `0${hours}` : hours = `${hours}`;
        let minutes = date.getMinutes();
        (minutes < 10) ? minutes = `0${minutes}` : minutes = `${minutes}`;
        let time = `${hours}:${minutes}`;
        return time;
    }

    postMessage(response){
        let messages = [...this.state.messages];
        messages.push(response);
        this.setState({
            messages
        });
    }

    render() {
        return(
        <div className="conversation">
            {
                this.state.messages && this.state.messages.map(message => 
                    <div className = 'message'>
                        <p>{message.message}</p>
                        <p><i>{message.from.username} - {this.transformDate(message.createdAt)} {this.getTime(message.createdAt)}</i></p>
                        <hr/>
                    </div>
                )
            }
            <PostMessage postMessage={this.postMessage} convId={`${this.props.match.params.conversationId}`}/>
        </div>
        )
    }
    }

    export default Conversation;