import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from './img/logo-png.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/logins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('username', data.username);
        
        // Handle successful login
        navigate('/home');
        console.log(data);
        
        setTimeout(() => {
          alert('Login Successful!');
        }, 100); // Delay the alert by 100 milliseconds
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        console.error(errorData);
        // Handle login error
      }
    } catch (error) {
      console.error(error);
      // Handle fetch error
    }
  };

  return (
    <div className="login-container">
      <div className="login-details">
        <h2 className="login-heading">LOGIN</h2>
        <label className="login-label">Username:</label>
        <input
          type="text"
          className="login-input"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="login-label">Password:</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className="login-image">
        <img src={logo} alt="Login" />
      </div>
    </div>
  );
}

export default Login;
