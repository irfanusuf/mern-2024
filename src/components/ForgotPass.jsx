import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Form.css";
import { FaLock } from "react-icons/fa";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const url = "http://localhost:4000/user/forgotPass";

  const handleForgotPass = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(url, { email: email });

      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <div className="form-container">
      <div className="lock">
          
          <FaLock style={{ fontSize: "28px", color: " purple" }} />
        </div>

      <h3>  ForgotPass</h3>

      <span> Forgot your password? 
        Kindly enter your email and we'll send
        you a reset link on your registered email
        
      </span>
     
      <form>
        <input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button onClick={handleForgotPass}> Send Reset Link </button>
      </form>
    </div>
    </div>
  );
};

export default ForgotPass;
