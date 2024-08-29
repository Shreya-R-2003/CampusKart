import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths } from 'date-fns';
// import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeItemFromCart, clearCart } = useContext(CartContext);
  const [rentalDurations, setRentalDurations] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  // const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    setLoggedInUsername(username);
  }, []);

  const buyItems = cartItems.filter((item) => item.action === 'buy');
  const rentItems = cartItems.filter((item) => item.action === 'rent');

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + parseFloat(item.item.price), 0);
  };

  const totalBuyPrice = calculateTotalPrice(buyItems);
  const totalRentPrice = calculateTotalPrice(rentItems);

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleDurationChange = (itemId, startDate, endDate) => {
    setRentalDurations((prevDurations) => ({
      ...prevDurations,
      [itemId]: { startDate, endDate },
    }));
  };

  const getDurationForItem = (itemId) => {
    return rentalDurations[itemId] || null;
  };

  const handlePlaceOrder = () => {
    // Collect order details here
    const orderDetails = {
      buyItems,
      rentItems,
      totalBuyPrice,
      totalRentPrice,
      username: loggedInUsername,
    };
  
    // Send the order details to the server
    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Order placed successfully!
        setOrderPlaced(true);
        // navigate('/profile', { state: { orderDetails } });
        alert('Your order has been successful!'); // Show the success message
        setTimeout(() => {
          handleClearCart(); // Clear the cart after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        console.error('An error occurred while placing the order:', error);
        // Handle error state
      });
  };
  
  

  return (
    <div style={{ marginTop: '200px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '35px', marginBottom: '20px' }}>Cart</h1>
      <h3 style={{ fontSize: '20px', marginTop: '30px' }}>Buy:</h3>
      {buyItems.map((item) => (
        <div key={item.item._id}>
          <img
            src={item.item.image}
            alt={item.item.name}
            style={{ width: '100px', height: '100px', marginRight: '20px' }}
          />
          <p style={{ fontSize: '16px', marginBottom: '5px' }}>Name: {item.item.name}</p>
          <p style={{ fontSize: '20px', marginBottom: '5px' }}>Price: {item.item.price}</p>
          <button onClick={() => handleRemoveItem(item.item._id)}>Remove</button>
        </div>
      ))}
      <p style={{ fontSize: '18px', marginTop: '10px' }}>Total Buy Price: {totalBuyPrice}</p>

      <h3 style={{ fontSize: '20px', marginTop: '30px' }}>Rent:</h3>
      {rentItems.map((item, index) => (
        <div key={`${item.item.id}${index}`}>
          <img
            src={item.item.image}
            alt={item.item.name}
            style={{ width: '100px', height: '100px', marginRight: '20px' }}
          />
          <p style={{ fontSize: '16px', marginBottom: '5px' }}>Name: {item.item.name}</p>
          <p style={{ fontSize: '14px', marginBottom: '5px' }}>Price: {item.item.price}</p>
          <label style={{ fontSize: '14px', marginRight: '10px' }} htmlFor={`startDate_${item.item.id}${index}`}>
            Duration:
          </label>
          <input
            type="text"
            id={`startDate_${item.item.id}${index}`}
            value={getDurationForItem(item.item._id)?.startDate || new Date().toISOString().split('T')[0]} // Set initial value to current date if no duration is selected
            onChange={(e) => handleDurationChange(item.item._id, e.target.value, getDurationForItem(item.item._id)?.endDate)}
            style={{ width: '120px', marginRight: '10px', padding: '5px', fontSize: '14px' }}
          />
          <DatePicker
            id={`endDate_${item.item.id}${index}`}
            selected={getDurationForItem(item.item._id)?.endDate || null}
            onChange={(date) => handleDurationChange(item.item._id, getDurationForItem(item.item._id)?.startDate, date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            minDate={new Date()} // Set minDate to current date
            maxDate={addMonths(new Date(), 1)} // Set maxDate to one month from current date
          />
          <button onClick={() => handleRemoveItem(item.item._id)}>Remove</button>
        </div>
      ))}
      <p style={{ fontSize: '18px', marginTop: '10px' }}>Total Rent Price: {totalRentPrice}</p>
      <p style={{ fontSize: '18px', marginTop: '10px' }}>Total Price: {totalBuyPrice + totalRentPrice}</p>
      {!orderPlaced && (
        <button
          onClick={handlePlaceOrder}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Place Order
        </button>
      )}
      {orderPlaced && <p style={{ fontSize: '18px', marginTop: '20px' }}>Order has been placed successfully!</p>}
      <button
        onClick={handleClearCart}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
