import React, { createContext, useEffect, useState } from "react";
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
import ForgotPass from "./components/ForgotPass";
import NopageFound from "./components/NopageFound";
import ResetPass from "./components/ResetPass";
import DeleteUser from "./components/DeleteUser";
import SecureProfile from "./components/SecureProfile";


export const MyContext = createContext()

const App = () => {
  const [username, setUsername] = useState("");
  const [email , setEmail] =useState("")
  const [loggedIn , SetLoggedIn] = useState(false)

  const userId = localStorage.getItem("userId");


 


  const fetchData = async (userId) => {
    try {
      const url = `http://localhost:4000/user/getUser/${userId}`;

      const response = await axios.get(url);

      console.log(response);
      
      setUsername(response.data.payload.username);
      setEmail(response.data.payload.email)
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


            <Route path="*" element = {<NopageFound/>}  />
            <Route path="/" element={
              
              <MyContext.Provider value={username}>
                  <Home user={username} email = {email} />

              </MyContext.Provider>
              
              } />

              {/* //guest routes  */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login setLoggedIn = {SetLoggedIn} />} />
            <Route path="/user/forgotpass" element={<ForgotPass/>}/> 
            <Route path="/user/resetPass/:userId" element={<ResetPass/>} />


            {/* secure routes */}
            <Route path="/user/delete/:userId" element={<DeleteUser/>} />
            <Route path="/user/secureprofile" element={<SecureProfile/>} />





          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
