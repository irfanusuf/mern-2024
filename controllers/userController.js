const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");


const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (username === "" || email === "" || password === "") {
      return res.render("signup", { errMessage: "All credentials Required" });
    }

    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      return res.render("signup", { errMessage: "Email Already Exists!" });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({ username, email, password: HashPassword });

    const updateUserCollection = await newUser.save();

    if (updateUserCollection) {
      //  res.render("signup", {
      //   successMessage: "User Created Succesfully!",
      // });

      res.redirect("/user/login")
    }
  } catch (error) {
    console.error("server Error :" + error);
    return res.render("signup", { errMessage: "Server Error!"});
   
  }
};




const loginhandler = async (req, res) => {
  try {
    const { email, password } = req.body;


 
    if (email === "" || password === "") {
      return res.render("login", { errMessage: "All credentials Required!" });
    }

    const checkExistingUser = await User.findOne({ email });


    
    if (!checkExistingUser) {
      return res.render("login", { errMessage: "User Not Found!" });
    }

    const verifyPass = await bcrypt.compare(
      password,
      checkExistingUser.password
    );

    if (verifyPass) {
      return res.render("login", {
        successMessageMessage: "Logged in succesFully!",
      });
    } else {
      return res.render("login", { errMessage: "PassWord Incorrect!" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = { handleRegister, loginhandler };
