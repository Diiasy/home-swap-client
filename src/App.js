import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'; 
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';

class App extends Component {
  render() {
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/signup" component={Signup} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/logout" component={Logout} />
          <Route exact path="/user/profile/:id" component={Profile} />
        </Switch>
      </div>
    )
  }
}

export default App;
