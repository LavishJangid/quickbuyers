import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow_icon.svg';
import hero_image from '../Assets/hero_image.png'


const Hero = () => {
  return (
    <div className="hero">
      {/* Left Section */}
      <div className="hero-left">
        <h2>New Arrivals Only</h2>
        <div className="hand-icon">
          <p>New Collections</p>
          <img src={hand_icon} alt="hand_icon" />
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow_icon" />
        </div>
      </div>

      {/* Right Section */}
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  )
}

export default Hero;
