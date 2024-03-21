import React, { useEffect, useState } from 'react';
import FlightComponent from './FlightComponent'; 

// Importing the FlightComponent
import "../styles/flight.css"
import Phone from "./Phone.png";
import offerflight from "./offerflight.png";
import airstatus from "./airstatus.png";
import airalter from "./airalter.png";
import aircar from "./aircar.png";
import aircard from "./aircard.png";
import airinsurance from "./airinsurance.png";
import airplan from "./airplan.png";
import airvisa from "./airvisa.png";
const FlightsPage = () => {
  const [flightOffers, setFlightOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
  const [searchParams, setSearchParams] = useState({
    from: "",
    fromCity: "",
    to: "",
    toCity:"",
    departureDate: "",
    numTravelers: 1,
    classOption: "option1"
  });
  const [fromAirportOptions, setFromAirportOptions] = useState([]);
  const [fromAirportInfo, setFromAirportInfo] = useState(null);
  const [toAirportOptions, setToAirportOptions] = useState([]);
  const [toAirportInfo, setToAirportInfo] = useState(null);
  const [error, setError] = useState(null);
  const [flightComponents, setFlightComponents] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
//searcing API------------------------------------------------------------------------------------------------------------------------------------
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { from, to, departureDate } = searchParams;
      console.log(searchParams);
      const departureDay = new Date(searchParams.departureDate);
      const dayofweek = departureDay.getDay();
      const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = daysofweek[dayofweek];
      
      if (!from || !to || !departureDate) throw new Error("Please fill out all fields");

      const url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}`;
      
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
      const flights = data.data.flights;
      console.log(data);
      
      const flightComponents = flights.map((flight, index) => (
        <FlightComponent key={index} flight={flight} searchParams={searchParams} />
      ));
      setFlightComponents(flightComponents);
      setSearchPerformed(true); 
      
    } catch (error) {
      setError('There was a problem with the search');
      console.error('There was a problem with the search:', error);
    }
  }
//HANDLING OFFERS-------------------------------------------------------------------------------------------------------------------------
  const handleOffer = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"FLIGHTS"}`, {
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
      console.log(setFlightOffers);
    } catch (error) {
      setError('There was a problem with fetching flight offers');
      console.error('There was a problem with fetching flight offers:', error);
    }
  };

  useEffect(() => {
    handleOffer();
  }, []); // Run only once on component mount

  // Get current items based on pagination------------------------------------------------------------------------------------------------
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = flightOffers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (newPage) => setCurrentPage(newPage);
  //searching from airport**********************************************************************************************************************

  const searchFromAirport = async (value) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${value}"}`, {
        method: "GET",
        headers: {
          projectID: "98a26mr3rzw8",
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      const firstAirport = data?.data?.airports[0];
      setFromAirportOptions(data?.data?.airports || []);
      
      // Set the from value with the iata_code
      setSearchParams(prevState => ({
        ...prevState,
        from: firstAirport ? firstAirport.iata_code : '',
        
      }));
    } catch (error) {
      setError('There was a problem with fetching airport information');
      console.error('There was a problem with fetching airport information:', error);
    }
  }
//serching to AIRPORT++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const searchToAirport = async (value) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${value}"}`, {
        method: "GET",
        headers: {
          projectID: "98a26mr3rzw8",
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      const firstAirport = data?.data?.airports[0];
      setToAirportOptions(data?.data?.airports || []);
      
      // Set the to value with the iata_code
      setSearchParams(prevState => ({
        ...prevState,
        to: firstAirport ? firstAirport.iata_code : '',
        toCity: firstAirport ? firstAirport.city : '',
      }));
    } catch (error) {
      setError('There was a problem with fetching airport information');
      console.error('There was a problem with fetching airport information:', error);
    }
  }
//------------------------***************************************------------------------------------------------------
  const handleAirportSelect = (airport, location) => {
    if (location === 'from') {
      setFromAirportInfo(airport);
      if (airport && airport.iata_code) {
        setSearchParams(prevState => ({
          ...prevState,
          from: airport.iata_code
        }));
      }
      setFromAirportOptions([]);
    } else if (location === 'to') {
      setToAirportInfo(airport);
      if (airport && airport.iata_code) {
        setSearchParams(prevState => ({
          ...prevState,
          to: airport.iata_code
        }));
      }
      setToAirportOptions([]);
    }
  }

  const handleSearchParamsChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
