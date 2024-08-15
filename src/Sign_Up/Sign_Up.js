import React, { useState } from 'react';
import './Sign_Up.css';

export const Sign_Up = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name) {
      newErrors.name = 'Name is required';
    }

    // Phone validation
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission
      console.log('Form submitted', { name, phone, email, password });
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? 
          <span>
            <a href="../Login/Login.html" style={{ color: '#2190FF' }}> Login</a>
          </span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                className="form-control" 
                placeholder="Enter your name" 
                aria-describedby="helpId" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                required 
                className="form-control" 
                placeholder="Enter your phone number" 
                aria-describedby="helpId" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required 
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
                required 
                className="form-control" 
                placeholder="Enter your password" 
                aria-describedby="helpId" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                Submit
              </button>
              <button 
                type="reset" 
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => {
                  setName('');
                  setPhone('');
                  setEmail('');
                  setPassword('');
                  setErrors({});
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
