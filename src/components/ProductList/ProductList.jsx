import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "../ProductList/ProductList.css";

const ProductList = ({ products = [] }) => {
  return (
    <div
      className="product-list flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      role="list"
      aria-label="Product list"
    >
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} role="listitem">
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
