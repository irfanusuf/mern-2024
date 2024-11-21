const mongoose = require("mongoose");

const Seller = mongoose.model("Seller", {
  username: String,
  email: { type: String, required: true },
  password: String,
  reviews: [{ stars: { type: Number }, reviews: [{ reviewBody: String }] }],
  sellerDescription : String,
  profilePicUrl : String,
  phoneNumber: String,
  experince: String,
  specialization : String,
  category : String
});



module.exports = {Seller}