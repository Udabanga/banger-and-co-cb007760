import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
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
          {/* <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/CarListing">Car Listing</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Register">Register</Nav.Link>
          </Nav.Item> */}

          <Nav.Item>
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to={"/CarListing"} className="nav-link">
              Car Listing
            </Link>
          </Nav.Item>

          {showModerator && (
            <Nav.Item>
              <Link to={"/mod"} className="nav-link">
                Moderator Page
              </Link>
            </Nav.Item>
          )}

          {showAdmin && (
            <Nav.Item>
              <Link to={"/admin"} className="nav-link">
                Admin Page
              </Link>
            </Nav.Item>
          )}

          {currentUser && (
            <Nav.Item>
              <Link to={"/user"} className="nav-link">
                User
              </Link>
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
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </Nav.Item>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
