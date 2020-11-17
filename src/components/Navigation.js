import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App";
import { Nav, Navbar } from "react-bootstrap";
import Logo from "../assets/Logo.png";

import AuthService from "../services/auth.service";

function Navigation() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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

          {showModeratorBoard && (
            <Nav.Item>
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </Nav.Item>
          )}

          {showAdminBoard && (
            <Nav.Item>
              <Link to={"/admin"} className="nav-link">
                Admin Board
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
            <Nav.Item>
              <Link to={"/profile"} className="nav-link">
                {currentUser.email}
              </Link>
            </Nav.Item>
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
