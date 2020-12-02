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

  useEffect(() => {
    getVehicleList();
  }, []);

  const getVehicleList = async () => {
    const result = await axios.get("http://localhost:5000/api/vehicels");
    // const result = await UserService.getVehicleList();
    console.log(result);
    setVehicles(result.data);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
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

    handleShow();
  };

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

  const handleUpdate1 = (e) => {
    e.preventDefault();

    // setMessage("");
    // setLoading(true);

    form.current.validateAll();

    // if (checkBtn.current.context._errors.length === 0) {
    //   AuthService.login(email, password).then(
    //     () => {
    //       props.history.push("/profile");
    //       window.location.reload();
    //     },
    //     (error) => {
    //       const resMessage =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();

    //       setLoading(false);
    //       setMessage(resMessage);
    //     }
    //   );
    // } else {
    //   setLoading(false);
    // }

    // if (checkBtn.current.context._errors.length === 0) {
    //   UserService.getVehicleList()
    //   .then(
    //     UserSer
    //   );
    // } else {
    //   setLoading(false);
    // }
  };

  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <h1>Vehicels</h1>

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
                  onClick={() =>
                    handleEdit(
                      vehicle.id,
                    )
                  }
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
        <FormValidate onSubmit={handleUpdate} ref={form}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Vehicle</Modal.Title>
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
              <Form.Label>Colour:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editFuelType}
                onChange={onChangeFuelType}
              ></Input>
            </Form.Group>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </FormValidate>
      </Modal>
    </div>
  );
};

export default Vehicles;
