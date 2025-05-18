import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();


export const useWishlistContext = () => useContext(WishlistContext);


export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return savedWishlist;
  });

  
  const addToWishlist = (products) => {
  setWishlist((prevWishlist) => {
    const updatedWishlist = [...prevWishlist, ...products];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    return updatedWishlist;
  });
};
 
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
