import React from 'react'
import "../styles/Customer.css";
import { Link } from 'react-router-dom';

function Customersupportpage() {
  return (
    <div>
    <div className='customerseconddiv'></div>
    <div className='customerthirddiv'>
    
    <div className='customer4div'><h3 className='custh3'>Need help with recent bookings?</h3>
    <Link to="/login"><button className='btncus'>LOGIN</button></Link>
    </div>
    <div className='custdiv5'>
    <div className='custdiv6'>
    <svg xmlns="http://www.w3.org/2000/svg" width="48"  height="48" viewBox="0 0 38 38"><g fill="none" fill-rule="evenodd"><g><g><g transform="translate(-248 -745) translate(233 730) translate(15 15)"><circle cx="19" cy="19" r="19" fill="#EC5B24" fill-opacity=".1"></circle><path fill="#EC5B24" d="M19 6.333c6.996 0 12.667 5.671 12.667 12.667 0 6.996-5.671 12.667-12.667 12.667-6.996 0-12.667-5.671-12.667-12.667 0-6.996 5.671-12.667 12.667-12.667zm-.688 6.738l-5.537 9.776c-.306.539.07 1.22.682 1.22h11.072c.626 0 1.002-.681.696-1.22l-5.536-9.776c-.306-.54-1.071-.54-1.377 0zm.709 8.045c.39 0 .695.326.695.737-.013.383-.333.71-.709.71-.39 0-.695-.327-.695-.724 0-.397.32-.723.709-.723zm.626-4.654c.056.113.07.241.056.355-.028.354-.042.709-.056 1.078-.028.553-.07 1.12-.097 1.674-.014.17-.014.34-.028.525-.014.298-.237.525-.529.525-.278 0-.515-.227-.528-.51-.042-.866-.098-1.732-.14-2.597l-.041-.695c0-.34.222-.667.542-.752.334-.085.668.085.82.397z"></path></g></g></g></g></svg>
    <h3 className='custh3sec'>Please note:</h3></div>
    <p className='custpsec'>Ixigo representatives will never ask for any personal information like credit/debit card number, CVV, OTP, card expiry date, userIDs, passwords, etc.Also,you will never be asked to install any third-party applications, such as AnyDesk or TeamViewer, that grant access to your mobile or computer screen. Beware of any one who is claiming to be associated with ixigo. Acting on any such requests may make you a victim of fraud, potentially leading to the loss of valuable information or money.</p>
    
    
    </div>
    <div><h1>Customer Service</h1>
    <p><b className='custh3sec'>Welcome to the ixigo customer service. We're here to answer all your travel related queries.</b></p>
      <p className='custpsec'>Here's a compilation of all the travel queries you may have. We're pretty sure the answer to your question will be here. Just in case you don't see it, please use contact us option mentioned below and we will get back to you for resolution.</p>
    </div>

  </div>
  
    </div>
  )
}

export default Customersupportpage;