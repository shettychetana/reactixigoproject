import React,{useState} from 'react'
import offerfinal from "./offerfinal.png";

function Bookbuspage({bus,busId,onClose ,searchParams,arrivalTime}) {
    const authToken = localStorage.getItem("authToken");
  console.log(authToken);
const {from,to,date}= searchParams;
const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');

  const [pincodeValid, setPincodeValid] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [stateValid, setStateValid] = useState(false);
  const [noOfTickets, setNoOfTickets] = useState(1);
  const [bookingData, setBookingData] = useState(null); 
  
  const calculateTotalCost = (noOfTickets, busPrice) => {
    return noOfTickets * busPrice;
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setPincodeValid(e.target.value.length > 0);
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAddressValid(e.target.value.length > 0);
  }

  const handleStateChange = (e) => {
    setState(e.target.value);
    setStateValid(e.target.value.length > 0);
  }

  const handleBooking = async () => {
    try {
      
      // Get the bearer token from local storage
      const token = localStorage.getItem('authToken');

      // Define the request body
      const requestBody = {
        bookingType: 'bus',
        bookingDetails: {
          busId: busId,
          startDate: searchParams.date,
          endDate: arrivalTime,
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
        throw new Error('Failed to book ');
      }
      const data = await response.json();
      setBookingData(data.booking || null);
      console.log(data);
      // Booking successful
      alert('bus booked successfully!');
      
    } catch (error) {
      console.log(error.message);
    }
    
  };
  return (
    <div className='busfinally'>
    <div style={{ height: "550px" ,width:"95%"}} className='ticket1'>
    <div style={{ display: "flex" }}  className='ticket1A'> 
    <div style={{ display: "flex" ,flexDirection:"column"}}>
    <p className='ticket1Aa'> Booking Details </p>
    <p className='ticket1Aaa'>{searchParams.from}--{searchParams.to} {searchParams.date}</p>
    </div>
      
      <button className='ticket1Ab' onClick={onClose}>cancel</button>
      
    </div>
    <p className='ticket1Aba'>Prices may change due to dynamic pricing.</p>
     <p className='ticform' >BILLING ADDRESS</p>
     <div className='ticforma'>
     <div style={{ display: "flex" ,flexDirection:"column"}}>
    <label className='ticformlabel' htmlFor="noOfTickets">No. of Tickets:</label>
    <input className='ticformip' type="number"  name="noOfTickets" min="1" value={noOfTickets} onChange={(e) => setNoOfTickets(e.target.value)} /><br/>
    </div>
    <div style={{ display: "flex" ,flexDirection:"column"}}>
    <label className='ticformlabel' htmlFor="pincode">pincode </label>
    <input className='ticformip' type='text' placeholder="pincode" name='pincode' value={pincode} onChange={handlePincodeChange} /><br />
    </div>
    <div style={{ display: "flex" ,flexDirection:"column"}}>
    <label  className='ticformlabel' htmlFor="Address">Address </label>
    <input className='ticformip' type='text' placeholder="Address" name='Address' value={address} onChange={handleAddressChange} /><br />
    </div>
    <div style={{ display: "flex" ,flexDirection:"column"}}>
    <label className='ticformlabel' htmlFor="Address">State </label>
    <input className='ticformip' type='text' placeholder="State" name='Address' value={state} onChange={handleStateChange} /><br />
    </div>
    <button className="tickbook" onClick={handleBooking} disabled={!pincodeValid || !addressValid || !stateValid}>BOOK</button>
        </div>
          </div>
    <div className='ticket2' style={{width:"85%px"}}>
    {bookingData&&(
      <div className='ticket2A' >
      <p className='ticket2Aaa'>{bookingData.status}</p>
        <div className='ticket2Aa'>
        
          <h3 className='ticket2Aab' >Passenger details</h3>
          <p className='ticket2Aac'>Passenger Name : {bookingData.user.name}</p>
          <p className='ticket2Aad'>Passenger Email : {bookingData.user.email}</p>
          <p className='ticket2Aae'>Passenger Id : {bookingData.user._id}</p>
          <p className='ticket2Aaf'>Ticket confirmed on : {bookingData.created_at}</p>
        </div>
        <div className='ticket2Ab'>
        <h3>bus details</h3>
        <p>{bookingData.bus.name}
        </p>
        <p> From :{bookingData.bus.source}--
        To :{bookingData.bus.destination}</p>
        <p>Departure : {bookingData.start_date} Time :{bookingData.bus.departureTime}</p>
        <p>arrival : {bookingData.end_date} Time :{bookingData.bus.arrivalTime}</p>
        </div>
        <div className='talenin'>
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
          <p className='headingoffare1a' style={{height: '50px', width: '265px'}}>{noOfTickets} Travellers</p>
          <p className='headingoffare2a' style={{height: '50px', width: '265px'}}>Partially Refundable</p>
          <p className='headingoffare3a' style={{height: '50px', width: '265px'}}>₹ {calculateTotalCost(noOfTickets, bus.fare)}</p>
          <p className='headingoffare3a' style={{height: '50px', width: '265px', borderBottom: '2px solid grey'}}>₹140</p>
          <p className='headingoffare5a' style={{height: '50px', width: '265px'}}>{calculateTotalCost(noOfTickets, bus.fare)+140}</p>
          </div>

          </div>
        </div>
        
      </div>
      
    )}
    
    </div>

    </div>
    
  )
}

export default Bookbuspage
