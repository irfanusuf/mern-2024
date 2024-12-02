import React, { useContext, useState } from "react";
import "./Form.css";
import {  ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { Context } from "../context/Store";

const Login = () => {

  const {handleLogin} = useContext(Context)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    email,
    password,
  };

  
  return (
    <>
      <ToastContainer position="top-center" />

      <div className="container">
        <div className="form-container">
          <div className="lock">
            <FaLock style={{ fontSize: "28px", color: " purple" }} />
          </div>

          <h3> Login to your Account </h3>

          <form>
            <input
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <span>
              Forgot your password? Click on the link.
            
              <Link to="/user/forgotpass"> Forgot password?</Link>
            </span>
              


            <button onClick={(e)=>{handleLogin(e , formData)}}> Login </button>

              <p> Or </p>

            <Link to="/user/register"> Register with Us </Link>
          
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
