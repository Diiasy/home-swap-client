import React, { Component } from 'react';
import axios from 'axios';
import Default from '../layouts/Default';
import '../layouts/loading.css'

class Home extends Component {
  state = {
    message: null,
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}`, {withCredentials: true})
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
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          }
        </Default>
      </div>
    )
  }
}

export default Home;