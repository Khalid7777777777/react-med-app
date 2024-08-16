import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Navbar} from './Components/Navbar/Navbar'
import { LandingPage } from './Components/LandingPage/LandingPage';
import  Login  from './Components/Login/Login';
import  Sign_Up  from './Components/Sign_Up/Sign_Up';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>

          <Routes>
              <Route path="/" exact element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign_up" element={<Sign_Up />} />
              <Route path="/FindDoctorSearch" element={<FindDoctorSearch />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;