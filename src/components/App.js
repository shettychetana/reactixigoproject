// App.js
import "../styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import Home from "./Home";
import FlightPage from "./FlightPage";
import BusesPage from "./BusesPage";
import TrainsPage from "./TrainsPage";
import HotelsPage from "./HotelsPage";


import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";

import Offer from "./Offer";
import Customersupportpage from "./Customersupportpage";
function App() {
  const [username, setUsername] = useState('');
  const [isUserCreated,setIsUserCreated] = useState(true);
  return (
    <div className="App"  style={{ width: "100%" }}>

      <BrowserRouter>
      <Navbar username={username}/>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/flights" element={<FlightPage/>} />
          <Route path="/buses" element={<BusesPage/>} />
          <Route path="/trains" element={<TrainsPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/offer" element={<Offer/>} />
          <Route path="/customersupport" element={<Customersupportpage />} />
          <Route
            path="/signup"
            element={<Signup setIsUserCreated={setIsUserCreated} />}
          />
          <Route
            path="/login"
            element={<Login setUser={setUsername} setIsUserCreated={setIsUserCreated} />}
          />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
