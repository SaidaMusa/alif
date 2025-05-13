import React from "react";
import { Link, useLocation } from "react-router-dom";
import "animate.css";

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/cart", label: "Cart" },
  { path: "/wishlist", label: "Wishlist" },
  { path: "/stats", label: "Statistics" },
  { path: "/comment", label: "Comment" },
];

const ResponsiveMenu = ({ open }) => {
  const { pathname } = useLocation();

  if (!open) return null;

  return (
    <div 
      role="menu" 
      aria-label="Responsive Navigation Menu"
      className="absolute top-16 right-0 w-[70%] max-w-xs bg-green-500 text-white z-20 rounded-3xl shadow-lg p-6 animate__animated animate__fadeInDown"
    >
      <ul className="flex flex-col items-center gap-6">
        {menuItems.map(({ path, label }) => {
          const isActive = pathname === path;
          return (
            <li key={path}>
              <Link 
                to={path}
                aria-current={isActive ? "page" : undefined}
                className={`transition duration-200 ${
                  isActive ? "text-green-300 font-semibold" : "hover:text-green-200"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResponsiveMenu;
