import React from "react";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";

const App = () => {

  const username  = "Irfan yousuf"





  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div className="main">
        <Routes>
            <Route path="/" element={<Home user = {username}/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>}/> 
            <Route path = "/user/register" element = {<Register/>}/>
        </Routes>

        </div>
       

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
