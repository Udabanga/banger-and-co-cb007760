import React, {useRef, useState} from "react";
import { useAuth } from "../AuthContext";
import { Alert } from "react-bootstrap"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e){
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    await login(emailRef.current.value, passwordRef.current.value).then(res => {
      console.log(res)
      setSuccess("Login Successful") 
    })
    .catch(err => {
      console.error(err)
      setError(err)
    })

    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        {error && <Alert variant="danger">{error.message}</Alert>}
        {success && <Alert variant="success ">{success}</Alert>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            ref={emailRef}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn btn-dark btn-lg btn-block">
          Sign in
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </div>
  );
}

