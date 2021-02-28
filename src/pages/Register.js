import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import bsCustomFileInput from "bs-custom-file-input";
import Banner from "../assets/Banner.jpg";
import SignUpLogo from "../assets/Sign-Up-Logo.png";
import { Card, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const { register, errors, handleSubmit, watch } = useForm({});
  console.log(errors);
  const password = useRef({});
  password.current = watch("password", "");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [passwordNotSame, setPasswordNotSame] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    AuthService.register(
      data.email,
      data.password,
      data.fName,
      data.lName
    ).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        console.log(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div>
      <img src={Banner} className="background-image" />
      <Card className="card-container">
        <img src={SignUpLogo} alt="sign-up-img" className="card-title-img" />

        {!successful && (
          <Form
            noValidate
            // validated={validated}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                ref={register({
                  required: "Enter Email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid Email Format",
                  },
                })}
                name="email"
                type="email"
                // value={email}
                // onChange={onChangeEmail}
                isInvalid={errors.email}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}

              <Row>
                <Col>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      ref={register({
                        required: "Enter Password",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                      name="password"
                      type="password"
                      // value={password}
                      // onChange={onChangePassword}
                      isInvalid={errors.password}
                    />
                    <InputGroup.Prepend>
                      <Button variant="secondary">{eye}</Button>
                    </InputGroup.Prepend>

                    {errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password.message}
                      </Form.Control.Feedback>
                    )}
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    ref={register({
                      required: "Enter Confirm Password",
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                    name="passwordConfirm"
                    type="password"
                    isInvalid={errors.passwordConfirm}
                    // value={passwordConfirm}
                    // onChange={onChangePasswordConfirm}
                  />
                  {errors.passwordConfirm && (
                    <Form.Control.Feedback type="invalid">
                      {errors.passwordConfirm.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    ref={register({ required: "Enter First Name" })}
                    name="fName"
                    type="text"
                    isInvalid={errors.fName}
                    // value={fName}
                    // onChange={onChangeFName}
                  />
                  {errors.fName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.fName.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
                <Col>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    ref={register({ required: "Enter Last Name" })}
                    name="lName"
                    type="text"
                    isInvalid={errors.lName}
                    // value={lName}
                    // onChange={onChangeLName}
                  />
                  {errors.lName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.lName.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>

              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                ref={register({
                  required: "Enter Mobile Number",
                  minLength: 6,
                  maxLength: 12,
                })}
                name="mobileNumber"
                type="tel"
                defaultValue="+94"
                placeholder="+94"
                // value={email}
                // onChange={onChangeEmail}
                isInvalid={errors.mobileNumber}
              />
              {errors.mobileNumber && (
                <Form.Control.Feedback type="invalid">
                  {errors.mobileNumber.message}
                </Form.Control.Feedback>
              )}

              <br />
              <Form.Label>Driving License</Form.Label>
              <Form.File label="Image File" custom />
              <br />
              <br />
              <Form.Label>Identity Form</Form.Label>
              <Form.Text muted>
                Recent utility bill (within 3 months) or council tax statement
              </Form.Text>
              <Form.File label="Image File" custom />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        )}

        {message && (
          <Form>
            <Form.Group>
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </Form.Group>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Register;
