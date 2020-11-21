import React from "react";
import {Route} from "react-router-dom"
import Navigation from "../components/Navigation"

export default function PublicRoute({ component: Component, ...rest }) {
  return <Route {...rest} component={(props) => <div>
    <Navigation />
    <Component {...props} />
  </div>} />;
}
