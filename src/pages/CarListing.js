import React, { useState, useEffect } from "react";
import { Container, Card, CardColumns } from "react-bootstrap";
import axios from "axios"

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
      <CardColumns>
        {vehicles.map((vehicle) => (
          <Card className="vehicle-card">
            <Card.Img variant="top" src={"http://localhost:5000/files/" + vehicle.imageName} />
            <Card.Body>
              <Card.Title>Vehicle Name: {vehicle.model}</Card.Title>
              <Card.Text>Type: {vehicle.type}</Card.Text>
              <Card.Text>FuelType: {vehicle.fuelType}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </Container>
  );
};

export default CarListing;
