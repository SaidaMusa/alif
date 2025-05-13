import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineBarChart,
  AiOutlineComment,
  AiOutlineBars,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsMoon, BsSun } from "react-icons/bs";
import "animate.css/animate.min.css";
import "../Header/Header.css";
import ResponsiveMenu from "../../pages/ResponsiveMenu/ResponsiveMenu";
import Sidebar from "../SideBar/Sidebar";
import allData from "../../data/alldata";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useCart } from "../../context/CartContext";

const Header = ({
  wishlistCount,
  searchTerm,
  setSearchTerm,
  setFilteredProducts,
  onLogout,
}) => {
  const [menuState, setMenuState] = useState({
  open: false,
  sidebarOpen: false,
  openProfile: false,
});

const {cartCount,cartItems} = useCart();
const toggleMenuState = (key) => {
  setMenuState((prev) => ({ ...prev, [key]: !prev[key] }));
};

  const { darkMode, toggleDarkMode } = useDarkMode();
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      filterProducts(value);
    },
    [setSearchTerm, setFilteredProducts]
  );

  const filterProducts = (term) => {
    const filtered = allData.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

 const handleProfileClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("user");
      if (onLogout) onLogout();
    }
    window.location.href = "/login";
  };




  const categories = [
    "Smartphones and gadgets", "Laptops, Computers", "Televisions", "Audio Equipment",
    "Kitchen appliances", "Home Appliances", "Beauty and Health", "Smart Home",
    "Gaming Equipment", "Sports Goods", "Automotive Products", "Automotive Goods",
    "Tools and Garden Equipment", "Children's Products", "Construction and Repair",
  ];

  return (
    <>
      <header className="flex items-center justify-center gap-[15px] w-full h-[45px] animate__animated animate__zoomIn">
        <nav className="flex items-center justify-around gap-[25px]">
          <Link to="/" aria-label="Home - AlifShop">
            <h1 className="text-xl font-serif text-base/7 font-bold ">
              <span className="text-green-700 text-2xl">Alif</span>Shop
            </h1>
          </Link>

          <div className="btns flex items-center justify-center gap-[10px]">
            <form className="flex items-center gap-[5px]" onSubmit={(e) => e.preventDefault()}>
              <Link to="/catalog" aria-label="Open Catalogs">
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-500 rounded-[8px] gap-2 focus:outline-2 focus:outline-offset-2 focus:outline-green-700"
                  aria-label="Open Catalogs"
                >
                  <AiOutlineBars size={24} /> Catalogs
                </button>
              </Link>

              <label className="flex items-center gap-5">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="border border-green-600 rounded-lg pl-4 pr-10 py-1 placeholder:text-gray-500"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-label="Search products"
                  />
                  <span className="icon absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2">
                    <AiOutlineSearch size={25} />
                  </span>
                </div>
              </label>
            </form>
          </div>

          <ul className="flex items-center justify-between gap-[40px] relative">
            <li className="relative flex items-center">
              <Link to="/cart" className="text-xl hover:text-green-600">
                <AiOutlineShoppingCart size={28} />
              </Link>
              {cartCount>0 && (
                <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </li>

            <li className="relative flex items-center">
              <Link to="/wishlist" className="text-xl hover:text-green-600">
                <AiOutlineHeart size={28} />
              </Link>
              {wishlistCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </li>

            <li>
              <Link to="/stats" className="hover:text-cyan-600">
                <AiOutlineBarChart size={24} />
              </Link>
            </li>

            <li>
              <Link to="/comment" className="hover:text-cyan-600">
                <AiOutlineComment size={25} />
              </Link>
            </li>
          </ul>

          <button  onClick={() => toggleMenuState("open")}  aria-label={menuState.open ? "Close Menu" : "Open Menu"}>
            <AiOutlineBars size={24} />
          </button>
        </nav>

     <div className="relative">
            <button
              onClick={() => toggleMenuState("openProfile")}
              aria-label={menuState.openProfile ? "Close Profile" : "Open Profile"}
            >
              <AiOutlineUser size={24} />
            </button>
            {menuState.openProfile && (
              <div className="absolute flex flex-col items-center justify-center gap-3 right-0 mt-2 w-58 h-24  bg-neutral-800 text-center rounded-[10px] shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-white text-xl">
                  {JSON.parse(localStorage.getItem("user"))?.firstName || "User"}{" "}
                  {JSON.parse(localStorage.getItem("user"))?.lastName || ""}
                </p>
                <button
                  className="flex items-center justify-center gap-1 text-xl w-[80%] text-center px-4 py-2 text-neutral-800 hover:bg-gray-200"
                  onClick={handleProfileClick}
                >
                <span> <AiOutlineLogout size={20}/> </span>Logout
                </button>
              </div>
            )}
          </div>


         <button onClick={toggleDarkMode} aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {darkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
          </button>

        <ResponsiveMenu open={menuState.open} />
      </header>

     {menuState.sidebarOpen && (
        <Sidebar
          categories={categories}
          onClose={() => toggleMenuState("sidebarOpen")}
        />
      )}
    </>
  );
};

export default Header;
