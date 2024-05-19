import React, { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState('')


  const getToken = async (username, password) => {
    try {
      const resp = await fetch('http://localhost:8000/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username':username,'password':password}),
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

  const createUser = async (email, password) => {
    try{
      let resp = await fetch('http://localhost:8000/api/user/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password})
        })

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`)
        }

        getToken(email,password)
        let data = await resp.json()
      }
      catch (error){
        setError(error.message)
    }
  }

  if (props.token.token && props.token.token['token']) window.location.href = '/dashboard'

  return (
    <div className="login-body">
      <div className="login-form">
        <h1>Welcome!</h1>
        <p>Your new way to view sentiment analysis</p>

        <div action="" className="register-form">
          <label className="label-form" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="input-field"
            name="username"
            id="username"
            placeholder="Enter Email"
            onChange={(event) => {setEmail(event.target.value)}}
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
            onChange={(event) => {setPassword(event.target.value)}}
          />
          <button className="login-button"
            onClick={() => {
              createUser(email,password)
            }}
          >Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
