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
import { setHours, setMinutes, addHours, differenceInDays, addDays } from "date-fns";

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const Home = () => {
  const [content, setContent] = useState("");
  const [pickUpDate, setPickUpDate] = useState(setHours(setMinutes(new Date(), 0), 8));
  const [dropOffDate, setDropOffDate] = useState(setHours(setMinutes(new Date(), 0), 18));

  const [startTime, setStartTime] = useState(setHours(setMinutes(new Date(), 0), 8));
  const [endTime, setEndTime] = useState(setHours(setMinutes(new Date(), 0), 18));

  const [minDropOffTime, setMinDropOffTime] = useState(addHours(startTime,5));
  const [tempPickUpDate, setTempPickUpDate] = useState(new Date())

  

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

  const checkIfOneDay = (dropOffDate) => {
    if(differenceInDays(pickUpDate,dropOffDate)=== 0){
      setMinDropOffTime(addHours(startTime,5))
    }
    else{
      setMinDropOffTime(startTime)
    }
  };


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
                <Form.Group controlId="dateRange">
                  <Form.Label>Booking Period</Form.Label>
                  <DateRangePicker
                    initialSettings={{
                      // startDate: "01/01/2020",
                      // endDate: "01/15/2020",
                      timePicker: true,
                    }}
                  >
                    <input type="text" className="form-control" />
                  </DateRangePicker>
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
                      setDropOffDate(date)
                      setPickUpDate(date)
                      checkIfOneDay(date)
                    }}
                  />
                  <DatePicker
                    selected={pickUpDate}
                    onChange={(date) => {
                      setPickUpDate(date)
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
                    minDate={pickUpDate}
                    maxDate={addDays(pickUpDate,14)}
                    onChange={(date) => {
                      setDropOffDate(date)
                      checkIfOneDay(date)
                    }}
                  />
                  <DatePicker
                    selected={dropOffDate}
                    onChange={(date) => setDropOffDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    minTime={minDropOffTime}
                    maxTime={endTime}
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control as="select">
                    <option>SUV</option>
                    <option>Sedan</option>
                  </Form.Control>
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
