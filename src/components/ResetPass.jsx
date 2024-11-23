import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Form.css";
import { FaLock } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { Context } from "../context/Store";

const ResetPass = () => {

const  {handleResetPass} = useContext(Context)

  const [formData, setFormData] = useState({ newPass: "", confirmPass: "" });

  const { userId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({ ...prevInput, [name]: value }));
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="form-container">
          <div className="lock">
            <FaLock style={{ fontSize: "28px", color: " purple" }} />
          </div>

          <h3> Reset Your Password </h3>

          <span>
            <Link to="/user/forgotpass"> Forgot your password? </Link> Kindly
            enter new password which u haven't use from last 6 months
          </span>

          <form>
            <input
              placeholder="Enter Your New Password"
              value={formData.newPass}
              name="newPass"
              onChange={handleChange}
              type="password"
            />
            <input
              placeholder="Confirm Your New Password"
              value={formData.confirmPass}
              name="confirmPass"
              onChange={handleChange}
              type="password"
            />

            <p>
              
              Use atleast 8 characters, one uppercase and special character for
              the password
            </p>

            <button onClick={(e)=>{handleResetPass(e , userId ,formData)}}> Change Password </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
