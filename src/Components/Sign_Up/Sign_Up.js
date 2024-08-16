import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const [userName, setUserName] = useState(''); // State for extracted user name
    const navigate = useNavigate(); // Navigation hook from react-router
    const [isLoading, setIsLoading] = useState(false);

    // Function to validate form input
    const validateForm = () => {
        const errors = [];

        if (!name) {
            errors.push("Name is required");
        }

        if (!email) {
            errors.push("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.push("Email is invalid");
        }

        if (!phone) {
            errors.push("Phone number is required");
        } else if (!/^\d{10}$/.test(phone)) {
            errors.push("Phone number must be exactly 10 digits");
        }

        if (!password) {
            errors.push("Password is required");
        } else if (password.length < 6) {
            errors.push("Password must be at least 6 characters");
        }

        return errors;
    };

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        const errors = validateForm();
        if (errors.length > 0) {
            setShowerr(errors.join(', '));
            return;
        }
    
        setIsLoading(true);
    
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                }),
            });
    
            const json = await response.json(); // Parse the response JSON
    
            if (json.authtoken) {
                // Store user data in session storage
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);
    
                // Extract the name from email
                const userName = email.split('@')[0];
                setUserName(userName);
    
                // Redirect user to home page
                navigate("/");
                window.location.reload(); // Refresh the page
            } else {
                if (json.errors) {
                    for (const error of json.errors) {
                        setShowerr(error.msg); // Show error messages
                    }
                } else {
                    setShowerr(json.error);
                }
            }
        } catch (error) {
            setShowerr('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{ textAlign: 'left' }}>
                    Already a member? <span><Link to="/login" style={{ color: '#2190FF' }}>Login</Link></span>
                </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="form-control" 
                                placeholder="Enter your name" 
                                aria-describedby="helpId" 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                id="phone" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                className="form-control" 
                                placeholder="Enter your phone number" 
                                aria-describedby="helpId" 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="form-control" 
                                placeholder="Enter your email" 
                                aria-describedby="helpId" 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="form-control" 
                                placeholder="Enter your password" 
                                aria-describedby="helpId" 
                            />
                        </div>

                        {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}

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
                                    setShowerr('');
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
}

export default Sign_Up;
