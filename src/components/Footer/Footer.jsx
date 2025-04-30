import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTelegram, faOdnoklassniki, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons'; 

const Footer = () => {
  return (
    <footer  className="bg-neutral-900  w-full px-6 py-20 text-neutral-100 font-sans min-h-[500px]">
      
      {/* Footer main content */}
     <div style={{padding: '3rem 0'}} className="footer_main flex flex-cols items-center justify-center ">
     <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-start">
        
        {/* Documents */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-semibold mb-2 mt-6">Documents</h4>
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">General Terms of Sale</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Regulation</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">License</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-semibold mb-2 mt-6">Services</h4>
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Prayer Time</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Installment Payment in Islam</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Sell on AlifShop!</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Refund</a></li>
          </ul>
        </div>

        {/* Catalogues */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-semibold mb-2 mt-6">Catalogues</h4>
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Telephones</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Gadgets</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Smartphone Accessories</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Wristwatches and Accessories</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-green-500 transition-colors">Related Products</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-semibold mb-2 mt-6">Social Media</h4>
          <div className="flex justify-center sm:justify-start gap-4">
            <a href="#" aria-label="facebook" className="hover:text-green-500 transition-transform transform hover:scale-110 text-2xl">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" aria-label="instagram" className="hover:text-green-500 transition-transform transform hover:scale-110 text-2xl">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="telegram" className="hover:text-green-500 transition-transform transform hover:scale-110 text-2xl">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
            <a href="#" aria-label="odnoklassniki" className="hover:text-green-500 transition-transform transform hover:scale-110 text-2xl">
              <FontAwesomeIcon icon={faOdnoklassniki} />
            </a>
            <a href="#" aria-label="tiktok" className="hover:text-green-500 transition-transform transform hover:scale-110 text-2xl">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>

      </div>
     </div>

      {/* Footer bottom */}
      {/* Footer bottom */}
<div className="flex  sm:flex-row  items-center justify-around text-neutral-400 text-sm">
  <p>© 2025 AlifShop</p>
  <p className="flex items-center gap-2">
    <FontAwesomeIcon icon={faPhone} /> +998 555 12 12
  </p>
</div>


    </footer>
  );
};

export default Footer;
