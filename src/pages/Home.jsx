import React, { Component } from 'react';
import axios from 'axios';
import Default from '../layouts/Default';
import Carousel from 'react-bootstrap/Carousel';
import '../layouts/Home.css';
import { Link } from 'react-router-dom';



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
          <div className="container-fluid m-0 p-0">
            <div className="row">
              <div className="col-12">
                <Carousel>
                    <Carousel.Item className="carousel-inner">
                      <img
                        className="d-block w-100 carousel-img"
                        src="/travel1.jpg"
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>Who is HomeSwap?</h3>
                        <p>By providing a platform where people can offer to exchange homes, we enable people to truly experience life in a different place beyond the touristic hotspots.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-inner">
                      <img
                        className="d-block w-100 carousel-img"
                        src="/travel2.jpg"
                        alt="Third slide"
                      />

                      <Carousel.Caption>
                      <Link to='/user/signup' className="carousel-link">
                        <h3>Sign up!</h3>
                        <p >By signing up to HomeSwap, you will be able to view available places to swap and contact other HomeSwappers.</p></Link> 
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-inner">
                      <img
                        className="d-block w-100 carousel-img"
                        src="/travel3.jpg"
                        alt="Third slide"
                      />
                      <Carousel.Caption>
                        <h3>Only for swapping.</h3>
                        <p>As there are plenty of accomation websites out there, we only facilitate the process of swapping houses with people from different locations around the world. For renting properties you should look elwhere.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
            </div>
        </Default>
    )
  }
}

export default Home;

