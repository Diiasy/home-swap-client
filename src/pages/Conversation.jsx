import React, { Component } from 'react';
import axios from 'axios';
import PostMessage from '../components/PostMessage';
import '../layouts/loading.css';
import { getUser } from '../utils/auth';
import '../layouts/ConversationList.css';

class Conversation extends Component {
    constructor(props){
        super(props);
        this.transformDate = this.transformDate.bind(this);
        this.getTime = this.getTime.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.deletedUser = this.deletedUser.bind(this);
        this.isOwner = this.isOwner.bind(this);

    }

    state = {
        messages: [],
        error: null,
    }

    currentUser = getUser();

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

    deletedUser(message){
        if(message.from == null){
            return "Deleted User";
        }
        else {
            return message.from.username;
        }
    }

    isOwner(message){
        if(message.from == null){
            return false;
        }
        if (message.from.username === this.currentUser.username){
            return true;
        } else {
            return false;
        }
    }

    render() {
        return(
        <div className="conversation">
            {
                this.state.messages && this.state.messages.map(message => 
                    <div className = { this.isOwner(message) ? 'mymessage messages' : 'yourmessage messages'} key={message._id}>
                        <p>{message.message}</p>
                        <p className="m-0"><i>{this.deletedUser(message)} - {this.transformDate(message.createdAt)} {this.getTime(message.createdAt)}</i></p>
                    </div>
                )
            }
            <PostMessage postMessage={this.postMessage} convId={`${this.props.match.params.conversationId}`}/>
        </div>
        )
    }
    }

    export default Conversation;