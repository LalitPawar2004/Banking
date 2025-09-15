const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add transaction

router.post("/", async (req, res) => {
  try {
    const { amount, type, description = "" } = req.body;
    const today = new Date();
    const date = today.getDate() + " " + today.toLocaleString("default", { month: "long" });

    const transaction = new Transaction({ amount, type, date, description });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
