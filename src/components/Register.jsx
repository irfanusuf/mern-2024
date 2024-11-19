import React, { useContext, useState } from "react";
import "./Form.css";
import { ToastContainer } from "react-toastify";
import { Link} from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { Context } from "../context/Store";

const Register = () => {
  const {handleRegister} = useContext(Context)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const formData = {
    username,
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

            <button onClick={(e)=>{handleRegister(e ,formData)}}> Register </button>
          
            <p>Notice: Read <Link> User Agreement and privacy policy</Link> before registering with us </p>

          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
