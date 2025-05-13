import React from "react";
import image1 from "../../assets/images/bosch.png";
import image2 from "../../assets/images/honor.png";
import image3 from "../../assets/images/artel.png";
import image4 from "../../assets/images/samsung.png";
import image5 from "../../assets/images/oppo.png";
import image6 from "../../assets/images/asus.png";
import image7 from "../../assets/images/olg.png";
import "../CoworkerSlider/CoworkerSlider.css"

const logos = [image1, image2, image3, image4, image5, image6, image7];

const CoworkerSlider = () => {
  return (
    <div className="sliders overflow-hidden w-full flex space-x-4 p-4">
      <div className='slide-track'>
      {[...logos, ...logos].map((logo, index) => (
        <div key={index} className="slides flex items-center justify-center p-2">
          <img
            src={logo}
            className="w-32 h-auto object-contain hover:scale-105 transition-transform duration-300"
            alt={`Logo ${index}`}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default CoworkerSlider;
