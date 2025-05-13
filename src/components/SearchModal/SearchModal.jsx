import { AiOutlineClose } from "react-icons/ai";
import ProductCard from "../ProductCard/ProductCard";
import "../SearchModal/SearchModal.css";

const SearchModal = ({ isOpen, onClose, searchTerm, filtered = [] }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="modal-overlay fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content relative bg-white rounded-xl w-full max-w-7xl h-[100vh] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-green-500 scrollbar-thumb-rounded-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-green-500 transition"
          aria-label="Close Search Modal"
        >
          <AiOutlineClose />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          Search Results for: "{searchTerm}"
        </h2>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 text-4xl">No products found.</p>
        ) : (
          <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
