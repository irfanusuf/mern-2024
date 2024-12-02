import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Store";



const IsAuthorised = () => {
  const navigate = useNavigate();

  const {verifyToken} = useContext(Context)

  useEffect(() => {
    (async () => {
      const auth = await verifyToken();
      if (!auth) {
       return navigate("/user/login");
      }
    })();
  }, [verifyToken, navigate]);
};

export default IsAuthorised;
