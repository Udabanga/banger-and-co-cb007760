import React, { useState, useEffect } from "react";
import Banner from "../assets/Banner.jpg";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import setHours from 'date-fns/setHours'
// import setMinutes from 'date-fns/setMinutes'
// import addHours from 'date-fns/addHours'
// import differenceInDays from 'date-fns/differenceInDays'

import UserService from "../services/user.service";
import {
  setHours,
  setMinutes,
  addHours,
  differenceInDays,
  differenceInHours,
  differenceInCalendarDays,
  addDays,
  getTime,
} from "date-fns";

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const Home = () => {
  const [content, setContent] = useState("");
  const [pickUpDate, setPickUpDate] = useState(
    setHours(setMinutes(new Date(), 0), 8)
  );
  const [dropOffDate, setDropOffDate] = useState(
    setHours(setMinutes(new Date(), 0), 18)
  );

  const [startTime, setStartTime] = useState(
    setHours(setMinutes(new Date(), 0), 8)
  );
  const [endTime, setEndTime] = useState(
    setHours(setMinutes(new Date(), 0), 18)
  );

  const [minDropOffTime, setMinDropOffTime] = useState(addHours(startTime, 5));
  const [minPickUpDate, setMinPickUpDate] = useState(dropOffDate);

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

    // checkIfOneDay();
  }, []);

  const checkIfOneDayPickup = (date) => {
    if (differenceInCalendarDays(dropOffDate, date) === 0) {

      if (differenceInHours(endTime, getTime(date)) >= 5) {
        setMinDropOffTime(addHours(getTime(date), 5));
        setMinPickUpDate(pickUpDate);

        if(differenceInHours(dropOffDate, minPickUpDate) >= 0){
          setDropOffDate(addHours(getTime(date), 5));
        }
        
      } else {
        // setDropOffDate(addDays(dropOffDate, 1));
        setDropOffDate(addDays(setHours(setMinutes(dropOffDate, 0), 8), 1));
        setMinPickUpDate(addDays(pickUpDate, 1));
        setMinDropOffTime(startTime);
      }

      
    } else if (differenceInCalendarDays(dropOffDate, date) === 1) {
      if (differenceInHours(endTime, getTime(date)) >= 5) {
        setMinPickUpDate(pickUpDate);
      } 
    } else {
      setMinDropOffTime(startTime);
    }

    
  };


  const checkIfOneDayDropoff = (date) => {
    if (differenceInCalendarDays(date, pickUpDate) === 0){
      setDropOffDate(setHours(setMinutes(new Date(), 0), 8));
      setPickUpDate(setHours(setMinutes(new Date(), 0), 18));
    }
  }

  return (
    <>
      {/* <div className="banner-image-backgroud"></div> */}

      <img src={Banner} className="banner-image" />
      <Container className="book-now-button-container">
        <button className="book-now-button">Book now</button>
      </Container>
      <Container className="booking-container">
        <Row>
          <Col>
            <div className="book-card">
              <Form>
                <h2>Bookings</h2>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control as="select">
                    <option>SUV</option>
                    <option>Sedan</option>
                  </Form.Control>
                </Form.Group>

                {/* Pick-Up */}
                <Form.Group controlId="dateRange">
                  <Form.Label>Pick-Up Date</Form.Label>
                  <DatePicker
                    selected={pickUpDate}
                    selectsStart
                    minDate={new Date()}
                    startDate={pickUpDate}
                    endDate={dropOffDate}
                    onChange={(date) => {
                      setPickUpDate(date);
                      checkIfOneDayPickup(date);
                    }}
                  />
                  {/* Pick-Up Time*/}
                  <DatePicker
                    selected={pickUpDate}
                    onChange={(date) => {
                      setPickUpDate(date);
                      checkIfOneDayPickup(date);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    minTime={startTime}
                    maxTime={endTime}
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Form.Group>

                {/* Dop-Off */}
                <Form.Group controlId="dateRange">
                  <Form.Label>Drop-Off Date</Form.Label>
                  <DatePicker
                    selected={dropOffDate}
                    selectsEnd
                    startDate={pickUpDate}
                    endDate={dropOffDate}
                    minDate={minPickUpDate}
                    maxDate={addDays(pickUpDate, 14)}
                    onChange={(date) => {
                      setDropOffDate(date);
                      checkIfOneDayDropoff(date);
                    }}
                  />
                  {/* Dop-Off Time*/}
                  <DatePicker
                    selected={dropOffDate}
                    onChange={(date) => {
                      setDropOffDate(date);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    minTime={minDropOffTime}
                    maxTime={endTime}
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
