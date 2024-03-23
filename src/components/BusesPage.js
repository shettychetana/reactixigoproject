import React,{useState,useEffect} from 'react'

import "../styles/Bus.css";
import BusCard from './BusCard';
function BusesPage() {
  const [flightOffers, setFlightOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });
  const [busComponents, setbusComponents] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  

  const handleOffer = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"CABS"}`, {
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


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const departureDay = new Date(searchParams.date);
      const dayOfWeek = departureDay.getDay();
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = daysOfWeek[dayOfWeek];

      const url = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}`;

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
      const buses = data.data.buses;
      console.log(buses);
      const busComponents = buses.map((bus, index) => (
        <BusCard key={index} bus={bus} searchParams={searchParams}/>
      ));
      setbusComponents(busComponents);
      setSearchPerformed(true);
    } catch (error) {
      console.error('There was a problem with the search:', error);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = flightOffers.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (newPage) => setCurrentPage(newPage);

//------------------------------------------------------------------------

const handlepricehigh = async () => {
  const departureDay = new Date(searchParams.date);
  const dayofweek = departureDay.getDay();
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysofweek[dayofweek];
  if (!searchParams.from || !searchParams.to || !searchParams.date) throw new Error("Please fill out all fields");
  try {
    const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}&sort={"fare":-1}`, {
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
    const buses = data.data.buses;
    console.log(buses);
    

    const sortedbusComponents = buses.map((bus, index) => (
      <BusCard key={index} bus={bus} searchParams={searchParams} />
    ));
    setbusComponents(sortedbusComponents);
  } catch (error) {   
    console.error('There was a problem with sorting flights by price:', error);
  }
};
const handlepricelow = async () => {
  const departureDay = new Date(searchParams.date);
  const dayofweek = departureDay.getDay();
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysofweek[dayofweek];
  if (!searchParams.from || !searchParams.to || !searchParams.date) throw new Error("Please fill out all fields");
  try {
    const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}&sort={"fare":1}`, {
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
    const buses = data.data.buses;
    console.log(buses);
    

    const sortedbusComponents = buses.map((bus, index) => (
      <BusCard key={index} bus={bus} searchParams={searchParams} />
    ));
    setbusComponents(sortedbusComponents);
  } catch (error) {   
    console.error('There was a problem with sorting  by price:', error);
  }
};

const handlenonac = async () => {
  const departureDay = new Date(searchParams.date);
  const dayofweek = departureDay.getDay();
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysofweek[dayofweek];
  if (!searchParams.from || !searchParams.to || !searchParams.date) throw new Error("Please fill out all fields");
  try {
    const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}&filter={"type":"Non-AC"}`, {
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
    const buses = data.data.buses;
    console.log(buses);
    

    const sortedbusComponents = buses.map((bus, index) => (
      <BusCard key={index} bus={bus} searchParams={searchParams} />
    ));
    setbusComponents(sortedbusComponents);
  } catch (error) {   
    console.error('There was a problem with sorting  by price:', error);
  }
};



const handleac = async () => {
  const departureDay = new Date(searchParams.date);
  const dayofweek = departureDay.getDay();
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysofweek[dayofweek];
  if (!searchParams.from || !searchParams.to || !searchParams.date) throw new Error("Please fill out all fields");
  try {
    const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${searchParams.from}","destination":"${searchParams.to}"}&day=${day}&filter={"type":"AC"}`, {
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
    const buses = data.data.buses;
    console.log(buses);
    

    const sortedbusComponents = buses.map((bus, index) => (
      <BusCard key={index} bus={bus} searchParams={searchParams} />
    ));
    setbusComponents(sortedbusComponents);
  } catch (error) {   
    console.error('There was a problem with sorting  by price:', error);
  }
};


/************************************************************************************************************************* */




  return (
    <div>
    <img className='busimage' src="https://media.istockphoto.com/id/855138150/vector/bus-stop-and-bus-on-city-background.jpg?s=170667a&w=0&k=20&c=c_ORf2RxhBMOnYSnFA4DxiVmp5Ve0XpQsW9eBjW_4P8=" alt="Train" />
    
    <p className='image-captionn' style={{color:"black"}}>Train Ticket Booking</p>
    <div className='hotelip' style={{ position: "absolute", bottom: "150px", width: "100%" }}>
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
        <div className='busmainpageaftersearch'>
        </div>
        {!searchPerformed&&(<div>
          <h2>Bus Booking Discount Offers</h2>
        <div  className='fixedimg'>
        <img src='https://static.abhibus.com/offerbanners/Jan2024/25/1706187559-KarnatkaRTC.webp' className='fixedimg1'/>
        <img src='https://static.abhibus.com/busgallery/offerbanners/Oct2023/31/1698753679-upsrtc-ixigo.webp' className='fixedimg1'/>
        <img src='https://static.abhibus.com/offerbanners/Mar2024/01/1709246907-win-an-iphone-bus-offer.webp' className='fixedimg1'/>
        <img src='https://static.abhibus.com/busgallery/offerbanners/May2022/18/1652881323-720-360.webp' className='fixedimg1'/>
        </div>
          </div>)}


             {searchPerformed&&(
              <div className="filterbus">
              <div className='filterbus1'>
              <div className='filterbus1div1'>Filters</div>

              <div className='filterbus1div2'>
              <p className='filterbus1div2para' >Price</p>
              <button className='filterbus1div2parabtn' onClick={handlepricehigh}>High</button>
              <button className='filterbus1div2parabtn' onClick={handlepricelow}>low</button>
              </div>
              <div className='filterbus1div3'>Bus Type
              <div style={{display:"flex"}}>
              <div  className='ac' onClick={handleac}><img src="https://th.bing.com/th/id/OIP.QSNDs78t4pbaEhh0zc0GtQHaG7?rs=1&pid=ImgDetMain" style={{height:"25px", weight:"25px"}}/><p>AC</p></div>
              <div className='nonac' onClick={handlenonac}><img src="https://th.bing.com/th/id/OIP.QSNDs78t4pbaEhh0zc0GtQHaG7?rs=1&pid=ImgDetMain" style={{height:"25px", weight:"25px"}}/><p>Non-AC</p></div>
              </div>
              </div>
              </div>
            </div>
             )}
              
            
         

          <div id="buscontainer">
          {busComponents }
        </div>


          <div>
          <h2>Why Choose ixigo for Bus Ticket Booking?</h2>
          <p style={{fontSize:"20px",color:"grey"}}>ixigo Bus Booking is powered by AbhiBus which is India’s fastest growing online ticket booking platform. AbhiBus is the official ticketing partner 
          of several State Road Transport Corporation (SRTC) operators
           and over 3500+ private bus partners covering more than 100,000 bus routes</p>
           <div style={{display:"flex",marginLeft:"50px"}}>
              <div className='staticimg'>
              <img src="https://adits.com.au/wp-content/uploads/2023/03/route-icon.jpg" alt="hi" style={{width:"100px",height:"100px"}}/>
              <div style={{display:"flex",flexDirection:"column"}}>
              <h3>1,00,000+ Bus Routes</h3>
              <p>offering unparalleled choices for your travel needs</p>
              </div>
              </div>
              <div className='staticimg'>
              <img src="https://th.bing.com/th/id/R.6990307ba0856da7a2a02fbf6a201247?rik=PKiP4WJKGv53Ow&riu=http%3a%2f%2fnebula.wsimg.com%2f572987e9a3804d0e81be950c156bbb04%3fAccessKeyId%3d9E919CD400BCF69A0E80%26disposition%3d0%26alloworigin%3d1&ehk=p16gyQl2rdXrD83VhiJ%2blGNZcW9zjCKp6oT8DszsqSQ%3d&risl=&pid=ImgRaw&r=0" alt="hi" style={{width:"100px",height:"100px"}}/>
              <div style={{display:"flex",flexDirection:"column"}}>
              <h3>3500+ Bus Partners</h3>
              <p>ranging from State RTCs to private partners</p>
              </div>
              </div>
              <div className='staticimg'>
              <img src="https://www.rikvin.com/wp-content/uploads/2023/09/Share-and-Capital-Services-icons.webp" alt="hi" style={{width:"100px",height:"100px"}}/>
              <div style={{display:"flex",flexDirection:"column"}}>
              <h3>Fastest Bus Booking</h3>
              <p>swift and seamless bus ticket booking experience</p>
              </div>
              </div>
              <div className='staticimg'>
              <img src="https://th.bing.com/th/id/OIP.EhPg3mngl-fmhoiEsvm3LgHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain" alt="hi" style={{width:"100px",height:"100px"}}/>
              <div style={{display:"flex",flexDirection:"column"}}>
              <h3>Instant Refunds</h3>
              <p>with free cancellation when changing or cancelling your booking</p>
              </div>
              </div>
           </div>
          
          </div>
    <div className="pagination" >
    <section className="flight-offers">
    <h2 className='domore' onClick={handleOffer}>Best Bus Booking Offers</h2>
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
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= flightOffers.length}>Next</button>
      </div>



    </div>
  )
}

export default BusesPage
