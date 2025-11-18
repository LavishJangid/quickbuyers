import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="footer_logo" />
        <p>Quick Shoppers</p>
      </div>

      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social">
        <div className="footer-social-container">
          <img src={instagram_icon} alt="instagram" />
          <img src={pintester_icon} alt="pinterest" />
          <img src={whatsapp_icon} alt="whatsapp" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>© 2023 Quick Shoppers - All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
