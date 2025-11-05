import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";   
import navProfile from "../../assets/nav-profile.svg"; 

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Left side */}
      <div className="navbar-left">
        <img src={navlogo} alt="Logo" className="nav-logo" />
      </div>

      {/* Right side */}
      <div className="navbar-right">
        <img src={navProfile} alt="Profile" className="nav-profile" />
      </div>
    </div>
  );
};

export default Navbar;
