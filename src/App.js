import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from './Navbar/Navbar';
import { LandingPage } from './LandingPage/LandingPage';
import  Login  from './Login/Login';
import  Sign_Up  from './Sign_Up/Sign_Up';
import InstantConsultation './InstantConsultation/InstantConsultation';
function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>

          <Routes>
              <Route path="/" exact element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign_up" element={<Sign_Up />} />
              <Route path="/instant-consultation" element={<InstantConsultation />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;