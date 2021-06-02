import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import Banner from "../assets/Banner.jpg";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarImage from "../assets/car.png";
import SearchImage from "../assets/search.png";

import UserService from "../services/user.service";
import {
  setHours,
  setMinutes,
  addHours,
  addDays,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
  subMinutes,
  roundToNearestMinutes,
} from "date-fns";

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const Home = (props) => {
  const [content, setContent] = useState("");
  // const history = useHistory();
  const [vehicleType, setVehicleType] = useState("Any");
  const [pickUpDate, setPickUpDate] = useState(
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
    // Current Time
    // roundToNearestMinutes(new Date(), { nearestTo: 30 })
    setHours(setMinutes(new Date(), 0), 12)
  );

  const [minDropOffTime, setMinDropOffTime] = useState(addHours(startTime, 5));

  const [minPickUpTime, setMinPickUpTime] = useState(
    setHours(setMinutes(new Date(), 0), 8)
  );

  const [minPickUpDate, setMinPickUpDate] = useState(new Date());

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
    onChangePickUp(currentTime);
    // setPickUpDate(currentTime);
  }, []);

  const onChangePickUp = (date) => {
    //Check Pick-Up day is current day
    if (isSameDay(currentTime, date)) {
      if (isAfter(date, endTime)) {
        //Check current time after 6pm and set booking to next day
        setMinPickUpDate(addDays(setHours(setMinutes(new Date(), 0), 8), 1));
        setPickUpDate(addDays(setHours(setMinutes(new Date(), 0), 8), 1));
        //
        setMinDropOffTime(addDays(startTime, 1));
        setDropOffDate(addDays(startTime, 1));
        // setCurrentTime(addHours(currentTime, 1));
      } else if (isBefore(date, subMinutes(startTime, 1))) {
        setMinPickUpDate(startTime);
        setPickUpDate(startTime);
        setCurrentTime(startTime);
      } else {
        //Check if Pick-Up and Drop-Off same day
        if (isSameDay(dropOffDate, date)) {
          //Check Pick-Up set possible for sameday drop off
          if (isAfter(date, setHours(setMinutes(new Date(), 0), 13))) {
            //Check if pickup is after 1pm
            setDropOffDate(addDays(setHours(setMinutes(dropOffDate, 0), 8), 1));
            setMinDropOffTime(startTime);
          } else {
            setMinDropOffTime(addHours(date, 5));
            setDropOffDate(addHours(date, 5));
          }
        }

        if (isWithinInterval(currentTime, { start: startTime, end: endTime })) {
          setMinPickUpTime(currentTime);
        }
        setPickUpDate(date);
      }
    } else {
      //Check if Pick-Up and Drop-Off Same day
      if (isSameDay(dropOffDate, date)) {
        if (isAfter(date, setHours(setMinutes(date, 0), 13))) {
          setDropOffDate(addDays(setHours(setMinutes(date, 0), 8), 1));
          setMinDropOffTime(startTime);
        } else {
          setDropOffDate(addHours(date, 5));
          setMinDropOffTime(addHours(date, 5));
        }
      }

      setMinPickUpTime(startTime);
      setPickUpDate(date);
      //Checking if Pick-Up day is after Drop-Off day
      if (
        isAfter(
          setHours(setMinutes(date, 0), 0),
          setHours(setMinutes(dropOffDate, 0), 0)
        )
      ) {
        setPickUpDate(setHours(setMinutes(date, 0), 8));

        setDropOffDate(addHours(date, 5));
        setMinDropOffTime(addHours(date, 5));
      }
    }
  };

  const onChangeDropOff = (date) => {
    //Check if Drop Off and Pick Up day same
    if (isSameDay(date, pickUpDate)) {
      setDropOffDate(addHours(pickUpDate, 5));
      setMinDropOffTime(addHours(pickUpDate, 5));
    } else {
      setMinDropOffTime(startTime);
      setDropOffDate(date);
    }
  };

  const onChangeVehicleType = (e) => {
    const inputVehicleType = e.target.value;
    setVehicleType(inputVehicleType);
  };

  const handleSearch = async () => {
    console.log(vehicleType);
    console.log(pickUpDate);
    console.log(dropOffDate);

    // setVehicleSearch("Any")
    // props.history.push({
    //   pathname: "/booking",
    //   data: vehicleType
    // });

    props.history.push({
      pathname: "/booking",
      state: { vehicleType, pickUpDate, dropOffDate },
    });

    // const result = await axios.get("http://localhost:5000/api/vehicles");
    // // const result = await UserService.getVehicleList();
    // console.log(result);
    // setVehicleSearch(result.data);
  };

  const scrollToBooking = () => booking.current.scrollIntoView();

  return (
    <>
      {/* <div className="banner-image-backgroud"></div> */}
      <div className="banner">
        <img src={Banner} alt="banner" className="banner-image" />
      </div>
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
                    minDate={minPickUpDate}
                    startDate={pickUpDate}
                    endDate={dropOffDate}
                    onChange={(date) => {
                      // setPickUpDate(date);
                      // checkDropOffDayBehind(date);
                      onChangePickUp(date);
                    }}
                  />
                  {/* Pick-Up Time*/}
                  <DatePicker
                    selected={pickUpDate}
                    onChange={(date) => {
                      // setPickUpDate(date);
                      onChangePickUp(date);
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
                      // setDropOffDate(date);
                      // checkIfOneDayDropoff(date);
                      onChangeDropOff(date);
                    }}
                  />
                  {/* Dop-Off Time*/}
                  <DatePicker
                    selected={dropOffDate}
                    onChange={(date) => {
                      // setDropOffDate(date);
                      onChangeDropOff(date);
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
