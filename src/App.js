import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    message: null
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}`)
    .then(response => {
      debugger
      this.setState({
        message: response.data.message
      })
    })
  }

  render() {
    return(
      <div className="App">
        {
          this.state.message ? 
          <h1>{this.state.message}</h1> :
          <h1>Loading...</h1>
        }
      </div>
    )
  }
}

export default App;
