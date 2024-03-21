import React ,{useState}from 'react'
import Booktrainpage from './Booktrainpage';


const TrainCard =({ train, searchParams }) =>{
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedtrainId, setConfirmedtrainId] = useState(null);

    const { trainName, trainNumber, source, destination, departureTime, arrivalTime, travelDuration, fare, availableSeats, coaches ,trainType, daysOfOperation } = train;
    const {  date } = searchParams || {};
    const calculateArrivalDate = (date, departureTime, travelDuration) => {
      // Your existing code for calculating arrival date
      
            const departureDateTime = new Date(date + 'T' + departureTime);
            const durationHours = parseFloat(travelDuration); // Parse the duration as float
            const durationMilliseconds = durationHours * 60 * 60 * 1000; // Convert duration to milliseconds
            let arrivalDateTime = new Date(departureDateTime.getTime() + durationMilliseconds);
          
            // Check if the arrival time exceeds 24 hours
            if (arrivalDateTime.getDate() !== departureDateTime.getDate()) {
              // If arrival date is different, add one day to the departure date
              arrivalDateTime.setDate(departureDateTime.getDate() + 1);
            }
          
            
            return arrivalDateTime.toISOString().slice(0, 10);
    };
    const bookingtrain = () => {
      
      setBookingConfirmed(true);
      setConfirmedtrainId(train._id);
    };
    
  return (
    <div className='cardppppp'>
    <div>{bookingConfirmed && (
      <Booktrainpage train={train} trainId={confirmedtrainId} arrivalTime= {calculateArrivalDate(searchParams.date, train.departureTime, train.travelDuration)}  searchParams={searchParams}  onClose={() => setBookingConfirmed(false)}/>
    )}</div>
    <div className="train-card">
    
    <div className='traincard1div' style={{display:"flex",flexDirection:"row"}}>

    <div className='item1'> 
    <div className='item1A'style={{display:"flex",gap:"50px"}}>
    <p  className='item1Aa'>{trainNumber}</p>
    <p  className='item1Ab'>{trainName}</p>
    </div>
    <div className='item1B' style={{display:"flex",gap:"70px"}}>
    <p className='item1Ba'>Runs on: {daysOfOperation.join(', ')}</p>
    <p className='item1Bb'>Type:{trainType}</p>
    </div>
    </div>

        <div className='item2'style={{display:"flex" }}>
        <div className='item2A'>
        <p className='item2Aa'>{source}</p>
        <p className='item2Ab'>{departureTime}</p>
        <p className='item2Ac'>{date}</p>
        </div>
        <div className='item2B'>
        <p className='item2Ba'>{travelDuration}</p>
        <p className='item2Bb'>-------------------------------------</p>
        
        </div>
        <div className='item2C'>
        <p className='item2Ca'>{destination}</p>
        <p className='item2Cb'>{arrivalTime}</p>
        <p className='item2Cc'>{calculateArrivalDate(searchParams.date, departureTime, travelDuration)}</p>
        </div>
          <div><button className='BOOKNOWFORTRAINS' onClick={bookingtrain}>BOOK NOW</button>
          </div>
        </div>
    </div>
    <div className='priceitem' style={{display:"flex"}}>
    <div className='priceitem1'>
    <p className='priceitem1A'>Fare: {fare}</p>
    <p className='priceitem1B'>Available Seats: {availableSeats}</p>
    </div>
    <div  className='priceitem2' style={{display:"flex"}}>
    {coaches.map((coach,index)=>(
      <div key={index} className='priceitem2A'>
      <p>Coach Type:{coach.coachType}</p>
      <p>Seats:{coach.numberOfSeats}</p>
      
      </div>

    ))}
    </div>
    </div>
    
    
    
    
    
    
    </div>
    </div>
  )
}

export default TrainCard ;