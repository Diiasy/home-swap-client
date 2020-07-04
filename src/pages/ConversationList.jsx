import React, { Component } from 'react';
import axios from 'axios';
import uid from "uid";
import { Link, Route } from 'react-router-dom';
import Default from '../layouts/Default';
import Conversation from './Conversation';
import '../layouts/loading.css'

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
    if(this.state.conversations.length === 0) return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>;
    return(
      <div className="conversationlist">
        <Default>
          {
            this.state.conversations && this.state.conversations.map(conversation => 
              <div>
              
              <Link to={`/conversations/${conversation[0]}`}>
                  <p>{conversation[1].username}</p>
              </Link>
              </div>
            )
          }
          <Route path="/conversations/:conversationId" render={props=> <Conversation key={uid()} {...props}/>} />
        </Default>
      </div>
    )
  }
}

export default ConversationList;