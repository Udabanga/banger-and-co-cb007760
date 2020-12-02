import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../App";
import { Nav, Navbar, NavDropdown, } from "react-bootstrap";
import Logo from "../assets/Logo.png";

import AuthService from "../services/auth.service";

function Navigation() {
  const [showModerator, setShowModerator] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModerator(user.roles.includes("ROLE_MODERATOR"));
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <img src={Logo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto nav-center">

          <Nav.Item>
            <NavLink to={"/home"} className="nav-link">
              Home
            </NavLink>
          </Nav.Item>

          <Nav.Item>
            <NavLink to={"/CarListing"} className="nav-link">
              Car Listing
            </NavLink>
          </Nav.Item>

          {showModerator && (
            <Nav.Item>
              <NavLink to={"/mod"} className="nav-link">
                Moderator Page
              </NavLink>
            </Nav.Item>
          )}

          {showAdmin && (
            <Nav.Item>
              <NavLink to={"/admin"} className="nav-link">
                Admin Page
              </NavLink>
            </Nav.Item>
          )}

          {currentUser && (
            <Nav.Item>
              <NavLink to={"/user"} className="nav-link">
                User
              </NavLink>
            </Nav.Item>
          )}
        </Nav>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            {/* <Nav.Item>
              <Link to={"/profile"} className="nav-link">
                {currentUser.email}
              </Link>
            </Nav.Item> */}
            <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              {showAdmin && (
                <NavDropdown.Item href="/admin">Admin Page</NavDropdown.Item>
              )}
            </NavDropdown>
            <Nav.Item>
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </Nav.Item>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <Nav.Item>
              <NavLink to={"/login"} className="nav-link">
                Login
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink to={"/register"} className="nav-link">
                Sign Up
              </NavLink>
            </Nav.Item>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
