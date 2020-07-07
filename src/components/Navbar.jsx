import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';
import '../layouts/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "react-bootstrap";


function NavbarApp() {
  let user = getUser();

  if (user) {
    return(
      <Navbar collapseOnSelect expand="md" variant="light" className="navbar-style">
        <div className="container-fluid nav">
          <div className="brand">
            <Link className="nav-link navbar-icon img-fluid" to='/'>
              <img src="/HomeSwap4.png" alt="HomeSwap" />
            </Link>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="collapse navbar-collapse nav-list" id="responsive-navbar-nav">
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
            </Navbar.Collapse>
        </div>
      </Navbar>
    )
  } else {
    return (
      <Navbar collapseOnSelect expand="md" variant="light" className="navbar-style">
        <div className="container-fluid nav">
          <div className="brand">
            <Link className="nav-link navbar-icon img-fluid" to='/'>
              <img src="/HomeSwap4.png" alt="HomeSwap" />
            </Link>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="collapse navbar-collapse nav-list" id="responsive-navbar-nav">
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
          </Navbar.Collapse>
        </div>
      </Navbar>
    )
  }
}

export default NavbarApp;
