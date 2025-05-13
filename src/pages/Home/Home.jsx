import React, { useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import data from "../../data/alldata";
import Slider from "../../components/ImageSlider/Slider";
import CoworkerSlider from "../../components/CoworkerSlider/CoworkerSlider";
import TypeFilter from "../../components/TypeFilter/TypeFilter";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductList from "../../components/ProductList/ProductList";
import "../Home/Home.css"

const Home = ({ searchTerm, sidebarCategorySelected }) => {
  const INITIAL_COUNT = 12;
  const MAX_COUNT = 40;
  const [showAll, setShowAll] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sidebarCategorySelected) {
      filtered = filtered.filter(
        (item) => item.type.toLowerCase() === sidebarCategorySelected.toLowerCase()
      );
    }

    return filtered;
  }, [searchTerm, sidebarCategorySelected]);

  const visibleItems = showAll
    ? filteredProducts.slice(0, MAX_COUNT)
    : filteredProducts.slice(0, INITIAL_COUNT);

  return (
    <div aria-label="Home Page - Product Showcase" role="main">
    
      {(!sidebarCategorySelected && !searchTerm) && (
        <section aria-label="Product Slider Section">
          <Slider />
        </section>
      )}

      <div className="p-4 md:px-12 lg:px-20">
       
        {sidebarCategorySelected || searchTerm ? (
          <section
            aria-label={`Filtered Products - ${searchTerm ? `Search term: ${searchTerm}` : `Category: ${sidebarCategorySelected}`}`}
          >
            <ProductList products={filteredProducts} />
          </section>
        ) : (
          <>
            <section aria-label="Highlighted Products Section">
              <h1 
                className="text-center text-4xl font-bold text-neutral-800 mb-8"
                aria-label="Our recommended products"
              >
                Our products that may interest you
              </h1>

              <div className="flex flex-wrap justify-center gap-6" role="list">
                {visibleItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                ))}
              </div>

              {filteredProducts.length > INITIAL_COUNT && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    aria-label={showAll ? "Show Less Products" : "Show All Products"}
                    style={{padding:'0.8rem',margin: '1rem'}}
                    className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
                  >
                    {showAll ? "Show Less" : "Show All Products"}
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>


      {(!sidebarCategorySelected && !searchTerm) && (
        <>
          <section aria-label="Product Filter Section">
            <TypeFilter />
          </section>

          <section aria-label="Category Section">
            <CategoryCard />
          </section>
        </>
      )}

      <section aria-label="Coworker Slider Section">
        <CoworkerSlider />
      </section>
      
    </div>
  );
};

export default Home;
