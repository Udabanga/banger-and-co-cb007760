import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import "./App.css";
import "./style.css";

import AuthService from "./services/auth.service";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CarListing from "./pages/CarListing"
import Profile from "./pages/Profile";
import UserPage from "./pages/UserPage";
import EmployeePage from "./pages/EmployeePage";
import AdminPage from "./pages/AdminPage";
import Booking from './pages/SearchedVehicles'
import NoMatch from "./pages/NoMatch";

import Navigation from "./components/Navigation";

import AdminRoute from "./route/AdminRoute";
import PublicRoute from "./route/PublicRoute";

const App = () => {

  return (
    <>
      <Switch>

        <PublicRoute exact path={["/", "/home"]} component={Home} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/profile" component={Profile} />
        <PublicRoute path="/user" component={UserPage} />
        {/* Employee table */}
        {/* <PublicRoute exact path="/employee" component={AdminPage} /> */}
        <PublicRoute exact path="/carListing" component={CarListing} />
        <PublicRoute exact path="/booking" component={Booking} />


        <AdminRoute exact path="/employee" component={AdminPage} />
        <AdminRoute path="/admin" component={AdminPage} />

        <PublicRoute component={NoMatch} />
      </Switch>
    </>
  );
};

export default App;
