import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  ButtonGroup,
  Modal,
  Table,
  Row,
  Col,
  Form,
  Alert
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

import bsCustomFileInput from 'bs-custom-file-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
const Bookings = () => {
  const { register, errors, handleSubmit, watch } = useForm({});
  const [bookings, setBookings] = useState([]);
  const [tableView, setTableView] = useState("All");
  const [show, setShow] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);

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

  const [selectSatNav, setSelectSatNav] = useState(false);
  const [selectBabySeats, setSelectBabySeats] = useState(false);
  const [selectWineChiller, setSelectWineChiller] = useState(false);

  const [satNavCost, setSatNavCost] = useState(0);
  const [babySeatsCost, setBabySeatsCost] = useState(0);
  const [wineChillerCost, setWineChillerCost] = useState(0);
  const [bookCost, setBookCost] = useState(
    satNavCost + babySeatsCost + wineChillerCost
  );

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    bsCustomFileInput.init();
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
      })
      .catch(function (error) {
        console.log(error);
      });
    handleShow();
  };

  const onChangeBookingStatus = (e) => {
    const bookingStatus = e.target.value;
    if (bookingStatus == "Picked Up") {
      axios
        .get("http://localhost:5001/data.csv")
        .then(function (response) {
          console.log(response.data);
          let invalidLicence = false;
          let dataList = response.data.split("\r\n");
          dataList.forEach((listItem) => {
            if (userDrivingLicenceNumber == listItem) {
              invalidLicence = true;
            }
            console.log(listItem);
          });

          if (invalidLicence == true) {
            //set user to suspended
            axios
              .put("http://localhost:5000/api/users/update", {
                id: userID,
                status: "Suspended",
              })
              .then(function (response) {
                console.log(response);
                handleShowSuspendModal();
                // getUserList();
              })
              .catch(function (error) {
                console.log(error);
              });
            //send email

            //Modal Error message
            //set booking cancelled
            setEditBookingStatus("Cancelled");
          }
          else {
            setEditBookingStatus(bookingStatus);
          }
        })
    }
    else {
      setEditBookingStatus(bookingStatus);
    }
  }

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

  const handleShowSuspendModal = () => setShowSuspend(true);
  const handleCloseSuspendModal = () => setShowSuspend(false);

  const { SearchBar, ClearSearchButton } = Search;

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button variant="warning" onClick={() => handleEditModal(row.id)}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    );
  };

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("time", currentTime);
    formData.append("drivingLicenceNumber", userDrivingLicenceNumber);
    formData.append("driverImage", data.driverImage[0]);
    axios
      .post("http://localhost:5000/api/booking/reportDriver", formData)
      .then(function (response) {
        console.log(response);
        // handleShowSuspendModal()
      })
      .catch(function (error) {
        console.log(error);
        // setMessage(error.message);
        // setSuccessful(false);
      });
    // Update booking
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
      })
      .catch(function (error) {
        console.log(error);
      });
    handleCloseSuspendModal()
    handleClose()
    getBookingList()

  }

  const vehicleFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (row.vehicle == null) {
      return "Vehicle not found"
    }
    return row.vehicle.manufacturer + " " + row.vehicle.model;
  };

  const nameFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (row.user == null) {
      return "User not found"
    }
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

      <Modal show={showSuspend} backdrop="static" centered onHide={handleCloseSuspendModal}>
        <Modal.Header closeButton>
          Alert!
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger" onClose={() => handleCloseSuspendModal}>
            <Alert.Heading>Booking Cancelled</Alert.Heading>
            <p>
              This driving licence has been reported lost/stolen. Please enter the following details to notify the DMV
            </p>
            <Form onSubmit={handleSubmit(onSubmit)}>

              <Form.Group className="mb-3" controlId="formBasicDriverImage">
                <Form.Label>Driving License</Form.Label>
                <Form.File
                  ref={register()}
                  name="driverImage"
                  accept="image/*"
                  label="Driver Image File"
                  custom
                />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTime">
                <Form.Label>Time</Form.Label>
                <DatePicker
                  ref={register()}
                  name="time"
                  selected={currentTime}
                  showTimeSelect
                  showTimeSelectOnly
                  dateFormat="h:mm aa"
                  timeIntervals={1}
                  timeCaption="Time"
                  onChange={(date) => setCurrentTime(date)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Alert>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Bookings;
