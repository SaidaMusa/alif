// src/context/wishlistContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// Create the Wishlist Context
const WishlistContext = createContext();

// Custom hook to use Wishlist Context
export const useWishlistContext = () => useContext(WishlistContext);

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return savedWishlist;
  });

  // Function to add a product to the wishlist
  const addToWishlist = (products) => {
  setWishlist((prevWishlist) => {
    const updatedWishlist = [...prevWishlist, ...products];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    return updatedWishlist;
  });
};
  // Function to remove a product from the wishlist
  const removeFromWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(item => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
