import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import FormValidate from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../../services/user.service";

const Vehicles = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [vehicles, setVehicles] = useState([]);
  const [show, setShow] = useState(false);
  const [editID, setEditID] = useState("");
  const [editType, setEditType] = useState("");
  const [editManufacturer, setEditManufacturer] = useState("");
  const [editModel, setEditModel] = useState("");
  const [editColour, setEditColour] = useState("");
  const [editFuelType, setEditFuelType] = useState("");

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    getVehicleList();
  }, []);

  const getVehicleList = async () => {
    const result = await axios.get("http://localhost:5000/api/vehicels");
    // const result = await UserService.getVehicleList();
    console.log(result);
    setVehicles(result.data);
  };

  const handleClose = () => {
    setShow(false);
    setEditID("");
    setEditType("");
    setEditManufacturer("");
    setEditModel("");
    setEditColour("");
    setEditFuelType("");
    setImage(null);
    setPreviewImage(null);
  };
  const handleShow = () => setShow(true);

  const handleEditModal = (id) => {
    axios
      .post("http://localhost:5000/api/vehicles/find", { id: id })
      .then(function (response) {
        console.log(response);
        setEditID(response.data.id);
        setEditType(response.data.type);
        setEditManufacturer(response.data.manufacturer);
        setEditModel(response.data.model);
        setEditColour(response.data.colour);
        setEditFuelType(response.data.fuelType);
      })
      .catch(function (error) {
        console.log(error);
      });
    setModalTitle("Edit Vehicle");
    handleShow();
  };

  const handleAddModal = () => {
    setModalTitle("Add Vehicle");
    handleShow();
  };

  const handleAdd = () => {
    let formData = new FormData();
    formData.append("file", image);
    formData.append("type", editType);
    formData.append("manufacturer", editManufacturer);
    formData.append("model", editModel);
    formData.append("colour", editColour);
    formData.append("fuelType", editFuelType);
    if (checkBtn.current.context._errors.length === 0) {
      axios
        .post("http://localhost:5000/api/vehicels/create", formData)
        .then(function (response) {
          console.log(response);
          getVehicleList();
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  // http://localhost:5000/api/vehicles/create
  const handleDelete = (id, email) => {};

  const handleUpdate = () => {
    if (checkBtn.current.context._errors.length === 0) {
      axios
        .put("http://localhost:5000/api/vehicles/update", {
          id: editID,
          type: editType,
          manufacturer: editManufacturer,
          model: editModel,
          colour: editColour,
          fuelType: editFuelType,
        })
        .then(function (response) {
          console.log(response);
          getVehicleList();
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const onChangeType = (e) => {
    const type = e.target.value;
    setEditType(type);
  };

  const onChangeManufacturer = (e) => {
    const manufacturer = e.target.value;
    setEditManufacturer(manufacturer);
  };

  const onChangeModel = (e) => {
    const model = e.target.value;
    setEditModel(model);
  };

  const onChangeColour = (e) => {
    const colour = e.target.value;
    setEditColour(colour);
  };

  const onChangeFuelType = (e) => {
    const fuelType = e.target.value;
    setEditFuelType(fuelType);
  };

  const onChangeImage = (e) => {
    console.log("image: ", image);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <div className="row">
        <div className="col">
          <h1>Vehicels</h1>
        </div>
        <div className="col">
          <Button className="admin-add-button" onClick={handleAddModal}>
            Add Vehicle
          </Button>
        </div>
      </div>
      <Table className="border thead-dark">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Colour</th>
            <th>Fuel Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr>
              <td>{vehicle.id}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.manufacturer}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.colour}</td>
              <td>{vehicle.fuelType}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditModal(vehicle.id)}
                >
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        {/* <FormValidate
          onSubmit={
            (modalTitle === "Edit Vehicle" && { handleUpdate }) ||
            (modalTitle === "Add Vehicle" && { handleAdd })
          }
          ref={form}
        > */}
        <FormValidate onSubmit={handleUpdate} ref={form}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formType">
              <Form.Label>Type:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editType}
                onChange={onChangeType}
              ></Input>
            </Form.Group>

            <Form.Group controlId="formManufacturer">
              <Form.Label>Manufacturer:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editManufacturer}
                onChange={onChangeManufacturer}
              ></Input>
            </Form.Group>

            <Form.Group controlId="formModel">
              <Form.Label>Model:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editModel}
                onChange={onChangeModel}
              ></Input>
            </Form.Group>

            <Form.Group controlId="formColour">
              <Form.Label>Colour:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editColour}
                onChange={onChangeColour}
              ></Input>
            </Form.Group>

            <Form.Group controlId="formFuelType">
              <Form.Label>Fuel Type:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editFuelType}
                onChange={onChangeFuelType}
              ></Input>
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image:</Form.Label>
              <Input
                type="file"
                accept="image/*"
                onChange={onChangeImage}
              ></Input>

              <div className="imagePreview">
                <img src={previewImage}></img>
              </div>
            </Form.Group>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button> */}
            {modalTitle == "Edit Vehicle" && (
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            )}
            {modalTitle == "Add Vehicle" && (
              <Button variant="primary" onClick={handleAdd}>
                Add Vehicle
              </Button>
            )}
          </Modal.Footer>
        </FormValidate>
      </Modal>
    </div>
  );
};

export default Vehicles;
