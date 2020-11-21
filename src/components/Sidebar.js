// import React from "react";
// import SubMenu from "./SubMenu";
// import { Nav, Button } from "react-bootstrap";
// import classNames from "classnames";
// import { GlobalAppContext } from '../context';

// class Sidebar extends React.Component {
//   render() {
//     return (
//       <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
//         <div className="sidebar-header">
//           <Button
//             variant="link"
//             onClick={this.props.toggle}
//             style={{ color: "#fff" }}
//             className="mt-4"
//           >
//           </Button>
//           <h3>react-bootstrap sidebar</h3>
//         </div>

//         <Nav className="flex-column pt-2">
//           <p className="ml-3">Heading</p>

//           <Nav.Item className="active">
//             <Nav.Link href="/">
//               Home
//             </Nav.Link>
//           </Nav.Item>

//           <SubMenu
//             title="Pages"
//             items={["Link", "Link2", "Active"]}
//           />

//           <Nav.Item>
//             <Nav.Link href="/">
//               About
//             </Nav.Link>
//           </Nav.Item>

//           <Nav.Item>
//             <Nav.Link href="/">
//               Portfolio
//             </Nav.Link>
//           </Nav.Item>

//           <Nav.Item>
//             <Nav.Link href="/">
//               FAQ
//             </Nav.Link>
//           </Nav.Item>

//           <Nav.Item>
//             <Nav.Link href="/">
//               Contact
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </div>
//     );
//   }
// }

// export default Sidebar;

import React, { useContext } from "react";
import SubMenu from "./SubMenu";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { GlobalAppContext } from "../context";

const Sidebar = () => {
  const { toggled, setToggled } = useContext(GlobalAppContext);
  return (
    <div className={classNames("sidebar", { "is-open": toggled })}>
      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={toggled}
          style={{ color: "#fff" }}
          className="mt-4"
        ></Button>
        <h3>react-bootstrap sidebar</h3>
      </div>

      <Nav className="flex-column pt-2">
        <p className="ml-3">Heading</p>

        <Nav.Item className="active">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>

        <SubMenu title="Pages" items={["Link", "Link2", "Active"]} />

        <Nav.Item>
          <Nav.Link href="/">About</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/">Portfolio</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/">FAQ</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/">Contact</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
