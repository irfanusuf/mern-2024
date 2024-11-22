const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  service: {
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  },
  orderCost: { type: Number, require: true },
  paymentMode: { type: String, enum: ["cashThroughAgent", "card", "onilne"] },
  status: { type: String, enum: ["Completed", "pending"] },
  customer: { userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
