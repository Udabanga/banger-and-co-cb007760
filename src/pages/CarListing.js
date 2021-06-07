import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import AutomaticTransmissionIcon from "../assets/icons/automatic-transmission.png";
import ManualTransmissionIcon from "../assets/icons/manual-transmission.png";
import SeatIcon from "../assets/icons/seat.png";
import DollarIcon from "../assets/icons/dollar.png";
import axios from "axios";

import VehicleService from "../services/vehicle.service";

const CarListing = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicleList();
  }, []);

  const getVehicleList = async () => {
    const result = await VehicleService.getVehicleList();
    console.log(result);
    setVehicles(result.data);
  };


  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Car Listing</h2>
      <Row>

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
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CarListing;
