import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import './buy.css';
import './Requestform.js';

const Buy = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [allImage, setAllImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriceRange, setFilterPriceRange] = useState('all'); // Added filterPriceRange state

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    fetch('http://localhost:8080/api/products', {
      method: 'GET',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllImage(data.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handlePriceRangeFilterChange = (e) => {
    setFilterPriceRange(e.target.value);
  };

  const filteredImages = allImage.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredImagesByType =
    filterType === 'buy' || filterType === 'rent'
      ? filteredImages.filter((data) => data.flag === (filterType === 'buy' ? 0 : 1))
      : filteredImages;

  const filteredImagesByCategory =
    filterCategory !== 'all'
      ? filteredImagesByType.filter((data) => data.category === filterCategory)
      : filteredImagesByType;

  const filteredImagesByPriceRange = filterPriceRange !== 'all'
    ? filteredImagesByCategory.filter((data) => {
        const price = parseFloat(data.price);
        switch (filterPriceRange) {
          case '0-300':
            return price >= 0 && price <= 300;
          case '300-600':
            return price > 300 && price <= 600;
          case '600-900':
            return price > 600 && price <= 900;
          case '900-1200':
            return price > 900 && price <= 1200;
          default:
            return true;
        }
      })
    : filteredImagesByCategory;

  const handleAddToCart = (item, action) => {
    addToCart({ item, action });
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.item._id === itemId);
  };

  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
        <select value={filterCategory} onChange={handleCategoryFilterChange}>
          <option value="all">All Categories</option>
          <option value="Casual Stationery">Casual Stationery</option>
          <option value="Lab Equipments">Lab Equipments</option>
          <option value="Electronics">Electronics</option>
        </select>
        <select value={filterPriceRange} onChange={handlePriceRangeFilterChange}>
          <option value="all">All Price Ranges</option>
          <option value="0-300">Re 0 - Rs 300</option>
          <option value="300-600">Rs 300 - Rs 600</option>
          <option value="600-900">Rs 600 - Rs 900</option>
          <option value="900-1200">Rs 900 - Rs 1200</option>
        </select>
        <Link to="/requestform" className="request-button">
          Request
        </Link>
      </div>
      <div className="image-container">
        <div className="image-grid">
          {filteredImagesByPriceRange.map((data) => (
            <div key={data._id} className="image-item">
              <img width={100} height={100} src={data.image} alt="Product" />
              <p>Name: {data.name}</p>
              <p>Description: {data.description}</p>
              <p>Category: {data.category}</p>
              <p>Price: {data.price}</p>
              <div>
                {data.flag === 0 && (
                  <button
                    onClick={() => handleAddToCart(data, 'buy')}
                    disabled={isItemInCart(data._id)}
                    className="buy-button"
                  >
                    Buy
                  </button>
                )}
                {data.flag === 1 && (
                  <button
                    onClick={() => handleAddToCart(data, 'rent')}
                    disabled={isItemInCart(data._id)}
                    className="rent-button"
                  >
                    Rent
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
