import React, { useContext, useState, useEffect } from "react";
import { GlobalAppContext } from "../context";
import { Button, ButtonGroup, Table, Col, Row, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import AutomaticTransmissionIcon from "../../../assets/icons/automatic-transmission.png";
import ManualTransmissionIcon from "../../../assets/icons/manual-transmission.png";
import SeatIcon from "../../../assets/icons/seat.png";
import PoundIcon from "../../../assets/icons/pound.png";
import SatNav from "../../../assets/icons/gps.png";
import BabySeats from "../../../assets/icons/baby-car-seat.png";
import WineChiller from "../../../assets/icons/fridge.png";


import filterFactory, {
  textFilter,
  dateFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import AuthService from "../../../services/auth.service";
import moment from "moment";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { toggled, setToggled } = useContext(GlobalAppContext);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [show, setShow] = useState(false);

  const [selectSatNav, setSelectSatNav] = useState(false);
  const [selectBabySeats, setSelectBabySeats] = useState(false);
  const [selectWineChiller, setSelectWineChiller] = useState(false);

  const [bookingID, setBookingID] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");

  const [vehicleID, setVehicleID] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleManufacturer, setVehicleManufacturer] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleTransmission, setVehicleTransmission] = useState("");
  const [vehicleFuelType, setVehicleFuelType] = useState("");
  const [vehicleDailyCost, setVehicleDailyCost] = useState("");
  const [vehicleSeatNumber, setVehicleSeatNumber] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");

  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFName, setUserFName] = useState("");
  const [userLName, setUserLName] = useState("");
  const [userNICNumber, setUsertNICNumber] = useState("");
  const [userDrivingLicenceNumber, setUserDrivingLicenceNumber] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const [bookingStatus, setBookingStatus] = useState("");
  const [editBookingStatus, setEditBookingStatus] = useState("");

  const [satNavCost, setSatNavCost] = useState(0);
  const [babySeatsCost, setBabySeatsCost] = useState(0);
  const [wineChillerCost, setWineChillerCost] = useState(0);
  const [bookCost, setBookCost] = useState(
    satNavCost + babySeatsCost + wineChillerCost
  );
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }

    getUserBookingList();
  }, []);

  const getUserBookingList = async () => {
    await axios
      .post("http://localhost:5000/api/bookings/user", { userID: user.id })
      .then(function (response) {
        console.log(response);
        setBookings(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Button variant="warning">
          <FontAwesomeIcon icon={faEdit} onClick={() => handleEditModal(row.id)} />
        </Button>
        <Button variant="danger">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    );
  };

  const vehicleFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (row.vehicle == null) {
      return "Vehicle not found"
    }
    return row.vehicle.manufacturer + " " + row.vehicle.model;
  };

  const handleEditModal = (id) => {
    axios
      .post("http://localhost:5000/api/bookings/find", { id: id })
      .then(function (response) {
        console.log(response);
        setBookingID(id);
        setPickUpDate(response.data.pickUpTime);
        setDropOffDate(response.data.dropOffTime);

        setVehicleID(response.data.vehicle.id);
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
        setUserID(response.data.user.id);
        setUserEmail(response.data.user.email);
        setUserFName(response.data.user.fName);
        setUserLName(response.data.user.lName);
        setUsertNICNumber(response.data.user.NICNumber);
        setUserDrivingLicenceNumber(response.data.user.drivingLicenceNumber);
        setUserStatus(response.data.user.status);
        setSelectSatNav(response.data.satNav);
        setSelectBabySeats(response.data.babySeats);
        setSelectWineChiller(response.data.wineChiller);
        setBookCost(response.data.bookCost);

        setBookingStatus(response.data.status);
      })
      .catch(function (error) {
        console.log(error);
      });
    handleShow();
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setVehicleType("");
    setVehicleManufacturer("");
    setVehicleModel("");
    setVehicleTransmission("");
    setVehicleFuelType("");
    setVehicleDailyCost("");
    setVehicleSeatNumber("");
    setVehicleImage("");
    setUserEmail("");
    setUserFName("");
    setUserLName("");
    setUsertNICNumber("");
    setUserDrivingLicenceNumber("");
    setUserStatus("");
    setSelectSatNav("");
    setSelectBabySeats("");
    setSelectWineChiller("");
    setShow(false);
  }

  const handleSaveChanges = () => {
    axios
        .put("http://localhost:5000/api/bookings/update", {
          id: bookingID,
          vehicleID: vehicleID,
          userID: userID,
          pickUpTime: pickUpDate,
          dropOffTime: dropOffDate,
          satNav: selectSatNav,
          babySeats: selectBabySeats,
          wineChiller: selectWineChiller,
          bookCost: bookCost,
          status: editBookingStatus,
        })
        .then(function (response) {
          console.log(response);
          getUserBookingList();
          setShow(false);
        })
        .catch(function (error) {
          console.log(error);
          setShow(false);
        });

  }

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
    },
    {
      dataField: "status",
      text: "Status",
      searchable: false,
      headerStyle: { width: "100px" },
    },
    {
      dataField: "actions",
      text: "Actions",
      searchable: false,
      headerStyle: { width: "80px" },
      formatter: actionButtons,
    },
  ];

  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <div className="heading-user-page">
        <Button variant="outline-info" onClick={() => setToggled(!toggled)}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <h1>Bookings</h1>
      </div>
      <BootstrapTable
        keyField="id"
        data={bookings}
        columns={columns}
        paginationFactory={paginationFactory}
        filter={filterFactory()}
      />

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
              <Form.Group controlId="formNICNumber">
                <Form.Label>NIC Number:</Form.Label>
                <Form.Control
                  class="form-control"
                  type="text"
                  value={userNICNumber}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formDrivingLicence">
                <Form.Label>Driving Licence:</Form.Label>
                <Form.Control
                  class="form-control"
                  type="text"
                  value={userDrivingLicenceNumber}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status:</Form.Label>
                <Form.Control value={userStatus} as="select">
                  <option>Not Insured</option>
                  <option>Insured</option>
                  <option>Blacklist</option>
                  <option>Suspended</option>
                </Form.Control>
              </Form.Group>
              <h2>Booking Details</h2>
              <Form.Group controlId="bookStatus">
                <Form.Label>Status:</Form.Label>
                <Form.Control value={editBookingStatus} as="select">
                  <option>Booked</option>
                  <option>Cancelled-User</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bookings;
