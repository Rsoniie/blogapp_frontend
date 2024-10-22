import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Login.css'; // Import your custom CSS file

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login({ username, password });
      navigate('/');  // Redirect to Home after successful login
    } catch (err) {
      console.error('Login failed', err);
      // Display error message to the user
    }
  };

  const navigateToSignup = () => {
    navigate('/register');  // Redirect to Signup page
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="new-user-text">New user?</p>
      <button onClick={navigateToSignup} className="signup-button">Create an Account</button>
    </div>
  );
};

export default Login;
