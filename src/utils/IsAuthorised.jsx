import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAuthorised = () => {
 
  const navigate = useNavigate();

  
//   const verifyToken = async (token) => {
  //  const url = `http://localhost:4000/user/isAuth`;
//     const res = await axios.post(url, token);
//     if (res.status === 200 && res.data.message === "Token verified") {
//       navigate("/");
//     } else {
//       navigate("/user/login");
//     }
//   };

  const verifyToken = async (token) => {
    // const baseUrl ="https://robolox.onrender.com"
    const baseUrl = "http:localhost/4000"

    const url = `${baseUrl}/user/isAuth/${token}`;
    const res = await axios.get(url);
    if (res.status === 200 && res.data.message === "Token verified") {
      navigate("/user/secureprofile");
    } else {
      navigate("/user/login");
    }
  };



  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
     return navigate("/user/login");
    } else {
        verifyToken(token)
    }
  }, [navigate ]);
};

export default IsAuthorised;
