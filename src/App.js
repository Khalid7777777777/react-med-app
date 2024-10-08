import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import { LandingPage } from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import SignUp from './Components/Sign_Up/Sign_Up';
import BookingConsultation from './Components/BookingConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm'; 
import Notification from './Components/Notification/Notification'
import Profile from './Components/ProfileCard/ProfileCard';
import ReportLayout from './Components/ReportsLayout/ReportsLayout';
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
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/BookingConsultation" element={<BookingConsultation />} />
          <Route path="/reviews" element={<ReviewForm reviews={reviews} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<ReportLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;