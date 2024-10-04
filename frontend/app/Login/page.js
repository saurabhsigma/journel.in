"use client"; // Marking this as a client component

import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css'; // Import the CSS module


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:4002/api/v1/user/auth', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
      window.location.href = '/'; // Redirect to main page
    } catch (error) {
      console.error('Login failed', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  

  return (
    <div className={styles.login_container}>
      <form onSubmit={handleLogin} className={styles.login_form}>
        <h2>Login</h2>
        {error && <p className={styles.error_message}>{error}</p>}
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          className={styles.input_field}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          className={styles.input_field}
        />
        <button type="submit" className={styles.submit_button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
