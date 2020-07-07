import React from 'react';
import '../layouts/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';





function NavbarApp() {
    return(
        <div>
            <div className="spacer">
            </div>

            <footer className="footer">
                <div className="container-fluid my-2">
                    <div className="row justify-content-center">
                    <p>© Copyright 2020 HomeSwap</p>
                    </div>
                    <div className="row justify-content-center">      
                        <div className="social-media">
                            <a href="https://twitter.com/"><FontAwesomeIcon className="social-media-icon" icon={faTwitter}/></a>
                            <a href="https://facebook.com/"><FontAwesomeIcon className="social-media-icon" icon={faFacebook}/></a>
                            <a href="https://instagram.com"><FontAwesomeIcon className="social-media-icon" icon={faInstagram}/></a>
                            <a href="/"><FontAwesomeIcon className="social-media-icon" icon={faEnvelope}/></a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>

    )
}

export default NavbarApp;
