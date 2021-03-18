import React from "react";
import { Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => (
        <>
          <Navigation />
          <Component {...props} />
          {/* <Footer /> */}
        </>
      )}
    />
  );
}
