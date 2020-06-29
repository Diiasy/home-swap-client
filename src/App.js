import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Map from "./pages/Map";
import {Route} from "react-router-dom";



class App extends Component {
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
      <div className="App">
        <Route path="/map" component={Map}/>
      </div>
    )
  }
}

export default App;
