import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formData = {
    username,
    email,
    password,
  };

  const url = "http://localhost:4000/user/register";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, formData);

      if (response.data.message === "User created Succesfully!") {
        toast.success(response.data.message);

        navigate("/user/login");
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

          <h3> Register with us </h3>

          <form>
            <input
              placeholder="Enter Username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
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
              Already have an account! Login here.
            
              <Link to="/user/login"> Login </Link>
            </span>

            <button onClick={handleRegister}> Register </button>
          
            <p>Notice: Read <Link> User Agreement and privacy policy</Link> before registering with us </p>

          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
