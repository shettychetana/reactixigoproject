import React,{useState} from 'react';
import offerfinal from "./offerfinal.png";


const BookingConfirmation = ({ flight,flightId, onClose ,searchParams,arrivalTime}) => {
  const authToken = localStorage.getItem("authToken");
  console.log(authToken);

  const calculateTotalCost = (numTravelers, flightPrice) => {
    return numTravelers * flightPrice;
  };
 
  const [bookingData, setBookingData] = useState(null); 
  const handleBooking = async () => {
    try {
      
      // Get the bearer token from local storage
      const token = localStorage.getItem('authToken');

      // Define the request body
      const requestBody = {
        bookingType: 'flight',
        bookingDetails: {
          flightId: flightId,
          startDate: searchParams.departureDate,
          endDate: '2023-10-09T10:03:53.554+00:00'
        }
      };

      // Make the API call
      const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: '98a26mr3rzw8',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to book flight');
      }
      const data = await response.json();
      setBookingData(data.booking || null);
      console.log(data);
      // Booking successful
      alert('Flight booked successfully!');
      
    } catch (error) {
      console.log(error.message);
    }
    
  };

  return (
    <div>
    <div className='devre'> <h2 className='devreheading'>Booking Confirmation</h2>
    <button className="devrebtn" onClick={onClose}>X</button>
    </div>

    <div>
    <div className='hotelip' style={{width:"1725px", marginLeft:"120px"}}>
        <div className='hotelsearchh' >
          <p className='photel'>Name</p>
          <input
            className='iphotel'
            type='text'
            name='Name'
            placeholder='Name'
            required
          />
        </div>
        <div className='hotelsearchh'>
          <p className='photel'>Email</p>
          <input
            className='iphotel'
            type='email'
            name='Email'
            placeholder='Email'
          />
        </div>
        <div className='hotelsearchh'>
          <p className='photel'>Phone.no</p>
          <input
            className='iphotel'
            type='text'
            name='Phone.no'
            placeholder='Phone.no'
          />
        </div>
        <div className='hotelsearchh' style={{background:"#EC5B24"}}>
          <p className='photel'></p>
          <button className='iphotel'  onClick={handleBooking}  style={{background:"#EC5B24",color:"white"}}>Book Flight</button>
        </div>
        </div>    
  </div>

    <div className='conformbooking1'>
      <div>
        {bookingData && (
          <div className='bookfinal'>
          <div className='bookfinal1a'><h3>Booking Details</h3>
          <p>User ID: {bookingData.user._id}</p>
          <p>Name: {bookingData.user.name}</p>
          <p>Email: {bookingData.user.email}</p>
          <p>Source: {bookingData.flight.source}</p>
          <p>Destination: {bookingData.flight.destination}</p>
          <p>DepartureTime: {bookingData.flight.departureTime}</p>
          <p>Arrival Time: {bookingData.flight.arrivalTime}</p>
          <p>Departure date: {bookingData.start_date}</p>
          <p>Arrival Time: {arrivalTime}T00:00:00.000Z</p>
          

          </div>

          <div className='bookfinal1a'><h3>Flight Details</h3>
          <p>Flight Name: {bookingData.flight.airline.name}</p>
          <p>Flight ID: {bookingData.flight.flightID}</p>
          <p>Airline ID: {bookingData.flight.airline.airlineID}</p>
          <p>Flight headquarters: {bookingData.flight.airline.headquarters}</p>
          <p>Flight availableSeats: {bookingData.flight.availableSeats}</p>
          <p>Flight amenities: {bookingData.flight.amenities}</p>
          <p>Flight stops: {bookingData.flight.stops}</p>
          <p>Flight duration: {bookingData.flight.duration}</p>
          </div>
          <div className='bookfinal1b'><h3 className='chet'>{bookingData.status}</h3>
          <div className='bookfinal1bA'><img src={offerfinal} className='finalimage'/>
          <p>Log in to access amazing offers & redeem ixigo money on your flight booking.</p>
          </div>
          
          <div className='bookfinalbaba' style={{display:"flex"}}>
          <div className='bookfinal1bB'>
          <p className='headingoffare1' style={{height: '50px', width: '265px'}}>Fare Summary</p>
          <p className='headingoffare2' style={{height: '50px', width: '265px'}}>Fare Type</p>
          <p className='headingoffare3' style={{height: '50px', width: '265px'}}>Base Fare</p>
          <p className='headingoffare3'style={{height: '50px', width: '274px', borderBottom: '2px solid grey'}}>Convenience Fare</p>
          <p className='headingoffare5' style={{height: '50px', width: '265px'}}>Total Cost</p>
          </div>
          <div className='bookfinal1bB'>
          <p className='headingoffare1a' style={{height: '50px', width: '265px'}}>{searchParams.numTravelers} Travellers</p>
          <p className='headingoffare2a' style={{height: '50px', width: '265px'}}>Partially Refundable</p>
          <p className='headingoffare3a' style={{height: '50px', width: '265px'}}>₹ {calculateTotalCost(searchParams.numTravelers, flight.ticketPrice)}</p>
          <p className='headingoffare3a' style={{height: '50px', width: '265px', borderBottom: '2px solid grey'}}>₹1,688</p>
          <p className='headingoffare5a' style={{height: '50px', width: '265px'}}>{calculateTotalCost(searchParams.numTravelers, flight.ticketPrice)+1688}</p>
          </div>

          </div>
          
          
          <div>
          
          <p>Convenience fee of ₹1,688* will be added.</p>
          </div>
          </div>
          </div>
        )}
      </div>

    </div>
  </div>
  );
};

export default BookingConfirmation;
