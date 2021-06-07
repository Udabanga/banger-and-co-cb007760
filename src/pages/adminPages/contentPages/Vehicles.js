import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Button, ButtonGroup, Modal, Form } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import FormValidate from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


import UserService from "../../../services/user.service";

const Vehicles = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [vehicles, setVehicles] = useState([]);
  const [show, setShow] = useState(false);
  const [editID, setEditID] = useState("");
  const [editType, setEditType] = useState("");
  const [editManufacturer, setEditManufacturer] = useState("");
  const [editModel, setEditModel] = useState("");
  const [editTransmission, setEditTransmission] = useState("");
  const [editFuelType, setEditFuelType] = useState("");
  const [editDailyCost, setEditDailyCost] = useState("");
  const [editSeatNumber, setEditSeatNumber] = useState("");
  // const [editImageName, setEditImageName] = useState("");

  const [updateImageName, setUpdateImageName] = useState("");

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [tableView, setTableView] = useState("Active");

  // var [i,setI] = useState(0);

  const { SearchBar, ClearSearchButton } = Search;

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Button variant="warning" onClick={() => handleEditModal(row.id)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button variant="danger" onClick={() => handleDelete(row.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    );
  };

  const vehicleImageLoader = (cell, row, rowIndex, formatExtraData) => {
    return (
      <img
        className="table-image"
        src={"http://localhost:5000/images/" + row.imageName}
        alt={row.imageName}
      />
    );
  };

  const columns = [
    { dataField: "id", text: "#" },
    {
      dataField: "imageName",
      text: "Image",
      searchable: false,
      formatter: vehicleImageLoader,
    },
    { dataField: "type", text: "Type", searchable: false },
    { dataField: "manufacturer", text: "Manufacturer", searchable: false },
    { dataField: "model", text: "Model", searchable: false },
    { dataField: "transmission", text: "Transmission", searchable: false },
    { dataField: "fuelType", text: "Fuel Type", searchable: false },
    { dataField: "dailyCost", text: "Daily Cost", searchable: false },
    {
      dataField: "actions",
      text: "Actions",
      searchable: false,
      formatter: actionButtons,
    },
  ];

  var editImageName;

  const [modalTitle, setModalTitle] = useState("");
  var imagething = "";
  useEffect(() => {
    getVehicleList();
  }, []);

  const getVehicleList = async () => {
    const result = await axios.get("http://localhost:5000/api/vehicles");
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
    setEditTransmission("");
    setEditFuelType("");
    setEditDailyCost("");
    setEditSeatNumber("");
    setEditDailyCost("");
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
        setEditTransmission(response.data.transmission);
        setEditFuelType(response.data.fuelType);
        setEditDailyCost(response.data.dailyCost);
        setEditSeatNumber(response.data.seatNumber);
        setEditDailyCost(response.data.dailyCost);
        setPreviewImage(
          "http://localhost:5000/images/" + response.data.imageName
        );
        console.log(editType);
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
    formData.append("transmission", editTransmission);
    formData.append("fuelType", editFuelType);
    formData.append("dailyCost", editDailyCost);
    formData.append("seatNumber", editSeatNumber);
    if (checkBtn.current.context._errors.length === 0) {
      axios
        .post("http://localhost:5000/api/vehicles/create", formData)
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
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/api/vehicles/delete", { data: { id: id } })
      .then(function (response) {
        console.log(response);
        getVehicleList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const handleUpdate = async () => {
    // setEditSeatNumber("");
    if (image == null) {
      if (checkBtn.current.context._errors.length === 0) {
        axios
          .put("http://localhost:5000/api/vehicles/update", {
            id: editID,
            type: editType,
            manufacturer: editManufacturer,
            model: editModel,
            transmission: editTransmission,
            fuelType: editFuelType,
            dailyCost: editDailyCost,
            seatNumber: editSeatNumber,
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
    }
    else {
      let formData = new FormData();
      formData.append("file", image);
      console.log(image.name);
      await axios
        .post("http://localhost:5000/upload", formData)
        .then(function (response) {
          console.log(response.data.file);
          editImageName = response.data.file;
          console.log(editImageName);
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(editSeatNumber);
      console.log(editImageName);
      console.log(editSeatNumber);
      if (checkBtn.current.context._errors.length === 0) {
        axios
          .put("http://localhost:5000/api/vehicles/update", {
            id: editID,
            type: editType,
            manufacturer: editManufacturer,
            model: editModel,
            transmission: editTransmission,
            fuelType: editFuelType,
            dailyCost: editDailyCost,
            seatNumber: editSeatNumber,
            imageName: editImageName,
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

  const onChangeTransmission = (e) => {
    const transmission = e.target.value;
    setEditTransmission(transmission);
  };

  const onChangeFuelType = (e) => {
    const fuelType = e.target.value;
    setEditFuelType(fuelType);
  };

  const onChangeSeatNumber = (e) => {
    const seatNumber = e.target.value;
    setEditSeatNumber(seatNumber);
  };

  const onChangeDailyCost = (e) => {
    const dailyCost = e.target.value;
    setEditDailyCost(dailyCost);
  };

  const onChangeImage = (e) => {
    console.log("image: ", image);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
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
      <ButtonGroup aria-label="Basic example">
        <Button
          onClick={() => setTableView("Active")}
          active={tableView == "Active"}
          variant="secondary"
        >
          Active{" "}
        </Button>
        <Button
          onClick={() => setTableView("Drafted")}
          active={tableView == "Drafted"}
          variant="secondary"
        >
          Drafted
        </Button>
        <Button
          onClick={() => setTableView("Deleted")}
          active={tableView == "Deleted"}
          variant="secondary"
        >
          Deleted
        </Button>
      </ButtonGroup>

      <ToolkitProvider
        keyField="id"
        data={vehicles}
        columns={columns}
        paginationFactory={paginationFactory}
        search
      >
        {(props) => (
          <div>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable {...props.baseProps} />
          </div>
        )}
      </ToolkitProvider>
      <Modal show={show} onHide={handleClose}>
        <FormValidate ref={form}>
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

            <Form.Group controlId="formTransmission">
              <Form.Label>Transmission:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editTransmission}
                onChange={onChangeTransmission}
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

            <Form.Group controlId="formSeatNumber">
              <Form.Label>SeatNumber:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editSeatNumber}
                onChange={onChangeSeatNumber}
              ></Input>
            </Form.Group>

            <Form.Group controlId="formDailyCost">
              <Form.Label>Daily Cost:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editDailyCost}
                onChange={onChangeDailyCost}
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
            {modalTitle === "Edit Vehicle" && (
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            )}
            {modalTitle === "Add Vehicle" && (
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
