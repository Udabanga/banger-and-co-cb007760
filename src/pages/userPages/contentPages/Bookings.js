import React, { useContext, useState, useEffect } from "react";
import { GlobalAppContext } from "../context";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import AuthService from "../../../services/auth.service";

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

  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <div className="heading-user-page">
        <Button variant="outline-info" onClick={() => setToggled(!toggled)}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <h1>Bookings</h1>
      </div>
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
      </Table>
    </div>
  );
};

export default Bookings;
