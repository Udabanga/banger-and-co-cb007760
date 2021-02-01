import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardColumns,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import AutomaticTransmissionIcon from "../assets/icons/automatic-transmission.png";
import ManualTransmissionIcon from "../assets/icons/manual-transmission.png";
import SeatIcon from "../assets/icons/seat.png";
import DollarIcon from "../assets/icons/dollar.png";
import axios from "axios";

const CarListing = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicleList();
  }, []);

  const getVehicleList = async () => {
    const result = await axios.get("http://localhost:5000/api/vehicles");
    // const result = await UserService.getVehicleList();
    console.log(result);
    setVehicles(result.data);
  };

  // const renderVehicleCard = (card, index) =>{}

  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Car Listing</h2>
      <Row>
        {/* {vehicles.forEach()} */}

        {vehicles.map((vehicle) => (
          <Col lg={4} md={6} sm={12}>
            <Card className="vehicle-card" style={{marginTop: 0}}>
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
                        src={DollarIcon}
                        alt="Cost"
                      />
                      <p>{vehicle.dailyCost}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Button style={{ width: "100%" }}>Book</Button>
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
    </Container>
  );
};

export default CarListing;
