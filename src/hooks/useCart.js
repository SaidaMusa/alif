import { useState, useEffect } from "react";
import allData from "../data/alldata";

export const useCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const incrementItem = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updatedCart);
  };

  const decrementItem = (id) => {
    const existingItem = cartItems.find((item) => item.id === id);

    if (!existingItem) return;

    if (existingItem.quantity > 1) {
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      saveCart(updatedCart);
    } else {
      handleRemoveFromCart(id);
    }
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const addToCart = ({ id, quantity = 1 }) => {
    const product = allData.find((item) => item.id === id);
    if (!product) return;

    const existingItem = cartItems.find((item) => item.id === id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image || product.images?.[0],
          quantity,
        },
      ];
    }

    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return {
    cartItems,
    cartCount,
    addToCart,
    incrementItem,
    decrementItem,
    handleRemoveFromCart,
    clearCart,
  };
};
