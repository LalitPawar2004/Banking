import React, { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";


export default function AdminDashboard({ onLogout, showNotification }) {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("credited");
  const [description, setDescription] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(API_URL);
      let data = await res.json();
      // Sort transactions: newest first (assuming date is string, fallback to _id)
      data = Array.isArray(data)
        ? data.sort((a, b) => {
            // Try to sort by date if possible, else by _id
            const da = new Date(a.date);
            const db = new Date(b.date);
            return db - da;
          })
        : [];
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      showNotification("Error fetching transactions", "error");
    }
  };

  const handleAddTransaction = async () => {
    const amt = parseInt(amount);

    if (!amt || amt <= 0) {
      showNotification("Enter a valid amount", "error");
      return;
    }

    const newTransaction = {
      amount: amt,
      type,
      description,
      date: new Date().toLocaleString(),
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      setAmount("");
      setDescription("");
      showNotification("Transaction added successfully!");
      fetchTransactions(); // refresh list
    } catch (error) {
      console.error("Error adding transaction:", error);
      showNotification("Error adding transaction", "error");
    }
  };

  return (
    <div id="adminPage">
      <div className="dashboard-header">
        <h2>
          <i className="fas fa-lock"></i> Admin Dashboard
        </h2>
        <button className="btn btn-outline" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <div className="user-info">
        <div
          className="user-avatar"
          style={{ backgroundColor: "var(--danger-color)" }}
        >
          A
        </div>
        <div>
          <h3>Welcome, Admin!</h3>
          <p>System Management Panel</p>
        </div>
      </div>

      {/* Add Transaction Form at the Top */}
      <div className="card">
        <h3>
          <i className="fas fa-plus-circle"></i> Add Transaction
        </h3>
        <div className="transaction-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Transaction Type</label>
            <select
              id="type"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="credited">Credited</option>
              <option value="debited">Debited</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              className="form-control"
              placeholder="e.g. Grocery, Rent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleAddTransaction}>
          <i className="fas fa-plus"></i> Add Transaction
        </button>
      </div>

      {/* All Transactions List */}
      <div className="card">
        <h3>
          <i className="fas fa-history"></i> All Transactions
        </h3>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
