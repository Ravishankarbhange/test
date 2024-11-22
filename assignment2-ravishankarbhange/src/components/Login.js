import React from 'react';
import './../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SERVER_API_URL } from './Constants';

const Login = () => {

  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault()

    const userData = {email: userEmail, password: password,};
  
    try {
      console.log("Calling the url ", SERVER_API_URL);
      const response = await fetch(`${SERVER_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
        setError(""); 
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Error occurred while registering');
      console.error('Error:', error);
    }
  }

  return (
    <div className="login-container">
      <div className="centered-content">
        <div className="login-box">
          <h1 className="title">Sign In</h1>

          <form onSubmit={handleLogin}>
            <input onChange={(e) => setUserEmail(e.target.value)} className="input-field" type="text" placeholder="Email Id" />
            <input onChange={(e) => setPassword(e.target.value)} className="input-field" type="password" placeholder="Password"/>
            {error && <span className="error-text">{error}</span>}
            <button className="login-button">Login</button>
          </form>

          <p className="center-text">Don't have an Account?</p>
          <Link to="/register"><button className="signin-code-button">Create Account</button></Link>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
