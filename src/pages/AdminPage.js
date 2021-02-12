import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Sidebar from "./adminPages/Sidebar";
import Content from "./adminPages/Content";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalAppContext } from "./adminPages/context";
import "../styleAdminPage.css";

const AdminPage = () => {
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [toggled, setToggled] = useState(true);

  useEffect(() => {
    UserService.getAdminPage().then(
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

  if (content === "Admin Content.") {
    return (
      <body class="admin-page">
        <Router>
          <GlobalAppContext.Provider value={{ toggled, setToggled }}>
            <div className="App wrapper">
              <Sidebar isOpen={isOpen} className={style} />
              <Content isOpen={isOpen} className={style} />
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

export default AdminPage;
