import React, { useEffect, useState } from "react";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import axios from "axios";
import Login from "./components/Login";

const App = () => {
  const [username, setUsername] = useState("");
  const [loggedIn , SetLoggedIn] = useState(false)
  const userId = localStorage.getItem("userId");

  const fetchData = async (userId) => {
    try {
      const url = `http://localhost:4000/user/getUser/${userId}`;

      const response = await axios.get(url);

      console.log(response);

      setUsername(response.data.payload.username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(userId);
  }, [userId , loggedIn]);

  return (
    <>
      <BrowserRouter>
        <Navbar user={username} />

        <div className="main">
          <Routes>
            <Route path="/" element={<Home user={username} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login setLoggedIn = {SetLoggedIn} />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
