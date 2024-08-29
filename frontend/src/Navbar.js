import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import add from './img/add-png.png';

const Navbar = () => {
  return (
    <ul className='navbar'>
      <li className='li1'>
        <Link to="/buy">Buy products</Link>
      </li>      
      <li className='li1'>
        <Link to="/sell">Sell Products</Link>
      </li>
      <li className='li1'>
        <Link to="/request">Request Products</Link>
      </li>
    
    <li className='li1'>
        <Link to="/faq">FAQs</Link>
      </li>
    <li className='li1'>
        <Link to="/chat">Chat</Link>
      </li>
      <li className='li1'>
        <Link to="/donate">Donate</Link> {/* Added Donate button */}
      </li>
      <li>
        <Link to="/cart">
          <img className='img1' src={add} alt="cart" />
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;