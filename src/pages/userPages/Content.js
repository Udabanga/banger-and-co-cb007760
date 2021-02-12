import React, { useContext } from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import { GlobalAppContext } from "./context";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Dasboard from "./contentPages/Dashboard";
import Bookings from "./contentPages/Bookings";

const Content = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);
  return (
    <Container fluid className={classNames("content", { "is-open": toggled })}>
      <Switch>
      <Route path="/user/bookings">
          <Bookings />
        </Route>
        <Route path="/user">
          <Dasboard />
        </Route>
      </Switch>
    </Container>
  );
};

export default Content;
