
const express = require("express")    // import express from node modules
const cors = require("cors")
const { registerHandler, loginHandler, forgotPassHandler, resetPassHandler, deleteUserHandler, getUser, changePasshandler } = require("./controllers/userController")   // import function from controllers
const { connectDb } = require("./config/connectDb")
const { isAuthorised } = require("./auth/isAuthorised")
require('dotenv').config()
const app = express()
const PORT = process.env.PORT


connectDb()



//middle wares

app.use(express.json())
app.use(cors())





// routes 
app.get("/" , (req,res)=>{ res.json({message : "hello from the server "})})  


// user routes

app.post("/user/register" , registerHandler)    // done 
app.post("/user/login" , loginHandler)     // done
app.post("/user/forgotPass"  , forgotPassHandler)     // done 
app.put("/user/password/reset/:userId" ,resetPassHandler)   // done
app.post("/user/delete/:userId" , deleteUserHandler)    //done 
app.put("/user/changepassword/:userId" , changePasshandler ) // done


app.get("/user/getuser/:userId" , getUser) // done


app.get("/user/isAuth/:token" , isAuthorised)







app.listen(PORT , ()=>{console.log(`server listening on port ${PORT}`)})