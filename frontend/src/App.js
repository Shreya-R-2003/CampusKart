import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Buy from './Buy';
import Sell from './Sell';
import Chat from './Chat';
import Request from './Request'
import Requestform from './Requestform'
import Cart from './Cart';
import Navbar from './Navbar';
import FAQ from './FAQ';
import Donate from './Donate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/*"element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/buy/*" element={
            <>
              <Navbar />
              <Buy />
            </>
          }
        />
        <Route path="/sell/*"
          element={
            <>
              <Navbar />
              <Sell />
            </>
          }
        />
        <Route path="/request/*"
          element={
            <>
              <Navbar />
              <Request />
            </>
          }
        />
        <Route path="/cart/*"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
          <Route path="/requestform/*"
          element={
            <>
              <Navbar />
              <Requestform />
            </>
          }
        />
          <Route path="/chat/*"
          element={
            <>
              <Navbar />
              <Chat />
            </>
          }
        />
         <Route path="/faq/*"
          element={
            <>
              <Navbar />
              <FAQ />
            </>
          }
        />
        <Route path="/donate/*"
          element={
            <>
              <Navbar />
              <Donate />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;