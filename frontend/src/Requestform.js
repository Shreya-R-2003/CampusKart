import React, { useState } from 'react';
import './requestform.css';

const Requestform = () => {
  const [username, setUsername] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [requestType, setRequestType] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          productname: productName,
          description,
          requesttype: requestType,
          category,
        }),
      });
      const data = await response.json();
      console.log(data);
      // Reset form fields or show success message
      setUsername('');
      setProductName('');
      setDescription('');
      setRequestType('');
      setCategory('');
      alert('Your request has been sent!');
      window.location.replace('/buy');
    } catch (error) {
      console.error('Error submitting request:', error);
      // Handle error or show error message
    }
  };

  return (
    <div className="request-form">
      <h2>Request Form</h2>
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="requestType">Request Type</label>
          <select
            id="requestType"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Casual Stationery">Casual Stationery</option>
            <option value="Lab Equipments">Lab Equipments</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Requestform;
