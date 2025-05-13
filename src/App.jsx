import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Stats from "./pages/Stats/Stats";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Comment from "./pages/Comment/Comment";
import Footer from "./components/Footer/Footer";
import SearchModal from "./components/SearchModal/SearchModal";
import CatalogLayout from "./pages/CatalogLayout/CatalogLayout";
import ProductPage from "./components/ProductPage/ProductPage";
import allData from "./data/alldata";
import { logAnalyticsEvent } from "./utils/firebase";
import { CartProvider } from "./context/CartContext";
import { DarkModeProvider } from "./context/DarkMode";
import { LoaderProvider, useLoader } from "./context/LoaderContext";
import { WishlistProvider, useWishlistContext } from "./context/WishlistContext"; 

function AppContent() {
  const navigate = useNavigate();
  const { loading, Loader } = useLoader(); 
  const { wishlist, addToWishlist } = useWishlistContext(); 

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const products = allData;

  useEffect(() => {
    try {
      if (!user) {
        navigate("/login");
        logAnalyticsEvent("user_not_logged_in", { message: "User not logged in" });
      } else {
        logAnalyticsEvent("user_logged_in", { email: user.email });
      }
    } catch (error) {
      console.error("Error during user authentication check:", error);
    }
  }, [user, navigate]);

  useEffect(() => {
    try {
      if (searchTerm) {
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error while filtering products:", error);
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="container">
        {user && (
          <Header
            wishlistCount={wishlist.length} 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setFilteredProducts={setFilteredProducts}
          />
        )}

        <SearchModal
          isOpen={!!searchTerm}
          onClose={() => setSearchTerm("")}
          filtered={filteredProducts}
        />

        <Routes>
          {user ? (
            <>
              <Route
                path="/"
                element={<Home addToWishlist={addToWishlist} wishlist={wishlist} />} 
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/wishlist"
                element={<Wishlist wishlist={wishlist} addToWishlist={addToWishlist} />} 
              />
              <Route path="/stats" element={<Stats />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/catalog" element={<CatalogLayout />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="*" element={<Login setUser={setUser} />} />
            </>
          )}
        </Routes>
      </div>
      {user && <Footer />}
    </>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <CartProvider>
        <WishlistProvider>
          <LoaderProvider duration={2000}>
            <AppContent />
          </LoaderProvider>
        </WishlistProvider>
      </CartProvider>
    </DarkModeProvider>
  );
}

export default App;
