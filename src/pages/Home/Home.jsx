import React, { useState, useEffect, useMemo } from "react";
import "../Home/Home.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import alldata from "../../data/alldata";
import Slider from "../../components/ImageSlider/Slider";
import CoworkerSlider from "../../components/CoworkerSlider/CoworkerSlider";
import TypeFilter from "../../components/TypeFilter/TypeFilter";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductList from "../../components/ProductList/ProductList";

const Home = ({
  addToWishlist,
  wishlist,
  addToCart,
  searchTerm,
  sidebarCategorySelected,
}) => {
  const INITIAL_COUNT = 12;
  const MAX_COUNT = 40;
  const [showAll, setShowAll] = useState(false);

  // Filter products based on search term or category selection
  const filteredProducts = useMemo(() => {
    let filtered = alldata;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category if one is selected
    if (sidebarCategorySelected) {
      filtered = filtered.filter(
        (item) => item.type.toLowerCase() === sidebarCategorySelected.toLowerCase()
      );
    }

    return filtered;
  }, [searchTerm, sidebarCategorySelected]);

  // Determine how many items to show based on the "Show All" button
  const visibleItems = showAll ? filteredProducts.slice(0, MAX_COUNT) : filteredProducts.slice(0, INITIAL_COUNT);

  return (
    <div>
      {/* Show slider only if no category or search term is selected on the Home page */}
      {(!sidebarCategorySelected && !searchTerm) && <Slider />}

      <div className="p-4 md:px-12 lg:px-20">
        {/* Show the product list if a category or search term is present */}
        {sidebarCategorySelected || searchTerm ? (
          <ProductList
            filteredProducts={filteredProducts}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            addToCart={addToCart}
          />
        ) : (
          <>
            <h1 style={{ padding: '2rem 0.5rem' }} className="text-center text-4xl font-bold text-neutral-800 mb-8">
             Our products that may interest you
           </h1>
            <div className="flex flex-wrap justify-center gap-6">
              {visibleItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  addToWishlist={addToWishlist}
                  wishlist={wishlist}
                  addToCart={addToCart}
                />
              ))}
            </div>

            {filteredProducts.length > INITIAL_COUNT && (
              <div style={{ padding: '2rem 0' }} className="flex justify-center mt-10">
                <button
                style={{ padding: '0.5rem 0.5rem' }}
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
                >
                  {showAll ? "Show Less" : "Show All Products"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

  
      {(!sidebarCategorySelected && !searchTerm) && (
        <>
          <TypeFilter
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            addToCart={addToCart}
          />

          <CategoryCard
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            addToCart={addToCart}
          />
        </>
      )}

      <CoworkerSlider />
    </div>
  );
};

export default Home;
