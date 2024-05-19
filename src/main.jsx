import React from 'react'
import Login from "./login.jsx";
import App from "./App.jsx";
import Register from "./register.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Main = () => {
    const [token, setToken, removeToken] = useCookies(['token'])
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login token={token} setToken={setToken} removeToken={removeToken}/>,
        },
        {
            path: "/dashboard",
            element: <App token={token} setToken={setToken} removeToken={removeToken}/>,
        },
        {
            path: "/register",
            element: <Register token={token} setToken={setToken} removeToken={removeToken}/>,
        },
    ])
  return (
        <RouterProvider router={router} />
  )
}

export default Main