import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.item._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