//********************************FILTERS BASED ON LOW TO HIGH PRICE************************************************************
const handleButton1Click = async () => {
  const { from, to, departureDate } = searchParams;
  const departureDay = new Date(searchParams.departureDate);
  const dayofweek = departureDay.getDay();
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysofweek[dayofweek];
  
  if (!from || !to || !departureDate) throw new Error("Please fill out all fields");
  try {
    const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}&sort={"price":1}`, {
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
    console.log("f",data);
    const flights = data.data.flights;
    console.log(flights);
    flights.sort((a, b) => a.ticketPrice - b.ticketPrice);

    const sortedFlightComponents = flights.map((flight, index) => (
      <FlightComponent key={index} flight={flight} searchParams={searchParams} />
    ));
    setFlightComponents(sortedFlightComponents);
  } catch (error) {
    setError('There was a problem with sorting flights by price');
    console.error('There was a problem with sorting flights by price:', error);
  }
};


const handleButton2Click = async () => {
  const { from, to, departureDate } = searchParams;
  const departureDay = new Date(searchParams.departureDate);
  const dayofweek = departureDay.getDay();
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysofweek[dayofweek];
  
  if (!from || !to || !departureDate) throw new Error("Please fill out all fields");
  try {
    const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}&sort={"price":1}`, {
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
    const flights = data.data.flights;
    console.log(flights);
    flights.sort((a, b) => a.stops - b.stops);

    const sortedFlightComponents = flights.map((flight, index) => (
      <FlightComponent key={index} flight={flight} searchParams={searchParams} />
    ));
    setFlightComponents(sortedFlightComponents);
  } catch (error) {
    setError('There was a problem with sorting flights by price');
    console.error('There was a problem with sorting flights by price:', error);
  }
};

