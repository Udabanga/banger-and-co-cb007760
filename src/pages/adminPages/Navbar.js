import React , { useContext, useState, useEffect } from 'react';
import { Navbar, Button, Nav } from "react-bootstrap";
import { GlobalAppContext } from "./context";
import AuthService from "../../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  const { toggled, setToggled  } = useContext(
    GlobalAppContext
  );

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

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Navbar
      bg="light"
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand
    >
      <Button
        variant="outline-info"
        onClick={() => setToggled(!toggled)}
      ><FontAwesomeIcon icon={faBars} /></Button>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" navbar>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Item>
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
