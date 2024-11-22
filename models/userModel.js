const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  profilepicUrl: { type: String },
  orders: [
    { order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" } },
  ],
  role: {
    type: String,
    enum: ["admin", "customer", "service provider"],
    default: "customer",
  },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      starRating: { type: Number, min: 1, max: 5 },
      review: { type: String },
    },
  ],
  serviceCategory: String,
  bio: String,
  location: { latitude: String, longitudes: String },
  mobile: String,
  experience: String,
  specialization: String,
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});





const User = mongoose.model("User" , userSchema)

module.exports = { User };
