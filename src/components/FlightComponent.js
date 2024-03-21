import React, { useState } from 'react';
import "../styles/flight.css";
import BookingConfirmation from './BookingConfirmation';




const FlightDetailsPopup = ({ flightDetails, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
      <button className="popup-close" onClick={onClose}>X</button>
      <div className="popup-content">
        <h2>Flight Details</h2>
        {/* Display flight details here */}
        <p>Airline: {flightDetails.airline}</p>
        <p>Airline: {flightDetails.flightID}</p>
        <p>Source: {flightDetails.source}</p>
        <p>Destination: {flightDetails.destination}</p>
        <p>Departure Time:{flightDetails.departureTime}</p>
        <p>Arrival Time: {flightDetails.arrivalTime}</p>
        <p>Duration: {flightDetails.duration}</p>
        <p>AvailableSeats: {flightDetails.availableSeats}</p>
        <p>Amenities: {flightDetails.amenities}</p>
        {/* Add more flight details as needed */}
        </div>
      </div>
    </div>
  );
};

const FlightComponent = ({ flight, searchParams }) => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedFlightId, setConfirmedFlightId] = useState(null);

  const calculateArrivalDate = (departureDate, departureTime, duration) => {
    // Your existing code for calculating arrival date
    
          const departureDateTime = new Date(departureDate + 'T' + departureTime);
          const durationHours = parseFloat(duration); // Parse the duration as float
          const durationMilliseconds = durationHours * 60 * 60 * 1000; // Convert duration to milliseconds
          let arrivalDateTime = new Date(departureDateTime.getTime() + durationMilliseconds);
        
          // Check if the arrival time exceeds 24 hours
          if (arrivalDateTime.getDate() !== departureDateTime.getDate()) {
            // If arrival date is different, add one day to the departure date
            arrivalDateTime.setDate(departureDateTime.getDate() + 1);
          }
        
          // Return formatted arrival date
          return arrivalDateTime.toLocaleDateString()
  };

  const handleFlightDetailsClick = () => {
    // Triggered when "Flight Details" link is clicked
    // You can fetch additional flight details here if needed
    setShowDetailsPopup(true);
  };

  const handleClosePopup = () => {
    // Function to close the pop-up
    setShowDetailsPopup(false);
  };
  const bookingFlight = () => {
    // Update state to show booking confirmation component
    setBookingConfirmed(true);
    setConfirmedFlightId(flight._id);
  };

  return (
    <>
    <div>{bookingConfirmed && (
      <BookingConfirmation flight={flight} flightId={confirmedFlightId} arrivalTime= {calculateArrivalDate(searchParams.departureDate, flight.departureTime, flight.duration)}  searchParams={searchParams}  onClose={() => setBookingConfirmed(false)} />
    )}</div>
    
    <div className="flight">
    {showDetailsPopup && (
      <FlightDetailsPopup
        flightDetails={flight} // Pass flight details to the pop-up
        onClose={handleClosePopup} // Pass function to close the pop-up
      />
    )}
   
           <div className="column">
             <p ><strong>Id:</strong> {flight.airline}</p>
           </div>
           <div className="column">
           <p className='pinflight'>{flight.source}</p>
          
             <p className='pintime'>{flight.departureTime}</p>
             <p className='phour'>{searchParams.departureDate}</p>
           </div>
           <div className="column">
             <p className='dur'>{flight.duration} hours</p>
             <p>-----------------</p>
             <p className='dur'>{flight.stops} stops</p>
           </div>
           <div className="column">
             <p className='poutflight'>{flight.destination}</p>
             <p className='pintime'>{flight.arrivalTime}</p>
             <p className='phour'>{calculateArrivalDate(searchParams.departureDate, flight.departureTime, flight.duration)}</p>
           </div>
      <div className="column">
        <p>Rs.{flight.ticketPrice}</p>
        <a href="#" onClick={handleFlightDetailsClick}>Flight Details</a>
      </div>
      <div className="column">
        <button className="booknow" onClick={bookingFlight}>Book</button>
      </div>
      </div>
      
      
    
    </>
  );
};

export default FlightComponent;






