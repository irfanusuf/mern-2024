const mongoose = require("mongoose");
const uri = "mongodb+srv://irfanusuf33:robolox@robolox.xnj0z.mongodb.net/Robo?retryWrites=true&w=majority&appName=robolox";

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected on Atlas");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDb };
