import React from 'react';

const Sidebar = ({ categories, onSelectCategory, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-end">
      <div className="bg-white w-64 h-full shadow-lg p-6 flex flex-col">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 mb-4 text-xl font-semibold"
        >
          ❌ 
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Categories</h2>
        <ul className="space-y-4 text-lg text-gray-700">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onSelectCategory(category)}
              className="cursor-pointer hover:bg-cyan-600 hover:text-white p-3 rounded-lg transition-all"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
