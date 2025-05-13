import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "../Cart/Cart.css";

const Cart = () => {
  const { cartItems, handleRemoveFromCart, incrementItem, decrementItem, clearCart } =
    useContext(CartContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = typeof item.price === "number" ? item.price : 0;
    return acc + price * item.quantity;
  }, 0);

  if (!cartItems.length) {
    return (
      <div className="cart_empty flex flex-col items-center justify-center" aria-label="Your cart is empty">
        <AiOutlineShoppingCart className="text-green-700 text-7xl mb-6" />
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Start adding some products to fill it up!</p>
        <Link
          to="/"
          className="cartBtn bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-2 rounded-lg hover:from-green-600 hover:to-green-500 transition"
        >
          Go to Home Page
        </Link>
      </div>
    );
  }

  const handleOrder = () => {
    // Orderni orders arrayiga qo'shamiz
    setOrders((prev) => [...prev, ...cartItems]);

    // Savatni bo'shatamiz
    clearCart();

    alert(`Your order for $${totalPrice.toFixed(2)} has been placed successfully!`);
  };

  return (
    <div className="cartWrapper p-6 max-w-[1440px] mx-auto" aria-label="Shopping Cart">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="tableContent overflow-x-auto" role="table" aria-label="Cart items table">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-left text-sm text-gray-700 uppercase">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b border-green-300">
                <td className="p-4 flex items-center gap-10">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-contain"
                  />
                  <p className="font-medium">{item.title}</p>
                </td>

                <td className="p-4 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

                <td>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => decrementItem(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold px-4">{item.quantity}</span>

                    <button
                      onClick={() => incrementItem(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <AiFillDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="total flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-xl font-bold text-green-600 px-4 py-2 rounded-lg">
          Total: ${totalPrice.toFixed(2)}
        </p>

        <button
          onClick={handleOrder}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
