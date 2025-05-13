import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import "../ProductCard/ProductCard.css"
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, incrementItem, decrementItem, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistContext();

  const quantity = cartItems.find((item) => item.id === product.id)?.quantity || 0;
  const isAdded = quantity > 0;
  const isLiked = wishlist.some((item) => item.id === product.id);

  const handleImageClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const toggleWishlist = () => {
    isLiked ? removeFromWishlist(product) : addToWishlist([product]);
  };

  const handleAddToCart = () => addToCart({ id: product.id, quantity: 1 });

  const handleIncrement = () => incrementItem(product.id, 1);
  
  const handleDecrement = () => decrementItem(product.id);

  return (
    <div
      className="productCard flex flex-col items-center text-center w-72 h-[460px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.05] transition duration-300 ease-in-out relative border border-green-300"
      aria-label={`Product: ${product.title}`}
      role="region"
    >
      <div className="w-full aspect-[4/3] bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
        <img
          src={product.image || product.images?.[0]}
          loading="lazy"
          alt={product.title}
          onClick={handleImageClick}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 rounded-xl cursor-pointer"
        />
      </div>

      <button
        onClick={toggleWishlist}
        className="heartBtn absolute top-4 right-4 text-green-700 p-2 rounded-full shadow-lg hover:scale-110 transition duration-300 cursor-pointer"
        aria-label={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isLiked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
      </button>

      <div className="p-4 flex flex-col items-center justify-between flex-grow">
        <h2 className="text-lg font-semibold text-green-700 mb-2 tracking-tight" aria-label={`Product title: ${product.title}`}>
          {product.title}
        </h2>

        <p className="text-gray-600 mb-3 text-justify" aria-label={`Product description: ${product.description}`}>
          {product.description}
        </p>

        <h3
          className="text-base font-semibold text-green-700 mb-4"
          aria-label={`Price: ${isAdded ? (product.price * quantity).toFixed(2) : product.price} so'm`}
        >
          ${isAdded ? (product.price * quantity).toFixed(2) : product.price}
        </h3>

        {isAdded ? (
          <div className="flex items-center space-x-4" aria-label={`Quantity: ${quantity}`}>
            <button
              onClick={handleDecrement}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
              style={{padding:'0.5rem 1rem',margin:'0 0.5rem'}}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
              style={{padding:'0.5rem 1rem',margin:'0 0.5rem'}}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
            style={{padding:'1rem 1.2rem'}}
            aria-label="Add to Cart"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
