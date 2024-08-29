import React from 'react';

import './nav.css';

import backgroundImage from './img/background10.jpg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + backgroundImage})` }}>
      
      <div className="white-box">
      <div className="text-content">
        
        <h2>"A blank page is an opportunity.<br></br><br></br>Fill it with ideas, dreams,<br></br> <br></br>and inspiration..."</h2>
        <br></br>
        <div class="container">
  <Link to="/buy"><button class="get-started"><h2>Get Started</h2></button></Link>
</div>

        {/* Add more HTML elements or components as needed */}
      </div>

        <div className="side-image"></div>
      </div>
    </div>
  );
}

export default Home;
