import React, { useContext, useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import SubMenu from "./SubMenu";
import { NavLink } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { GlobalAppContext } from "./context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faColumns,
  faUsers,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);

  const [showEmployee, setShowEmployee] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowEmployee(user.roles.includes("ROLE_EMPLOYEE"));
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  return (
    <div className={classNames("sidebar", { "is-open": toggled })}>
      <div className="sidebar-header">
        {/* <Button
          variant="link"
          onClick={toggled}
          style={{ color: "#fff" }}
          className="mt-4"
        ></Button> */}
        {showAdmin && <h3 onClick={() => setToggled(!toggled)}>Admin Page</h3>}
        {showEmployee && <h3 onClick={() => setToggled(!toggled)}>Employee Page</h3>}
      </div>

      <Nav className="flex-column pt-2">
        <Nav.Item>
          <NavLink className="nav-link" to={"/admin"}>
            <FontAwesomeIcon icon={faColumns} />
            Home
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink className="nav-link" to={"/admin/users"}>
            <FontAwesomeIcon icon={faUsers} />
            Users
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink className="nav-link" to={"/admin/vehicles"}>
            <FontAwesomeIcon icon={faCar} />
            Vehicles
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink className="nav-link" to={"/admin/bookings"}>
            <FontAwesomeIcon icon={faCalendar} />
            Bookings
          </NavLink>
        </Nav.Item>

        {/* <SubMenu title="Item" items={["Link", "Link2", "Active"]} /> */}
      </Nav>
    </div>
  );
};

export default Sidebar;
