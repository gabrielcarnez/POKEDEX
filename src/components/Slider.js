import React, { useState } from "react";
import PropTypes from "prop-types";

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (n) => {
    let nextSlide = currentSlide + n;

    if (nextSlide < 0) {
      nextSlide = images.length - 1;
    } else if (nextSlide >= images.length) {
      nextSlide = 0;
    }

    setCurrentSlide(nextSlide);
  };

  const errorImg = "./img/no-image.png";

  function onError(e) {
    e.target.src = errorImg;
  }

  return (
    <div className="w3-content w3-display-container">
      {images.map((img, index) => (
        <div
          key={index}
          style={{ display: index === currentSlide ? "block" : "none" }}
          className="w3-display-container"
        >
          <img
            src={img || errorImg}
            alt={`Slide ${index + 1}`}
            onError={(e) => onError(e)}
            className="slide-img"
          />
        </div>
      ))}

      <button
        className="w3-button w3-display-left w3-black"
        onClick={() => showSlide(-1)}
      >
        &#10094;
      </button>
      <button
        className="w3-button w3-display-right w3-black"
        onClick={() => showSlide(1)}
      >
        &#10095;
      </button>
    </div>
  );
};

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Slider;
