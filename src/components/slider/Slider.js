import React, { useEffect, useState } from "react";
import classes from "./Slider.module.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";

const Slider = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliderDataLength = sliderData.length;
  const nextSlide = () => {
    if (currentSlider < sliderDataLength - 1) {
      setCurrentSlider((prev) => prev + 1);
    } else {
      setCurrentSlider(0);
    }
  };
  const prevSlide = () => {
    if (currentSlider - 1 < 0) {
      setCurrentSlider(sliderDataLength - 1);
    } else {
      setCurrentSlider((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, [currentSlider]);

  return (
    <div className={classes.slider}>
      <AiOutlineArrowLeft
        size="30px"
        className={` ${classes.left} ${classes.arrow}`}
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        size="30px"
        className={`${classes.arrow} ${classes.right}`}
        onClick={nextSlide}
      />
      {sliderData.map((item, index) => {
        const { desc, heading, image } = item;
        return (
          <div
            className={
              index == currentSlider
                ? `${classes.slide} ${classes.current}`
                : classes.slide
            }
            key={index}
          >
            <img src={image} className={classes["slider-img"]} alt="slide" />
            <div className={classes.content}>
              <h2>{heading}</h2>
              <p>{desc}</p>
              <hr className={classes["hor-line"]} />
              <a href="#products" className={classes["link"]}>
                Shop Now
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
