import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';

function Navbar() {
  let user = getUser();

  if (user) {
    return(
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <Link className="navbar-brand" to='/'>Home</Link>
          <Link className="navbar-brand" to='/user/logout'>Logout</Link>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <Link className="navbar-brand" to='/'>Home</Link>
          <Link className="navbar-brand" to='/user/login'>Login</Link>
          <Link className="navbar-brand" to='/user/signup'>Sign up</Link>
        </div>
      </nav>
    )
  }
}

export default Navbar;