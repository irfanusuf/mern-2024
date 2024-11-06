
const express = require("express")    // import express from node modules
const cors = require("cors")
const { registerHandler, loginHandler, forgotPassHandler, resetPassHandler, deleteUserHandler, getUser, changePasshandler } = require("./controllers/userController")   // import function from controllers
const { connectDb } = require("./config/connectDb")

const app = express()


connectDb()



//middle wares

app.use(express.json())
app.use(cors())





// routes 
app.get("/" , (req,res)=>{ res.json({message : "hello from the server "})})  


// user routes

app.post("/user/register" , registerHandler)
app.post("/user/login" , loginHandler)
app.post("/user/forgotPass"  , forgotPassHandler)
app.put("/user/password/reset/:userId" ,resetPassHandler)
app.delete("/user/delete/:userId" , deleteUserHandler)
app.put("/user/changepassword/:userId" , changePasshandler )



app.get("/user/getuser/:userId" , getUser)








app.listen(4000 , ()=>{console.log("server listening on port 4000")})