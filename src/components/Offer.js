import React, { useState ,useEffect} from 'react'
import Offerpageimage from "./Offerpageimage.png";
import "../styles/Offer.css";

function Offer() {
  const [allOffers,setALLOffers] = useState([]);
  const handleOfferall = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/offers`, {
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
      setALLOffers(data?.data?.offers || []);
    } catch (error) {
     
      console.error('There was a problem with fetching flight offers:', error);
    }
  };

  useEffect(() => {
    handleOfferall();
  }, []);
  return (
    <div>
    <div> <img src={Offerpageimage} alt='network err' className='imageno'/></div>
   <div className='offer-container'>
    <h2 className='offerh2' onClick={handleOfferall}>ixigo offers | Flight,Trains,Bus and hotels deals</h2>
    <div className="offerserap">
    
    <div className='flex-wrap'>
      {allOffers.map((offer, index) => (
        <div key={index} className="flight-offer">
        <img src={offer.newHeroUrl} alt={offer.lobDisplayText}  className='imageof-offer'/>
          <h2>{offer.pTl}</h2>
          <h4>{offer.pTx}</h4>
          <button className='btnofalloffer'>{offer.ctaText}</button>
            
            
          <h3><a href="#">{offer.tncCtaText}</a></h3>
        </div>
      ))}
    </div>
  
  </div>
  <div>
  <h1 className='offerh2'>More Details About ixigo Offers</h1>
  <p className='poffer'>Enjoy travelling at the best prices with ixigo offers - today. The travel and tourism 
  industry is one of the fastest growing sectors globally. Choosing the best discount offers among so many 
  available online is one of the most crucial steps of planning a holiday. ixigo enables its users to plan 
  their trip online, compare prices of various airlines, hotels and bus operators and get the finest deals. 
  A number of ixigo offers ensure that you have a fulfilling vacation without going overboard on your budget.</p>
<h3 className='h3offer'>ixigo Money</h3>
<p className='poffer'>ixigo has now launched its virtual currency which is known as ixigo money. Users can both earn and spend ixigo money on their flight and bus bookings. Since there is no limit on how much ixigo money you can spend on one booking, users can use 100% of their ixigo money balance on a single flight booking and upto ₹150 on a bus booking. You can choose from many ixigo money offers available online and book your tickets at the most affordable rates.</p>
<h3 className='h3offer'>ixigo Discount Offers</h3>
<p className='poffer'>There are a number of ixigo offers for flight, bus and hotel bookings available online. All you have to do is enter the ixigo coupon code to get great discounts on your flight and bus bookings. You can avail these offers while checking out and save a lot of money.</p>

<p className='poffer'>Being one of the top travel aggregators, ixigo offers are revised from time to time to fulfill the changing requirements of the users. ixigo provides attractive offers for both existing and new users. As the offers keep changing frequently, it is important that you keep yourself updated to avail the best deals on your next booking. Also, there are nice combos available for the users that include ixigo money offers and various discounts.</p>
  </div>
  <table className="offer-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Offer</th>
      <th>Coupon Code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Domestic Flights</td>
      <td>Get Upto ₹5000 Off on Flight Bookings</td>
      <td>DEAL</td>
    </tr>
    <tr>
      <td>Domestic Flights</td>
      <td>Get Upto 25% Off on Domestic Flight Bookings</td>
      <td>INSTANT</td>
    </tr>
    <tr>
      <td>International Flights</td>
      <td>Get Upto ₹5000 Off on Flight Bookings</td>
      <td>INTFLY</td>
    </tr>
  </tbody>
</table>
<div className='footer'>
<div className='rowfooter'>
<li><a href="https://www.ixigo.com/about" class="js-ajax-link">about us</a></li>
<li><a href="https://www.ixigo.com/about/more-info/press-releases/" class="js-ajax-link">press</a></li>
<li><a href="https://www.ixigo.com/about/more-info/faq/" class="js-ajax-link">faq</a></li>
<li><a href="https://www.ixigo.com/mobile" class="js-ajax-link">mobile</a></li>
<li><a href="https://www.ixigo.com/about/more-info/affiliates/" class="js-ajax-link">affiliates</a></li>
<li><a href="https://www.ixigo.com/about/more-info/privacy/" class="js-ajax-link">privacy</a></li>
<li><a href="https://www.ixigo.com/about/more-info/terms-of-use/" class="js-ajax-link">terms of use</a></li>
<li class="last"><a href="https://www.ixigo.com/about/careers/" class="js-ajax-link">careers</a></li>
<li class="last"><a href="https://www.ixigo.com/help-center" class="js-ajax-link">Help Center</a></li>
</div>

<p className='pfooteroffer'>© 2021 Le Travenues Technology Ltd. India. All brands are trademarks of their respective owners.</p>
</div>
   </div>
   
    </div>
  )
}

export default Offer