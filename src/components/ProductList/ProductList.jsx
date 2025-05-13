import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "../ProductList/ProductList.css";

const ProductList = ({ products = [] }) => {
  return (
    <div className="product-list flex-grow">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p className="text-center text-gray-500 col-span-full">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