const handleButton3Click = async () => {
  const { from, to, departureDate } = searchParams;
  const departureDay = new Date(searchParams.departureDate);
  const dayofweek = departureDay.getDay();
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysofweek[dayofweek];
  
  if (!from || !to || !departureDate) throw new Error("Please fill out all fields");
 try {
    const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}&sort={"price":1}`, {
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
    const flights = data.data.flights;
    console.log(flights);
    flights.sort((a, b) => a.duration - b.duration);

    const sortedFlightComponents = flights.map((flight, index) => (
      <FlightComponent key={index} flight={flight} searchParams={searchParams} />
    ));
    setFlightComponents(sortedFlightComponents);
  } catch (error) {
    setError('There was a problem with sorting flights by price');
    console.error('There was a problem with sorting flights by price:', error);
  }
};

  return (
    <div className='container'>
    <div className='flightmain'>
    <div className='running'>
        <div className='flightoneway'>One Way</div>
        
    
    <div className="style_scrollingWordBox__F_1N8">
    <ul className="style_scrollingWordBoxUlInput__efDeh">
        <li className="style_scrollingWordBoxUlListInput__1zls5 !justify-end">
            <p className="body-sm flex gap-5">
                <img width="1em" height="1em" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" src={Phone} data-testid="CallFilledIcon" className="h-20 w-20 text-green-500" style={{ display: "inline-block"}}/>
                24x7 Customer Support
            </p>
        </li>
        <li className="style_scrollingWordBoxUlListInput__1zls5 !justify-end">
            <p className="body-sm flex gap-5">
                <img width="1em" height="1em" font-size="1.5rem" fill="currentColor" viewBox="0 0 24 24" src="https://edge.ixigo.com/st/vimaan-desk/_next/static/media/thumbsUpFilled.3988027e.svg" data-testid="CallFilledIcon" className="h-20 w-20 text-green-500" style={{display:"inline-block"}}/>
                Hassle-Free Bookings
            </p>
        </li>
        <li className="style_scrollingWordBoxUlListInput__1zls5 !justify-end">
            <p className="body-sm flex gap-5">
                <img width="1em" height="1em" font-size="1.5rem" fill="currentColor" viewBox="0 0 24 24" src={offerflight} data-testid="CallFilledIcon" className="h-20 w-20 text-green-500" style={{display:"inline-block"}}/>
                Best Flight Offers
            </p>
        </li>

       
    </ul>
</div>


</div>
      <section className="main-search-panel">
        <form id="flight-search-form" onSubmit={handleSearch}>
          <label className='labelip' htmlFor="from">From:</label>
          <input type="text" className='ipfrom' id="from" name="from" required onChange={(e) => searchFromAirport(e.target.value)} value={searchParams.from} />
          
          <label className='labelip' htmlFor="to">To:</label>
          <input type="text" id="to" name="to" className='ipfrom' required onChange={(e) => searchToAirport(e.target.value)} value={searchParams.to} />
          <label className='labelip' htmlFor="departure-date">Departure:</label>
          <input type="date" className='ipfrom' id="departure-date" name="departureDate" required onChange={handleSearchParamsChange} />
          <label className='labelip' htmlFor="num-travelers">Travelers:</label>
          <input type="number" className='ipfrom' id="num-travelers" name="numTravelers" min="1" required onChange={handleSearchParamsChange} />
          <label className='labelip' htmlFor="class-options">Class</label>
          <select id="class-options" className='ipfrom' name="classOption" required onChange={handleSearchParamsChange}>
            <option value="option1">Economy</option>
            <option value="option2">Premium Economy</option>
            <option value="option3">Business</option>
          </select>
          <button type='submit' className='labelipp'>Search</button>
        </form>
      </section>
      <div className='srcdes'>
        <div className='src'>
          {fromAirportOptions.length > 0 && (
            <ul className='airport-options-list'>
              {fromAirportOptions.map((airport, index) => (
                
                <li className='airport-option1' key={index} onClick={() => handleAirportSelect(airport, 'from')}>
                  {airport.city}, {airport.country}
                </li>
              ))}
            </ul>
          )}

          {fromAirportInfo && (
            <div>
              <b>From: {fromAirportInfo.name}, {fromAirportInfo.city}</b><br />
            </div>
          )}
        </div>

        <div className='desc'>
          {toAirportOptions.length > 0 && (
            <ul className='airport-options-list'>
              {toAirportOptions.map((airport, index) => (
                <li className='airport-option' key={index} onClick={() => handleAirportSelect(airport, 'to')}>
                  {airport.city}, {airport.country}
                </li>
              ))}
            </ul>
          )}

          {toAirportInfo && (
            <div>
              <b>To: {toAirportInfo.name}, {toAirportInfo.city}</b><br />
            </div>
          )}
        </div>
      </div>
      </div>
     

      {error && <p>{error}</p>}
    
      {searchPerformed && (
        <div className="buttons-container">
        <p className='sort'>
        FILTERS
        </p>
        
          <button onClick={handleButton1Click}> Price</button>
          <button onClick={handleButton2Click}>Stops</button>
          <button onClick={handleButton3Click}>Duration</button>
        </div>
      )}
      
     
      <div id="flights-container">
        {flightComponents}
      </div>
      
      <section className="advertisement">
       
      </section>
       
      
      <h2 className='domore'>Do More With ixigo</h2>
      <div className='staticorder'>
      <div className='staticorder1'><img src={airstatus} className='air'/><p className='airp'>Flight Status</p></div>
      <div className='staticorder1'><img src={aircard} className='air'/><p className='airp'>Credit Card</p></div>
      <div className='staticorder1'><img src={airplan} className='air'/><p className='airplane'>Plan</p></div>
      <div className='staticorder1'><img src={aircar} className='air'/><p className='airpp'>Cabs</p></div>
      <div className='staticorder1'><img src={airinsurance} className='air2'/><p className='airpt'>Travel Insurance</p></div>
      <div className='staticorder1'><img src={airvisa} className='air'/><p className='airp'>Book Visa</p></div>
      
      <div className='staticorder2'><img src={airalter} className='air1'/><p className='airp'>Fare Alters</p></div>
      </div>
      <div>
      {!searchPerformed&&(<div>
        <h2>Flight Booking Discount Offers</h2>
      <div  className='fixedimg'>
      <img src='https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fa%2Fc001c659524150c90923a6dcb1f6a6c3-ghowy.png&w=384&q=75' className='fixedimg1'/>
      <img src='https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fa%2Fa9f66a9464f33313833d98588fc478f7-jazbe.png&w=384&q=75' className='fixedimg1'/>
      <img src='https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fa%2Fb3900b115a9d72138def23d70c178fe4-otsce.png&w=384&q=75' className='fixedimg1'/>
      <img src='https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Fa%2Fef528852d0ace334ea45a3269035bbea-hikuv.png&w=384&q=75' className='fixedimg1'/>
      </div>
        </div>)}
      </div>
      <section className="flight-offers">
        <h2 className='domore'  onClick={handleOffer}>Best Flight Booking Offers</h2>
        <div  className="flight-offers-list">
          {currentItems.map((offer, index) => (
            <div key={index} className="flight-of">
              <p className='poff'>{offer.pTl}</p>
              <img src={offer.newHeroUrl} alt={offer.lobDisplayText} />
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

export default FlightsPage;
