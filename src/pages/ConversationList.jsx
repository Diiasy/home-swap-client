import React, { Component } from 'react';
import axios from 'axios';
import uid from "uid";
import { Link, Route } from 'react-router-dom';
import Default from '../layouts/Default';
import Conversation from './Conversation';
import '../layouts/loading.css';
import '../layouts/ConversationList.css';

class ConversationList extends Component {
  state = {
    conversations: [],
    error: null
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/conversation/my-conversations`, {withCredentials: true})
    .then(response => {
      let conversations = response.data;
      this.setState({conversations});
    })
    .catch(error => {
      this.setState({error});
    })
  }

  deletedUser(conversation){
    if(conversation[1] == null){
        return "Deleted User";
    }
    else {
        return conversation[1].username;
    }
}

  render() {
    if(this.state.conversations.length === 0) return <Default><h4>No conversations yet. Why not try sending a message?</h4></Default>;
    return(
        <Default>
        <div className="container-fluid d-flex">
          <div className="col-4">
            <h4>Chats</h4>
          {
            this.state.conversations && this.state.conversations.map(conversation => 
              <div key={uid()}>
              
              <Link to={`/conversations/${conversation[0]}`}>
                  <p className="conversation-link">{this.deletedUser(conversation)}</p>
              </Link>
              </div>
            )
          }
          </div>
          <div className="col-8">
            <h4>Messages</h4>
            <Route path="/conversations/:conversationId" render={props=> <Conversation key={uid()} {...props}/>} />
          </div>

          </div>

        </Default>
    )
  }
}

export default ConversationList;