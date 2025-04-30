import React, { useState } from "react";
import alldata from "../../data/alldata"; // Assuming your product data is stored in alldata.js
import ProductCard from "../ProductCard/ProductCard"; // Import ProductCard
import "../CategoryCard/CategoryCard.css"
const categoryMap = {
  "Smartphones and gadgets": "Telephones and gadgets",
  "Laptops, Computers": "Laptops and Computers",
  "Televisions": "TVs and Projectors",
  "Audio Equipment": "Audio Equipment",
};

const CategoryCard = ({ addToWishlist, addToCart, wishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState("Smartphones and gadgets");
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 8;

  
  const filteredData = alldata.filter(
    (item) => Object.keys(categoryMap).includes(item.type) && item.type === selectedCategory
  );


  const displayItems = showAll ? filteredData : filteredData.slice(0, VISIBLE_COUNT);

  return (
    <div style={{ padding: '2rem 0' }} className="px-6 md:px-12 lg:px-20 py-10">
      <h1 style={{ padding: '1rem 0' }} className="text-4xl font-bold text-center text-neutral-800 mb-10">
        Categories of gadgets
      </h1>

      {/* Filter Buttons */}
      <div style={{ padding: '2rem 0' }} className="filterBtn flex  text-center justify-center gap-4 mb-10">
        {Object.entries(categoryMap).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            style={{ padding: '0.7rem 0.5rem' }}
            className={`px-6 py-3 rounded-[15px] font-medium transition-all duration-300 transform flex items-center gap-2 ${
              selectedCategory === key
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-xl scale-105"
                : "bg-white text-gray-700 border border-green-500 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white hover:shadow-md hover:scale-105"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Custom Cards */}
      <div  className="customCards grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayItems.length > 0 ? (
          displayItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToWishlist={addToWishlist}
              addToCart={addToCart}
              wishlist={wishlist}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}
      </div>

      {/* Show More / Less Button */}
      {filteredData.length > VISIBLE_COUNT && (
        <div style={{ padding: '1.2rem 0' }} className="flex justify-center mt-8">
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

export default CategoryCard;
