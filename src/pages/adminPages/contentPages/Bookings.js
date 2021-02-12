import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
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
      <Table className="border thead-dark">
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
      </Table>
    </div>
  );
};

export default Bookings;
