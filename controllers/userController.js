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

      res.status(201).redirect("/user/login");
    }
  } catch (error) {
    console.error("server Error :" + error);
    return res.render("signup", { errMessage: "Server Error!" });
  }
};

const handleLogin = async (req, res) => {
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
      return res.status(200).render("login", {
        successMessage: "Logged in succesFully!",
      });
    } else {
      return res.render("login", { errMessage: "PassWord Incorrect!" });
    }
  } catch (error) {
    console.error(error);
  }
};

const handleUserDeletion = async (req, res) => {
  try {
    const { userId } = req.params;

    // we will not delete the account we will just send it for deleteion and review
    const delUser = await User.findByIdAndDelete(userId);
    if (delUser) {
      res.status(200).render("success", {
        link: "/",
        message: "Your account will be deleted in 30 days of time!",
      });
    } else {
      res.render("error", { message: "SomeThing Went Wrong !" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

const handleUserUpdation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username } = req.body;

    const updateUsername = await User.findById(userId, {
      username,
    });

    if (updateUsername) {
      return res.render("success", {
        link: "/user/dashboard",
        message: "Username Updated Succesfully ",
      });
    } else {
      return res.render("error", {
        link: "user/dashboard",
        message: "Something Went Wrong , Try again after Sometime",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).render("error", {
      link: "/",
      message: "Server Error",
    });
  }
};

module.exports = { handleRegister, handleLogin, handleUserDeletion ,handleUserUpdation };
