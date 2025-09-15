import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Notification from './components/Notification';
import './styles/styles.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null); // 'admin' | 'user' | null
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleLogin = (userType, userObj) => {
    setCurrentUser({ type: userType, ...userObj });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="container">
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {!currentUser && <LoginPage onLogin={handleLogin} showNotification={showNotification} />}
      {currentUser?.type === 'admin' && <AdminDashboard onLogout={handleLogout} showNotification={showNotification} />}
      {currentUser?.type === 'user' && <UserDashboard user={currentUser} onLogout={handleLogout} />}
    </div>
  );
}

export default App;
