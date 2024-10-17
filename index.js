const express = require("express"); // importing the framework from node modules
const bodyParser = require("body-parser");
const xhbs = require("express-handlebars");
const path = require("path");
const {
  getIndex,
  getLogin,
  getSignUp,
} = require("./controllers/getController"); //
const { connDb } = require("./config/connectDb"); //module import
const {
  handleRegister,
  loginhandler,
} = require("./controllers/userController");

const app = express(); // inheritance
const port = 3000;     // defining port

// connDb()

// engine set
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));


//engine settings
app.engine(
  "hbs",
  xhbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);



//middleware

app.use(express.static(path.join(__dirname, "public"))); // serving static files
app.use(bodyParser.urlencoded({ extended: false })); // relevant for post methods
app.use(express.json());


// get routes
app.get("/", getIndex);
app.get("/user/signUp", getSignUp);
app.get("/user/login", getLogin);
app.get("/services" , (req,res)=>{ } )

//post routes

app.post("/user/signup", handleRegister);
app.post("/user/login", loginhandler);





//starting server 

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
