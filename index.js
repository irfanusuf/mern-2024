const express = require("express"); // importing the framework from node modules
const {getIndex, getLogin, getSignUp } = require("./controllers/getController");  // 
const { connDb } = require("./config/connectDb");

const app = express(); // inheritance
const port = 3000   // defining port

connDb()

// engine set 
app.set("view engine", "hbs");


// get routes
app.get("/", getIndex);
app.get("/user/login" , getLogin)
app.get("/user/signUp" , getSignUp)



app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
