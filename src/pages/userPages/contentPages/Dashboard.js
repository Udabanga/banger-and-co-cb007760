import React, { useState, useEffect, useContext } from "react";
import { GlobalAppContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);
  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <div className="heading-user-page">
        <Button variant="outline-info" onClick={() => setToggled(!toggled)}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
