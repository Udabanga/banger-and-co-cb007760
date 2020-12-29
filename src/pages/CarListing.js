import React, { useState, useEffect } from "react";
import { Container, Card, CardColumns, Row, Col, Button } from "react-bootstrap";
import AutomaticTransmissionIcon from "../assets/icons/automatic-transmission.png";
import ManualTransmissionIcon from "../assets/icons/manual-transmission.png";
import SeatIcon from "../assets/icons/seat.png";
import DollarIcon from "../assets/icons/dollar.png";
import axios from "axios";

const CarListing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [show, setShow] = useState(false);
  const [editID, setEditID] = useState("");
  const [editType, setEditType] = useState("");
  const [editManufacturer, setEditManufacturer] = useState("");
  const [editModel, setEditModel] = useState("");
  const [editColour, setEditColour] = useState("");
  const [editFuelType, setEditFuelType] = useState("");

  const [image, setImage] = useState(null);

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
      <h2 style={{textAlign: "center"}}>Car Listing</h2>
      <CardColumns>
        {vehicles.map((vehicle) => (
          <Card className="book-card">
            <Card.Img
              className="vehicle-card-img"
              variant="top"
              src={"http://localhost:5000/files/" + vehicle.imageName}
            />
            <Card.Body>
              <Card.Title>{vehicle.manufacturer} {vehicle.model}</Card.Title>
              <Card.Text >{vehicle.type}</Card.Text>
              {/* <Card.Text>Fuel Type: {vehicle.fuelType}</Card.Text> */}
              <Card.Text>
                <Row>
                  <Col style={{textAlign: "center"}}>
                    <img
                      className="vehicle-card-icon"
                      src={AutomaticTransmissionIcon}
                      alt="Automatic Transmission"
                    />
                    <p>{vehicle.transmission}</p>
                  </Col>
                  <Col style={{textAlign: "center"}}>
                    <img
                      className="vehicle-card-icon"
                      src={SeatIcon}
                      alt="Seat Number"
                    />
                    <p>{vehicle.seatNumber}</p>
                  </Col>
                  <Col style={{textAlign: "center"}}>
                    <img
                      className="vehicle-card-icon"
                      src={DollarIcon}
                      alt="Cost"
                    />
                    <p>{vehicle.dailyCost}</p>
                  </Col>
                </Row>
                <Row>
                  <Button style={{width: "100%"}}>Book</Button>
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

export default CarListing;
