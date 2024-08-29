import React, { useState } from 'react';
import './sellform.css';

const Seller = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [sellType, setSellType] = useState('');
  const [category, setCategory] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      convertImageToBase64(file);
    } else {
      console.log("File selection was canceled.");
    }
  };

  const convertImageToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSellTypeChange = (e) => {
    setSellType(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let flag = 2; // Default flag value if no sell type is selected

    if (sellType === 'buy') {
      flag = 0;
    } else if (sellType === 'rent') {
      flag = 1;
    }

    const productData = {
      name: name,
      description: description,
      price: price,
      image: image,
      flag: flag,
      category:category,
    };
    
    fetch('http://localhost:8080/api/sells', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Product added successfully:', data);
        // Perform any additional actions or show success message
        window.location.href = '/buy';
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        // Show error message
      });
  };

  return (
    <div className="seller-container">
      <h2>Sell an Item</h2>
      <form onSubmit={handleSubmit} className="form1">
        <label htmlFor="name" className="label1">
          Name:
        </label>
        <input type="text" id="name" value={name} onChange={handleNameChange} className='input1' required />

        <label htmlFor="description" className="label1">
          Description:
        </label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} className='textarea1' required />

        <label htmlFor="price" className="label1">
          Price:
        </label>
        <input type="number" id="price" value={price} onChange={handlePriceChange} className='input2' required />

        <label htmlFor="sellType" className="label1">
          Sell Type:
        </label>
        <select id="sellType" value={sellType} onChange={handleSellTypeChange} required>
          <option value="">Select Sell Type</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
          <option value="both">Both</option>
        </select>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          <option value="Casual Stationery">Casual Stationery</option>
          <option value="Lab Equipments">Lab Equipments</option>
          <option value="Electronics">Electronics</option>
        </select>

        <label htmlFor="image" className="label1">
          Image:
        </label>
        <input type="file" id="image" onChange={handleImageChange} accept="image/*" className='input3' required />

        <button type="submit" className="button1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Seller;
