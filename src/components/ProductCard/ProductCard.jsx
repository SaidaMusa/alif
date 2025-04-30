import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import "../ProductCard/ProductCard.css";

const ProductCard = ({ product, addToWishlist, addToCart, updateQuantity }) => {
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(savedWishlist.some((item) => item.id === product.id));

    const storedQuantity = JSON.parse(localStorage.getItem("quantities")) || {};
    if (storedQuantity[product.id]) {
      setQuantity(storedQuantity[product.id]);
    }
  }, [product.id]);

  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || {};
    if (quantity > 0) {
      storedQuantities[product.id] = quantity;
    } else {
      delete storedQuantities[product.id];
    }
    localStorage.setItem("quantities", JSON.stringify(storedQuantities));
  }, [quantity, product.id]);

  const toggleLike = () => {
    const newState = !liked;
    setLiked(newState);
    addToWishlist(product, newState);
  };

  const handleAddToCart = () => {
    const newQuantity = 1;
    setQuantity(newQuantity);
    addToCart({ ...product, quantity: newQuantity }); // product bilan birga quantity jo‘natiladi
    if (updateQuantity) updateQuantity(product.id, newQuantity);
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (updateQuantity) updateQuantity(product.id, newQuantity);
  };

  const decrement = () => {
    const newQuantity = quantity - 1;
    const finalQuantity = newQuantity <= 0 ? 0 : newQuantity;
    setQuantity(finalQuantity);
    if (updateQuantity) updateQuantity(product.id, finalQuantity);
  };

  return (
    <div className="productCard flex flex-col items-center text-center w-72 h-[460px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.05] transition duration-300 ease-in-out relative border border-green-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-38 object-cover rounded-t-xl transition duration-300 transform hover:scale-105"
      />
      <div
        onClick={toggleLike}
        className="heartIcon absolute top-4 right-4 text-green-700 p-2 rounded-full shadow-lg hover:scale-110 transition duration-300 cursor-pointer"
      >
        <FontAwesomeIcon icon={liked ? fasHeart : farHeart} />
      </div>
      <div className="card-content p-4 flex flex-col items-center justify-between flex-grow">
        <h2 className="card-title text-lg font-semibold text-green-700 mb-2 tracking-tight">
          {product.title}
        </h2>
        <p className="card-description text-gray-600 mb-3 text-justify">
          {product.description}
        </p>
        <h3 className="text-base font-semibold text-green-700 mb-4">
          ${product.price * (quantity || 1)}
        </h3>

        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="addToCart bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
          >
            Add to Cart
          </button>
        ) : (
          <div className="quantity-controller flex items-center overflow-hidden">
            <button
              onClick={increment}
              style={{ padding: "0.5rem 1rem", margin: "1.5rem 0.5rem" }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
            >
              +
            </button>
            <div className="bg-white text-green-700 text-xl font-semibold px-4">
              {quantity}
            </div>
            <button
              onClick={decrement}
              style={{ padding: "0.5rem 1rem", margin: "1.5rem 0.5rem" }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
