import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import { LandingPage } from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import BookingConsultation from './Components/BookingConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm'; 
import Notification from './Components/Notification/Notification'
function App() {
  // Sample reviews data
  const reviews = [
    {
      doctorName: 'Dr. John Doe',
      specialty: 'Cardiology',
      reviewGiven: false,
    },
    {
      doctorName: 'Dr. Jane Smith',
      specialty: 'Dermatology',
      reviewGiven: false,
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Notification />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<Sign_Up />} />
          <Route path="/BookingConsultation" element={<BookingConsultation />} />
          <Route path="/reviews" element={<ReviewForm reviews={reviews} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;