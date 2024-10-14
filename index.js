const express = require("express"); // importing the framework from node modules
const bodyParser = require("body-parser")
const {getIndex, getLogin, getSignUp } = require("./controllers/getController");  // 
const { connDb } = require("./config/connectDb");    //module import 
const { handleRegister } = require("./controllers/userController");

const app = express(); // inheritance
const port = 3000   // defining port

connDb()

// engine set 
app.set("view engine", "hbs");


//middleware

app.use(bodyParser.urlencoded({extended :false}))  // relevant for post methods
app.use(express.json())


// get routes
app.get("/", getIndex);
app.get("/user/signUp" , getSignUp)
app.get("/user/login" , getLogin)


//post routes 

app.post("/user/signup" ,handleRegister)



app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
