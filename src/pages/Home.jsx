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
        <Default>
          <div className="container">
            <div className="home">
              {
                this.state.message ? 
                <h1>{this.state.message}</h1> :
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              }
            </div>
          </div>
        </Default>
    )
  }
}

export default Home;