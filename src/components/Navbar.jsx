import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';
import '../layouts/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';




// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {
  let user = getUser();

  if (user) {
    return(
      <div className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid nav">
          <div className="brand">
            <Link className="nav-link navbar-icon img-fluid" to='/'>
              <img src="/HomeSwap4.png" alt="HomeSwap" />
            </Link>
          </div>
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse nav-list" id="navbarNav"> */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link p-2" to='/properties'>List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2" to='/map'>Map</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2" to='/conversations'>My Messages</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2" to={`/user/profile/${user._id}`}>Welcome {user.username}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2" to='/user/logout'><FontAwesomeIcon icon={faSignOutAlt}/></Link>
              </li>
            </ul>
          {/* </div> */}
        </div>
      </div>
    )
  } else {
    return (
      <div className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid nav">
          <div className="brand">
            <Link className="nav-link navbar-icon" to='/'>
              <img src="/HomeSwap4.png" alt="HomeSwap" />
            </Link>
          </div>
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse nav-list" id="navbarNav"> */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link p-2" to='/properties'>List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2" to='/map'>Map</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2" to='/user/login'>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-2" to='/user/signup'>Sign up</Link>
              </li>
            </ul>
          {/* </div> */}
        </div>
      </div>
    )
  }
}

export default Navbar;
