const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order"  },
  paymentAmount: { type: Number, require: true },
  paymentStatus: { type: String, enum: ["completed", "pending" , "refunded"] },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: "User"  },
  reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User"  },
  paymentOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = { Payment };
