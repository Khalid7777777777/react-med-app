import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('normal_user'); // State for user type
    const [showerr, setShowerr] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const errors = [];

        if (!name) errors.push("Name is required");
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

    const register = async (e) => {
        e.preventDefault();

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
                    userType: userType, // Add userType to the request body
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);

                const userName = email.split('@')[0];
                setUserName(userName);

                navigate("/");
                window.location.reload();
            } else {
                if (json.errors) {
                    for (const error of json.errors) {
                        setShowerr(error.msg);
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
                            <label htmlFor="userType">Role</label>
                            <select 
                                name="userType" 
                                id="userType" 
                                value={userType} 
                                onChange={(e) => setUserType(e.target.value)} 
                                className="form-control"
                            >
                                <option value="normal_user">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>
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

                        {/* Select input for user type */}
                     

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
                                    setUserType('normal_user'); // Reset user type
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
