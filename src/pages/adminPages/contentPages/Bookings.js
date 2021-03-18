import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [tableView, setTableView] = useState("All");

  useEffect(() => {
    getBookingList();
  }, []);

  const getBookingList = async () => {
    const result = await axios.get("http://localhost:5000/api/bookings");
    // const result = await UserService.getBookingList();
    console.log(result);
    setBookings(result.data);
  };

  const { SearchBar, ClearSearchButton } = Search;

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        onClick={() => {
          console.log(row);
        }}
      >
        Edit
      </Button>
    );
  };

  const columns = [
    { dataField: "id", text: "#" },
    { dataField: "vehicleID", text: "VehicleID", searchable: false },
    { dataField: "userID", text: "UserID", searchable: false },
    {
      dataField: "pickUpTime",
      text: "Pick-Up Date",
      formatter: (cell) => {
        if (!cell) {
          return "";
        }
        return `${
          moment(cell).format("DD-MM-YYYY, HH:mm")
        }`;
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
        return `${
          moment(cell).format("DD-MM-YYYY, HH:mm")
        }`;
      },
      searchable: false,
    },
    { dataField: "status", text: "Status", searchable: false },
    {
      dataField: "actions",
      text: "Actions",
      searchable: false,
      formatter: actionButtons,
    },
  ];

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
          {bookings.map((booking) => (
            <tr>
              <td>{booking.id}</td>
              <td>{booking.vehicleID}</td>
              <td>{booking.userID}</td>
              <td>{new Date(booking.pickUpTime).toLocaleString()}</td>
              <td>{new Date(booking.dropOffTime).toLocaleString()}</td>
              <td>{booking.status}</td>
              <td>
                <Button
                  variant="warning"
                  // onClick={() => handleViewModal(booking.id)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="danger"
                  // onClick={() => handleDelete(booking.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      <ToolkitProvider
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
      </ToolkitProvider>
    </div>
  );
};

export default Bookings;
