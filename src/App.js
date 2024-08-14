import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from './Navbar/Navbar';
import { LandingPage } from './LandingPage/LandingPage';
function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>

          <Routes>
              <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;