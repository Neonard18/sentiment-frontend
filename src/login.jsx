import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const getToken = async (body) => {
    try {
      const resp = await fetch('http://localhost:8000/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
  
      const data = await resp.json();
      props.setToken('token', data, { path: '/' });
    } catch (error) {
      setError('Invalid Email or Password')
      // You can display an error message to the user here or handle it as needed
    }
  };
  
  
  if (props.token.token && props.token.token['token']) window.location.href = '/dashboard'
  const errorStyle = {
    display: 'flex',
    justifyContent: 'center',
    color: '#FF6347',
    margin: '5px',
    fontWeight: 'bold',
    fontSize: '22px',
    transition: 'all 0.1s ease-in-out',
  }
  const spanStyle = {
    display : 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    margin: '10px'
  }
  return (
    <>
      <head>
        <title>Login</title>
      </head>
      <div className="login-body">
      <div className="login-form">
        <h1>Login!</h1>
        <p>Your new way to view sentiment analysis</p>

        
        <div className="register-form">
        {error? <p style={errorStyle}>{error}</p>:null}
          <label className="label-form" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="input-field"
            name="username"
            id="username"
            placeholder="Enter Email"
            onChange={(event) => {setUsername(event.target.value)}}
          />

          <label className="label-form m-t2" htmlFor="email">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="input-field"
            placeholder="Enter Password"
            onChange={(event) => {
              setPassword(event.target.value)}}
          />
          <button className="login-button"
            onClick={() => {
              getToken({username, password})
            }}>Login</button>
        </div>
        <span style={spanStyle}>Already have an account <button className="register" 
          onClick={() => {
            navigate("/register")
          }}>Click Here</button></span>
      </div>
      </div>
    </>
  );
}

export default Login;
