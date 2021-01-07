import React, { useState, useEffect, useRef } from "react";
import Banner from "../assets/Banner.jpg";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarImage from "../assets/car.png";
import SearchImage from "../assets/search.png";
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
  isWithinInterval,
  roundToNearestMinutes,
} from "date-fns";

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const Home = () => {
  const [content, setContent] = useState("");
  const [vehicleType, setVehicleType] = useState("Any");
  const [pickUpDate, setPickUpDate] = useState(
    // setHours(setMinutes(new Date(), 0), 8)
    // FOR CURRENT TIME
    roundToNearestMinutes(new Date(), { nearestTo: 30 })
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
  const [currentTime, setCurrentTime] = useState(
    // FOR CURRENT TIME
    roundToNearestMinutes(new Date(), { nearestTo: 30 })

    // setHours(setMinutes(new Date(), 0), 11)
  );

  const [minDropOffTime, setMinDropOffTime] = useState(addHours(startTime, 5));

  const [minPickUpTime, setMinPickUpTime] = useState(
    setHours(setMinutes(new Date(), 0), 8)
  );

  const booking = useRef(null);

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
    checkIfOneDayPickup(currentTime);
    setPickUpDate(currentTime);
  }, []);

  const checkIfOneDayPickup = (date) => {
    // Checking if same day first
    if (differenceInCalendarDays(date, dropOffDate) === 0) {
      // Check if Current time in the set range
      if (
        isWithinInterval(currentTime, {
          start: startTime,
          end: endTime,
        })
      ) {
        // TO-BE checked again
        setMinPickUpTime(currentTime);
        if (date < minPickUpTime) {
          setPickUpDate(currentTime);
        }
      }
      // Set minimum drop off time on same day
      if (differenceInHours(endTime, getTime(date)) >= 5) {
        setMinDropOffTime(addHours(getTime(date), 5));
        if (differenceInHours(dropOffDate, pickUpDate) >= 0) {
          setDropOffDate(addHours(getTime(date), 5));
        }
      } else { // Set drop off to the next day if it can't be booked same day
        setDropOffDate(addDays(setHours(setMinutes(dropOffDate, 0), 8), 1));
        setMinDropOffTime(startTime);
      }
    }
    else {
      //Check if drop off day is automatically set over 2 week range
      if(dropOffDate> addDays(date, 14)){
        setDropOffDate(addDays(date, 14));
      }
      else{
      setMinDropOffTime(startTime);
      }
    }
  };

  const checkIfOneDayDropoff = (date) => {
    if (differenceInCalendarDays(date, pickUpDate) === 0) {
      // setDropOffDate(setHours(setMinutes(new Date(), 0), 18)); //To be Revised
      setMinDropOffTime(addHours(getTime(pickUpDate), 5)); //Test
      setPickUpDate(currentTime);
    } else {
      setMinDropOffTime(startTime);
      // setStartTime(setHours(setMinutes(new Date(), 0), 8));
    }
  };

  const checkDropOffDayBehind = (date) => {
    if (differenceInCalendarDays(dropOffDate, date) < 0) {
      setDropOffDate(date);
    }
  };

  const onChangeVehicleType = (e) => {
    const inputVehicleType = e.target.value;
    setVehicleType(inputVehicleType);
  };

  const handleSearch = () => {
    console.log(vehicleType);
    console.log(pickUpDate);
    console.log(dropOffDate);
  };

  const scrollToBooking = () => booking.current.scrollIntoView();

  return (
    <>
      {/* <div className="banner-image-backgroud"></div> */}

      <img src={Banner} className="banner-image" />
      <Container className="book-now-button-container">
        <button onClick={scrollToBooking} className="book-now-button">
          Book now
        </button>
      </Container>
      <Container ref={booking} className="booking-container">
        <Row>
          <Col lg={6} sm={12}>
            <div className="book-card">
              <Form>
                <h2>Bookings</h2>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control
                    value={vehicleType}
                    onChange={onChangeVehicleType}
                    as="select"
                  >
                    <option>Any</option>
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
                      checkDropOffDayBehind(date);
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
                    minTime={minPickUpTime}
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

                <Button onClick={handleSearch} variant="primary">
                  Search
                </Button>
              </Form>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <div className="book-card">
              <h2>How Banga & Co Works</h2>
              <Row>
                <Col sm={4}>
                  <img src={SearchImage} />
                </Col>
                <Col sm={8}>
                  <p>
                    Search by select type of vehcicle set a pickup and dropoff
                    date/time
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <img src={CarImage} />
                </Col>
                <Col sm={8}>
                  <p>Choose available vehicles and set a booking</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
