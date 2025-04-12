import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import "./Header/Header.css";
import "./App.css";
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Stats from './pages/Stats';
import Login from './pages/Login';
import Home from './pages/Home';
import Comment from './pages/Comment'; 
import ResponsiveMenu from './pages/ResponsiveMenu';
import Chatbot from './pages/Chatbot/Chatbot';

const accordionData = [
  { title: "Use the tab key to navigate...", content: "You can cycle through all the different accordion items through tabbing." },
  { title: "Or, you can use your mouse.", content: "This accordion can be used by both mouse and keyboard-only users." },
  { title: "Click here to view more", content: "You can also use either the space bar or enter key to expand/collapse these panels." },
  { title: "ARIA", content: "This accordion makes use of ARIA tags which help aid accessibility." },
];

function App() {
  return (
    <div className='container'>
        <Header />
        <Chatbot/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/comment" element={<Comment items={accordionData} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/res" element={<ResponsiveMenu />} />
        </Routes>
       
    </div>
  );
}

export default App;
