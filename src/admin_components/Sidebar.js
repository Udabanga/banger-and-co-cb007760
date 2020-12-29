import React, { useContext } from "react";
import SubMenu from "./SubMenu";
import { NavLink } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { GlobalAppContext } from "./context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faColumns, faUsers } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);
  return (
    <div className={classNames("sidebar", { "is-open": toggled })}>
      <div className="sidebar-header">
        {/* <Button
          variant="link"
          onClick={toggled}
          style={{ color: "#fff" }}
          className="mt-4"
        ></Button> */}
        <h3 onClick={() => setToggled(!toggled)}>Admin Page</h3>
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

        {/* <SubMenu title="Item" items={["Link", "Link2", "Active"]} /> */}
      </Nav>
    </div>
  );
};

export default Sidebar;
