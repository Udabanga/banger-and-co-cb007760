// import React from "react";
// import { Navbar, Button, Nav } from "react-bootstrap";

// class NavBar extends React.Component {

//   render() {
//     return (
//       <Navbar
//         bg="light"
//         className="navbar shadow-sm p-3 mb-5 bg-white rounded"
//         expand
//       >
//         <Button variant="outline-info" onClick={this.props.toggle}>
//         </Button>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="ml-auto" navbar>
//             <Nav.Link href="#">page</Nav.Link>
//             <Nav.Link href="#">page</Nav.Link>
//             <Nav.Link href="#">page</Nav.Link>
//             <Nav.Link href="#">page</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     );
//   }
// }

// export default NavBar;

import React , { useContext } from 'react';
import { Navbar, Button, Nav } from "react-bootstrap";
import { GlobalAppContext } from "../../context";

const NavBar = () => {
  const { toggled, setToggled  } = useContext(
    GlobalAppContext
  );

  return (
    <Navbar
      bg="light"
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand
    >
      <Button
        variant="outline-info"
        onClick={() => setToggled(!toggled)}
      ></Button>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" navbar>
          <Nav.Link href="#">page</Nav.Link>
          <Nav.Link href="#">page</Nav.Link>
          <Nav.Link href="#">page</Nav.Link>
          <Nav.Link href="#">page</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
