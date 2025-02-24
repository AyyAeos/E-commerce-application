import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop</a></li>
        <li className="dropdown">
          <a href="#">Categories ▼</a>
          <ul className="dropdown-menu">
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Clothing</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </li>
        <li><a href="#">Contact</a></li>
      </ul>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
