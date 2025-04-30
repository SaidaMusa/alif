import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import '../SearchModal/SearchModal.css'; // Make sure the CSS file is imported

const SearchModal = ({ isOpen, onClose, filtered, searchTerm }) => {
  if (!isOpen) return null;  // If modal is not open, don't render anything

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </button>
        <h2 className="modal-title">Search Results for "{searchTerm}"</h2>

        {/* Check if there are filtered products */}
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <span className="product-price">${product.price}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">No products found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
