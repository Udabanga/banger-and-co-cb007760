import React, { useContext } from "react";
import SubMenu from "./SubMenu";
import { NavLink } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { GlobalAppContext } from "./context";

const Sidebar = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);
  return (
    <div className={classNames("sidebar", { "is-open": toggled })}>
      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={toggled}
          style={{ color: "#fff" }}
          className="mt-4"
        ></Button>
        <h3>Admin Page</h3>
      </div>

      <Nav className="flex-column pt-2">
        {/* <Nav.Item>
          <Nav.Link href="/admin">Home</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/users">Users</Nav.Link>
        </Nav.Item> */}

        <Nav.Item>
          <NavLink to={"/admin"}>Home</NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink to={"/admin/users"}>Users</NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink to={"/admin/vehicles"}>Vehicles</NavLink>
        </Nav.Item>

        {/* <SubMenu title="Pages" items={["Link", "Link2", "Active"]} /> */}
      </Nav>
    </div>
  );
};

export default Sidebar;
