
const express = require("express")    // import express from node modules
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const { registerHandler, loginHandler, forgotPassHandler, resetPassHandler, deleteUserHandler, getUser, changePasshandler } = require("./controllers/userController")   // import function from controllers
const { connectDb } = require("./config/connectDb")
const { isAuthorised } = require("./auth/isAuthorised")
const { isAuthenticated } = require("./auth/isAuthenticated")
const { createService, getAllservices, getServiceById, editServiceById } = require("./controllers/serviceControllers")
require('dotenv').config()
const app = express()
const PORT = process.env.PORT


connectDb()



//middle wares

app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())
app.use(cors({
    origin : true,
    credentials : true
}))
app.use(cookieParser())



// routes 
app.get("/" , (req,res)=>{ res.json({message : "hello from the server "})})  


app.get("/user/isAuth/:token" , isAuthorised)

// user routes

app.post("/user/register" , registerHandler)    // done 
app.post("/user/login" , loginHandler)     // done
app.post("/user/forgotPass"  , forgotPassHandler)     // done 
app.put("/user/password/reset/:userId" ,resetPassHandler)   // done

// secure user Routes
app.post("/user/delete" ,isAuthenticated, deleteUserHandler)    //done 
app.put("/user/changepassword" ,isAuthenticated, changePasshandler ) // done
app.get("/user/getuser" ,isAuthenticated, getUser) // done



// service Routes

app.post("/seller/create/service" , isAuthenticated ,createService)
app.get("/services/all" , isAuthenticated , getAllservices)
app.get("/service" , isAuthenticated , getServiceById)
app.put("/seller/edit/service" , isAuthenticated , editServiceById )


app.listen(PORT , ()=>{console.log(`server listening on port ${PORT}`)})