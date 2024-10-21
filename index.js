const express = require("express"); // importing the framework from node modules
const bodyParser = require("body-parser");
const xhbs = require("express-handlebars");
const path = require("path");


const { connDb } = require("./config/connectDb"); //module import

const {
  handleRegister,
  handleLogin,
  handleUserDeletion,
  handleUserUpdation
} = require("./controllers/userController");

const {
  createProduct,
  handleProductUpdation,
  handleProductDeletion,
  getProducts,
} = require("./controllers/productController");
const multMid = require("./utils/multMid");

const app = express(); // inheritance
const port = 3000; // defining port

connDb()

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

//guest Route

app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Home | Robokids" });
});
app.get("/user/signUp", (req, res) => {
  res.render("signup", { pageTitle: " Robokids | Register" });
});
app.get("/user/login", (req, res) => {
  res.render("login", { pageTitle: " Robokids | Login" });
});

app.post("/user/signup", handleRegister); //user creation
app.post("/user/login", handleLogin); // login using the same account
app.post("/user/edit/:userId", handleUserUpdation); // put routes  used for  updation
app.get("/user/delete/:userId", handleUserDeletion); // delete Routes used for deletion

// product routes // admin

app.get("/product/create", (req, res) => {
  res.render("createProduct");
}); //page render
app.get("/products", getProducts); // render product page with products


app.post("/product/create",multMid, createProduct);


app.post("/product/edit/:productId", handleProductUpdation);
app.get("/product/delete/:productId", handleProductDeletion);

//starting server

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
