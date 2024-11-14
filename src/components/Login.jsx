import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const formData = {
    email,
    password,
  };

  const url = "http://localhost:4000/user/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, formData);

      if (response.data.message === "Logged in Succesfully") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        props.setLoggedIn(true);

        // toast.success(response.data.message);

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error. Try again After Sometime!");
    }
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
              


            <button onClick={handleLogin}> Login </button>

              <p> Or </p>

              <Link to="/user/register"> Register with Us </Link>
          
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
