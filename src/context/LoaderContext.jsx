import React, { createContext, useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoaderContext = createContext();

export const LoaderProvider = ({ duration = 1500, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const Loader = () => (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex space-x-4">
        {Array(3).fill(null).map((_, index) => (
          <motion.div
            key={index}
            className="w-6 h-6 bg-green-500 rounded-full"
            animate={{ y: [0, -20, 0], opacity: [1, 0.5, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <LoaderContext.Provider value={{ loading, Loader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
