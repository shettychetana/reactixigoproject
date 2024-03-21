// Navbar.js
import React, { useState } from 'react';
import "../styles/App.css";

import { Link } from 'react-router-dom';
import logo from "./logo.png";
import user from "./user.svg"
import flightlogo from "./flightlogo.svg";
import trainlogo from "./trainlogo.svg";
import buslogo from "./buslogo.svg";
import hotellogo from "./hotellogo.svg";

import Customersupport from "./Customersupport.png";

function Navbar({ username }) {
  
   
    const handleRefresh = () => {
        window.location.reload();
      };
  return (
    <nav className='navbar'>
    <div className='containernavv'>
  <div className="left-items">
    <li className='hi'>
      <img src={logo} alt="Logo" className="imglogo" onClick={handleRefresh}/>
    </li>
  </div>

    <div className="right-items">
    <div className='offerss'><Link to="/offer">Offer</Link>
    </div>
    <div className='supportdiv'> <img src={Customersupport} className="user-customer"/><Link to="/customersupport" className='support'>Customer Support</Link></div>

    <div className='user-icon1div'>
    
    <img src={user} className="user-icon1"/>
    </div>
      <li className='hi'>
        <Link to="/signup" className='mine'>
          Signup
        </Link>
      </li><p className='mine1'>/</p>
      <li className='hi'>
        <Link to="/login" className='mine'>Login</Link>
      </li>
    </div>
  </div>

    
    
      <ul className="navbarul">
   
        
        <li><Link to="/"></Link></li>
        
        <li className='underline'><Link to="/flights"  className='smm'><div><img src={flightlogo}  className="user-icon"/></div><div className='flightpagefirst'>Flights</div></Link></li>
       
        <li className='underline'><Link to="/buses"  className='smm'><div><img src={buslogo}  className="user-icon"/></div><div className='flightpagefirst'>Buses</div></Link></li>
        
        <li className='underline'><Link to="/trains"  className='smm'><div><img src={trainlogo}  className="user-icon"/></div><div className='flightpagefirst'>Trains</div></Link></li>
      
        <li className='underline'><Link to="/hotels"  className='smm'>  <div><img src={hotellogo}  className="user-icon"/></div><div className='flightpagefirst'>Hotels</div></Link></li>
        
        {username && <div className='nameonnav'>Hi {username}!</div>}
        
      </ul>
      
    </nav>
  );
}

export default Navbar;
