import React, { useState } from "react";
import data from "../../data/alldata";
import ProductCard from "../ProductCard/ProductCard";

const getButtonClasses = (isActive) =>
  `px-5 py-2 border border-gray-300 rounded-lg shadow hover:border-green-500 hover:shadow-md transition ${
    isActive ? "bg-green-600 text-white" : "bg-white text-gray-700"
  }`;

const TypeFilter = () => {
  const [selectedType, setSelectedType] = useState("");
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 8;

  const types =[
    "Kitchen appliances",
    "Home Appliances",
    "Beauty and Health",
    "Smart Home",
  ];

  const filteredItems = selectedType
    ? data.filter((item) => item.type === selectedType)
    : data;

  const displayItems = showAll ? filteredItems : filteredItems.slice(0, VISIBLE_COUNT);

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-center text-4xl font-bold text-neutral-800 mb-6">
        Home and Human Care Products
      </h1>

      <div style={{marginBottom:'2rem'}} className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => {
            setSelectedType("");
            setShowAll(false);
          }}
          style={{padding:'1rem 1.5rem'}}
          className={getButtonClasses(!selectedType)}
        >
          All Products
        </button>

        {types.map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type);
              setShowAll(false);
            }}
            style={{padding:'1rem 1.5rem'}}
            className={getButtonClasses(selectedType === type)}
          >
            {type}
          </button>
        ))}
      </div>

    
      <div className="flex flex-wrap justify-center gap-6">
        {displayItems.length > 0 ? (
          displayItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No products found.</p>
        )}
      </div>


      {filteredItems.length > VISIBLE_COUNT && (
        <div style={{margin:'1rem 1.5rem'}} className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
             style={{padding:'0.8rem 1.5rem'}}
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
