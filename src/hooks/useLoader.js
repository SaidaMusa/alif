import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const useLoader = (duration = 1500) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return { loading };
};


export const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-[#1b1b1b]">
    <div className="flex space-x-4">
      {Array(3)
        .fill("")
        .map((_, index) => (
          <motion.div
            key={index}
            className="w-6 h-6 bg-[#03fc4e] rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [1, 0.5, 1],
            }}
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
