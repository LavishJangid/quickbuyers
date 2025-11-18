import React from 'react'
import '../DescriptionBox/DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="description-nav-box">Description</div>
        <div className="description-nav-box fade">Reviews (122)</div>
      </div>

      <div className="descriptionBox-content">
        <p>
          Welcome to <strong>Quick Buyers</strong>, your go-to destination for premium 
          quality products. Our mission is to bring you stylish, comfortable, 
          and durable collections for every occasion. 
        </p>
        <p>
          Each product is carefully designed and tested to meet high-quality standards. 
          Whether you're shopping for men, women, or kids, we guarantee the 
          best in fashion and lifestyle products at unbeatable prices.
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox
