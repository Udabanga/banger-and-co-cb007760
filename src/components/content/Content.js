// import React from "react";
// import classNames from "classnames";
// import { Container } from "react-bootstrap";
// import NavBar from "./Navbar";

// class Content extends React.Component {
//   render() {
//     return (
//       <Container
//         fluid
//         className={classNames("content", { "is-open": true })}
//       >
//         <NavBar/>
//         <h1>Test</h1>
//       </Container>
//     );
//   }
// }

// export default Content;

import React, {useContext} from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./Navbar";
import { GlobalAppContext } from "../../context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Content = () => {
  const { toggled, setToggled  } = useContext(
    GlobalAppContext
  );
  return (
    <Container fluid className={classNames("content", { "is-open": toggled })}>
      <NavBar />
      <h1>Test</h1>
      <Switch>
        <Route />
        <Route />
      </Switch>
    </Container>
  );
};

export default Content;
