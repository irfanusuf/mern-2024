import React, { useContext, useState } from "react";

import "./Form.css";
import { FaLock } from "react-icons/fa";
import { Context } from "../context/Store";
import { ToastContainer } from "react-toastify";

const ForgotPass = () => {
  const { handleForgotPass } = useContext(Context);
  const [email, setEmail] = useState("");

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="form-container">
          <div className="lock">
            <FaLock style={{ fontSize: "28px", color: " purple" }} />
          </div>

          <h3> ForgotPass</h3>

          <span>
            {" "}
            Forgot your password? Kindly enter your email and we'll send you a
            reset link on your registered email
          </span>

          <form>
            <input
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <button
              onClick={(e) => {
                handleForgotPass(e, email);
              }}
            >
              {" "}
              Send Reset Link{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
