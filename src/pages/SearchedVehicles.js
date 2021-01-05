import React, { useEffect, useState } from "react";
import { Container, CardColumns, Card, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import AutomaticTransmissionIcon from "../assets/icons/automatic-transmission.png";
import ManualTransmissionIcon from "../assets/icons/manual-transmission.png";
import SeatIcon from "../assets/icons/seat.png";
import DollarIcon from "../assets/icons/dollar.png";

const SearchedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicleList();
  }, []);

  const getVehicleList = async () => {
    const result = await axios.get("http://localhost:5000/api/vehicels");
    // const result = await UserService.getVehicleList();
    console.log(result);
    setVehicles(result.data);
  };
  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Car Listing</h2>
      <CardColumns>
        {vehicles.map((vehicle) => (
          <Card className="book-card">
            <Card.Img
              className="vehicle-card-img"
              variant="top"
              src={"http://localhost:5000/files/" + vehicle.imageName}
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
        ))}
      </CardColumns>
    </Container>
  );
};

export default SearchedVehicles;
