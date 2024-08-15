import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import './Login.css';

const Login = () => {
  // State variables for email, password, and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
      navigate('/');
    }
  }, [navigate]);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();

    // Validate the form before sending the request
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Send a POST request to the login API endpoint
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Parse the response JSON
      const json = await res.json();
      console.log(json); // Log the response for debugging

      if (json.authtoken) {
        // If authentication token is received, store it in session storage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);

        // Redirect to home page and reload the window
        navigate('/');
        window.location.reload();
      } else {
        // Handle errors if authentication fails
        if (json.errors) {
          for (const error of json.errors) {
            alert(error.msg);
          }
        } else {
          alert(json.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member? 
          <span>
            <Link to="/signup" style={{ color: '#2190FF' }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="form-control" 
                placeholder="Enter your email" 
                aria-describedby="helpId" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <div className="btn-group">
              <button 
                type="submit" 
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
              <button 
                type="reset" 
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  setErrors({});
                }}
              >
                Reset
              </button>
            </div>
            <br />
            <div className="login-text">
              Forgot Password?
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
