const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: { orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" } },
  paymentAmount: { type: Number, require: true },
  status: { type: String, enum: ["Completed", "pending"] },
  payer: { userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
  reciever: { userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
  paymentOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
