import React, { Component } from 'react';
import axios from 'axios';
import Default from '../layouts/Default';
import Carousel from 'react-bootstrap/Carousel';
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
          <div className="container-fluid">
            <div className="row">
            <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=373940"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Third slide&bg=20232a"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>

            </div>

          </div>
        </Default>
    )
  }
}

export default Home;

