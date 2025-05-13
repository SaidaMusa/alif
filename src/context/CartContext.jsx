import React, { createContext, useContext } from "react";
import { useCart as useCartHook } from "../hooks/useCart";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const cart = useCartHook();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
