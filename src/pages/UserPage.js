// import React, { useState, useEffect } from "react";

// import UserService from "../services/user.service";

// const UserPage = () => {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     UserService.getUserPage().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setContent(_content);
//       }
//     );
//   }, []);

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>{content}</h3>
//       </header>
//     </div>
//   );
// };

// export default UserPage;

import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Sidebar from "./userPages/Sidebar";
import Content from "./userPages/Content";
import {  BrowserRouter as Router } from 'react-router-dom';
import { GlobalAppContext } from "./userPages/context";
import "../styleUserPage.css";

const UserPage = () => {
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [toggled, setToggled] = useState(true);

  useEffect(() => {
    UserService.getUserPage().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);


  let style = toggled ? "isOpen" : "";

  if (content === "User Content.") {
    return (
      <body class="user-page">
      <Router>
        <GlobalAppContext.Provider value={{toggled, setToggled}}>
          <div className="App wrapper">
            <Sidebar isOpen={isOpen} className={style}/>
            <Content isOpen={isOpen} className={style}/>
          </div>
        </GlobalAppContext.Provider>
        </Router>
      </body>
    );
  } else {
    return (
      <>
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </>
    );
  }
};

export default UserPage;

