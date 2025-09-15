import React from 'react';

export default function Notification({ message, type, show }) {
  if (!show) return null;

  return (
    <div className={`notification ${type} ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
}
