import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../Cart/Cart.css"
const Cart = ({ cartItems, onRemove, updateQuantity, onOrder, resetTypeFilter }) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    onRemove(id); // Remove the item from the cart
    resetTypeFilter(); // Reset the filtered products when removing an item
  };

  const increment = (id) => {
    const updatedItem = cartItems.find((item) => item.id === id);
    if (updatedItem) {
      updateQuantity(id, updatedItem.quantity + 1); // Increment the quantity
    }
  };

  const decrement = (id) => {
    const updatedItem = cartItems.find((item) => item.id === id);
    if (updatedItem) {
      if (updatedItem.quantity > 1) {
        updateQuantity(id, updatedItem.quantity - 1); // Decrease the quantity
      } else {
        onRemove(id); // Remove the item if the quantity is 1
        resetTypeFilter(); // Reset the filter when removing an item
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart_empty flex flex-col items-center justify-center">
      <FontAwesomeIcon icon={faCartShopping} className="icon text-green-700 text-7xl mb-6" />
      <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
      <p className="text-gray-500 mt-2">Start adding some products to fill it up!</p>
      <Link
          to="/"
          className="cartBtn bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-8 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
        >
          Go to Home Page
        </Link>
    </div>
    );
  }

  return (
    <div className="cartWrapper p-6 max-w-[1440px] mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="tableContent overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left text-sm text-gray-700 uppercase">
            <tr>
              <th >Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b border-green-300">
                <td className="p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                    <p className="font-medium">{item.title}</p>
                </td>
                <td className="p-4 font-semibold">${item.price.toFixed(2)}</td>
                <td>
                  <div className="flex items-center overflow-hidden">
                    <button
                      onClick={() => increment(item.id)}
                       className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
                    >
                      +
                    </button>
                    <div className="bg-white text-green-700 text-xl font-semibold px-4">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => decrement(item.id)}
                       className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
                    >
                      -
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="total flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-xl font-bold text-green-600 px-4 py-2 rounded-lg">
          Total Price: ${totalPrice.toFixed(2)}
        </p>
        <button
          onClick={onOrder}
          className="order bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
