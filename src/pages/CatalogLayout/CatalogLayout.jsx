import React, { useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import ProductList from "../../components/ProductList/ProductList";
import "../CatalogLayout/CatalogLayout.css";
import allData from "../../data/alldata";
import { useNavigate } from 'react-router-dom';

const categories = [
  "Smartphones and gadgets",
  "Laptops, Computers",
  "Televisions",
  "Audio Equipment",
  "Kitchen appliances",
  "Home Appliances",
  "Beauty and Health",
  "Smart Home",
  "Gaming Equipment",
  "Sports Goods",
  "Automotive Products",
  "Tools and Garden Equipment",
  "Children's Products",
  "Construction and Repair",
];

const CatalogLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
   const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const handleClose = () => {
    console.log("Sidebar Closed");
    navigate("/"); 
  };

  const filteredProducts = allData.filter((product) => {
    return selectedCategory
      ? product.type === selectedCategory
      : true; 
  });

  return (
    <div className="catalog-layout flex">
        {sidebarOpen && (
           <Sidebar 
           categories={categories} 
           onSelectCategory={setSelectedCategory}
          onClose={handleClose}
          />
        )}

      <div className="catalog-content flex-grow p-4">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default CatalogLayout;
