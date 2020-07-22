import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'; 
import ProtectRoute from './utils/ProtectRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import List from './pages/List';
import Profile from './pages/Profile';
import Map from './pages/Map';
import ConversationList from './pages/ConversationList';
import Favorite from './pages/Favorite';
import PageNotFound from './pages/PageNotFound'
import RedirectionProtectedRoute from './pages/RedirectionProtectedRoute'

class App extends Component {
  render() {
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/signup" component={Signup} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/logout" component={Logout} />
          <Route exact path="/properties" component={List} />
          <ProtectRoute path="/user/profile/:id" redirectTo="/redirect" component={Profile} />
          <Route path="/map" component={Map} />
          <ProtectRoute path="/conversations" redirectTo="/redirect" component={ConversationList} />
          <ProtectRoute exact path="/favorites" redirectTo="/redirect" component={Favorite} />
          <Route exact path="/redirect" component={RedirectionProtectedRoute} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;
