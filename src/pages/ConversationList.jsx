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

  render() {
    if(this.state.conversations.length === 0) return <Default><div className="lds-ring col-12 d-flex justify-content-center mt-5"><div></div><div></div><div></div><div></div></div></Default>;
    return(
        <Default>
        <div className="container-fluid d-flex">
          <div className="col-3">
            <h4>Chats</h4>
          {
            this.state.conversations && this.state.conversations.map(conversation => 
              <div key={conversation[1]._id}>
              
              <Link to={`/conversations/${conversation[0]}`}>
                  <p className="conversation-link">{conversation[1].username}</p>
              </Link>
              </div>
            )
          }
          </div>
          <div className="col-9">
            <h4>Messages</h4>
            <Route path="/conversations/:conversationId" render={props=> <Conversation key={uid()} {...props}/>} />
          </div>

          </div>

        </Default>
    )
  }
}

export default ConversationList;