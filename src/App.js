import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style.css";

import AuthService from "./services/auth.service";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserPage from "./pages/UserPage";
import ModeratorPage from "./pages/ModeratorPage";
import AdminPage from "./pages/AdminPage";
import NoMatch from "./pages/NoMatch";

import Navigation from "./components/Navigation";

import AdminRoute from "./route/AdminRoute";
import PublicRoute from "./route/PublicRoute";

const App = () => {
  // const [showModerator, setShowModerator] = useState(false);
  // const [showAdmin, setShowAdmin] = useState(false);
  // const [currentUser, setCurrentUser] = useState(undefined);

  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     setCurrentUser(user);
  //     setShowModerator(user.roles.includes("ROLE_MODERATOR"));
  //     setShowAdmin(user.roles.includes("ROLE_ADMIN"));
  //   }
  // }, []);

  // const logOut = () => {
  //   AuthService.logout();
  // };

  return (
    <div>
      <Switch>

        <PublicRoute exact path={["/", "/home"]} component={Home} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/profile" component={Profile} />
        <PublicRoute exact path="/user" component={UserPage} />
        <PublicRoute exact path="/mod" component={ModeratorPage} />

        <AdminRoute path="/admin" component={AdminPage} />

        <PublicRoute component={NoMatch} />
      </Switch>
    </div>
  );
};

export default App;
