import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = ({ product }) => {
  if (!product) {
    return <div className="breadcrum">Home</div>;
  }

  return (
    <div className="breadcrum">
      Home <img src={arrow_icon} alt="arrow" /> 
      Shop <img src={arrow_icon} alt="arrow" /> 
      {product.category} <img src={arrow_icon} alt="arrow" /> 
      {product.name}
    </div>
  );
}

export default Breadcrum
