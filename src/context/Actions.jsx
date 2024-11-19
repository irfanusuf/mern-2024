import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import App from "../App";


export const Context = createContext()


const Actions = () => {
  const baseUrl = "https://www.robolox.onrender.com";


  const [store, setStore] = useState({
    loading: false,
    username: "john",
    email: "",
    userId: "",
  });

  const handleLogin = async (e, formData) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/user/login`;
      setStore((prev) => ({ ...prev, loading: true }));
      const response = await axios.post(url, formData);

      if (response.data.message === "Logged in Succesfully") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        // toast.success(response.data.message);

       
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error. Try again After Sometime!");
    } finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  const fetchData = async (userId) => {
    try {
      const url = `${baseUrl}/user/getUser/${userId}`;

      const response = await axios.get(url);

      setStore((prev) => ({
        ...prev,
        username: response.data.payload.username,
        email: response.data.payload.email,
      }));
    } catch (error) {
      console.log(error);
    }
  };


  const handleRegister = async (e , formData) => {
    e.preventDefault();
    const url = `${baseUrl}/user/register`
    try {
      const response = await axios.post(url, formData);

      if (response.data.message === "User created Succesfully!") {
        toast.success(response.data.message);

       
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error. Try again After Sometime!");
    }
  };


 return(
    <Context.Provider value={{...store ,handleLogin , fetchData , handleRegister}} >
             <App/>
    </Context.Provider>
  
 )


};

export default Actions;
