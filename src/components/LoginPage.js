import React, { useState } from 'react';

const users = {
  admin: { username: 'admin', password: '123', name: 'Admin' },
  jay: { username: 'Jayesh', password: '9028530218', name: 'Jayesh' },
};

export default function LoginPage({ onLogin, showNotification }) {
  const [loginType, setLoginType] = useState(null); // 'user' or 'admin'
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = () => {
    const { username, password } = formData;

    if (loginType === 'admin' &&
      username === users.admin.username &&
      password === users.admin.password) {
      onLogin('admin', users.admin);
    } else if (loginType === 'user' &&
      username === users.jay.username &&
      password === users.jay.password) {
      onLogin('user', users.jay);
    } else {
      showNotification('Invalid username or password', 'error');
    }
  };

  const handleCancel = () => {
    setLoginType(null);
    setFormData({ username: '', password: '' });
  };

  return (
    <div className="card">
      <div className="bank-header">
        <div className="bank-logo">
          <i className="fas fa-landmark"></i>
        </div>
        <h1 className="bank-title">LRRN BANK</h1>
        <p className="bank-subtitle">Secure Banking Solutions</p>
      </div>

      {!loginType && (
        <div className="btn-container">
          <button className="btn btn-primary" onClick={() => setLoginType('user')}>
            <i className="fas fa-user"></i> User Login
          </button>
          <button className="btn btn-primary" onClick={() => setLoginType('admin')}>
            <i className="fas fa-lock"></i> Admin Login
          </button>
        </div>
      )}

      {loginType && (
        <div className="login-form">
          <h3>
            <i className={`fas ${loginType === 'admin' ? 'fa-lock' : 'fa-user'}`}></i>{' '}
            {loginType.charAt(0).toUpperCase() + loginType.slice(1)} Login
          </h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <button className="btn btn-outline" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
