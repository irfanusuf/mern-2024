import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaInfo } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { LuContact } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { Context } from "../context/Store";

const Navbar = () => {
  const { username } = useContext(Context);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");


  const [showsideNav, setShowSideNav] = useState(false);
  
  function handleNav() {
    setShowSideNav(!showsideNav);
  }

  return (
    <div className="navbar">
      <ul>
        <li>
          {" "}
          <Link to="/"> Home </Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/about"> About </Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/contact"> Contact </Link>{" "}
        </li>
      </ul>

      <div className="menubar " onClick={handleNav}>
        <FaBars />

        {showsideNav && (
          <ul className="animate__animated animate__bounceInLeft">
            <li>
              <span>
                <FaHome /> <Link to="/"> Home </Link>{" "}
              </span>
            </li>
            <li>
              <span>
                {" "}
                <FaInfo /> <Link to="/about"> About </Link>{" "}
              </span>
            </li>

            <li>
              <span>
                <LuContact /> <Link to="/contact"> Contact </Link>{" "}
              </span>
            </li>

            <li>
              {username && (
                <span>
                  <LuContact /> <Link to="/contact"> User profile </Link>{" "}
                </span>
              )}
            </li>

            <li>
              {username && (
                <span>
                  <LuContact /> <Link to="/contact"> Settings </Link>{" "}
                </span>
              )}
            </li>

            <li>
              {username && (
                <span>
                  <LuContact /> <Link to="/contact"> Logout </Link>{" "}
                </span>
              )}
            </li>
          </ul>
        )}
      </div>







      <div className="userprofile">
        <p>
          {" "}
          {username ? (
            `Welcome ${username} `
          ) : (
            <button
              onClick={() => {
                navigate("/user/login");
              }}
            >
              {" "}
              Login
            </button>
          )}
        </p>

        <div onClick={handleNav} className="dropdown">
          <HiDotsVertical />

          {showsideNav && (
            <ul>
              <li> User profile</li>
              <li>Logout</li>
              <li> Settings </li>
              <li
                onClick={() => {
                  navigate(`/user/delete/${userId}`);
                }}
              >
                
                Delete my account
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
