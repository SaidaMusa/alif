import React, { useState, useEffect } from "react";
import alldata from "../../data/alldata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

const TypeFilter = ({ addToWishlist, addToCart }) => {
  const [selectedType, setSelectedType] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [localQuantities, setLocalQuantities] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 8;

  // Load data from localStorage
  useEffect(() => {
    const savedQuantities = JSON.parse(localStorage.getItem("localQuantities")) || {};
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLocalQuantities(savedQuantities);
    setWishlist(savedWishlist);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("localQuantities", JSON.stringify(localQuantities));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [localQuantities, wishlist]);

  useEffect(() => {
    const filtered = selectedType
      ? alldata.filter((item) => item.type === selectedType)
      : alldata;
    setFilteredItems(filtered);
  }, [selectedType]);

  const handleAddToCart = (productId) => {
    const quantity = localQuantities[productId] || 1;
    const product = alldata.find((item) => item.id === productId);
    addToCart({ ...product, quantity });

    setLocalQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const increment = (productId) => {
    setLocalQuantities((prev) => {
      const newQuantity = (prev[productId] || 1) + 1;
      const product = alldata.find((item) => item.id === productId);
      addToCart({ ...product, quantity: newQuantity }); // To'g'ri qiymatni yuborish
      return { ...prev, [productId]: newQuantity };
    });
  };

  const decrement = (productId) => {
    setLocalQuantities((prev) => {
      const current = prev[productId] || 1;
      const newQuantity = current > 1 ? current - 1 : 0; // 0 ga teng bo'lsa Add to Cart ko'rsatiladi
      if (newQuantity === 0) {
        // Agar quantity 0 ga teng bo'lsa, Add to Cart ko'rsatiladi
        return { ...prev, [productId]: 0 };

      }
      const product = alldata.find((item) => item.id === productId);
      addToCart({ ...product, quantity: newQuantity });
      return { ...prev, [productId]: newQuantity };
    });
  };

  const displayItems = showAll
    ? filteredItems
    : filteredItems.slice(0, VISIBLE_COUNT);

  const types = [
    "Kitchen appliances",
    "Home Appliances",
    "Beauty and Health",
    "Smart Home",
  ];

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16 flex flex-wrap justify-center gap-6">
         <h1 className="text-center text-4xl font-bold text-neutral-800 mb-8">
        Home and Human Care Products
      </h1>

      {/* Filter buttons */}
      <div  style={{ padding: '2rem 0' }} className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedType("")}
           style={{ padding: '0.5rem 2rem' }}
          className="px-5 py-2 border border-gray-300 rounded-lg shadow hover:border-green-500 hover:shadow-md transition"
        >
          All Products
        </button>
        {types.map((type, index) => (
          <button
            key={index}
            onClick={() => setSelectedType(type)}
             style={{ padding: '0.5rem 2rem' }}
          className="px-5 py-2 border border-gray-300 rounded-lg shadow hover:border-green-500 hover:shadow-md transition"
          >
            {type}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {displayItems.map((product) => {
          const quantity = localQuantities[product.id] || 0;
          const isLiked = wishlist.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              style={{ padding: '0 1.5rem' }}
              className="typeFilter flex flex-col items-center text-center w-76 h-[420px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.05] transition duration-300 ease-in-out relative border border-green-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-38 object-cover rounded-t-xl"
              />

              {/* Wishlist icon */}
              <div
                onClick={() => {
                  const updatedWishlist = isLiked
                    ? wishlist.filter((item) => item.id !== product.id)
                    : [...wishlist, product];
                  setWishlist(updatedWishlist);
                  addToWishlist(product, !isLiked);
                }}
                className="absolute top-4 right-4 cursor-pointer text-green-700"
              >
                <FontAwesomeIcon icon={isLiked ? fasHeart : farHeart} />
              </div>

              <div className="p-4 flex flex-col items-center justify-between flex-grow">
                <h2 className="text-lg font-semibold text-green-700 mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 mb-3 text-start">
                  {product.description}
                </p>
                <h3 className="text-base font-semibold text-green-700 mb-4">
                  ${product.price * (quantity || 1)}
                </h3>

                {/* Quantity controller */}
                {quantity > 0 ? (
                  <div className="flex items-center overflow-hidden">
                    <button
                      onClick={() => increment(product.id)}
                      style={{ padding: '0.5rem 1rem', margin: '1.5rem 0.5rem' }}
                       className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
                    >
                      +
                    </button>
                    <div className="bg-white text-green-700 text-xl font-semibold px-4">
                      {quantity}
                    </div>
                    <button
                      onClick={() => decrement(product.id)}
                      style={{ padding: '0.5rem 1rem', margin: '1.5rem 0.5rem' }}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
                    >
                      -
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    style={{ padding: '0.5rem 1rem', margin: '1.5rem 0' }}
                     className="addToCart bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More / Show Less */}
      {filteredItems.length > VISIBLE_COUNT && (
        <div style={{ padding: '1.2rem 0' }}  className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            style={{ padding: '0.5rem 1rem' }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TypeFilter;
