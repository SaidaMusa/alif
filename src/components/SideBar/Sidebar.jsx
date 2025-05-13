import React from "react";
import { AiOutlineMobile, AiOutlineLaptop, AiOutlineTablet, AiOutlineAudio, AiOutlineHome, AiFillCloseCircle } from "react-icons/ai";
import { GiSmartphone, GiCookingPot, GiHealthPotion, GiGamepad } from "react-icons/gi";
import { BsTv, BsTools, BsWatch } from "react-icons/bs";
import { FaCar, FaBaby } from "react-icons/fa";
import "../SideBar/Sidebar.css";

const categoryNames = {
  "Smartphones and gadgets": "Smartphones",
  "Laptops, Computers": "Laptops",
  "Televisions": "TVs",
  "Audio Equipment": "Audio",
  "Kitchen appliances": "Kitchen",
  "Home Appliances": "Home",
  "Beauty and Health": "Beauty",
  "Smart Home": "Smart Home",
  "Gaming Equipment": "Gaming",
  "Sports Goods": "Sports",
  "Automotive Products": "Automotive",
  "Automotive Goods": "Automotive",
  "Tools and Garden Equipment": "Tools",
  "Children's Products": "Kids",
  "Construction and Repair": "Repair",
};

const categoryIcons = {
  "Smartphones": <GiSmartphone size={20} />,
  "Laptops": <AiOutlineLaptop size={20} />,
  "TVs": <BsTv size={20} />,
  "Audio": <AiOutlineAudio size={20} />,
  "Kitchen": <GiCookingPot size={20} />,
  "Home": <AiOutlineHome size={20} />,
  "Beauty": <GiHealthPotion size={20} />,
  "Smart Home": <AiOutlineTablet size={20} />,
  "Gaming": <GiGamepad size={20} />,
  "Sports": <BsWatch size={20} />,
  "Automotive": <FaCar size={20} />,
  "Tools": <BsTools size={20} />,
  "Kids": <FaBaby size={20} />,
  "Repair": <BsTools size={20} />,
};

const Sidebar = ({ categories, onSelectCategory, onClose, activeCategory }) => {
  return (
    <aside className="relative sidebar w-[200px] border-r border-white p-4 bg-gray-50 shadow-lg rounded-lg" aria-label="Sidebar">
      <div className="flex justify-around items-center mb-4">
        <h1 className="text-lg font-semibold text-green-700">Categories</h1>
        <button
          onClick={onClose}
          className="text-green-700 hover:text-neutral-700 transition"
          aria-label="Close Sidebar"
        >
          <AiFillCloseCircle size={24} />
        </button>
      </div>

      <ul className="space-y-2" role="list">
        {categories.map((category, index) => {
          const shortName = categoryNames[category] ?? category;
          const icon = categoryIcons[shortName] ?? <AiOutlineMobile size={20} />;
          const isActive = activeCategory === category;

          return (
            <li
              key={index}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded transition ${
                isActive ? "bg-green-100 font-semibold" : "hover:bg-green-100"
              }`}
              onClick={() => onSelectCategory(category)}
              aria-label={`Select ${shortName}`}
              aria-pressed={isActive}
            >
              {icon}
              <span>{shortName}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
