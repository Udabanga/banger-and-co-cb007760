import React, {useRef, useState} from "react";
import { useAuth } from "../AuthContext";
import { Alert } from "react-bootstrap"

export default function Register() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { register } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e){
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    await register(emailRef.current.value, passwordRef.current.value).then(res => {
      console.log(res)
      setSuccess("Account Created") 
    })
    .catch(err => {
      console.error(err)
      setError(err)
    })

    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h3>Register</h3>
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

// import React, { Component } from "react";
// import axios from "axios";
// import {useAuth} from "../AuthContext"

// export default class Register extends Component {
//   state = {
//     email: "",
//     password: "",
//   };

//   handleEmailChange = (event) => {
//     this.setState({ email: event.target.value });
//   };

//   handlePasswordChange = (event) => {
//     this.setState({ password: event.target.value });
//   };

//   handleRegister = (event) => {
//     event.preventDefault();

//     const data = {
//       email: this.state.email,
//       password: this.state.password,
//     };

//     axios
//       .post(`http://localhost:5000/register`, { email: this.state.email, password: this.state.password, withCredentials: true })
//       .then((res) => {
//         console.log(res);
//         console.log(res.data);
//       });
//   };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleRegister}>
//           <h3>Register</h3>

//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter email"
//               onChange={this.handleEmailChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter password"
//               onChange={this.handlePasswordChange}
//             />
//           </div>

//           <div className="form-group">
//             <div className="custom-control custom-checkbox">
//               <input
//                 type="checkbox"
//                 className="custom-control-input"
//                 id="customCheck1"
//               />
//               <label className="custom-control-label" htmlFor="customCheck1">
//                 Remember me
//               </label>
//             </div>
//           </div>

//           <button type="submit" className="btn btn-dark btn-lg btn-block">
//             Sign in
//           </button>
//           <p className="forgot-password text-right">
//             Forgot <a href="#">password?</a>
//           </p>
//         </form>
//       </div>
//     );
//   }
// }

// // import React, { useState } from "react";
// // import axios from "axios";

// // export default function Register() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const submitRegister = () => {
// //     axios({
// //       method: "post",
// //       data: {
// //         registerEmail: email,
// //         registerPassword: password,
// //       },
// //       withCredentials: true,
// //       url: "http://localhost:5000/register",
// //     }).then((res) => console.log(res));
// //   };

// //   return (
// //     <div>
// //       <form>
// //         <h3>Register</h3>

// //         <div className="form-group">
// //           <label>Email</label>
// //           <input
// //             type="email"
// //             className="form-control"
// //             placeholder="Enter email"
// //             onChange={(e) => setEmail(e.target.value)}
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label>Password</label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             placeholder="Enter password"
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //         </div>

// //         <div className="form-group">
// //           <div className="custom-control custom-checkbox">
// //             <input
// //               type="checkbox"
// //               className="custom-control-input"
// //               id="customCheck1"
// //             />
// //             <label className="custom-control-label" htmlFor="customCheck1">
// //               Remember me
// //             </label>
// //           </div>
// //         </div>

// //         <button
// //           type="submit"
// //           className="btn btn-dark btn-lg btn-block"
// //           onClick={submitRegister}
// //         >
// //           Sign in
// //         </button>
// //         <p className="forgot-password text-right">
// //           Forgot <a href="#">password?</a>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }