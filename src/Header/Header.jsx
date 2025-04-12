import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faMagnifyingGlass, faHeart, faChartSimple, faComment, faBars } from "@fortawesome/free-solid-svg-icons";
import 'animate.css/animate.min.css';
import ResponsiveMenu from '../pages/ResponsiveMenu'; 

const Header = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="flex items-center justify-between gap-[15px] w-[100%] h-[45px] animate__animated animate__zoomIn">
      <Link to="/">
        <h1 className="text-xl font-serif text-base/7 font-bold tracking-wider text-slate-800">
          <span className="text-cyan-600 text-2xl">Alif</span>Shop
        </h1>
      </Link>
      <nav className="flex items-center justify-between gap-[10px]">
        <div className="btns">
          <form className="flex items-center justify-center gap-[5px]">
            <button className="bg-cyan-500 hover:bg-cyan-400 rounded-[8px] focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600" type="submit">
              <FontAwesomeIcon icon={faBars} /> Products <span>catalog</span>
            </button>
            <label>
              <input
                type="text"
                className="placeholder:text-gray-500 border-2 outline-none border-cyan-500 placeholder:italic"
                placeholder="Search for products..."
              />
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faMagnifyingGlass} />
            </label>
          </form>
        </div>
        <ul className="flex items-center justify-between gap-[50px]">
          <li>
            <Link className="hover:text-cyan-600 text-xl" to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
          <li>
            <Link className="hover:text-cyan-600 text-xl" to="/wishlist">
              <FontAwesomeIcon icon={faHeart} />
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
      <button className="bg-cyan-500 hover:bg-cyan-400 rounded-[8px] focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400 register" type="submit">
        <Link to="/login">Login</Link>
      </button>
      <ResponsiveMenu open={open} />
    </header>
  );
};

export default Header;
