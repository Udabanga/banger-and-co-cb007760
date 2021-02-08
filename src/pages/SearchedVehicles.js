import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  CardColumns,
  Card,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";

import AutomaticTransmissionIcon from "../assets/icons/automatic-transmission.png";
import ManualTransmissionIcon from "../assets/icons/manual-transmission.png";
import SeatIcon from "../assets/icons/seat.png";
import PoundIcon from "../assets/icons/pound.png";
import SatNav from "../assets/icons/gps.png";
import BabySeats from "../assets/icons/baby-car-seat.png";
import WineChiller from "../assets/icons/fridge.png";

const SearchedVehicles = (props) => {
  const [vehicles, setVehicles] = useState([]);
  const vehicleType = props.location.state.vehicleType;
  const pickUpDate = props.location.state.pickUpDate;
  const dropOffDate = props.location.state.dropOffDate;
  const [show, setShow] = useState(false);

  const [viewVehicleID, setViewVehicleID] = useState("");
  const [viewVehicleType, setViewVehicleType] = useState("");
  const [viewVehicleManufacturer, setViewVehicleManufacturer] = useState("");
  const [viewVehicleModel, setViewVehicleModel] = useState("");
  const [viewVehicleTransmission, setViewVehicleTransmission] = useState("");
  const [viewVehicleFuelType, setViewVehicleFuelType] = useState("");
  const [viewVehicleDailyCost, setViewVehicleDailyCost] = useState("");
  const [viewVehicleSeatNumber, setViewVehicleSeatNumber] = useState("");
  const [viewVehicleImage, setViewVehicleImage] = useState("");

  useEffect(() => {
    getVehicleList();
  }, []);

  const getVehicleList = async () => {
    await axios
      .post("http://localhost:5000/api/vehicles/available", {
        vehicleType: vehicleType,
        pickUpDate: pickUpDate,
        dropOffDate: dropOffDate,
      })
      .then(function (response) {
        console.log(response);
        setVehicles(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // const result = await UserService.getVehicleList();
  };

  const getVehicle = async (id) => {
    await axios
      .post("http://localhost:5000/api/vehicles/find", { id: id })
      .then(function (response) {
        console.log(response);
        setViewVehicleID(response.data.id);
        setViewVehicleType(response.data.type);
        setViewVehicleManufacturer(response.data.manufacturer);
        setViewVehicleModel(response.data.model);
        setViewVehicleTransmission(response.data.transmission);
        setViewVehicleFuelType(response.data.fuelType);
        setViewVehicleDailyCost(response.data.dailyCost);
        setViewVehicleSeatNumber(response.data.seatNumber);
        setViewVehicleDailyCost(response.data.dailyCost);
        setViewVehicleImage(
          "http://localhost:5000/images/" + response.data.imageName
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setViewVehicleID("");
    setViewVehicleType("");
    setViewVehicleManufacturer("");
    setViewVehicleModel("");
    setViewVehicleTransmission("");
    setViewVehicleFuelType("");
    setViewVehicleDailyCost("");
    setViewVehicleSeatNumber("");
    setViewVehicleDailyCost("");
    setViewVehicleImage("");
  };

  const handleBookModal = (id) => {
    getVehicle(id);
    handleShow();
  };

  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Car Listing</h2>
      <h1>{vehicleType}</h1>
      <Row>
        {/* {vehicles.forEach()} */}

        {vehicles.map((vehicle) => (
          <Col lg={4} md={6} sm={12}>
            <Card className="vehicle-card" style={{ marginTop: 0 }}>
              <Card.Img
                className="vehicle-card-img"
                variant="top"
                src={"http://localhost:5000/images/" + vehicle.imageName}
              />
              <Card.Body>
                <Card.Title>
                  {vehicle.manufacturer} {vehicle.model}
                </Card.Title>
                <Card.Text>{vehicle.type}</Card.Text>
                {/* <Card.Text>Fuel Type: {vehicle.fuelType}</Card.Text> */}
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <img
                        className="vehicle-card-icon"
                        src={AutomaticTransmissionIcon}
                        alt="Automatic Transmission"
                      />
                      <p>{vehicle.transmission}</p>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <img
                        className="vehicle-card-icon"
                        src={SeatIcon}
                        alt="Seat Number"
                      />
                      <p>{vehicle.seatNumber}</p>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <img
                        className="vehicle-card-icon"
                        src={PoundIcon}
                        alt="Cost"
                      />
                      <p>{vehicle.dailyCost}/Day</p>
                    </Col>
                  </Row>
                  <Row>
                    <Button
                      onClick={() => handleBookModal(vehicle.id)}
                      style={{ width: "100%" }}
                    >
                      Book
                    </Button>
                  </Row>
                </Card.Text>
                {/* <Card.Text>Transmission: {vehicle.transmission}</Card.Text>
              <Card.Text>Seat No: {vehicle.seatNumber}</Card.Text>
              <Card.Text>Daily Cost: Rs {vehicle.dailyCost}</Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="vehicle-book-modal-title">
            <h1>
              <strong>{viewVehicleManufacturer}</strong>&nbsp;
              {viewVehicleModel}
            </h1>
            <h4>{viewVehicleType}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={7}>
              <img
                className="Select-vehicle-image"
                alt="Vehicle"
                src={viewVehicleImage}
              />
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <img
                    className="select-vehicle-card-icon"
                    src={AutomaticTransmissionIcon}
                    alt="Automatic Transmission"
                  />
                  <p>{viewVehicleTransmission}</p>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <img
                    className="select-vehicle-card-icon"
                    src={SeatIcon}
                    alt="Seat Number"
                  />
                  <p>{viewVehicleSeatNumber}</p>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <img
                    className="select-vehicle-card-icon"
                    src={PoundIcon}
                    alt="Cost"
                  />
                  <p>{viewVehicleDailyCost}/Day</p>
                </Col>
              </Row>
            </Col>
            <Col lg={5}>
              <Row>
                <h2>Select Extras:</h2>
              </Row>
              <div className="extras-container">
                <Row>
                  <Button variant="light" className="extra-card-button">
                    <img
                      className="select-vehicle-card-icon"
                      src={SatNav}
                      alt="SatNav"
                    />
                    <h5>SatNav</h5>
                  </Button>
                </Row>
                <Row className="extra-card">
                  <Button variant="light" className="extra-card-button">
                    <img
                      className="select-vehicle-card-icon"
                      src={BabySeats}
                      alt="BabySeats"
                    />
                    <h5>Baby Seats</h5>
                  </Button>
                </Row>
                <Row className="extra-card">
                  <Button variant="light" className="extra-card-button">
                    <img
                      className="select-vehicle-card-icon"
                      src={WineChiller}
                      alt="WineChiller"
                    />

                    <h5>Wine Chiller</h5>
                  </Button>
                </Row>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SearchedVehicles;
