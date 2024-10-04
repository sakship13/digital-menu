import React from 'react'
import '../index.css';
import { useState,useEffect,useRef } from 'react';
function Hero() {
   
      
    const [currentSlidePos, setCurrentSlidePos] = useState(0);
    const heroSliderItems = useRef([]);
    const autoSlideInterval = useRef(null);
  
    const slideNext = () => {
      setCurrentSlidePos((prevPos) =>
        prevPos >= heroSliderItems.current.length - 1 ? 0 : prevPos + 1
      );
    };
  
    const slidePrev = () => {
      setCurrentSlidePos((prevPos) =>
        prevPos <= 0 ? heroSliderItems.current.length - 1 : prevPos - 1
      );
    };
  
    useEffect(() => {
      heroSliderItems.current.forEach((item, index) => {
        if (item) {
          item.classList.toggle('active', index === currentSlidePos);
        }
      });
  
      autoSlideInterval.current = setInterval(slideNext, 7000);
  
      return () => clearInterval(autoSlideInterval.current);
    }, [currentSlidePos]);
  
    const stopAutoSlide = () => clearInterval(autoSlideInterval.current);
    const startAutoSlide = () => {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = setInterval(slideNext, 7000);
    };




  return (
    
    <div>
      <section className="hero text-center" aria-label="home" id="home">

<ul className="hero-slider" data-hero-slider >

  <li className= {`slider-item ${currentSlidePos === 0 ? 'active' : ''}`}
          ref={(el) => (heroSliderItems.current[0] = el)} data-hero-slider-item>

    <div className="slider-bg ">
    <img src={`${process.env.PUBLIC_URL}/images/hero-1.png`} width="1880" height="950" alt="" className="img-cover"/>
    </div>

    <p className="label-2 section-subtitle slider-reveal">Tradational & Hygine</p>

    <h1 className="display-1 hero-title slider-reveal">
      For the love of <br/>
      delicious food
    </h1>

    <p className="body-2 hero-text slider-reveal">
      Come with family & feel the joy of mouthwatering food
    </p>

    <a href="#" className="btn btn-primary slider-reveal">
      <span className="text text-1">View Our Menu</span>

      <span className="text text-2" aria-hidden="true">View Our Menu</span>
    </a>

  </li>

  <li className={`slider-item ${currentSlidePos === 1 ? 'active' : ''}`}
          ref={(el) => (heroSliderItems.current[1] = el)} data-hero-slider-item>

    <div className="slider-bg">
      <img src={`${process.env.PUBLIC_URL}/images/hero-slider-2.jpg`} width="1880" height="950" alt="" className="img-cover"/>
    </div>

    <p className="label-2 section-subtitle slider-reveal">delightful experience</p>

    <h1 className="display-1 hero-title slider-reveal">
      Flavors Inspired by <br/>
      the Seasons
    </h1>

    <p className="body-2 hero-text slider-reveal">
      Come with family & feel the joy of mouthwatering food
    </p>

    <a href="#" className="btn btn-primary slider-reveal">
      <span className="text text-1">View Our Menu</span>

      <span className="text text-2" aria-hidden="true">View Our Menu</span>
    </a>

  </li>

  <li className={`slider-item ${currentSlidePos === 2 ? 'active' : ''}`}
          ref={(el) => (heroSliderItems.current[2] = el)} data-hero-slider-item>

    <div className="slider-bg">
      <img src={`${process.env.PUBLIC_URL}/images/hero-2.png`} width="1880" height="950" alt="" className="img-cover"/>
    </div>

    <p className="label-2 section-subtitle slider-reveal">amazing & delicious</p>

    <h1 className="display-1 hero-title slider-reveal">
      Where every flavor <br/>
      tells a story
    </h1>

    <p className="body-2 hero-text slider-reveal">
      Come with family & feel the joy of mouthwatering food
    </p>

    <a href="#" className="btn  btn-primary slider-reveal">
      <span className="text text-1">View Our Menu</span>

      <span className="text text-2" aria-hidden="true">View Our Menu</span>
    </a>

  </li>

</ul>

<button className="slider-btn prev" aria-label="slide to previous" data-prev-btn  onClick={slidePrev}
        onMouseOver={stopAutoSlide}
        onMouseOut={startAutoSlide}>
  <ion-icon name="chevron-back"></ion-icon>
</button>

<button className="slider-btn next" aria-label="slide to next" data-next-btn  onClick={slidePrev}
        onMouseOver={stopAutoSlide}
        onMouseOut={startAutoSlide} >
  <ion-icon name="chevron-forward"></ion-icon>
</button>

{/* <a href="#" className="hero-btn has-after">
  <img src={`${process.env.PUBLIC_URL}/images/`} height="48" alt="booking icon"/>

  <span className="label-2 text-center span">Book A Table</span>
</a> */}

</section>





    </div>
  )
}

export default Hero

