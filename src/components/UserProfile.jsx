import React, { useContext, useState } from "react";
import "./UserProfile.css";
import { Context } from "../context/Store";
import IsAuthorised from "../utils/IsAuthorised";



const UserProfile = () => {


  IsAuthorised()

  const { user  , uploadProfileImage} = useContext(Context);

  const [image, setImage] = useState(null);

  const formData = new FormData()     // empty arrray

  formData.append("image" , image)

  const handleImage = (e)=>{
    setImage(e.target.files[0])
  }

  const handleUpload = (formData)=>{

    uploadProfileImage(formData)
    setImage(null)

  }




  return (

  
    <div className="main-Container">
      <div className="profile-container">
        This profile belongs to {user.username}



        <img src= {user.profilepicUrl} alt={user.username}  width={200}/>


        <h2>  user is having services {user.services && user.services[0].serviceTitle}</h2>



        <input
          type="file"
          multiple
          placeholder="Upload your profile "
          onChange={(e)=>{handleImage(e)}}
        />
        <button type="button" onClick={()=>{handleUpload(formData)}}> Upload </button>




      </div>
    </div>
  
  );
};

export default UserProfile;
