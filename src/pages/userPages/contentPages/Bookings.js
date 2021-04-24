import React, { useContext, useState, useEffect } from "react";
import { GlobalAppContext } from "../context";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
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
          <FontAwesomeIcon icon={faEdit} />
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

  // const nameFormatter = (cell, row, rowIndex, formatExtraData) => {
  //   return row.user.fName + " " + row.user.lName;
  // };

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
      {/* <Table className="border thead-dark">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>VehicleID</th>
            <th>UserID</th>
            <th>Pick-Up Date</th>
            <th>Drop-Off Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((vehicle) => (
            <tr>
              <td>{vehicle.id}</td>
              <td>{vehicle.vehicleID}</td>
              <td>{vehicle.userID}</td>
              <td>{vehicle.pickUpTime}</td>
              <td>{vehicle.dropOffTime}</td>
              <td>{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </div>
  );
};

export default Bookings;
