import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./Form.css";
import { FaLock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const DeleteUser = () => {
  const [password, setPass] = useState("");
  const {userId} =useParams()
  const url = `http://localhost:4000/user/delete/${userId}`;

  const navigate = useNavigate()

  const handleDeleteUser = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(url, { password: password });

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.clear()
        navigate("/")

      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (

<>



<ToastContainer/>
    <div className="container">

      <div className="form-container">
      <div className="lock">
          
          <FaLock style={{ fontSize: "28px", color: " purple" }} />
        </div>

      <h3>  Delete Your Account </h3>

      <span> Are u sure u want to delete your account
        if yes  Kindly proceed with your password
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

        <button onClick={handleDeleteUser}> Delete </button>
      </form>
    </div>
    </div>
    </>
  );
};

export default DeleteUser;
