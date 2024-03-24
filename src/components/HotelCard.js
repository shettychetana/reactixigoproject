import React ,{useState}from 'react'

function HotelCard({hotel,searchParams}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [roomDetails, setRoomDetails] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomAvailability, setRoomAvailability] = useState(false);
    const [done, setdone] = useState(false);
    const [bookingDatahotel, setBookingDatahotel] = useState(null); 
    const [differenceInDays, setDifferenceInDays] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    
    const handleMouseEnter = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotel.images.length);
    };
  
    const handleMouseLeave = () => {
      setCurrentImageIndex(0);
    };
    const handleBookNow = async () => {
        try {
          const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotel._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'projectID': '{{yourProjectID}}'
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const data = await response.json();
          
          setRoomDetails(data);
          setRoomAvailability(true);
          
        } catch (error) {
          console.error('Error fetching hotel availability:', error);
        }
      };
      console.log(roomDetails);
      const handleCloseAvailability = () => {
        console.log("cancel")
        setRoomAvailability(false);
        setRoomDetails(null);
        setSelectedRoom(null); 
      };


      const handleReserveRoom = async (room) => {
        try {
         
          const startDate = new Date(searchParams.checkIn);
      const endDate = new Date(searchParams.checkOut);

      // Calculate the difference in days
      const timeDifference = endDate.getTime() - startDate.getTime();
      const differenceInDaysValue = Math.ceil(timeDifference / (1000 * 3600 * 24))+1;
      setDifferenceInDays(differenceInDaysValue);

      // Calculate the total cost
      const totalCostValue = differenceInDaysValue * room.costPerNight;
      console.log(totalCostValue, "is the total cost");
      setTotalCost(totalCostValue);

          const token = localStorage.getItem('authToken');
      
          // Define the request body
          const requestBody = {
            bookingType: 'hotel',
            bookingDetails: {
              hotelId: hotel._id,
              startDate: searchParams.checkIn,
              endDate: searchParams.checkOut,
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
          console.log("first",data)
          setBookingDatahotel(data.booking || null);
          setSelectedRoom(room);
          setdone(true);
          console.log(data);
          // Booking successful
          alert('hotel booked successfully!');
          
        } catch (error) {
          console.log(error.message);
        }
        
      };
      
  return (
    <div>
    
        <div className='hh '>
        {done&&(<div>
          {bookingDatahotel && (
            <div style={{  backgroundColor:"green",color:"white",position:"relative",top:"-400px",left:"220px",border:"2px solid grey",width:"80%",boxShadow:"0px 10px 8px grey",borderRadius:"15px",height:"50px"}}>
              <p style={{position:"relative",left:"560px",fontSize:"25px",top:"-35px"}}>{bookingDatahotel.status}</p>
            </div>
  
          )}
          </div>)}
       
        
        <div  style={{position:"relative",top:"-400px",left:"360px",border:"2px solid #EC5B24",width:"1600px",boxShadow:"0px 10px 8px grey",borderRadius:"15px"}}> {selectedRoom && (
          

          <div className='mmmmmm' style={{display:"flex"}}>
         <div style={{width:"520px",padding:"10px",marginLeft:"10px",boxShadow:"0px 10px 8px grey",borderRadius:"15px"}}> <p style={{fontSize:"25px"}}>Selected Room Number: {selectedRoom.roomNumber}</p>
         <p style={{fontSize:"22px",color:"#EC5B24",fontWeight:"600"}}>Room Type: {selectedRoom.roomType}</p>
         <p style={{fontSize:"20px"}}>Room Bed Detail: {selectedRoom.bedDetail}</p>
         <p style={{fontSize:"20px"}}>  Price Per Night: {selectedRoom.costPerNight}</p>
         <p style={{fontSize:"20px"}}>  Guest: {searchParams. guests}</p>
         <p style={{fontSize:"20px"}}>  Room: {searchParams. rooms}</p>
         </div>
        
         <div style={{width:"530px",boxShadow:"0px 10px 8px grey"}}>
         {bookingDatahotel && (
          <div style={{padding:"10px"}}>
          <p style={{fontSize:"25px",color:"blue",fontWeight:"600"}}>Name: {bookingDatahotel.user.name}</p>
          <p style={{fontSize:"22px",fontWeight:"600"}}>Email: {bookingDatahotel.user.email}</p>
          <p style={{fontSize:"20px"}}>Hotel Name: {bookingDatahotel.hotel.name}</p>
          <p style={{fontSize:"20px"}}>Hotel Location: {bookingDatahotel.hotel.location}</p>
          <p style={{fontSize:"20px"}}>  checkIn : {searchParams.checkIn}</p>
          <p style={{fontSize:"20px"}}> checkOut: {searchParams.checkOut}</p>
          </div>
        )}
         </div>
         <div style={{width:"530px",boxShadow:"0px 10px 8px grey" ,paddingLeft:"20px"}}> 
          <p style={{fontSize:"25px",color:"green",fontWeight:"600"}}>Fare Summary</p>
        <p style={{fontSize:"22px",color:"black",fontWeight:"600"}}>  Price :  ₹{selectedRoom.costPerNight}*{differenceInDays} days</p>
        <p style={{fontSize:"22px",color:"black",fontWeight:"600"}}>  Price : ₹{totalCost} </p>
        <p style={{fontSize:"22px",color:"black",fontWeight:"600"}}> Taxes & Charges  :  ₹{selectedRoom.costDetails.taxesAndFees} days</p>
        <p style={{fontSize:"22px",color:"green",fontWeight:"600"}}>  discount :  ₹{selectedRoom.costDetails.discount} days</p>
        <p style={{fontSize:"27px",color:"black",fontWeight:"600",borderTop:"2px solid grey"}}>Net Amount Payable: ₹{totalCost + selectedRoom.costDetails.taxesAndFees - selectedRoom.costDetails.discount}</p>
         </div>
          </div>
        
        )}</div>
        <div  className='mainhotel'>
        <div>
        
        {roomAvailability &&  (
            
            <div className="availability-details">
            <button onClick={handleCloseAvailability} className='closeshotel'>cancel</button>
              <p className='headhotellll'  style={{color:"#EC5B24"}}>{roomDetails.data.name} {roomDetails.data.location}</p>
              <div style={{position:"relative",top:"-75px",left:"10px"}}><h2>ABOUT</h2>
              <p  style={{position:"relative",top:"-15px",fontSize:"19px",color:"grey"}}>Welcome to Our Hotel: A Haven of Comfort and Luxury

              At  {roomDetails.data.name}, we believe that a stay away from home should be more than just a temporary residence; it should be an experience to cherish and remember. Nestled in the
               heart of {roomDetails.data.location} , 
               our hotel stands as a beacon of hospitality, offering unparalleled comfort and luxury to our esteemed guests.</p>

              </div>

              <div style={{display:"flex",position:"relative",top:"-85px",left:"10px"}}>
              <div style={{width:"510px",borderRight:"2px solid grey"}}>
              <p style={{fontSize:"20px"}}>Availability of {roomDetails.data.amenities.join(", ")}</p>
             
              <p style={{fontSize:"20px"}}>ExtraBedCharge: ₹{roomDetails.data.childAndExtraBedPolicy.extraBedCharge}</p>
              <p style={{fontSize:"20px"}}>AvgCostPerNight: ₹{roomDetails.data.avgCostPerNight.toFixed(2)}</p>
              </div>
              <div style={{width:"510px",borderRight:"2px solid grey",marginLeft:"20px"}}>
              <p style={{fontSize:"20px"}}>ExtraBedCharge for quest : {roomDetails.data.childAndExtraBedPolicy.extraBedForAdditionalGuest ? 'Yes provided' : 'Not provided'}</p>
              <p style={{fontSize:"20px"}}>ExtraBedCharge  for child : {roomDetails.data.childAndExtraBedPolicy.extraBedProvidedForChild ? 'Yes provided' : 'Not provided'}</p>
              <p style={{fontSize:"20px"}}>{roomDetails.data.houseRules.houseRulesunmarriedCouplesAllowed?"Unmarried couples allowed":" Unmarried couples are not allowed"}</p>
              </div>
            

              <div style={{width:"510px",marginLeft:"20px"}}>
               
                <p style={{fontSize:"20px"}}>IdProofs Accepted : {roomDetails.data.houseRules.restrictions.idProofsAccepted.join(", ")  }</p>
              
                <p style={{fontSize:"20px"}}>Pets are : {roomDetails.data.houseRules.restrictions.petsAllowed?" allowed":" not allowed" }</p>
                <p style={{fontSize:"20px"}}>Smoking  : {roomDetails.data.houseRules.restrictions.smokingAllowed?" allowed":" not allowed" }</p>
                </div>
               
              </div>
              <div style={{width:"1550px",height:"",backgroundColor:"#EC5B24",boxShadow:"0px 10px 8px grey",borderRadius:"15px",position:"relative",top:"-45PX"}} >.</div>
              <div className="image-gallery" style={{boxShadow:"0px 10px 8px grey",borderRadius:"15px"}}>
              {roomDetails.data.images.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Hotel Image ${index}`}  style={{width:"370px",height:"300px",paddingLeft:"20px",borderRadius:"15px"}}/>
              ))}
            </div>
            {roomDetails.data.rooms.map((room, index) => (
                <div key={index} className="room-details" style={{borderRadius:"15px",padding:"5px",border:"2px solid #EC5B24"}}>
                <div style={{display:"flex"}}>
                <div style={{width:"510px",borderRight:"2px solid grey",marginLeft:"20px"}}>
                <h1> Room No:{room.roomNumber}</h1>
                <p style={{color:"#EC5B24",fontSize:"30px",fontWeight:"700"}}> {room.roomType}</p>
                <p style={{fontSize:"30px"}}>Room Size: {room.roomSize} sq.ft.</p>
                <p style={{fontSize:"25px"}}>Bed: {room.bedDetail}</p>
                </div>
                <div  style={{width:"510px",borderRight:"2px solid grey",marginLeft:"20px",position:"relative",bottom:"-30px"}}>
                <p style={{fontSize:"25px"}}>Base Cost: ₹{room.costDetails.baseCost}</p>
                <p style={{fontSize:"25px"}}>Discount: ₹{room.costDetails.discount}</p>
                <p style={{fontSize:"25px"}}>TaxesAndFees: ₹{room.costDetails.taxesAndFees}</p>
                <p style={{fontSize:"25px"}}>CostPerNight: ₹{room.costPerNight}</p>
                </div>
                <div>      
                <button onClick={() => handleReserveRoom(room)} style={{width:"200px",height:"50px",position:"relative",bottom:"-150px",right:"-150px",backgroundColor:"#EC5B24",color:"white",fontSize:"25px"}}>
                Reserve Room</button>  
                </div> 
                </div>
               <div style={{backgroundColor:"#EC5B24",color:"white",width:"1590px",height:"40px",fontSize:"25px",borderRadius:"15px"}}>
               <p style={{position:"relative",right:"-550px"}}>{room.cancellationPolicy}</p></div>   
                </div>
              ))} 
            </div>
          )}
        </div>
        
        </div>
        <div className=' mainhotel'>
        <div
        className="mainhotel1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hotel && hotel.images && (
          <img className="mainhotel1img" src={hotel.images[currentImageIndex]} alt={`Hotel Image ${currentImageIndex}`} style={{width:"340px",height:"280px"}}/>
        )}
      </div>
        
        <div className='mainhotel2'>
        <p className='headhotel'>{hotel.name} </p>
        <p className='parahotel'>{hotel.location}</p>
        <p id='rating'>{hotel.rating} Rating</p>
        <p className='amen'>{hotel.amenities.join(', ')}</p>
        <p> {hotel.rooms.length > 0 && (
            <div>
              <p className='amenn'>{hotel.rooms[0].cancellationPolicy}</p>
              
            </div>
          )}</p>
        </div>
       
        
        <div className='mainhotel3'>
                               {hotel.rooms.length > 0 && (
                                <div className='llm'>
                                  
                                  <p className='pbooking'> Rs.{hotel.avgCostPerNight.toFixed(2)}</p>
                                  <p className='ppbooking'>Cost per Night</p>
                                  <p className='pppbooking'>excluding taxes and fees </p>
                                  <button  onClick={handleBookNow} className='hotbooking' >show availability</button>
                                   
                                </div>
                              )}
         </div>
        </div>
       
        </div>  
        {!setRoomAvailability&&
  <section className="section-card section-card-transparent" style={{backgroundColor:"whitesmoke"}}>
  <h2 className="why-ixigo-heading">
  IRCTC Train Ticket Booking on ixigo</h2>
  <div className="why-ixigo-subheading">
  <h3 className='headingirctc'>IRCTC Authorised Partner</h3>
  <img className="imgtr" src="https://images.ixigo.com/image/upload/f_auto/train/760e6e3b2f500e9c0a6436e330240cf8-rodkb.png" alt="Enjoy" width="50" height="50"/>
  </div>

  <div className="why-ixigo-container">
    <div className='coloftrain'>
    <div className="widget-item-content-row">
    <img className="" src="https://images.ixigo.com/image/upload/f_auto/train/ecb835b55223186c49d55750b422ed10-oscpe.png" alt="₹0 Payment Gateway Fee on Train tickets" title="₹0 Payment Gateway Fee on Train tickets" width="70" height="70"/>
    <div className="widget-item-content-text">
    <h3 className="tile-heading">
    <span>₹</span>0 Payment Gateway Fee on Payments via UPI</h3>
    </div>
    </div>
                <div className="widget-item-content-row">
                <img className="" src="https://images.ixigo.com/image/upload/f_auto/801ca10aa0964d95bdcd76df1573b5e1-hlzsy.png" alt="Hassle-Free Cancellation on Train tickets" title="Hassle-Free Cancellation on Train tickets" width="70" height="70"/>
                <div className="widget-item-content-text"><h3 className="tile-heading">ixigo Assured: Free Cancellation of Train Tickets</h3>
                </div>
                </div>
    
    </div>
      <div className='coloftrain1'> 
          <div class="widget-item-content-row">
          <img className="" src="https://images.ixigo.com/image/upload/f_auto/train/a21427142a38e7331574b034aa4a687a-lwpxr.png" alt="Instant Refund on IRCTC Train Cancellation" title="Instant Refund on IRCTC Train Cancellation" width="70" height="70"/>
          <div className="widget-item-content-text">
          <h3 className="tile-heading">Instant Refund on Indian Railway Reservation Cancellation</h3>
          </div>
          </div>
                  <div className="widget-item-content-row">
                  <img className="" src="https://images.ixigo.com/image/upload/f_auto/train/d522fcf3866c18b343060ab3cb49b3b1-xnmqx.png" alt="24*7 Customer Support for train booking" title="24*7 Customer Support for train booking" width="70" height="70"/>
                  <div className="widget-item-content-text">
                  <h3 className="tile-heading">24*7 Support for IRCTC Train Ticket Booking</h3>
                  </div>
                  </div>
                  </div> 
  </div>
 
  </section>
}
     
    </div>
  )
}

export default HotelCard
