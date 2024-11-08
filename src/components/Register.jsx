import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

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

        
        navigate("/user/login")


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
      <ToastContainer 
        position="top-center"
      />

      <div className="register">
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

          <button onClick={handleRegister}> Register </button>
        </form>
      </div>
    </>
  );
};

export default Register;
