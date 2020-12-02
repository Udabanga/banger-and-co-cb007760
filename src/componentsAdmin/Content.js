import React, { useContext } from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./Navbar";
import { GlobalAppContext } from "./context";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Users from "./contentPages/Users";
import Vehicles from "./contentPages/Vehicles"
import Dasboard from "./contentPages/Dashboard";

const Content = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);
  return (
    <Container fluid className={classNames("content", { "is-open": toggled })}>
      <NavBar />
      <Switch>
          <Route path="/admin/users">
            <Users />
          </Route>
          <Route path="/admin/vehicles">
            <Vehicles />
          </Route>
          <Route path="/admin">
            <Dasboard />
          </Route>
          
        </Switch>
    </Container>
  );
};


export default Content;
