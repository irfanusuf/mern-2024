import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate()

  const formData = {
    email,
    password,
  };

  const url = "http://localhost:4000/user/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, formData);

      console.log(response)
   
      if (response.data.message === "Logged in Succesfully") {

        localStorage.setItem("token" , response.data.token)
        localStorage.setItem("userId" , response.data.userId)
        props.setLoggedIn(true)

        // toast.success(response.data.message);

        navigate("/")

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


          <Link to="/user/forgotpass"> Forgot password?</Link>

          <button onClick={handleLogin}> Login </button>
        </form>
      </div>
    </>
  );
}

export default Login