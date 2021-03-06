import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuthService from "../../../services/auth.service";
import { Table, Button, ButtonGroup, Modal, Form } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import FormValidate from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import UserService from "../../../services/user.service";

const Users = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [showEmployee, setShowEmployee] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showDriversLicence, setShowDriversLicence] = useState(false);
  const [editID, setEditID] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editFName, setEditFName] = useState("");
  const [editLName, setEditLName] = useState("");
  const [editNICNumber, setEditNICNumber] = useState("");
  const [editDrivingLicenceNumber, setEditDrivingLicenceNumber] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [imageDriversLicence, setImageDriversLicence] = useState("");
  const [imageIdentityForm, setImageIdentityForm] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [tableView, setTableView] = useState("Active");
  const [modalTitleImage, setModalTitleImage] = useState("")
  const [modalTitle, setModalTitle] = useState("")


  const { SearchBar, ClearSearchButton } = Search;

  const actionButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <Button variant="warning" onClick={() => handleEditModal(row.id)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button variant="danger">
          <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(row.id)} />
        </Button>
      </div>
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "#",
      headerStyle: { width: "80px" },
    },
    {
      dataField: "email",
      text: "Email",
      filter: textFilter(),
    },
    {
      dataField: "fName",
      text: "First Name",
      filter: textFilter(),
    },
    {
      dataField: "lName",
      text: "Last Name",
      filter: textFilter(),
    },
    { dataField: "roles[0].name", text: "Role" },
    {
      dataField: "actions",
      text: "Actions",
      headerStyle: { width: "150px" },
      formatter: actionButtons,
    },
  ];

  useEffect(() => {
    getUserList();
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowEmployee(user.roles.includes("ROLE_EMPLOYEE"));
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const getUserList = async () => {
    // const result = await axios.get("http://localhost:5000/api/users");
    const result = await UserService.getUserList();
    console.log(result);
    setUsers(result.data);
  };

  const handleViewDrivingLicenceModal = () => {
    setPreviewImage(imageDriversLicence)
    setModalTitleImage("Driving Licence")
    setShowDriversLicence(true);
  }

  const handleViewIdentityFormModal = () => {
    setPreviewImage(imageIdentityForm)
    setModalTitleImage("Identity Form")
    setShowDriversLicence(true);
  }

  const handleCloseDriversLicence = () => setShowDriversLicence(false);

  const handleClose = () => {
    setEditID("");
    setEditEmail("");
    setEditFName("");
    setEditLName("");
    setEditNICNumber("");
    setEditDrivingLicenceNumber("");
    setEditStatus("")
    setImageDriversLicence("");
    setImageIdentityForm("");
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const handleEditModal = (id) => {
    axios
      .post("http://localhost:5000/api/users/find", { id: id })
      .then(function (response) {
        console.log(response);
        setEditID(id);
        setEditEmail(response.data.email);
        setEditFName(response.data.fName);
        setEditLName(response.data.lName);
        setEditNICNumber(response.data.NICNumber);
        setEditDrivingLicenceNumber(response.data.drivingLicenceNumber);
        setEditStatus(response.data.status)
        setImageDriversLicence("http://localhost:5000/uploads/" + response.data.drivingLicence);
        setImageIdentityForm("http://localhost:5000/uploads/" + response.data.identityForm);
      })
      .catch(function (error) {
        console.log(error);
      });

    handleShow();
  };

  const handleAddModal = () => {
    setModalTitle("Add User");
    handleShow();
  };


  const handleAdd = () => {
    if (checkBtn.current.context._errors.length === 0) {
      axios
        .post("http://localhost:5000/api/auth/register", {
          email: editEmail,
          fName: editFName,
          lName: editLName,
          NICNumber: editNICNumber,
          drivingLicenceNumber: editDrivingLicenceNumber,
        })
        .then(function (response) {
          console.log(response);
          getUserList();
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // let formData = new FormData();
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // formData.append("fName", data.fName);
    // formData.append("lName", data.lName);
    // formData.append("NICNumber", data.NICNumber);
    // formData.append("drivingLicenceNumber", data.drivingLicenceNumber);
    // formData.append("drivingLicence", data.drivingLicence[0]);
    // formData.append("identityForm", data.identityForm[0]);
    // // formData.append("identityForm", data.file[1][0]);
    // axios
    //   .post("http://localhost:5000/api/auth/register", formData)
    //   .then(function (response) {
    //     console.log(response);
    //     setMessage(response.data.message);
    //     setSuccessful(true);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     if(error.message == 'Request failed with status code 400'){
    //       setMessage("Failed! Email is already in use!");
    //     }
    //     else{
    //       setMessage(error.message);
    //     }
    //     setSuccessful(false);
    //   });
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/api/users/delete", { data: { id: id } })
      .then(function (response) {
        console.log(response);
        getUserList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    if (checkBtn.current.context._errors.length === 0) {
      axios
        .put("http://localhost:5000/api/users/update", {
          id: editID,
          email: editEmail,
          fName: editFName,
          lName: editLName,
          NICNumber: editNICNumber,
          drivingLicenceNumber: editDrivingLicenceNumber,
        })
        .then(function (response) {
          console.log(response);
          getUserList();
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEditEmail(email);
  };

  const onChangeFName = (e) => {
    const fName = e.target.value;
    setEditFName(fName);
  };

  const onChangeLName = (e) => {
    const lName = e.target.value;
    setEditLName(lName);
  };

  const onChangeNICNumber = (e) => {
    const NICNumber = e.target.value;
    setEditNICNumber(NICNumber);
  };

  const onChangeDrivingLicenceNumber = (e) => {
    const drivingLicenceNumber = e.target.value;
    setEditDrivingLicenceNumber(drivingLicenceNumber);
  };

  const onChangeStatus = (e) => {
    const status = e.target.value;
    setEditStatus(status);
  };


  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <div className="row">
        <div className="col">
          <h1>Users</h1>
        </div>
        <div className="col">
          <Button className="admin-add-button" onClick={handleAddModal}>Add User</Button>
        </div>
      </div>
      <ButtonGroup aria-label="Basic example">
        <Button
          onClick={() => setTableView("Active")}
          active={tableView === "Active"}
          variant="secondary"
        >
          Active
        </Button>
        <Button
          onClick={() => setTableView("Pending")}
          active={tableView === "Pending"}
          variant="secondary"
        >
          Pending
        </Button>
        <Button
          onClick={() => setTableView("Blacklist")}
          active={tableView === "Blacklist"}
          variant="secondary"
        >
          Blacklist
        </Button>
        <Button
          onClick={() => setTableView("Deleted")}
          active={tableView === "Deleted"}
          variant="secondary"
        >
          Deleted
        </Button>
      </ButtonGroup>
      {/* <ToolkitProvider
        keyField="id"
        data={users}
        columns={columns}
        paginationFactory={paginationFactory()}
        search
      >
        {(props) => (
          <div>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable
              keyField="id"
              data={users}
              columns={columns}
              pagination={paginationFactory()}
            />
          </div>
        )}
      </ToolkitProvider> */}

      <BootstrapTable
        keyField="id"
        data={users}
        columns={columns}
        pagination={paginationFactory()}
        filter={filterFactory()}
      />

      <Modal show={show} onHide={handleClose}>
        <FormValidate onSubmit={handleUpdate} ref={form}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Input
                class="form-control"
                type="email"
                value={editEmail}
                onChange={onChangeEmail}
                disabled
              ></Input>
            </Form.Group>
            <Form.Group controlId="formFName">
              <Form.Label>First Name:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editFName}
                onChange={onChangeFName}
              ></Input>
            </Form.Group>
            <Form.Group controlId="formLName">
              <Form.Label>Last Name:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editLName}
                onChange={onChangeLName}
              ></Input>
            </Form.Group>
            <Form.Group controlId="NIC">
              <Form.Label>NIC Number:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editNICNumber}
                onChange={onChangeNICNumber}
              ></Input>
            </Form.Group>
            <Form.Group controlId="drivingLicenceNumber">
              <Form.Label>Driving Licence Number:</Form.Label>
              <Input
                class="form-control"
                type="text"
                value={editDrivingLicenceNumber}
                onChange={onChangeDrivingLicenceNumber}
              ></Input>
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status:</Form.Label>
              <Form.Control value={editStatus} onChange={onChangeStatus} as="select">
                <option>Not Insured</option>
                <option>Insured</option>
                <option>Blacklist</option>
                <option>Suspended</option>
              </Form.Control>
            </Form.Group>
            <Button
              onClick={handleViewDrivingLicenceModal}
              disabled={imageDriversLicence === ""}
              variant="info"
            >
              Driver's Licence
            </Button>{" "}
            <Button
              onClick={handleViewIdentityFormModal}
              disabled={imageIdentityForm === ""}
              variant="info"
            >Identity Form</Button>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {modalTitle === "Edit User" && (
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            )}
            {modalTitle === "Add User" && (
              <Button variant="primary" onClick={handleAdd}>
                Add User
              </Button>
            )}
          </Modal.Footer>
        </FormValidate>
      </Modal>

      <Modal
        size="lg"
        show={showDriversLicence}
        onHide={handleCloseDriversLicence}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitleImage}</Modal.Title>
        </Modal.Header>
        <img
          src={previewImage}
          alt={modalTitleImage}
        />
      </Modal>
    </div>
  );
};

export default Users;
