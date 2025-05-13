import React, { useState, useMemo } from "react";
import alldata from "../../data/alldata";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryCard.css";

const categoryMap = {
  "Smartphones and gadgets": "Telephones and gadgets",
  "Laptops, Computers": "Laptops and Computers",
  "Televisions": "TVs and Projectors",
  "Audio Equipment": "Audio Equipment",
};


const getButtonClasses = (isActive) =>
  `px-6 py-3 rounded-[15px] font-medium transition-all duration-300 transform flex items-center gap-2 ${
    isActive
      ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-xl scale-105"
      : "bg-white text-gray-700 border border-green-500 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white hover:shadow-md hover:scale-105"
  }`;

const CategoryCard = ({ visibleCount = 8 }) => {
  const [selectedCategory, setSelectedCategory] = useState("Smartphones and gadgets");
  const [showAll, setShowAll] = useState(false);

  const filteredData = useMemo(() => {
    return alldata.filter((item) => item.type === selectedCategory);
  }, [selectedCategory]);

  const { displayItems, noProductsMessage } = useMemo(() => {
    const displayItems = showAll ? filteredData : filteredData.slice(0, visibleCount);
    const categoryName = categoryMap[selectedCategory] || selectedCategory;
    const noProductsMessage = `No products found in ${categoryName}.`;

    return { displayItems, noProductsMessage };
  }, [filteredData, showAll, visibleCount, selectedCategory]);

  return (
    <div  className="px-6 md:px-12 lg:px-20 py-10" aria-label="Category Card Section">
      <h1 className="text-4xl font-bold text-center text-neutral-800 mb-10">
        Categories of Gadgets
      </h1>

      <div  style={{ padding: "2rem 0" }} className="filterBtn flex justify-center gap-4 mb-10" role="group" aria-label="Filter Categories">
        {Object.entries(categoryMap).map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedCategory(key);
              setShowAll(false);
            }}
            style={{ padding: "0.7rem 0.5rem" }}
            className={getButtonClasses(selectedCategory === key)}
            aria-label={`Filter by ${label}`}
            aria-pressed={selectedCategory === key}
          >
            {label}
          </button>
        ))}
      </div>

  
      <div
        className="customCards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        role="list"
        aria-label="Product Cards"
      >
        {displayItems.length > 0 ? (
          displayItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full" aria-live="assertive">
            {noProductsMessage}
          </p>
        )}
      </div>

    
      {filteredData.length > visibleCount && (
        <div  style={{ padding: "1.2rem 0" }}  className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            style={{ padding: "0.5rem 1rem" }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            aria-label={showAll ? "Show Less Products" : "Show More Products"}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
