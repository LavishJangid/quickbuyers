import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png';

const Offers = () => {
  return (
    <div className='offers'>
      {/* Left Section */}
      <div className="offers-left">
        <h1>Exclusive Offer</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLER PRODUCTS</p>
        <button>Check Now</button>
      </div>

      {/* Right Section */}
      <div className="offers-right" > 
        <img src={exclusive_image} alt="exclusive" />
      </div>
    </div>
  )
}

export default Offers;
