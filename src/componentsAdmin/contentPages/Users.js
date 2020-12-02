import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import FormValidate from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../../services/user.service";

const Users = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [editID, setEditID] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editFName, setEditFName] = useState("");
  const [editLName, setEditLName] = useState("");

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    // const result = await axios.get("http://localhost:5000/api/users");
    const result = await UserService.getUserList();
    console.log(result);
    setUsers(result.data);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (id) => {
    axios
      .post("http://localhost:5000/api/users/find", { id: id })
      .then(function (response) {
        console.log(response);
        setEditID(id);
        setEditEmail(response.data.email);
        setEditFName(response.data.fName);
        setEditLName(response.data.lName);
      })
      .catch(function (error) {
        console.log(error);
      });

    handleShow();
  };

  const handleDelete = (id, email) => {};

  const handleUpdate = () => {
    if (checkBtn.current.context._errors.length === 0) {
      axios
        .put("http://localhost:5000/api/users/update", {
          id: editID,
          email: editEmail,
          fName: editFName,
          lName: editLName,
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

  const handleUpdate1 = (e) => {
    e.preventDefault();
    form.current.validateAll();
  };

  return (
    <div className="shadow-sm p-3 mb-5 bg-white rounded">
      <h1>Users</h1>

      <Table className="border thead-dark">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.fName}</td>
              <td>{user.lName}</td>
              <td>{user.roles[0].name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user.id)}>
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <FormValidate onSubmit={handleUpdate} ref={form}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
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

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </FormValidate>
      </Modal>
    </div>
  );
};

export default Users;
