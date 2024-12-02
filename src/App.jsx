import React, { useContext, useEffect } from "react";
import "./global.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPass from "./components/ForgotPass";
import NopageFound from "./components/NopageFound";
import ResetPass from "./components/ResetPass";
import DeleteUser from "./components/DeleteUser";
import SecureProfile from "./components/SecureProfile";
import { Context } from "./context/Store";
import UserProfile from "./components/UserProfile";

const App = () => {
  const { fetchData, loading } = useContext(Context);

  useEffect(() => { 
      fetchData();
  }, [loading,fetchData]);

  return (
    <>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="*" element={<NopageFound />} />
          <Route path="/" element={<Home />} />
          {/* //guest routes  */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/forgotpass" element={<ForgotPass />} />
          <Route path="/user/resetPass/:userId" element={<ResetPass />} />
          {/* secure routes */}
          <Route path="/user/delete" element={<DeleteUser />} />
          <Route path="/user/secureprofile" element={<SecureProfile />} />
          <Route path="/user/user-profile"  element={<UserProfile/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
