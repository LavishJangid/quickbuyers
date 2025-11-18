import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { totalCartItems } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace('/');
  };

  return (
    <div className='navbar'>
      {/* Logo */}
      <div className="nav-logo">
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
        <p>Quick Buyers</p>
      </div>

      {/* Menu */}
      <ul className="nav-menu">
        <li className={menu === "shop" ? "active" : ""} onClick={() => setMenu("shop")}>
          <Link to='/'>Shop</Link>
        </li>
        <li className={menu === "mens" ? "active" : ""} onClick={() => setMenu("mens")}>
          <Link to='/men'>Men</Link>
        </li>
        <li className={menu === "women" ? "active" : ""} onClick={() => setMenu("women")}>
          <Link to='/women'>Women</Link>
        </li>
        <li className={menu === "kids" ? "active" : ""} onClick={() => setMenu("kids")}>
          <Link to='/kids'>Kids</Link>
        </li>
      </ul>

      {/* Login + Cart */}
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}
        
        <Link to='/cart'>
          <div className="cart-container">
            <img src={cart_icon} alt="cart_icon" />
            <div className="cart-item-count">{totalCartItems()}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
