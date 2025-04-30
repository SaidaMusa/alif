import React from "react";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ open }) => {
  return (
    <>
      {open && (
        <div className="absolute top-16 right-0 w-[70%] max-w-xs bg-green-500 text-white z-20 rounded-3xl shadow-lg animate__animated animate__fadeInDown">
          <div className="text-xl font-semibold uppercase py-10 px-6">
            <ul className="flex flex-col items-center gap-6">
              <li>
                <Link to="/" className="hover:text-green-200 transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-green-200 transition-colors duration-200">Cart</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-green-200 transition-colors duration-200">Wishlist</Link>
              </li>
              <li>
                <Link to="/stats" className="hover:text-green-200 transition-colors duration-200">Statistics</Link>
              </li>
              <li>
                <Link to="/comment" className="hover:text-green-200 transition-colors duration-200">Comment</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveMenu;
