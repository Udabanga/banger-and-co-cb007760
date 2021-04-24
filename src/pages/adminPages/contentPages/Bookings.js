import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  Table,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  dateFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AutomaticTransmissionIcon from "../../../assets/icons/automatic-transmission.png";
import ManualTransmissionIcon from "../../../assets/icons/manual-transmission.png";
import SeatIcon from "../../../assets/icons/seat.png";
import PoundIcon from "../../../assets/icons/pound.png";
import SatNav from "../../../assets/icons/gps.png";
import BabySeats from "../../../assets/icons/baby-car-seat.png";
import WineChiller from "../../../assets/icons/fridge.png";

import axios from "axios";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [tableView, setTableView] = useState("All");
  const [show, setShow] = useState(false);

  const [vehicleID, setVehicleID] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleManufacturer, setVehicleManufacturer] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleTransmission, setVehicleTransmission] = useState("");
  const [vehicleFuelType, setVehicleFuelType] = useState("");
  const [vehicleDailyCost, setVehicleDailyCost] = useState("");
  const [vehicleSeatNumber, setVehicleSeatNumber] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userFName, setUserFName] = useState("");
  const [userLName, setUserLName] = useState("");
  const [userStatus, setUsertStatus] = useState("");

  const [bookingStatus, setBookingStatus] = useState("");
  const [editBookingStatus, setEditBookingStatus] = useState("");

  const [selectSatNav, setSelectSatNav] = useState(false);
  const [selectBabySeats, setSelectBabySeats] = useState(false);
  const [selectWineChiller, setSelectWineChiller] = useState(false);

  const [satNavCost, setSatNavCost] = useState(0);
  const [babySeatsCost, setBabySeatsCost] = useState(0);
  const [wineChillerCost, setWineChillerCost] = useState(0);
  const [bookCost, setBookCost] = useState(
    satNavCost + babySeatsCost + wineChillerCost
  );

  useEffect(() => {
    getBookingList();
  }, []);

  const getBookingList = async () => {
    const result = await axios.get("http://localhost:5000/api/bookings");
    // const result = await UserService.getBookingList();
    console.log(result);
    setBookings(result.data);
  };

  const handleEditModal = (id) => {
    axios
      .post("http://localhost:5000/api/bookings/find", { id: id })
      .then(function (response) {
        console.log(response);
        setVehicleType(response.data.vehicle.type);
        setVehicleManufacturer(response.data.vehicle.manufacturer);
        setVehicleModel(response.data.vehicle.model);
        setVehicleTransmission(response.data.vehicle.transmission);
        setVehicleFuelType(response.data.vehicle.fuelType);
        setVehicleDailyCost(response.data.vehicle.dailyCost);
        setVehicleSeatNumber(response.data.vehicle.seatNumber);
        setVehicleImage(
          "http://localhost:5000/images/" + response.data.vehicle.imageName
        );
        setUserEmail(response.data.user.email);
        setUserFName(response.data.user.fName);
        setUserLName(response.data.user.lName);
        setUsertStatus(response.data.user.status);
        setSelectSatNav(response.data.satNav);
        setSelectBabySeats(response.data.babySeats);
        setSelectWineChiller(response.data.wineChiller);
      })
      .catch(function (error) {
        console.log(error);
      });
    handleShow();
  };

  const onChangeBookingStatus = (e) => {
    const bookingStatus = e.target.value;
    setEditBookingStatus(bookingStatus);
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { SearchBar, ClearSearchButton } = Search;

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button variant="warning" onClick={() => handleEditModal(row.id)}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    );
  };

  const vehicleFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (row.vehicle == null) {
      return "Vehicle not found"
    } 
    return row.vehicle.manufacturer + " " + row.vehicle.model;
  };

  const nameFormatter = (cell, row, rowIndex, formatExtraData) => {
    return row.user.fName + " " + row.user.lName;
  };

  const columns = [
    { dataField: "id", text: "#", headerStyle: { width: "80px" } },
    {
      dataField: "vehicleID",
      text: "VehicleID",
      searchable: false,
      headerStyle: { width: "80px" },
    },
    {
      text: "Vehicle",
      formatter: vehicleFormatter,
      searchable: false,
    },
    {
      dataField: "userID",
      text: "UserID",
      searchable: false,
      headerStyle: { width: "80px" },
    },
    {
      text: "User",
      formatter: nameFormatter,
      searchable: false,
    },
    {
      dataField: "pickUpTime",
      text: "Pick-Up Date",
      formatter: (cell) => {
        if (!cell) {
          return "";
        }
        return `${moment(cell).format("DD-MM-YYYY, HH:mm")}`;
      },
      searchable: false,
    },
    {
      dataField: "dropOffTime",
      text: "Drop-Off Date",
      formatter: (cell) => {
        if (!cell) {
          return "";
        }
        return `${moment(cell).format("DD-MM-YYYY, HH:mm")}`;
      },
      searchable: false,
      filter: dateFilter({
        defaultValue: { date: new Date() },
      }),
    },
    {
      dataField: "status",
      text: "Status",
      searchable: false,
      headerStyle: { width: "80px" },
    },
    {
      dataField: "actions",
      text: "Actions",
      searchable: false,
      headerStyle: { width: "80px" },
      formatter: actionButtons,
    },
  ];

  // Extras States
  const onChangeSatNav = () => {
    if (selectSatNav === false) {
      setSelectSatNav(true);
      setSatNavCost(10);
    } else {
      setSelectSatNav(false);
      setSatNavCost(0);
    }
  };

  const onChangeBabySeats = () => {
    if (selectBabySeats === false) {
      setSelectBabySeats(true);
      setBabySeatsCost(15);
    } else {
      setSelectBabySeats(false);
      setBabySeatsCost(0);
    }
  };

  const onChangeWineChiller = () => {
    if (selectWineChiller === false) {
      setSelectWineChiller(true);
      setWineChillerCost(25);
    } else {
      setSelectWineChiller(false);
      setWineChillerCost(0);
    }
  };

  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <h1>Bookings</h1>
      <ButtonGroup aria-label="Basic example">
        <Button
          onClick={() => setTableView("All")}
          active={tableView == "All"}
          variant="secondary"
        >
          All
        </Button>
        <Button
          onClick={() => setTableView("Booked")}
          active={tableView == "Booked"}
          variant="secondary"
        >
          Pending
        </Button>
        <Button
          onClick={() => setTableView("Completed")}
          active={tableView == "Completed"}
          variant="secondary"
        >
          Completed
        </Button>
        <Button
          onClick={() => setTableView("Cancelled")}
          active={tableView == "Cancelled"}
          variant="secondary"
        >
          Cancelled
        </Button>
      </ButtonGroup>

      <BootstrapTable
        keyField="id"
        data={bookings}
        columns={columns}
        paginationFactory={paginationFactory}
        filter={filterFactory()}
      />

      {/* <ToolkitProvider
        keyField="id"
        data={bookings}
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
      </ToolkitProvider> */}

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={7}>
              <h2>
                <strong>{vehicleManufacturer}</strong>&nbsp;{vehicleModel}
              </h2>
              <img
                className="Select-vehicle-image"
                alt="Vehicle"
                src={vehicleImage}
              />
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <img
                    className="select-vehicle-card-icon"
                    src={AutomaticTransmissionIcon}
                    alt="Automatic Transmission"
                  />
                  <p>{vehicleTransmission}</p>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <img
                    className="select-vehicle-card-icon"
                    src={SeatIcon}
                    alt="Seat Number"
                  />
                  <p>{vehicleSeatNumber}</p>
                </Col>
                <Col style={{ textAlign: "center" }}>
                  <img
                    className="select-vehicle-card-icon"
                    src={PoundIcon}
                    alt="Cost"
                  />
                  <p>{vehicleDailyCost}/Day</p>
                </Col>
              </Row>
              <h2>Select Extras:</h2>
              <ButtonGroup horizontal>
                <Button
                  active={selectSatNav}
                  focus
                  onClick={() => onChangeSatNav()}
                  variant="light"
                  className="extra-card-button-admin"
                >
                  <img
                    className="select-vehicle-card-icon"
                    src={SatNav}
                    alt="SatNav"
                  />
                  <h5>SatNav</h5>
                  <p>+£10</p>
                </Button>
                <Button
                  active={selectBabySeats}
                  onClick={() => onChangeBabySeats()}
                  variant="light"
                  className="extra-card-button-admin"
                >
                  <img
                    className="select-vehicle-card-icon"
                    src={BabySeats}
                    alt="BabySeats"
                  />
                  <h5>Baby Seats</h5>
                  <p>+£15</p>
                </Button>
                <Button
                  active={selectWineChiller}
                  onClick={() => onChangeWineChiller()}
                  variant="light"
                  className="extra-card-button-admin"
                >
                  <img
                    className="select-vehicle-card-icon"
                    src={WineChiller}
                    alt="WineChiller"
                  />

                  <h5>Wine Chiller</h5>
                  <p>+£25</p>
                </Button>
              </ButtonGroup>
            </Col>
            <Col lg={5}>
            <h2>User Details</h2>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  class="form-control"
                  type="email"
                  value={userEmail}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formFName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  class="form-control"
                  type="text"
                  value={userFName}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formLName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  class="form-control"
                  type="text"
                  value={userLName}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status:</Form.Label>
                <Form.Control value={userStatus} as="select">
                  <option>Not Insured</option>
                  <option>Insured</option>
                  <option>Blacklist</option>
                </Form.Control>
              </Form.Group>
              <h2>Booking Details</h2>
              <Form.Group controlId="bookStatus">
                <Form.Label>Status:</Form.Label>
                <Form.Control value={editBookingStatus} onChange={onChangeBookingStatus} as="select">
                  <option>Booked</option>
                  <option>Picked Up</option>
                  <option>Complete</option>
                  <option>Cancelled</option>
                </Form.Control>
              </Form.Group>
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
    </div>
  );
};

export default Bookings;
