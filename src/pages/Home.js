import React, { useState, useEffect } from "react";
import Banner from "../assets/Banner.jpg"
import {Container} from "react-bootstrap"

import UserService from "../services/user.service";


const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <>
      <img src={Banner} className="banner-image"/>
      <Container className="book-now-button-container">
        <button className="book-now-button">Book now</button>
      </Container>
    </>
  );
};

export default Home;
