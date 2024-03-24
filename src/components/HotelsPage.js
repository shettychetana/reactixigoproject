
import React, { useEffect, useState } from 'react';
import "../styles/hotel.css"
// import BookingModal from './BookingModal';
import HotelCard from "./HotelCard";




const HotelsPage = () => {
  const authToken = localStorage.getItem("authToken");
  const [flightOffers, setFlightOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    rooms: '',
    guests: ''
  });
  const [hotelComponents, setHotelComponents] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
 
  

  


  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Updating state:", name, value);
    setSearchParams({
      ...searchParams,
      [name]: value
    });
    console.log("Updated state:", searchParams);
  };
  const handleSearch = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchParams.destination}"}`, {
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
      console.log(data);
      const hotels = data.data.hotels;
      const hotelComponents = hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} searchParams={searchParams}/>
      ));
    setHotelComponents(hotelComponents);
      setSearchPerformed(true);
    } catch (error) {
      console.error('There was a problem with fetching offers:', error);
    }
  };
  const handleratelow = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchParams.destination}"}&sort={"avgCostPerNight":1}`, {
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
      console.log(data);
      const hotels = data.data.hotels;
      const hotelComponents = hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} searchParams={searchParams}/>
      ));
    setHotelComponents(hotelComponents);
      setSearchPerformed(true);
    } catch (error) {
      console.error('There was a problem with fetching offers:', error);
    }
  };
  const handleratehigh = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchParams.destination}"}&sort={"avgCostPerNight":-1}`, {
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
      console.log(data);
      const hotels = data.data.hotels;
      const hotelComponents = hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} searchParams={searchParams}/>
      ));
    setHotelComponents(hotelComponents);
      setSearchPerformed(true);
    } catch (error) {
      console.error('There was a problem with fetching offers:', error);
    }
  };
  const handleratinghigh = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchParams.destination}"}&sort={"rating":-1}`, {
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
      console.log(data);
      const hotels = data.data.hotels;
      const hotelComponents = hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} searchParams={searchParams}/>
      ));
    setHotelComponents(hotelComponents);
      setSearchPerformed(true);
    } catch (error) {
      console.error('There was a problem with fetching offers:', error);
    }
  };
  const handleratinglow = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${searchParams.destination}"}&sort={"rating":1}`, {
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
      console.log(data);
      const hotels = data.data.hotels;
      const hotelComponents = hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} searchParams={searchParams}/>
      ));
    setHotelComponents(hotelComponents);
      setSearchPerformed(true);
    } catch (error) {
      console.error('There was a problem with fetching offers:', error);
    }
  };

  const handleOfferforhotel = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"HOTELS"}`, {
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
      console.error('There was a problem with fetching offers:', error);
    }
  };

  useEffect(() => {
    handleOfferforhotel();
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = flightOffers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (newPage) => setCurrentPage(newPage);

  return (
    <div className='hotel'>
      <div className='hotelip'>
        <div className='hotelsearchh'>
          <p className='photel'>Destination</p>
          <input
            className='iphotel'
            type='text'
            name='destination'
            value={searchParams.destination}
            onChange={handleInputChange}
            placeholder='destination'
          />
        </div>
        <div className='hotelsearch'>
          <p className='photel'>Check-in</p>
          <input
            className='iphotel'
            type='date'
            name='checkIn'
            value={searchParams.checkIn}
            onChange={handleInputChange}
            placeholder=''
          />
        </div>
        <div className='hotelsearch'>
          <p className='photel'>Check-out</p>
          <input
            className='iphotel'
            type='date'
            name='checkOut'
            value={searchParams.checkOut}
            onChange={handleInputChange}
            placeholder=''
          />
        </div>
        <div className='hotelsearch'>
          <p className='photel'>Rooms</p>
          <input
            className='iphotel'
            type='number'
            name='rooms'
            value={searchParams.rooms}
            onChange={handleInputChange}
            placeholder=''
          />
        </div>
        <div className='hotelsearch'>
          <p className='photel'>Guest</p>
          <input
            className='iphotel'
            type='number'
            name='guests'
            value={searchParams.guests}
            onChange={handleInputChange}
            placeholder=''
          />
        </div>
        <div className='btnhotel'>
          <button className='btnsearching' onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div>
      {!searchPerformed&&(<div>
        <h2>Hotel Booking Discount Offers</h2>
      <div  className='fixedimg'>
      <img src='https://images.ixigo.com/image/upload/f_auto/upload/6249cdb80a54f24322bc32832eba8ce6-siccf.png' className='fixedimg1'/>
      <img src='https://images.ixigo.com/image/upload/f_auto/a/a59b220b20b84218eeb56ee456db1b76-mpyqp.png' className='fixedimg1'/>
      <img src='https://images.ixigo.com/image/upload/f_auto/73/4dc25b39182436ee5a4d3a8b5babc00f-bezjm.png' className='fixedimg1'/>
      <img src='https://images.ixigo.com/image/upload/f_auto/a/99795bfda768525312afef4c3de3a37d-arlnh.png' className='fixedimg1'/>
      </div>
        </div>)}
      </div>
      {searchPerformed&&(
              <div className="jkkkkk">
        <div className="filterbus">
        <div className='filterbus1'>
        <div className='filterbus1div1'>Filters</div>

        <div className='filterbus1div2'>
        <p className='filterbus1div2para' >Price</p>
        <button className='filterbus1div2parabtn' onClick={handleratehigh}>High</button>
        <button className='filterbus1div2parabtn' onClick={handleratelow}>low</button>
        </div>
        <div className='filterbus1div2'>
        <p className='filterbus1div2para' >Ratings</p>
        <button className='filterbus1div2parabtn' onClick={handleratinghigh}>High</button>
        <button className='filterbus1div2parabtn' onClick={handleratinglow}>low</button>
        </div>
       
        </div>
      </div>
              </div>
       )}
        
{hotelComponents}
      
      <section className="flight-offers">
        <h2 className='domore'  onClick={handleOfferforhotel}>Best Flight Booking Offers</h2>
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

export default HotelsPage;
