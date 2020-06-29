import React, { Component } from 'react';
import axios from 'axios';
import Default from '../layouts/Default';

class Home extends Component {
  state = {
    message: null
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}`)
    .then(response => {
      this.setState({
        message: response.data.message
      })
    })
  }

  render() {
    return(
      <div className="home">
        <Default>
          {
            this.state.message ? 
            <h1>{this.state.message}</h1> :
            <h1>Loading...</h1>
          }
        </Default>
      </div>
    )
  }
}

export default Home;