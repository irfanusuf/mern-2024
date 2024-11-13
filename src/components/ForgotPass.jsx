import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPass = () => {
  const [email, setEmail] = useState("");



  const url = "http://localhost:4000/user/forgotPass";

  

  const handleForgotPass = async (e) => {
    try {

        e.preventDefault()

        const res = await axios.post(url , {email : email})

        if(res.status === 200){
            toast.success (res.data.message)
        }
        else {
            toast.error(res.data.message)
        }
     


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      ForgotPass
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
  );
};

export default ForgotPass;
