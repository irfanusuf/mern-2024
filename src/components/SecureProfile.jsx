import React from "react";
import IsAuthorised from "../utils/IsAuthorised";

const SecureProfile = () => {
  IsAuthorised();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        This is secure page this should only open after a succesful login
      </h1>
    </div>
  );
};

export default SecureProfile;
