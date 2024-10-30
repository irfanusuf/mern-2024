
const express = require("express")    // import express from node modules
const { registerHandler, loginHandler, forgotPassHandler, resetPassHandler } = require("./controllers/userController")   // import function from controllers
const { connectDb } = require("./config/connectDb")

const app = express()


connectDb()



//middle wares

app.use(express.json())





// routes 
app.get("/" , (req,res)=>{ res.json({message : "hello from the server "})})  


// user routes

app.post("/user/register" , registerHandler)
app.post("/user/login" , loginHandler)
app.post("/user/forgotPass"  , forgotPassHandler)
app.post("/user/password/reset/:userId" ,resetPassHandler)








app.listen(4000 , ()=>{console.log("server listening on port 4000")})