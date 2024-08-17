import React, { useState } from 'react';

const Profile = () => {
    // State variables for user data
    const [name, setName] = useState('John Doe'); // Replace with the actual user name
    const [email, setEmail] = useState('johndoe@example.com'); // Replace with the actual user email
    const [phone, setPhone] = useState('1234567890'); // Replace with the actual user phone number
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

    // Function to handle save action
    const handleSave = () => {
        // Add code here to update user information (e.g., API call)
        setIsEditing(false); // Exit edit mode
        alert('User information changed successfully!');
    };

    return (
        <div className="profile-container" style={{ marginTop: '5%' }}>
            {/* Display the header */}
            <h1>Welcome, {name}!</h1>

            {isEditing ? (
                <div className="edit-form">
                    {/* Render input fields for editing */}
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
                        />
                    </div>

                    {/* Save button */}
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save
                    </button>
                </div>
            ) : (
                <div className="user-info">
                    {/* Display user information */}
                    <p>Email: {email}</p>
                    <p>Phone: {phone}</p>

                    {/* Edit button */}
                    <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
