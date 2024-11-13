import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ResetPass = () => {
//   const [formData, setFormData] = useState({
   
//     confirmPass: "",
//     newPass: "",
   
//   });


  const [newPass , setNewPass] = useState("")

  const [confirmPass , setConfirmPass] = useState("")

  const {userId} = useParams();

const formData ={
    newPass , confirmPass
}



  const url = `http://localhost:4000/user/password/reset/${userId}`;

  const handleChangePass = async (e) => {
    try {
      e.preventDefault();


       console.log(formData)
      const res = await axios.put(url, formData);

     toast.success(res.data.message)

        
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <>
    
    <ToastContainer/>
    <div>
      ResetPass
      <form>
        <input
          placeholder="Enter Your New Password"
          value={newPass}
          onChange={(e) => {
            setNewPass(e.target.value );

          }}
          type="password"
        />
        <input
          placeholder="Confirm Your New Password"
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value );
          }}
          type="password"
        />
        |<button onClick={handleChangePass}> Change Password </button>
      </form>
    </div>
    </>
  );
};

export default ResetPass;
