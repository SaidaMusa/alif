import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import "../Wishlist/Wishlist.css"
const Wishlist = ({ wishlist, addToWishlist }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the wishlist is updated from localStorage on page load
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.length !== saved.length) {
      // Update wishlist state if there is a change
      addToWishlist(saved, true);
    }
  }, [wishlist, addToWishlist]);

  const goToHomePage = () => {
    navigate("/"); // Navigate to Home page
  };

  return (
    <div className="p-6">
      {wishlist.length === 0 ? (
        <div className="wishlist flex flex-col items-center">
        <FontAwesomeIcon icon={faHeartBroken} className="icon text-green-700 text-7xl mb-6" />
              <h2 className="text-2xl font-bold text-gray-700">Your Wishlist</h2>
              <p className="text-gray-500 mt-2">No products in wishlist</p>
          <button
            onClick={goToHomePage}
            className="wishBtn bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-8 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
          >
            Go to Home Page
          </button>
        </div>
      ) : (
        <div style={{padding: '40px 0'}} className="flex flex-wrap gap-6 justify-center">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} addToWishlist={addToWishlist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
