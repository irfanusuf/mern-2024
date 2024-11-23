import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./Form.css";
import { FaLock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Context } from "../context/Store";

const DeleteUser = () => {
  const { handleDeleteUser } = useContext(Context);
  const [password, setPass] = useState("");
  const { userId } = useParams();

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="form-container">
          <div className="lock">
            <FaLock style={{ fontSize: "28px", color: " purple" }} />
          </div>

          <h3> Delete Your Account </h3>

          <span>
            Are u sure u want to delete your account if yes Kindly proceed with
            your password
          </span>

          <form>
            <input
              placeholder="Enter Your Password"
              value={password}
              type="password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />

            <button
              onClick={(e) => {
                handleDeleteUser(e , userId , password);
              }}
            >
            
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
