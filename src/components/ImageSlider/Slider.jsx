import React, { useRef, useEffect } from "react";
import SliderImg from "../../data/sliderImg"; 
import "../ImageSlider/Slider.css"
const Slider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const moveNext = () => {
      const items = slider?.querySelectorAll(".item");
      if (!items?.length) return;
      slider.append(items[0]); 
    };

    const movePrev = () => {
      const items = slider?.querySelectorAll(".item");
      if (!items?.length) return;
      slider.prepend(items[items.length - 1]); 
    };

    const handleClick = (e) => {
      if (e.target.matches(".next")) {
        moveNext();
      } else if (e.target.matches(".prev")) {
        movePrev();
      }
    };

    document.addEventListener("click", handleClick);

    const interval = setInterval(() => {
      moveNext();
    }, 3000);

    return () => {
      document.removeEventListener("click", handleClick);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="p-6">
      <ul className="slider" ref={sliderRef}>
        {SliderImg.map((item, i) => (
          <li
            key={i}
            className="item"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="content">
              <h1 className="title">"{item.title}"</h1>
            </div>
          </li>
        ))}
      </ul>
      <div className="btnPN">
        <ion-icon className="btn prev" name="arrow-back-outline"></ion-icon>
        <ion-icon className="btn next" name="arrow-forward-outline"></ion-icon>
      </div>
    </main>
  );
};

export default Slider;
