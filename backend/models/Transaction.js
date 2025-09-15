const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credited", "debited"], required: true },
  date: { type: String, required: true },
  description: { type: String, required: false, default: "" }
});

module.exports = mongoose.model("Transaction", transactionSchema);
