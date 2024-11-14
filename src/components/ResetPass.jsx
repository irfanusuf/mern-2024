import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Form.css";
import { FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const ResetPass = () => {
  const [formData, setFormData] = useState({ newPass: "", confirmPass: "" });

  const { userId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const url = `http://localhost:4000/user/password/reset/${userId}`;

  const handleChangePass = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(url, formData);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 500) {
        toast.error("Server Error");
      }else if(error.response.status === 400){
        toast.error("Bad Request");
      }
    }
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

            <button onClick={handleChangePass}> Change Password </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
