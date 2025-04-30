import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from './components/Header/Header';
import "./App.css";
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import Stats from './pages/Stats/Stats';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Comment from './pages/Comment/Comment'; 
import ResponsiveMenu from './pages/ResponsiveMenu/ResponsiveMenu';
import Footer from './components/Footer/Footer'; 
import SearchModal from './components/SearchModal/SearchModal';
import { allData } from './data/alldata'; 
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    return savedMode;
  });

  const products = allData;

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    return () => {
      document.body.classList.remove('dark');
    };
  }, [darkMode]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter((product) =>
          product.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm]);

  // Wishlist functions
  const addToWishlist = (product, isLiked) => {
    const updated = isLiked
      ? [...wishlist, product]
      : wishlist.filter((item) => item.id !== product.id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // Cart functions
  const addToCart = (newProduct) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === newProduct.id);

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === newProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...newProduct, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    resetTypeFilter(); // Reset the type filter when removing an item
  };

  const updateQuantity = (id, newQty) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const handleOrder = () => {
    alert("Thank you for your order!");
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const resetTypeFilter = () => {
    // Reset the type filter here to the default state
    setFilteredProducts([]);  // Clears the filtered products
  };

 

  return (
    <>
      <div className="container">
        <Header
          wishlistCount={wishlist.length}
          cartCount={cartItems.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          alldata={products}
          products={products}
          setFilteredProducts={setFilteredProducts}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          filteredProducts={filteredProducts}
          setCatalogOpen={setCatalogOpen}
        />

        <SearchModal
          isOpen={!!searchTerm}
          onClose={() => setSearchTerm('')}
          filtered={filteredProducts}
          searchTerm={searchTerm}
          addToWishlist={addToWishlist}
          wishlist={wishlist}
          addToCart={addToCart}
        />

        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  addToWishlist={addToWishlist}
                  wishlist={wishlist}
                  addToCart={addToCart}
                  searchTerm={searchTerm}
                  filteredProducts={filteredProducts}
                  catalogOpen={catalogOpen}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onRemove={handleRemoveFromCart}
                  updateQuantity={updateQuantity}
                  onOrder={handleOrder}
                  resetTypeFilter={resetTypeFilter} 
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlist={wishlist}
                  addToWishlist={addToWishlist}
                />
              }
            />
            <Route path="/stats" element={<Stats />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/res" element={<ResponsiveMenu />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  );
}

export default App;
