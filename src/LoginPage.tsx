// Log-in page
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import React, { useState } from "react";

// onLoginSuccess == Prop FROM App.tsx. Calling it causes setUser to fire. Therefore, changes userData in App
const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents page reload

    console.log("Name:", name);
    console.log("Password:", password);
    const body = { name, password, }

    try {
      const res = await fetch("http://192.168.0.206:5000/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      const data = await res.json();
      console.log(data);
      
      // Store token
      localStorage.setItem('userId', data.userId);
      navigate("/main")
    } catch (err) {
      console.error(err);
    }
  };
  
  // Log in
  const [loginName, setLoginName] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents page reload

    console.log("Name:", loginName);
    console.log("Password:", loginPassword);
    const body = { loginName, loginPassword, }
    try {
      const res = await fetch("http://192.168.0.206:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      const data = await res.json();
      console.log(data.userid);

      // Store userId
      localStorage.setItem('userId', data.userid);
      navigate("/main")
    } catch (err) {
      console.error(err);
    }
  }

  // MAIN PAGE STARTS HERE
  return (
    <div className='login-page'>
      <header className='login-header'>
        <h1>Welcome to Backstab Bonanza!</h1>
      </header>
      <div className='login-register'>
        <div className='register'>
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit} className='register-form'>
            <input
              placeholder="Enter name"
              value={name}
              className='register-name-input'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <input
              placeholder="Enter password"
              value={password}
              className='register-password-input'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <button type="submit" className='register-submit'>Submit</button>
          </form>
        </div>
        <div className='login'>
          <h2>Log In</h2>
          <form onSubmit={handleLoginSubmit} className='login-form'>
          <input
            placeholder="Enter name"
            value={loginName}
            className='login-name-input'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginName(e.target.value)
            }
          />
          <input
            placeholder="Enter password"
            value={loginPassword}
            className='login-password-input'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginPassword(e.target.value)
            }
          />
        <button type="submit" className='login-submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
