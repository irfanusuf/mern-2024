import React, { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import App from "../App";
import api from "../utils/Axiosinstance";

export const Context = createContext();

const Store = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState({
    loading: false,
    username: "",
    email: "",
    user: {},
  });


  const verifyToken = useCallback(async () => {

    try {
      const res = await api.get("/user/isAuth");
      if (res.status === 200 ) {  
          return true
        }
        else{
          return false
        }
    } catch (error) {
      console.log(error)

    }
   
  } , []) ;



  const fetchData = useCallback(async () => {
    try {
      const response = await api.get("/user/getUser");

      setStore((prev) => ({
        ...prev,
        username: response.data.payload.username,
        email: response.data.payload.email,
        user: response.data.payload,
      }));
    } catch (error) {
      console.log(error);
    }
  }, []);


  

  const handleRegister = async (e, formData) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/register", formData);

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

  const handleLogin = async (e, formData) => {
    e.preventDefault();
    try {
      setStore((prev) => ({ ...prev, loading: true }));
      const response = await api.post("/user/login", formData);

      if (response.data.message === "Logged in Succesfully") {
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("userId", response.data.userId);
        // toast.success(response.data.message);

        navigate("/");
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

  const handleForgotPass = async (e, email) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/forgotPass", { email: email });

      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPass = async (e, userId, formData) => {
    e.preventDefault();

    try {
      const res = await api.put(`/user/password/reset/${userId}`, formData);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 500) {
        toast.error("Server Error");
      } else if (error.response.status === 400) {
        toast.error("Bad Request");
      }
    }
  };

  const handleDeleteUser = async (e, password) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/delete", { password: password });

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadProfileImage = async (formData) => {
    try {
      const res = await api.post("/user/upload/profile", formData);
      if ((res.status = 200)) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
    }
  };

  return (
    <Context.Provider
      value={{
        ...store,
        verifyToken,
        handleRegister,
        handleLogin,
        fetchData,
        handleForgotPass,
        handleResetPass,
        handleDeleteUser,
        uploadProfileImage,
      }}
    >
      <App />
    </Context.Provider>
  );
};

export default Store;
