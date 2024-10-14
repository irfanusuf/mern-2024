const { User } = require("../models/userModel");
const bcrypt = require("bcrypt")

const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(req.body)


     //validation 
    if (username === "" || email === "" || password === "") {
      return res.render("signup", { errMessage: "All credentials Required" });
    }

    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      return res.render("signup", { errMessage: "Email Already Exists!" });
    }

    const HashPassword = await bcrypt.hash(password , 10)

    const newUser = await new User({ username, email, password : HashPassword });

    const updateUserCollection = await newUser.save();

    if (updateUserCollection) {
      return res.render("signup", {
        successMessage: "User Created Succesfully!",
      });
    }
  } catch (error) {
    console.error("server Error :" + error);
  }
};

module.exports = { handleRegister };
