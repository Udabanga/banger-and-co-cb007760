import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap'
// import { CarouselSlider } from './components/CarouselSlider'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner from "../assets/Banner.jpg"

export default class Home extends Component {
  render() {
    return (
      
      <>
        <img src={Banner} className="banner-image"/>
      <Container className="book-now-button-container">
        <button className="book-now-button">Book now</button>
      </Container>
      </>
    );
  }
}