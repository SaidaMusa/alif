import { motion, AnimatePresence } from 'framer-motion';
import React from "react";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ open }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-15 right-0 rounded-4xl w-[50%] h-[350px] z-20 bg-cyan-500 text-white"
        >
          <div className="text-xl font-semibold uppercase py-10  m-6 rounded-4xl">
            <ul className="flex flex-col justify-center items-center gap-10 ">
              <li>
                <Link to="/" className="hover:text-cyan-200">Home</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cyan-200">Cart</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-cyan-200">Wishlist</Link>
              </li>
              <li>
                <Link to="/stats" className="hover:text-cyan-200">Statistics</Link>
              </li>
              <li>
                <Link to="/comment" className="hover:text-cyan-200">Comment</Link>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
