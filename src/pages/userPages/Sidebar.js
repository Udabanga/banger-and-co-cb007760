import React, { useContext } from "react";
import SubMenu from "./SubMenu";
import { NavLink } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { GlobalAppContext } from "./context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faColumns, faUsers, faCalendar } from '@fortawesome/free-solid-svg-icons'


const Sidebar = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);
  return (
    <div className={classNames("sidebar", { "is-open": toggled })}>
      <div className="sidebar-header">
        <h3 onClick={() => setToggled(!toggled)}>User Page</h3>
      </div>

      <Nav className="flex-column pt-2">
        <Nav.Item>
          <NavLink className="nav-link" to={"/user"}>
          <FontAwesomeIcon icon={faUsers} />
            Profile
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink className="nav-link" to={"/user/bookings"}>
            Bookings
          </NavLink>
        </Nav.Item>


      </Nav>
    </div>
  );
};

export default Sidebar;
