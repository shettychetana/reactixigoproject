import React, { useState, useEffect } from 'react';
import compareBookWhite from "./compareBookWhite.png";
import "../styles/trainss.css";
import TrainCard from './TrainCard';

const TrainsPage = () => {
  const [flightOffers, setFlightOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });

  const [trainComponents, setTrainComponents] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  console.log(searchParams)
  const handlepricelow = async () => {
    const { from, to, date } = searchParams;
    const departureDay = new Date(searchParams.date);
    const dayofweek = departureDay.getDay();
    const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = daysofweek[dayofweek];
    
    if (!searchParams.from || !searchParams.to || !searchParams.date) throw new Error("Please fill out all fields");
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          projectID: "98a26mr3rzw8"
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
      const trains = data.data.trains;
      console.log(trains);
      trains.sort((a, b) => a.fare - b.fare);
  
      const sortedtrainComponents = trains.map((train, index) => (
        <TrainCard key={index} train={train} searchParams={searchParams} />

      ));
      setTrainComponents(sortedtrainComponents);
    } catch (error) {
      
      console.error('There was a problem with sorting flights by price:', error);
    }
  };
  const handlepricehigh= async () => {
    const { from, to, date } = searchParams;
    const departureDay = new Date(searchParams.date);
    const dayofweek = departureDay.getDay();
    const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = daysofweek[dayofweek];
    
    if (!searchParams.from || !searchParams.to || !searchParams.date) throw new Error("Please fill out all fields");
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          projectID: "98a26mr3rzw8"
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
      const trains = data.data.trains;
      console.log(trains);
      trains.sort((a, b) => b.fare - a.fare);
  
      const sortedtrainComponents = trains.map((train, index) => (
        <TrainCard key={index} train={train} searchParams={searchParams} />
      ));
      setTrainComponents(sortedtrainComponents);
    } catch (error) {
      
      console.error('There was a problem with sorting flights by price:', error);
    }
  };
  
  
  const handleduration= async () => {
    const { from, to, date } = searchParams;
    const departureDay = new Date(searchParams.date);
    const dayofweek = departureDay.getDay();
    const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = daysofweek[dayofweek];
    
    if (!searchParams.from || !searchParams.to || !searchParams.date) throw new Error("Please fill out all fields");
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          projectID: "98a26mr3rzw8"
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
      const trains = data.data.trains;
      console.log(trains);
      trains.sort((a, b) => {
        const durationA = convertDurationToMinutes(a.travelDuration);
        const durationB = convertDurationToMinutes(b.travelDuration);
        return durationA - durationB; // Sort in descending order
      });
  
      const sortedtrainComponents = trains.map((train, index) => (
        <TrainCard key={index} train={train} searchParams={searchParams} />
      ));
      setTrainComponents(sortedtrainComponents);
    } catch (error) {
      
      console.error('There was a problem with sorting flights by price:', error);
    }
  };
  
  
  const handledurationhigh= async () => {
    const { from, to, date } = searchParams;
    const departureDay = new Date(searchParams.date);
    const dayofweek = departureDay.getDay();
    const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = daysofweek[dayofweek];
    
    if (!searchParams.from || !searchParams.to || !searchParams.date) throw new Error("Please fill out all fields");
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          projectID: "98a26mr3rzw8"
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
      const trains = data.data.trains;
      console.log(trains);
      trains.sort((a, b) => {
        const durationA = convertDurationToMinutes(a.travelDuration);
        const durationB = convertDurationToMinutes(b.travelDuration);
        return durationB - durationA; // Sort in descending order
      });
  
      const sortedtrainComponents = trains.map((train, index) => (
        <TrainCard key={index} train={train} searchParams={searchParams} />
      ));
      setTrainComponents(sortedtrainComponents);
    } catch (error) {
      
      console.error('There was a problem with sorting flights by price:', error);
    }
  };
  const convertDurationToMinutes = (duration) => {
    const parts = duration.split(' ');
    let totalMinutes = 0;
    for (const part of parts) {
      if (part.includes('h')) {
        totalMinutes += parseInt(part.replace('h', '')) * 60;
      } else if (part.includes('m')) {
        totalMinutes += parseInt(part.replace('m', ''));
      }
    }
    return totalMinutes;
  };
  


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const departureDay = new Date(searchParams.date);
      const dayOfWeek = departureDay.getDay();
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = daysOfWeek[dayOfWeek];

      const url = `https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          projectID: "98a26mr3rzw8"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const trains = data.data.trains;
      const trainComponents = trains.map((train, index) => (
        <TrainCard key={index} train={train} searchParams={searchParams}/>
      ));
      setTrainComponents(trainComponents);
      setSearchPerformed(true);
    } catch (error) {
      console.error('There was a problem with the search:', error);
    }
  };

  const handleOffer = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"RAILS"}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          projectID: '98a26mr3rzw8'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFlightOffers(data?.data?.offers || []);
    } catch (error) {
      console.error('There was a problem with fetching flight offers:', error);
    }
  };

  useEffect(() => {
    handleOffer();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = flightOffers.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (newPage) => setCurrentPage(newPage);
 

  return (
    <div>
    
      <div>
        <img className='trainimage' src="https://images.ixigo.com/image/upload/misc/f3c5fc0564afd3390b0d7fedfba8e8c2-qsbuo.webp" alt="Train" />
        <img className='trainimg' src={compareBookWhite} alt="Train" />
        <p className='image-caption'>Train Ticket Booking</p>

        <div className='hotelip' style={{ position: "absolute", bottom: "200px", width: "100%"}}>
          <div className='hotelsearchh'>
            <p className='photel'>FROM</p>
            <input
              className='iphotel'
              type='text'
              name='from'
              value={searchParams.from}
              onChange={handleInputChange}
              placeholder='FROM'
            />
          </div>
          <div className='hotelsearch'>
            <p className='photel'>TO</p>
            <input
              className='iphotel'
              type='text'
              name='to'
              value={searchParams.to}
              onChange={handleInputChange}
              placeholder='TO'
            />
          </div>
          <div className='hotelsearch'>
            <p className='photel'>DATE</p>
            <input
              className='iphotel'
              type='date'
              name='date'
              value={searchParams.date}
              onChange={handleInputChange}
              placeholder='Date'
            />
          </div>
          <div className='btnhotel'>
            <button className='btnsearching' onClick={handleSearch}>Search</button>
          </div>
        </div>
        {!searchPerformed&&
          <div className="render">
          <div className="heading455">
          <span className="checkbox-list">
          <div className="checkbox-list-item ">
          <span className="checkbox-button">
          <span className="ixi-icon-tick"></span>
          </span>
          <span className="label-top">
          <div>Get a full refund on cancellation
          <img height="20" width="16" alt="Free Train Cancellations" title="Free Train Cancellations" className="fc-nudge-shield" src="https://www.ixigo.com/image/upload/fcRelated/8035f73dc62e7ed58a05b30805b4bf59-bhtst.gif"/>
          </div>
          </span>
          </div>
          </span>
          </div>
          <div className="sub-heading">
          <div className="benifits">₹0 cancellation fee.</div>
          <div className="benifits">Instant refunds, no questions asked </div>
          <div className="benifits">24*7 premium customer support </div>
          <div className="benifits">No documentation required .</div>
          </div>
          </div>}
      </div>
      {!searchPerformed&&
        <section className="section-card section-card-transparent" style={{backgroundColor:"whitesmoke",position:"relative",top:"-116px"}}>
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
      
      {searchPerformed && (
        <div className='lowtohigh'>
        <div className='pricelowtohigh'>price
        <button onClick={handlepricelow} className='pricelow'> low</button>
        <button onClick={handlepricehigh}  className='pricelow'>high</button>
        </div>
        
        <div className='duartionlowtohigh'>duration
        <button onClick={handleduration}  className='pricelow'> low</button>
        <button onClick={handledurationhigh}  className='pricelow'> high</button>
        </div>
        </div>
      )}
      <div id="flights-container">
      {trainComponents }
    </div>
      
      <section className="flight-offers">
        <h2 className='domore' onClick={handleOffer}>Best Flight Booking Offers</h2>
        <div className="flight-offers-list">
          {currentItems.map((offer, index) => (
            <div key={index} className="flight-of">
              <p className='poff'>{offer.pTl}</p>
              <img src={offer.newHeroUrl} alt={offer.lobDisplayText} style={{ width: "220px", height: "200px" }} />
              <p className='poff'>{offer.pTx}</p>
              <p><a href="#">{offer.tncCtaText}</a></p>
            </div>
          ))}
        </div>
      </section>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= flightOffers.length}>Next</button>
      </div>
    </div>
  );
};

export default TrainsPage;
