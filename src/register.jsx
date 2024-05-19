import React from "react";

function Register() {
  return (
    <div className="login-body">
      <div className="login-form">
        <h1>Welcome!</h1>
        <p>Your new way to view sentiment analysis</p>

        <form action="" className="register-form">
          <label className="label-form" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="input-field"
            name="username"
            id="username"
            placeholder="Enter Email"
          />

          <label className="label-form m-t2" htmlFor="email">
            Create Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="input-field"
            placeholder="Enter Password"
          />
          <button className="login-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
