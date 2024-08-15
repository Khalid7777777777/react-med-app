import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  // Function to handle click on menu icon
  const handleClick = () => {
    setIsActive(!isActive);
  };

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    navigate('/login'); // Redirect to login page
    // Optionally, you can remove the page reload as it's generally unnecessary
  };

  // Check if the user is logged in
  const isLoggedIn = sessionStorage.getItem('auth-token') !== null;

  // Get the username from email
  const email = sessionStorage.getItem('email');
  const username = email ? email.split('@')[0] : '';

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy 
          <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: '#3685fb' }}>
            <title>Doctor With Stethoscope SVG icon</title>
            <g>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44.4,77.2-89.3V584.4c-90.5-15.2-160.1-94-160.8-188.9H693.2z"></path>
              </g>
            </g>
          </svg>
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={isActive ? "fa fa-times" : "fa fa-bars"}></i>
      </div>

      <ul className={`nav__links ${isActive ? 'active' : ''}`}>
        <li className="link">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''} // Dynamic class name
          >
            Home
          </NavLink>
        </li>
        <li className="link">
          <NavLink 
            to="/appointments" 
            className={({ isActive }) => isActive ? 'active' : ''} // Dynamic class name
          >
            Appointments
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li className="link">
              <span className="username">{username}</span> {/* Display username */}
            </li>
            <li className="linkk">
              <button className="btn1" onClick={handleLogout}>Logout</button>
            </li>
            <li className="link">
              <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? 'active' : ''} // Dynamic class name
              >
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="linkk">
              <NavLink 
                to="/sign_up" 
                className={({ isActive }) => isActive ? 'active' : ''} // Dynamic class name
              >
                <button className="btn1">Sign Up</button>
              </NavLink>
            </li>
            <li className="linkk">
              <NavLink 
                to="/login" 
                className={({ isActive }) => isActive ? 'active' : ''} // Dynamic class name
              >
                <button className="btn1">Login</button>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
