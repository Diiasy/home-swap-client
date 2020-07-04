import React, { Component } from 'react';
import axios from 'axios';
import uid from "uid";
import { Link, Route } from 'react-router-dom';
import Default from '../layouts/Default';
import Conversation from './Conversation';

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
    if(this.state.conversations.length === 0) return <h1>Loading...</h1>;
    // let participants = [];
    // this.state.conversations.map(conv => {
    //     (conv.participants[0].username === req.session.user.username) ? participants.push(conv.participants[1]) : participants.push(conv.participants[0])
    // })
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
          {/* <Route exact path="/conversations/:conversationId" component={Conversation} /> */}
        </Default>
      </div>
    )
  }
}

export default ConversationList;