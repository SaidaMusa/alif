import React from "react";
import { FaFacebook, FaInstagram, FaTelegram, FaOdnoklassniki, FaTiktok, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 w-full px-6 py-20 text-neutral-100 font-sans min-h-[500px]"style={{paddingTop:'2rem'}} >
      
      <div className="footer_main flex items-center justify-center py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-start">
          
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-semibold mb-2 mt-6">Documents</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="https://alifshop.uz/uz/terms/actual" className="text-neutral-400 hover:text-green-500 transition-colors">General Terms of Sale</a></li>
              <li><a href="http://alifshop.uz/uz/terms/charter" className="text-neutral-400 hover:text-green-500 transition-colors">Regulation</a></li>
              <li><a href="https://alifshop.uz/uz/terms/certificate" className="text-neutral-400 hover:text-green-500 transition-colors">License</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-semibold mb-2 mt-6">Services</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Prayer Time</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Installment Payment in Islam</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Sell on AlifShop!</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Refund</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-semibold mb-2 mt-6">Catalogues</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Telephones</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Gadgets</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-semibold mb-2 mt-6">Social Media</h4>
            <div className="flex justify-center sm:justify-start gap-4 text-2xl">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-green-500 transition-transform transform hover:scale-110">
                <FaFacebook />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-500 transition-transform transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:text-green-500 transition-transform transform hover:scale-110">
                <FaTelegram />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Odnoklassniki" className="hover:text-green-500 transition-transform transform hover:scale-110">
                <FaOdnoklassniki />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-green-500 transition-transform transform hover:scale-110">
                <FaTiktok />
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="flex sm:flex-row items-center justify-around text-neutral-400 text-sm py-6">
        <p>© 2025 AlifShop</p>
        <p className="flex items-center gap-2">
          <FaPhone /> +998 555 12 12
        </p>
      </div>

    </footer>
  );
};

export default Footer;
