const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceTitle: {type : String},
  serviceProvider: { type: Number, require: true },
  serviceCost: { type: String, enum: ["cashThroughAgent", "card", "onilne"] },
  isActive: { type: String, enum: ["Completed", "pending"] },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      starRating: { type: Number, min: 1, max: 5 },
      review: { type: String },
    },
  ],
  discount : {type :Number},
  timeOfCompletion : {type : String},
  region : String,
  category : String,
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = { Service };
