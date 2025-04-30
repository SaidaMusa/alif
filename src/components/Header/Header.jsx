import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShoppingCart, faMagnifyingGlass, faHeart, faChartSimple, 
  faComment, faBars, faMoon, faSun, faSignIn 
} from "@fortawesome/free-solid-svg-icons";
import "animate.css/animate.min.css";
import "../Header/Header.css"
import ResponsiveMenu from "../../pages/ResponsiveMenu/ResponsiveMenu";
import SearchModal from "../../components/SearchModal/SearchModal";
import Sidebar from "../SideBar/Sidebar";
import { allData } from "../../data/alldata";

const Header = ({ wishlistCount, cartCount, searchTerm, setSearchTerm, setFilteredProducts }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark", newMode);
      return newMode;
    });
  }, []);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProducts(value);
  }, [setSearchTerm, setFilteredProducts]);

  const filterProducts = (term) => {
    const filtered = allData.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategorySelect = useCallback((category) => {
    const filtered = allData.filter(item => item.type === category);
    setFilteredProducts(filtered);
    setSidebarOpen(false);
  }, [setFilteredProducts]);

  const categories = [
    "Smartphones and gadgets", "Laptops, Computers", "Televisions", "Audio Equipment",
    "Kitchen appliances", "Home Appliances", "Beauty and Health", "Smart Home",
    "Gaming Equipment", "Sports Goods", "Automotive Products", "Automotive Goods",
    "Tools and Garden Equipment", "Children's Products", "Construction and Repair"
  ];

  return (
    <>
      <header className="flex items-center justify-center gap-[10px] w-full h-[45px] animate__animated animate__zoomIn">
        <nav className="flex items-center justify-around gap-[28px]">
          <Link to="/">
            <h1 className="text-xl font-serif text-base/7 font-bold tracking-wider">
              <span className="text-green-700 text-2xl">Alif</span>Shop
            </h1>
          </Link>

          <div className="btns flex items-center justify-center gap-[5px]">
            <form 
              className="flex items-center justify-center gap-[5px]" 
              onSubmit={(e) => e.preventDefault()}
            >
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="bg-green-600 hover:bg-green-500 rounded-[8px] gap-1 focus:outline-2 focus:outline-offset-2 focus:outline-green-700"
              >
                <FontAwesomeIcon icon={faBars} /> Products <span>catalog</span>
              </button>

              <label>
              <input
                 type="text"
                 className="placeholder:text-gray-500 border-2 outline-none border-green-600 placeholder:italic"
                 placeholder="Search for products..."
                 value={searchTerm}
                 onChange={handleSearchChange}
                 id="text"    
                 name="text"
                 autoComplete="text"
               />
                <FontAwesomeIcon className="FontAwesomeIcon" icon={faMagnifyingGlass} />
              </label>
            </form>
          </div>

          <ul className="flex items-center justify-between gap-[55px] relative">
            <li>
              <Link className="hover:text-green-600 text-xl" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            <li className="relative">
              <Link className="hover:text-cyan-600 text-xl" to="/wishlist">
                <FontAwesomeIcon icon={faHeart} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <Link className="hover:text-cyan-600 text-xl" to="/stats">
                <FontAwesomeIcon icon={faChartSimple} />
              </Link>
            </li>

            <li>
              <Link className="hover:text-cyan-600 text-xl" to="/comment">
                <FontAwesomeIcon icon={faComment} />
              </Link>
            </li>
          </ul>

          <button onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </nav>

        <button
          className="bg-green-600 hover:bg-green-500 rounded-[8px] focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400 register flex items-center"
          type="button"
        >
          <Link to="/login" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faSignIn} />
            <span>Login</span>
          </Link>
        </button>

        <button onClick={toggleDarkMode} className="mode ml-4">
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>

        <ResponsiveMenu open={open} />

        <SearchModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          searchTerm={searchTerm}
        />
      </header>

      {sidebarOpen && (
        <Sidebar
          categories={categories}
          onSelectCategory={handleCategorySelect}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;