import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Banner from "../assets/Banner.jpg";
import LoginLogo from "../assets/Login-Logo.png";
import {
  Card,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

import AuthService from "../services/auth.service";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const { register, errors, handleSubmit, watch } = useForm({});
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    AuthService.login(data.email, data.password).then(
      () => {
        props.history.push("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  }

  return (
    <div>
      <img src={Banner} className="background-image" />
      <Card className="card-container">
        <img src={LoginLogo} alt="profile-img" className="card-title-img" />

        <Form noValidate onSubmit={handleSubmit(onSubmit)} ref={form}>
          <Form.Group>
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
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                ref={register({
                  required: "Enter Password"
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
          </Form.Group>
          <Button type="submit">Submit</Button>
          {/* <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div> */}

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
        </Form>
      </Card>
    </div>
  );
};

export default Login;
