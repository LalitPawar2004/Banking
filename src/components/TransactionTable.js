import React from 'react';

export default function TransactionTable({ transactions }) {
  // Ensure transactions is always an array
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  if (safeTransactions.length === 0) {
    return <p>No transactions found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Type</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {safeTransactions.map((t, index) => (
          <tr key={index}>
            <td>{t.amount} Rs</td>
            <td className={t.type}>
              {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
            </td>
            <td>{t.description || '-'}</td>
            <td>{t.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
