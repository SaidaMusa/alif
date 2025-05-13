import React, { useRef, useEffect } from "react";
import SliderImg from "../../data/sliderImg";
import "../ImageSlider/Slider.css";

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
      if (e.target.closest(".next")) {
        moveNext();
      } else if (e.target.closest(".prev")) {
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
      <ul className="slider transition-transform duration-500 ease-in-out" ref={sliderRef} role="list" aria-label="Image Slider">
        {SliderImg.map((item, i) => (
          <li
            key={i}
            className="item transition duration-500"
            role="listitem"
            aria-label={`Slide ${i + 1}: ${item.title}`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="content" aria-hidden="true">
              <h1 className="title">{item.title}</h1>
            </div>
          </li>
        ))}
      </ul>

      <div className="btnPN">
        <button
          className="btn prev"
          aria-label="Previous Slide"
          type="button"
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>

        <button
          className="btn next"
          aria-label="Next Slide"
          type="button"
        >
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </div>
    </main>
  );
};

export default Slider;
