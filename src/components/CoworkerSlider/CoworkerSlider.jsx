import React from "react";
import "./CoworkerSlider.css";

const logos = [
  "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png",
];

const CoworkerSlider = () => {
  return (
    <div className="sliders">
      <div className="slide-track">
        {[...logos, ...logos].map((logo, i) => (
          <div className="slides" key={i}>
            <img
              src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/${logo}`}
              height="100"
              width="250"
              alt={`Logo ${i}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoworkerSlider;
