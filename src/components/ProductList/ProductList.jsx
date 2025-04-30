import React from 'react';
import alldata from '../../data/alldata';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = ({ category, addToWishlist, wishlist, addToCart }) => {
  const filteredProducts = alldata.filter((product) => product.type === category);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
            addToCart={addToCart}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-6">No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductList;
