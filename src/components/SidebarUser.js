import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { GlobalAppContext } from "../admin_components/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const SidebarUser = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);
  return (
    <div className={classNames("sidebar", { "is-open": toggled })}>
      <div className="sidebar-header">
        <h3 onClick={() => setToggled(!toggled)}>Admin Page</h3>
      </div>

      <Nav className="flex-column pt-2">
        <Nav.Item>
          <NavLink className="nav-link" to={"/admin"}>
          <FontAwesomeIcon icon={faUsers} />
            Profile
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink className="nav-link" to={"/admin/users"}>
            Bookings
          </NavLink>
        </Nav.Item>


      </Nav>
    </div>
  );
};

export default SidebarUser;
