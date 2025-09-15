import React, { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";

export default function UserDashboard({ user, onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(API_URL);
      let data = await res.json();
      // Sort transactions: newest first (by date)
      data = Array.isArray(data)
        ? data.sort((a, b) => {
            const da = new Date(a.date);
            const db = new Date(b.date);
            return db - da;
          })
        : [];
      setTransactions(data);
      calculateBalance(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const calculateBalance = (transactions) => {
    let total = 0;
    transactions.forEach((t) => {
      if (t.type === "credited") total += t.amount;
      else total -= t.amount;
    });
    setBalance(total);
  };

  return (
    <div id="userPage">
      <div className="dashboard-header">
        <h2>
          <i className="fas fa-user"></i> User Dashboard
        </h2>
        <button className="btn btn-outline" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <div className="user-info">
        <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <h3>Welcome, {user.name}!</h3>
          <p>Last login: {new Date().toLocaleString()}</p>
        </div>
      </div>

      <div className="balance-card">
        <div className="balance-label">Your Account Balance</div>
        <div className="balance-amount">{balance} Rs</div>
      </div>

      <div className="card">
        <h3>
          <i className="fas fa-history"></i> Transaction History
        </h3>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
