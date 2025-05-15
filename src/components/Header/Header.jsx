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
const user = JSON.parse(localStorage.getItem("user")) || {};



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
    className="bg-green-700 hover:bg-green-800 text-black rounded-[8px] gap-2 px-4 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-green-800"
    aria-label="Open Catalogs"
  >
    <AiOutlineBars className='icon' size={24} /> Catalogs
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
                  <span className="iconSearch absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2">
                    <AiOutlineSearch size={25} />
                  </span>
                </div>
              </label>
            </form>
          </div>

         <ul className="flex items-center justify-between gap-[40px] relative">
  <li className="relative flex items-center">
    <Link
      to="/cart"
      className="text-xl hover:text-green-600"
      aria-label="Shopping Cart"
    >
      <AiOutlineShoppingCart size={28} />
    </Link>
    {cartCount > 0 && (
      <span className="absolute -top-3 -right-3 bg-green-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
        {cartCount}
      </span>
    )}
  </li>

  <li className="relative flex items-center">
    <Link
      to="/wishlist"
      className="text-xl hover:text-green-600"
      aria-label="Wishlist"
    >
      <AiOutlineHeart size={28} />
    </Link>
    {wishlistCount > 0 && (
      <span className="absolute -top-3 -right-3 bg-green-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
        {wishlistCount}
      </span>
    )}
  </li>

  <li>
    <Link to="/stats" className="hover:text-green-600" aria-label="Statistics">
      <AiOutlineBarChart size={24} />
    </Link>
  </li>

  <li>
    <Link to="/comment" className="hover:text-green-600" aria-label="Comments">
      <AiOutlineComment size={25} />
    </Link>
  </li>
</ul>

          <button className='mode'  onClick={() => toggleMenuState("open")}  aria-label={menuState.open ? "Close Menu" : "Open Menu"}>
            <AiOutlineBars className='icon' size={24} />
          </button>
        </nav>

   
            <button
              onClick={() => toggleMenuState("openProfile")}
              className='mode'
              aria-label={menuState.openProfile ? "Close Profile" : "Open Profile"}
            >
              <AiOutlineUser className='icon' size={24} />
            </button>
           
         <button className='mode' onClick={toggleDarkMode} aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {darkMode ? <BsSun className='icon' size={24} /> : <BsMoon className='icon' size={24} />}
          </button>

      
      </header>
  <ResponsiveMenu open={menuState.open} />
  {menuState.openProfile && (
  <div className="fixed flex flex-col gap-3 top-16 right-4 w-64 h-20 bg-black text-white  rounded-lg shadow-2xl p-4 z-[9999] space-y-4 transition-all animate__animated animate__fadeInDown">
    <p className="px-4 py-2 text-white text-center text-xl">
      {user?.firstName || "User"} {user?.lastName || ""}
    </p>
    <button
      onClick={handleProfileClick}
       className="logoutBtn flex items-center bg-green-600 justify-center gap-1 text-xl w-[80%] text-center px-4 py-2 text-neutral-800 hover:bg-gray-200 rounded-lg"
    >
      <AiOutlineLogout  className='icon' size={20} />
      Logout
    </button>
  </div>
)}

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
