import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { AiOutlineHeart } from "react-icons/ai";
import "../Wishlist/Wishlist.css";

const Wishlist = ({ wishlist, addToWishlist, removeFromWishlist }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (saved.length > 0 && saved.length !== wishlist.length) {
      addToWishlist(saved); 
    }
  }, []); 

  
  const goToHomePage = () => {
    navigate("/");
  };

  
  const handleWishlistToggle = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
     
      removeFromWishlist(product);
    } else {
      addToWishlist([product]);
    }
  };

  return (
    <div className="p-6" aria-label="Wishlist Section" role="main">
      {wishlist.length === 0 ? (
        <div 
          className="wishlist flex flex-col items-center" 
          aria-live="polite" 
          aria-label="Empty Wishlist"
        >
          <AiOutlineHeart className="text-green-700 text-7xl mb-6" aria-hidden="true" />
          <p className="text-gray-500 mt-2" aria-label="No products in wishlist">
            No products in wishlist
          </p>
          <button
            onClick={goToHomePage}
            className="wishBtn bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-2 rounded-lg hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
            aria-label="Go to Home Page"
          >
            Go to Home Page
          </button>
        </div>
      ) : (
        <div 
          style={{ padding: "5rem 0" }} 
          className="flex flex-wrap gap-6 justify-center"
          aria-label="Wishlist Products"
          role="list"
        >
          {wishlist.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToWishlist={handleWishlistToggle} 
              aria-label={`Wishlist item: ${product.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
