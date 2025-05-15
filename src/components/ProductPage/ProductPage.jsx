import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useCart } from "../../context/CartContext";
import "../ProductPage/ProductPage.css"
const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { addToCart, incrementItem, decrementItem, cartItems } = useCart();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (product?.id) {
      const savedRating = localStorage.getItem(`rating-${product.id}`);
      if (savedRating) {
        setRating(parseInt(savedRating));
      }
    }
  }, [product]);

  const handleRating = (rate) => {
    setRating(rate);
    if (product?.id) {
      localStorage.setItem(`rating-${product.id}`, rate);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  const cartItem = cartItems.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  return (
    <div className="productPage flex flex-col lg:flex-row gap-3 items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.image || product.images?.[0]}
          alt={product.title}
          className="w-full max-w-md h-auto object-contain"
        />
      </div>

      <div
        style={{ marginRight: "4rem", padding: "2rem" }}
        className="descriptionWrapper flex-1 flex flex-col items-center gap-5 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => handleRating(star)}>
              {star <= rating ? (
                <AiFillStar size={24} className="text-yellow-500" />
              ) : (
                <AiOutlineStar size={24} className="text-gray-400" />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl text-green-700 mb-2">${product.price}</p>
          <p className="text-lg mb-4">{product.description}</p>

          {isInCart ? (
            <div className="flex gap-4 items-center">
              <button
                onClick={() => decrementItem(product.id)}
                style={{ padding: "0.5rem 1rem" }}
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
              >
                -
              </button>
              <span>{cartItem.quantity}</span>
              <button
                onClick={() => incrementItem(product.id)}
                style={{ padding: "0.5rem 1rem" }}
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart({ id: product.id, quantity: 1 })}
              style={{ padding: "0.5rem 1rem" }}
              className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
