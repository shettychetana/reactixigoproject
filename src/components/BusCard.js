import { useState } from 'react'
import React from 'react'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import Bookbuspage from './Bookbuspage';

const BusCard=({bus,searchParams})=>{
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedbusId, setConfirmedbusId] = useState(null);
  const {source,destination,ratings,_id,name,type,seats,fare,amenities,available,departureTime,arrivalTime}=bus;
  const {  date } = searchParams || {};

 
    const bookingbus = () => {
      
      setBookingConfirmed(true);
      setConfirmedbusId(bus._id);
    };
    function calculateTimeDifference(departureTime, arrivalTime) {
      // Splitting the time strings to get hours and minutes
      const departureParts = departureTime.split(":");
      const arrivalParts = arrivalTime.split(":");
    
      // Parsing hours and minutes to integers
      const departureHours = parseInt(departureParts[0]);
      const departureMinutes = parseInt(departureParts[1]);
      const arrivalHours = parseInt(arrivalParts[0]);
      const arrivalMinutes = parseInt(arrivalParts[1]);
    
      // Calculating total minutes for departure and arrival times
      const departureTotalMinutes = departureHours * 60 + departureMinutes;
      const arrivalTotalMinutes = arrivalHours * 60 + arrivalMinutes;
    
      // Calculating the time difference
      let timeDifference = arrivalTotalMinutes - departureTotalMinutes;
    
      // Handling cases where the arrival time is on the next day
      if (timeDifference < 0) {
          timeDifference += 24 * 60; // Adding 24 hours in minutes
      }
    
      // Converting the time difference to hours and minutes
      const hoursDifference = Math.floor(timeDifference / 60);
      const minutesDifference = timeDifference % 60;
    
      // Returning the time difference as an object
      return {
          hours: hoursDifference,
          minutes: minutesDifference
      };
    }
    

    
    const timeDifference = calculateTimeDifference(departureTime, arrivalTime);
    
    
    const calculateArrivalDate = (date, departureTime, timeDifference) => {
      try {
        // Parse departure date and time
        const departureDateTime = new Date(date + 'T' + departureTime);
    
        // Parse time difference (assuming timeDifference is an object with hours and minutes properties)
        const durationHours = parseInt(timeDifference.hours);
        const durationMinutes = parseInt(timeDifference.minutes);
    
        // Calculate total duration in milliseconds
        const durationMilliseconds = (durationHours * 60 + durationMinutes) * 60 * 1000;
    
        // Calculate arrival date/time
        let arrivalDateTime = new Date(departureDateTime.getTime() + durationMilliseconds);
    
        // Ensure arrival date is valid
        if (isNaN(arrivalDateTime.getTime())) {
          throw new Error('Invalid arrival date/time');
        }
    
        // Check if the arrival time exceeds 24 hours
        if (arrivalDateTime.getDate() !== departureDateTime.getDate()) {
          // If arrival date is different, add one day to the departure date
          arrivalDateTime.setDate(departureDateTime.getDate() + 1);
        }
    
        // Format the arrival date as ISO string
        return arrivalDateTime.toISOString().slice(0, 10);
      } catch (error) {
        console.error('Error calculating arrival date:', error);
        return ''; 
      }
    };
    
 
  return(
    <div className='bus'>
    <div>{bookingConfirmed && (
      <Bookbuspage bus={bus} busId={confirmedbusId} arrivalTime= {calculateArrivalDate(searchParams.date, departureTime, timeDifference)}  searchParams={searchParams}  onClose={() => setBookingConfirmed(false)}/>
    )}</div>
      <div className='busdiv1'>
      
      <div className='busdiv1-c1' style={{display:"flex"}}>
      <div className=' busdiv1-c1_c1'>
      
      <p  style={{fontSize:"20px",fontWeight:"600"}}>{name}</p>
      <p className='pbus'>{type}</p>

      <div className='busstar' style={{display:"flex"}}>
      <p className='bustar1'><StarOutlineRoundedIcon/></p>
      <p className='busstar1'>{ratings}</p>
      </div>
      
      
      <p className='busamenties'>{amenities.join(', ')}</p>
     
      </div>
      
     
      <div className='busdiv1-c1_c2'>
      <p className='bus2Aa'>{source}</p>
      <p className='bus2Ab'>{departureTime}</p>
      <p className='bus2Ac'>{date}</p>
      </div>

      <div className='busdiv1-c1_c'>
     
      <p className='bus2Ba'>----{timeDifference.hours}:{timeDifference.minutes} hours----</p>
      
      </div>
      <div className='busdiv1-c1_c2'>
      <p className='bus2Aa'>{destination}</p>
      <p className='bus2Ab'>{arrivalTime}</p>
      <p className='bus2Ac'>{calculateArrivalDate(searchParams.date, departureTime, timeDifference)}</p>
      </div>
      </div>
      
      
      


     
      
       <div className='itbusdiv1-c1_c4'>
       <p className='startbus'>Starting at</p>
       <p className='busfare'>₹{fare}</p>
       <p className='save'>Save ₹200</p>
       
       <button className='busseats' onClick={bookingbus}>Seats</button>
      </div>
      
      </div>
      
    </div>
  )


}

export default BusCard
